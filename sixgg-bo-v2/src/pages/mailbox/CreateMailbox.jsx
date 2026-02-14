import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col } from 'antd';
import errorField from '../../features/error/errorField';
import { useAddMailboxMutation } from '../../features/mailbox/mailboxApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import CustomRichTextField from '../../customField/CustomRichTextField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
  const [form] = Form.useForm();
  const [ message ] = [
    'message',
  ].map(field => Form.useWatch(field, form));

  useEffect(() => {
      onFormInstanceReady(form);
  }, [form]);

  return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <Col span={24} >
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
            <Col span={24}>
                <CustomRichTextField name="message" label={t("common.Description")} value={message}/>
            </Col>
        </Col>          
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("mailbox.Create Mailbox")}
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

const CreateMailbox = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [CreateMailbox, { isLoading }] = useAddMailboxMutation();
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
    const data = await CreateMailbox(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Mailbox Created Successfully')}`}));
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
        onCancel={() => setOpen(false)}
        apiErrors={apiErrors}
        t={t}
      />
    </>
  );
};
export default CreateMailbox;