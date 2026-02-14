import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import { messageTemplateType } from '../../customField/customOption';
import { useGetMessageTemplateIDQuery, useUpdateMessageTemplateMutation } from '../../features/messagetemplate/messagetemplateApiSlices';

const MessageTemplateForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  const { data: record, isLoading: recordLoading,} = useGetMessageTemplateIDQuery({ id: id });
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

    if(recordLoading){
      return <FormSpin loading={recordLoading}/>
    }

return (
  <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
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

const MessageTemplateFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("messagetemplate.Update Message Template")}
      okText={t("common.Update")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
      autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      style={{ top: 0 }}
      onOk={async () => {
      try {
        const values = await formInstance?.validateFields();
        onUpdate(values);

      } catch (error) {
      }
      }}
    >
    <MessageTemplateForm
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

const EditMessageTemplate = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [UpdateMessageTemplate, { isLoading }] = useUpdateMessageTemplateMutation();
  const dispatch = useDispatch()

  useEffect(() => {
      if(open){
      dispatch(openModal());
      } else {
      dispatch(closeModal());
      }
  },[open])

  const onUpdate = async (values) => {
      setApiErrors([])

  try {
    values.id = id;
    const data = await UpdateMessageTemplate(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Message Template Updated Successfully')}`}));
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
      <MessageTemplateFormModal
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
export default EditMessageTemplate;