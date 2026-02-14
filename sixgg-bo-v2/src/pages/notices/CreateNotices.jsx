import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch, Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddNoticesMutation } from '../../features/notices/noticesApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { noticesType } from '../../customField/customOption'

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [numberLinkInput, setNumberLinkInput] = useState(0);
    const handleKeyDown = (event) => {
    const { key } = event;
    if (key !== "ArrowUp" && key !== "ArrowDown") {
      event.preventDefault();
    }
    };
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const initialValues = {
        link: '0',
      }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
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
                    <Input placeholder={t('requiredmessage.Please input name!')} />
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
                        placeholder={t("common.Type")}
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
                <ImageField name="image_sm" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image_sm} require={true}/>
                <Form.Item
                    name="link"
                    label={t("common.Link")}
                    validateStatus={apiErrors.link ? 'error' : ''}
                    help={apiErrors.link}
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
                    <Row gutter={[16, 16]} key={index}>
                        <Col span={12}>
                            <Form.Item 
                                label={`${t("common.Button Label")} ${index + 1}`} 
                                name={`buttonLabelInput${index + 1}`} 
                                rules={[{ required: true, message: `${t('requiredmessage.Please input button label!')}` }]}
                            >
                            <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item 
                                label={`${t("common.Link Label")} ${index + 1}`} 
                                name={`linkLabelInput${index + 1}`} 
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

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("notice.Create Notice")}
        okText={t("common.Create")}
        cancelText={t("common.Cancel")}
        okButtonProps={{
            autoFocus: true,
        }}
        onCancel={onCancel}
        destroyOnClose
        width={1000}
        onOk={async () => {
            try {
            const values = await formInstance?.validateFields();

            onCreate(values);
            } catch (error) {
            }
        }}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const CreateNotices = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateNotices, { isLoading }] = useAddNoticesMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.image_sm = await ConvertImage(values.image_sm)
    values.links = [];
        if (values.link > 0) {
            for (let i = 0; i < values.link; i++) {
                values.links.push(`buttonLabelInput:${values[`buttonLabelInput${i+1}`]},linkLabelInput:${values[`linkLabelInput${i+1}`]}`)
            }
        }

    setApiErrors([])
    try {
      const data = await CreateNotices(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Notice Created Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

    return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            {t("common.Create")}
        </Button>
        <FormModal
            open={open}
            onCreate={onCreate}
            onCancel={() => {
                setOpen(false)
                setApiErrors([])
            }}
            apiErrors={apiErrors}
            t={t}
        />
    </>
  );
};

export default CreateNotices;