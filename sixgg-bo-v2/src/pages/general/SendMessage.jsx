import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, message } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import ReferencePlayerIDField from '../../customField/ReferencePlayerIDField';
import ReferenceMessageTemplateField from '../../customField/ReferenceMessageTemplateField';
import { useAddMessageTemplateSMSByTemplateMutation } from '../../features/messagetemplate/messagetemplateApiSlices';
import { useTranslation } from 'react-i18next';

const SendMessageFormList = ({ onFormInstanceReady, apiErrors, player, t }) => {

  if(!player){
    return <FormSpin loading={true}/>
  }

  const defaultInitialValues = player ? {
    players: player.id,
  } : {}

  const initialValues = { 
    ...defaultInitialValues
  };

  const [form] = Form.useForm();
  useEffect(() => {
    onFormInstanceReady(form);
  }, [form, onFormInstanceReady]);  


  return (
    <Form layout="vertical" form={form} name={`form_in_modal`} initialValues={initialValues && initialValues}>
      <ReferencePlayerIDField 
        name="players"
        label={t("referencefield.Player")}
        apiErrors={apiErrors && apiErrors.players} 
        playerID={player.id} 
      />
      <ReferenceMessageTemplateField 
        titleName={t("general.title" )}
        messageName={t("general.message" )}
        form={form}
      />
    </Form>
  );
};

const SendMessageFormModal = ({ open, onCreate, onCancel, apiErrors, player, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={player && <span>{t("Send message to")} {player.username} </span>}
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
        apiErrors={apiErrors}
        player={player}
        t={t}
      />
    </Modal>
  );
};

const SendMessage = ({ }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [SendMessage, { isLoading }] = useAddMessageTemplateSMSByTemplateMutation();
  const dispatch = useDispatch()
  const player = useSelector((state) => state.general.player);

  useEffect(() => {
  if(open ){
      dispatch(openModalTab());
  } else {
      dispatch(closeModalTab());
  }
  },[open])
  const onSendMessage = async (values) => {
    values.players = [values.players]
    setApiErrors([])

  try {
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
        player={player}
        t={t}
      />
    </>
  );
};
export default SendMessage;