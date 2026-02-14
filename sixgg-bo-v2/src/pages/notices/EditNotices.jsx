import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch, Select, Image,  Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetNoticesIDQuery, useUpdateNoticesMutation } from '../../features/notices/noticesApiSlices';
import FormSpin from '../../components/formSpin';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { noticesType } from '../../customField/customOption'

const NoticesForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();
    const { data: record, isLoading: recordLoading,} = useGetNoticesIDQuery({ id: id });
    const [numberLinkInput, setNumberLinkInput] = useState(record && record.link);
    const handleKeyDown = (event) => {
        const { key } = event;
        if (key !== "ArrowUp" && key !== "ArrowDown") {
          event.preventDefault();
        }
    };

    useEffect(() => {
        setNumberLinkInput(record && record.link); // Update numberLinkInput when record.link changes
    }, [record]);

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
    }
    
return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <Row gutter={[16, 16]}>
            <Col xs={numberLinkInput > 0 ? 12 : 24} >
                <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites}/>
                <Form.Item
                    name="name"
                    label={t("common.Name")}
                    validateStatus={apiErrors.name ? 'error' : ''}
                    help={apiErrors.name}
                    rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input name!')}`,
                    },
                    ]}
                    hasFeedback
                >
                    <Input placeholder={t("common.Name")}/>
                </Form.Item>
                <Row gutter={[16, 16]}>
                    <Col span={10}>
                        <Form.Item
                            name="active"
                            label={t("common.Active")}
                            style={{ marginBottom: 16 }} // Add margin bottom for spacing
                        >
                            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
                        </Form.Item>
                    </Col>
                    <Col span={10}>
                        <Form.Item
                            name="is_once"
                            label={t("common.Show Once?")}
                            style={{ marginBottom: 16 }} // Add margin bottom for spacing
                        >
                            <Switch checkedChildren={t("common.Once")} unCheckedChildren={t("common.Not Once")} defaultChecked />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="type"
                    label={t("common.Type")}
                    validateStatus={apiErrors.type ? 'error' : ''}
                    help={apiErrors.type}
                    rules={[
                        {
                            required: true,
                            message: `${t('requiredmessage.Please input the type')}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Select
                        placeholder="Type"
                        options={noticesType(t)}
                    />
                </Form.Item>
                <Form.Item
                    name="sequence"
                    label={t("common.Sequence")}
                    validateStatus={apiErrors.sequence ? 'error' : ''}
                    help={apiErrors.sequence}
                    rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the sequence')}`,
                    },
                    ]}
                    hasFeedback
                >
                <Input type="number" placeholder={t("common.Sequence")} />
                </Form.Item>
                <ImageField name="image_sm" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image_sm} require={false}/>
                <Form.Item
                    name="link"
                    label={t("common.Link")}
                    validateStatus={apiErrors.link ? 'error' : ''}
                    help={apiErrors.link}
                    rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the link')}`,
                    },
                    ]}
                    hasFeedback
                >
                    <Input type="number" 
                        min={0} 
                        max={9} 
                        onChange={(e) => setNumberLinkInput(Number(e.target.value))} 
                        onKeyDown={handleKeyDown} 
                        placeholder={t("common.Link")}
                    />                
                </Form.Item>
            </Col>
            {numberLinkInput > 0 &&
            <Col span={numberLinkInput > 0 ? 12 : 0} >
                {Array.from({ length: numberLinkInput }, (_, index) => (
                <Row key={index} gutter={16}>
                <Col span={12}>
                    <Form.Item
                        label={`${t("common.Button Label")} ${index + 1}`}
                        name={`buttonLabelInput${index + 1}`}
                        initialValue={record.links && record.links[index] ? record.links[index].split(',')[0].split(':')[1] : ''}
                        rules={[{ required: true, message: `${t('requiredmessage.Please input button label!')}` }]}
                        >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label={`${t("common.Link Label")} ${index + 1}`}
                        name={`linkLabelInput${index + 1}`}
                        initialValue={record.links && record.links[index] ? record.links[index].split(',')[1].split(':')[1] : ''}
                        rules={[{ required: true, message: `${t('requiredmessage.Please input link label!')}` }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                </Row>
                ))}
            </Col>
            }
        </Row>
    </Form>
  );
};

const NoticesFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("notice.Update Notices")}
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
      <NoticesForm
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

const EditNotices = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateNotices, { isLoading }] = useUpdateNoticesMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        values.links = [];
        if (values.link > 0) {
            for (let i = 0; i < values.link; i++) {
                values.links.push(`buttonLabelInput:${values[`buttonLabelInput${i+1}`]},linkLabelInput:${values[`linkLabelInput${i+1}`]}`)
            }
        }
        if (Array.isArray(values.image_sm)) {
            values.image_sm = await ConvertImage(values.image_sm)
        } else {
            delete values.image_sm
        }

    setApiErrors([])

    try {
      values.id = id;
      const data = await UpdateNotices(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Notice Updated Successfully')}`}));
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
        <NoticesFormModal
            open={open}
            onUpdate={onUpdate}
            onCancel={() => {
                setOpen(false)
                setApiErrors([])
            }}
            apiErrors={apiErrors}
            id={id && id}
            t={t}
        />
    </>
  );
};

export default EditNotices;