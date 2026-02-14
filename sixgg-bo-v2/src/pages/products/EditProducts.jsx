import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch, Row, Col, Divider, Tag, Image } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetProductsIDQuery, useUpdateProductsMutation } from '../../features/products/productsApiSlices';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import FormSpin from '../../components/formSpin';
import { productsCategory, productsLaunchType, productCreditType, productURLType } from '../../customField/customOption';

const ProductsForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [ltype] = ['ltype'].map(field => Form.useWatch(field, form));

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading } = useGetProductsIDQuery({ id: id });
    if (recordLoading) {
        return <FormSpin loading={recordLoading} />
    }

    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record}>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label={t("common.Name")}
                                validateStatus={apiErrors.name ? 'error' : ''}
                                help={apiErrors.name}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please input name!'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder={t("common.Name")} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="module"
                                label={t("common.Module")}
                                validateStatus={apiErrors.module ? 'error' : ''}
                                help={apiErrors.module}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please input module'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder={t("common.Module")} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="ltype"
                                label={t("common.Launch Type")}
                                validateStatus={apiErrors.ltype ? 'error' : ''}
                                help={apiErrors.ltype}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please select the ltype'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select placeholder={t("common.Launch Type")} options={productsLaunchType(t)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="category"
                                label={t("common.Category")}
                                validateStatus={apiErrors.category ? 'error' : ''}
                                help={apiErrors.category}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please select the category'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select placeholder={t("common.Category")} options={productsCategory(t)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="urltype"
                                label={t("common.URL Type")}
                                validateStatus={apiErrors.urltype ? 'error' : ''}
                                help={apiErrors.urltype}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please select the url type'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select placeholder={t("common.URL Type")} options={productURLType(t)} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="credit_type"
                                label={t("common.Credit Type")}
                                validateStatus={apiErrors.credit_type ? 'error' : ''}
                                help={apiErrors.credit_type}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please select the credit type'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Select placeholder={t("common.Credit Type")} options={productCreditType(t)} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">EasyToGo123</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Form.Item
                                name="ptype"
                                label={t("common.Type")}
                                validateStatus={apiErrors.ptype ? 'error' : ''}
                                help={apiErrors.ptype}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please input the type'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder={t("common.Type")} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="pcode"
                                label={t("common.Code")}
                                validateStatus={apiErrors.pcode ? 'error' : ''}
                                help={apiErrors.pcode}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please input the code'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder={t("common.Code")} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={6}>
                            <Form.Item
                                name="sequence"
                                label={t("common.Sequence")}
                                validateStatus={apiErrors.sequence ? 'error' : ''}
                                help={apiErrors.sequence}
                                hasFeedback
                            >
                                <Input type="number" placeholder={t("common.Sequence")} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="active"
                                label={t("common.Active")}
                            >
                                <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="is_live"
                                label={t("common.Live")}
                            >
                                <Switch checkedChildren={t("common.Live")} unCheckedChildren={t("common.Not Live")} defaultChecked />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="featured"
                                label={t("common.Featured")}
                            >
                                <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off")} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {(ltype == 'app') && (
                        <Row gutter={[16, 16]}>
                            <Col span={12}>
                                <Form.Item
                                    name="android_dl_link"
                                    label={t("common.Android Download Link")}
                                    validateStatus={apiErrors.android_dl_link ? 'error' : ''}
                                    help={apiErrors.android_dl_link}
                                    hasFeedback
                                >
                                    <Input placeholder={t("common.Android Download Link")}/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="ios_dl_link"
                                    label={t("common.IOS Download Link")}
                                    validateStatus={apiErrors.ios_dl_link ? 'error' : ''}
                                    help={apiErrors.ios_dl_link}
                                    hasFeedback
                                >
                                    <Input placeholder={t("common.IOS Download Link")} />
                                </Form.Item>
                            </Col>
                        </Row>
                    )}
                    <ReferenceSiteField name="sites" apiErrors={apiErrors && apiErrors.sites} />
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <ImageField name="image_mobile" label={t("common.Product Image")} apiErrors={apiErrors && apiErrors.image_mobile} require={true}/>
                    </Col>
                    <Col span={12}>
                        <ImageField name="image_feature" label={t("common.Feature Image")} apiErrors={apiErrors && apiErrors.image_feature} require={false}/>    
                    </Col>
                </Row>
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={14}>
                            <Form.Item
                                name="min_bet"
                                label={t("common.Min Bet")}
                                validateStatus={apiErrors.min_bet ? 'error' : ''}
                                help={apiErrors.min_bet}
                                rules={[
                                    {
                                        required: true,
                                        message: t('requiredmessage.Please input min bet'),
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input placeholder={t("common.Min Bet")} />
                            </Form.Item>
                        </Col>
                        <Col span={10}>
                            <Form.Item
                                name="enabled_off_product"
                                label={t("common.Enabled Off Product Auto")}
                            >
                                <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="error_count_limit"
                                label={t("common.Error Count Limit")}
                                validateStatus={apiErrors.error_count_limit ? 'error' : ''}
                                help={apiErrors.error_count_limit}
                                rules={[
                                {
                                    required: true,
                                    message: `${t('requiredmessage.Please input error count limit')}`,
                                },
                                ]}
                                hasFeedback
                                style={{ marginTop: '-17px' }} 
                            >
                                <Input type="number" placeholder={t("common.Error Count Limit")} />
                            </Form.Item>
                        </Col>
                        <Col span={24}>                
                            <Form.Item
                                name="interval_in_minutes"
                                label={t("common.Interval in minutes")}
                                validateStatus={apiErrors.interval_in_minutes ? 'error' : ''}
                                help={apiErrors.interval_in_minutes}
                                rules={[
                                {
                                    required: true,
                                    message: `${t('requiredmessage.Please input interval in minutes')}`,
                                },
                                ]}
                                hasFeedback
                                style={{ marginTop: '-15px' }} 
                            >
                                <Input type="number" placeholder={t("common.Interval in minutes")} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>                
                            <Form.Item 
                                name="is_gamelist"
                                label={t("common.Is Game List")}
                            >
                                <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off")} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>                
                            <Form.Item 
                                name="is_launch_in_site"
                                label={t("common.Is Launch in Site")}
                            >
                                <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off")} />
                            </Form.Item>
                        </Col>
                    </Row> 
                </Col>   
            </Row>
        </Form>
    );
};

const ProductsFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

    return (
        <Modal
            open={open}
            title={t("common.Update Product")}
            okText={t("common.Update")}
            cancelText={t("common.Cancel")}
            okButtonProps={{
            autoFocus: true,
            }}
            onCancel={onCancel}
            width={1000}
            destroyOnClose
            onOk={async () => {
            try {
            const values = await formInstance?.validateFields();

            onUpdate(values);
            } catch (error) {
            }
            }}
        >
        <ProductsForm
            onFormInstanceReady={(instance) => {
            setFormInstance(instance);
            }}
            id={id}
            apiErrors={apiErrors}
            t={t}
        />
        </Modal>
    );
};

const EditProducts = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateProducts, { isLoading }] = useUpdateProductsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        const imageProperties = ['image_mobile', 'image_feature'];
        for (const prop of imageProperties) {
            if (Array.isArray(values[prop])) {
                values[prop] = await ConvertImage(values[prop]);
            } else {
                delete values[prop];
            }
        }

        setApiErrors([])

        try {
        values.id = id;
        const data = await UpdateProducts(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Product Updated Successfully')}`}));
        setOpen(false);
        } catch (error) {
        dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
        setApiErrors(errorField(error));
        }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            {t("common.Edit")}
        </Button>
        <ProductsFormModal
            open={open}
            onUpdate={onUpdate}
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            id={id && id}
            t={t}
        />
    </>
  );
};

export default EditProducts;