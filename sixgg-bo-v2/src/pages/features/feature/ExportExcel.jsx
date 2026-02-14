import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Select, Spin, Transfer } from 'antd';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { exportModule, exportModuleSorting } from '../../../customField/customOption';
import { useLazyGetExportExcelListFieldQuery, useLazyGetExportExcelListQuery } from '../../../features/exportexcel/exportExcelApiSlices';
import { ExportToExcel } from '../../../customToolbar/ExportToExcel';
import { setGlobalLoading } from '../../../features/generalSlice';
import SelectOption from '../../../customToolbar/SelectOption';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [GetModuleField, { isFetching }] = useLazyGetExportExcelListFieldQuery()
    const [fieldName, setFieldName] = useState([]);
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const [selected_module, export_field] = [
        'selected_module',
        'export_field'
    ].map(field => Form.useWatch(field, form));
    
    useEffect(() => {
        if(selected_module){
            GetModuleField({
                module: selected_module,
                pagination: {
                    startPageRow: 0,
                    endPageRow: 1,
                },
                filters: { 
                }
            })
            .unwrap()
            .then((payload) =>  {
                if(payload?.list?.length > 0){
                    const keys = Object.keys(payload?.list[0])
                    const listWithId = keys.map((item, index) => {
                        return ({ id: item, value: item })
                    })
                    setFieldName(listWithId)
                    form.setFieldValue('filename', selected_module)
                } else {
                    setFieldName([])
                }
            })
            .catch((error) => {
                setFieldName([])
                dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            })
        }
    },[selected_module])

    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={{ endPageRow: 9999 }}>
            <Form.Item
                name="selected_module"
                label={t("feature.Select Module")}
                validateStatus={apiErrors.selected_module ? 'error' : ''}
                help={apiErrors?.selected_module}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please select module!')}`,
                    },
                ]}
                hasFeedback
            >
                <SelectOption
                    options={exportModule(t)}
                    mode={'single'}
                    width={'100%'}
                />
            </Form.Item>
            {isFetching && <Spin />}
            {selected_module && 
            (fieldName?.length > 0 ? 
            <>
            <Form.Item
                name="export_field"
                label={t("feature.Export Field")}
                validateStatus={apiErrors.export_field ? 'error' : ''}
                help={apiErrors?.export_field}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please select export field!')}`,
                    },
                ]}
                hasFeedback
            >
                <Transfer
                    status={apiErrors.export_field ? 'error' : ''}
                    dataSource={fieldName}
                    rowKey={(record) => record.id}
                    showSearch
                    filterOption={(inputValue, option) =>
                        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                        option.category.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 ||
                        option.ltype.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
                    }
                    listStyle={{
                        minWidth: 350,
                        height: 300,
                    }}
                    titles={[t('referencefield.Not Applied'), t('referencefield.Applied')]}
                    targetKeys={export_field?.filter(key => key !== null)}
                    render={(item) => `${item.value}`}
                />
            </Form.Item>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="sorter_field"
                        label={t("feature.Sorter Field")}
                        validateStatus={apiErrors.sorted_field ? 'error' : ''}
                        help={apiErrors?.sorted_field}
                        rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select sorter field!')}`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            placeholder={t("feature.Sorter Field")}
                            options={fieldName}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="order"
                        label={t("feature.Order by")}
                        validateStatus={apiErrors.order ? 'error' : ''}
                        help={apiErrors?.order}
                        rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select order by field!')}`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Select
                            placeholder={t("feature.Order by")}
                            options={exportModuleSorting(t)}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="endPageRow"
                        label={t("feature.Total Data Export")}
                        validateStatus={apiErrors.endPageRow ? 'error' : ''}
                        help={apiErrors?.endPageRow}
                        rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select how many data to export!')}`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            type="number"
                            placeholder={t("feature.Total Data Export")}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="filename"
                        label={t("feature.File Name")}
                        validateStatus={apiErrors.filename ? 'error' : ''}
                        help={apiErrors?.filename}
                        rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input the field name!')}`,
                            },
                        ]}
                        hasFeedback
                    >
                        <Input
                            placeholder={t("feature.File Name")}
                        />
                    </Form.Item>
                </Col>
            </Row>
            </>
            :
            !isFetching &&
            <Alert
                type="error"
                message={t("feature.No data found")}
                description={t("feature.No data found")}
            />
            )
            }
        </Form>
    );
};

const FormModal = ({ open, onCancel, apiErrors, onExport, t }) => {
    const [formInstance, setFormInstance] = useState();

    return (
        <Modal
            open={open}
            title={t("feature.Export Modules")}
            okText={t("common.Export")}
            cancelText={t("common.Cancel")}
            onOk={async () => {
                try {
                  const values = await formInstance?.validateFields();
                  onExport(values);
                } catch (error) {
                }
            }}
            onCancel={onCancel}
            destroyOnClose
            width={800}
        >
            <FormList
                onFormInstanceReady={(instance) => setFormInstance(instance)}
                apiErrors={apiErrors}
                t={t}
            />
        </Modal>
    );
};

const ExportExcel = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([]);
    const dispatch = useDispatch();
    const [GetModule, { isFetching }] = useLazyGetExportExcelListQuery()

    useEffect(() => {
        if (open) {
            dispatch(openModal());
        } else {
            dispatch(closeModal());
        }
    }, [open]);

    const onExport = (values) => {
        dispatch(setGlobalLoading({ isLoading: true }));
        GetModule({
            module: values.selected_module,
            pagination: {
                startPageRow: 0,
                endPageRow: values.endPageRow,
            },
            sorting: {
                name: values.sorter_field,
                order: values.order,
            },
            filters: { 
            }
        })
        .unwrap()
        .then((payload) =>  {
            if(payload?.list?.length > 0){
                const filteredList = payload?.list?.map(obj => {
                    const newObj = {};
                    values.export_field.forEach(key => {
                        if (obj.hasOwnProperty(key)) {
                            newObj[key] = obj[key];
                        }
                    });
                    return newObj;
                });
                dispatch(setGlobalLoading({ isLoading: false }));
                ExportToExcel({
                    filename: values.filename,
                    sheetname: [{ name: values.selected_module, tableId: values.selected_module }],
                    data: filteredList
                });
                dispatch(notification({notification_status: 'success', notification_message: `${values.filename} ${t("notisuccess.exported successfully")}`}));
            } else {

            }
        })
        .catch((error) => {
            dispatch(setGlobalLoading({ isLoading: false }));
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
        })
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%", height: 120, whiteSpace: 'wrap' }}>
                {t("feature.Export Excel")}
            </Button>
            <FormModal
                open={open}
                onCancel={() => {
                    setOpen(false);
                    setApiErrors([]);
                }}
                apiErrors={apiErrors}
                onExport={onExport}
                t={t}
            />
        </>
    );
};

export default ExportExcel;
