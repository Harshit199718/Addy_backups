import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Row, Col, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { useSendMailMutation } from '../../../features/mailbox/mailApiSlices';
import ReferenceMailboxField from '../../../customField/ReferenceMailboxField';
import ReferencePlayerTransferField from '../../../customField/ReferencePlayerTransferField';
import ReferenceSiteField from '../../../customField/ReferenceSiteField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
  const [form] = Form.useForm();

  useEffect(() => {
      onFormInstanceReady(form);
  }, [form]);

  const [receiver_ids, site_id, sent_to_all] = [
    'receiver_ids',
    'site_id',
    'sent_to_all'
  ].map(field => Form.useWatch(field, form));

  const initialValues = { 
    sent_to_all: true
  };

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
      <Row gutter={[16, 16]}>
        <Col span={24} >
          <ReferenceSiteField name="site_id" label={t("common.Sites")} mode='single' />
          <ReferenceMailboxField name="mail_template" label={t("mailbox.Mailbox")} apiErrors={apiErrors && apiErrors.mail_template} mode={null} />
          <Form.Item 
            name="sent_to_all"
            label={t("mailbox.To All Player?")}
            valuePropName="checked"
          >
            <Switch checkedChildren={t("mailbox.All Player")} unCheckedChildren={t("mailbox.Not All")} defaultChecked />
          </Form.Item>
          {sent_to_all != true && // Conditionally render based on showPlayerTransferField
            <ReferencePlayerTransferField name="receiver_ids" label={t("common.Player")} apiErrors={apiErrors && apiErrors.receiver_ids} targetKeys={receiver_ids && receiver_ids} filterProp={{sites: [site_id]}} />
          }
        </Col>
      </Row>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("mailbox.Send Mail")}
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

const SendMail = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [SendMail, { isLoading }] = useSendMailMutation();
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
    const data = await SendMail(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Mail Sent Successfully')}`}));
    setOpen(false);
  } catch (error) {
    dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    setApiErrors(errorField(error));
      }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.Send")}
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
export default SendMail;