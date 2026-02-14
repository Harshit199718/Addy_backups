import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../../features/modalSlice';
import FormSpin from '../../../components/formSpin';
import { useAddMessageTemplateSMSByTemplateMutation, useGetMessageTemplateIDQuery } from '../../../features/messagetemplate/messagetemplateApiSlices';
import ReferencePlayerField from '../../../customField/ReferencePlayerField';
import { convertIDToArray } from '../../../components/generalConversion';

const SendMessageFormList = ({ onFormInstanceReady, apiErrors, id, t }) => {
  const [form] = Form.useForm();
  const { data: record, isLoading: recordLoading,} = useGetMessageTemplateIDQuery({ id: id });
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

    if (recordLoading) {
      return <FormSpin loading={recordLoading} />;
    }

  return (
    <Form layout="vertical" form={form} name={`form_in_modal`} initialValues={record && record} >
        <ReferencePlayerField name="players" label={t("referencefield.Player")} apiErrors={apiErrors && apiErrors.players} t={t} />
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
          <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} showCount maxLength={250} placeholder={t('requiredmessage.Please input the message')} />
      </Form.Item>
    </Form>
  );
};

const SendMessageFormModal = ({ open, onCreate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t('messagetemplate.Send Message Template')}
      okText={t("common.Send")}
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
      width={500}
    >
      <SendMessageFormList
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

const SendMessageTemplate = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [SendMessage, { isLoading }] = useAddMessageTemplateSMSByTemplateMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open ){
        dispatch(openModalTab());
    } else {
        dispatch(closeModalTab());
    }
    },[open])

  const onSendMessage = async (values) => {
    const [player, wallet] = convertIDToArray(values.players)
    values.players = player
    setApiErrors([])

    try {
      values.id = id;
      const data = await SendMessage(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Send Message Successfully')}`}));
      setOpen(false);
      }
    catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
      }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("general.Send Message")}
      </Button>
      <SendMessageFormModal
        open={open}
        onCreate={onSendMessage}
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

export default SendMessageTemplate;