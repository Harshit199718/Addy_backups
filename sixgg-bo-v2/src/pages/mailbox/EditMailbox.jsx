import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Col } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import CustomRichTextField from '../../customField/CustomRichTextField';
import { useGetMailboxIDQuery, useUpdateMailboxMutation } from '../../features/mailbox/mailboxApiSlices';

const MailboxForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [ message ] = [
        'message',
      ].map(field => Form.useWatch(field, form));

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading,} = useGetMailboxIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
      }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
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
            <Form.Item>
                <span 
                    style={{ color: 'red', fontSize: 15 }}>
                    {t("mailbox.If you make changes, it will create a new record if the previous record has been sent to the player.")}
                </span>
            </Form.Item>
        </Col>      
    </Form>
  );
};

const MailboxFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
      open={open}
      title={t("mailbox.Update Mailbox")}
      okText={t("common.Update")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
      autoFocus: true,
      }}
      onCancel={onCancel}
      width={1400}
      destroyOnClose
      style={{ top: 20 }}
      onOk={async () => {
      try {
        const values = await formInstance?.validateFields();
        onUpdate(values);
      } catch (error) {
      }
      }}
    >
      <MailboxForm
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

const EditMailbox = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateMailbox, { isLoading }] = useUpdateMailboxMutation();
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
      const data = await UpdateMailbox(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Mailbox Updated Successfully')}));
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
      <MailboxFormModal
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
export default EditMailbox;