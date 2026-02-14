import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Select, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import { useUpdateWalletsMutation } from '../../features/wallets/walletsApiSlices';
import { playerAdjustmentOptions } from '../../customField/customOption';
import { CustomOptionLabel } from '../../ListingField/CustomOptionField';


const FormList = ({ onFormInstanceReady, apiErrors, player, t }) => {
  const [form] = Form.useForm();
  const [AdjustmentSelection] = [
    'AdjustmentSelection',
  ].map(field => Form.useWatch(field, form));

  useEffect(() => {
    onFormInstanceReady(form);
  }, []);
  const initialValues = player

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} size='larger'>
      <Form.Item 
        name="AdjustmentSelection"
        label={t("common.Adjustment Selection")}
        validateStatus={apiErrors?.AdjustmentSelection ? 'error' : ''}
        help={apiErrors?.AdjustmentSelection}
        hasFeedback
      >
        <Select
          mode={'single'}
          allowClear
          width='100%'
          options={playerAdjustmentOptions(t)}
        />
      </Form.Item>
      {AdjustmentSelection && 
      <Form.Item
        name={AdjustmentSelection}
        label={CustomOptionLabel(playerAdjustmentOptions(t), AdjustmentSelection)}
        validateStatus={apiErrors[AdjustmentSelection] ? 'error' : ''}
        help={apiErrors[AdjustmentSelection]}
        rules={[
          {
            required: true,
            message: `${t("requiredmessage.Please input the")} ${CustomOptionLabel(playerAdjustmentOptions(t), AdjustmentSelection)}`,
          },
        ]}
        hasFeedback
      >
        <Input type='number' placeholder={`${t("requiredmessage.Please input the")} ${CustomOptionLabel(playerAdjustmentOptions(t), AdjustmentSelection)}`} />
      </Form.Item>
      }
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, player, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={player && <span>{t("common.Adjustment for")} {player.username} </span>}
      okText={t("common.Adjust")}
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
      width={350}
    >
      <FormList
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
const AdjustTurnover = ({ playerid, walletid, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Adjust, { isLoading }] = useUpdateWalletsMutation();
  const player = useSelector((state) => state.general.player);

  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModalTab());
    } else {
      dispatch(closeModalTab());
    }
  },[open])
  
  const onAdjust = async (values) => {
    values.id = walletid
    values.user = playerid

    setApiErrors([])
    try {
      const data = await Adjust(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Adjust Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.Adjustment")}
      </Button>
      <FormModal
        open={open}
        onCreate={onAdjust}
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
export default AdjustTurnover;