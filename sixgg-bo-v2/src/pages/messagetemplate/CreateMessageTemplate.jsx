import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { messageTemplateType } from '../../customField/customOption';
import { useAddMessageTemplateMutation } from '../../features/messagetemplate/messagetemplateApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <ReferenceSiteField name="sites" apiErrors={apiErrors && apiErrors.sites} />
        <Form.Item
            name="title"
            label={t("common.Title")}
            validateStatus={apiErrors.title ? 'error' : ''}
            help={apiErrors.title}
            rules={[
                {
                    required: true,
                    message: `${t('requiredmessage.Please input the title')}`,
                },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Title")} />
        </Form.Item>
        <Form.Item
            name="ttype"
            label={t("common.Type")}
            validateStatus={apiErrors.ttype ? 'error' : ''}
            help={apiErrors.ttype}
            rules={[
                {
                required: true,
                message: `${t('requiredmessage.Please select the type')}`,
                },
            ]}
            hasFeedback
        >
            <Select placeholder={t("common.Type")} options={messageTemplateType(t)} />
        </Form.Item>
        <Form.Item
            name="message"
            label={t("common.Message")}
            validateStatus={apiErrors.message ? 'error' : ''}
            help={apiErrors.message}
            rules={[
                {
                    required: true,
                    message: `${t('requiredmessage.Please input the message')}`,
                },
            ]}
            hasFeedback
        >
            <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} showCount maxLength={250} placeholder={t("common.Message")} />
        </Form.Item>
    </Form>
    );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("messagetemplate.Create Message Template")}
        okText={t("common.Create")}
        cancelText={t("common.Cancel")}
        okButtonProps={{
            autoFocus: true,
        }}
        onCancel={onCancel}
        destroyOnClose
        onOk={async () => {
            try {
            const values = await formInstance?.validateFields();

            onCreate(values);
            } catch (error) {
            }
        }}
        width={1000}
        style={{ top: 20 }}
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

const CreateMessageTemplate = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateMessageTemplate, { isLoading }] = useAddMessageTemplateMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        setApiErrors([])
        
    try {
      const data = await CreateMessageTemplate(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Message Template Created Successfully')}`}));
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

export default CreateMessageTemplate;