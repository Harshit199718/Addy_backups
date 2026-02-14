import React, { useState, useEffect } from 'react';
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { holdWalletTransferType } from '../../customField/customOption';
import NumberListingField from '../../ListingField/NumberListingField';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTransferHoldWalletMutation } from '../../features/player/playerApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, record, t }) => {
    const [form] = Form.useForm();
    const [ttype] = [
      'ttype',
    ].map(field => Form.useWatch(field, form));
  
    const initialValue = record && {
        username: record.username,
        balance: record.balance,
        second_slot_balance: record.second_slot_balance,
        ttype: "SWI"
    };

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValue}>
        <Form.Item
          name="username"
          label={t("common.Username")}
          validateStatus={apiErrors.username ? 'error' : ''}
          help={apiErrors.username}
          hasFeedback
        >
            <Input placeholder={t("common.Username")} readOnly/>
        </Form.Item>
        <Form.Item
          name="balance"
          label={t("common.Balance")}
          validateStatus={apiErrors.balance ? 'error' : ''}
          help={apiErrors.balance}
          hasFeedback
        >
            <Input placeholder={t("common.Balance")} readOnly/>
        </Form.Item>
        <Form.Item
          name="second_slot_balance"
          label={t("common.Hold Wallet Balance")}
          validateStatus={apiErrors.second_slot_balance ? 'error' : ''}
          help={apiErrors.second_slot_balance}
          hasFeedback
        >
            <Input placeholder={t("common.Hold Wallet Balance")} readOnly/>
        </Form.Item>
        <Form.Item
          name="amount"
          label={t("common.Amount")}
          validateStatus={apiErrors.amount ? 'error' : ''}
          help={apiErrors.amount}
          rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the amount to transfer!')}`,
            },
            {
              validator: (_, value) => {
                if (ttype === "SWI" && value > record?.balance) {
                  return Promise.reject(`${t("holdwallet.Amount exceeds available balance")} ${record?.balance} !`);
                } else if (ttype !== "SWI" && value > record?.second_slot_balance) {
                  return Promise.reject(`${t("holdwallet.Amount exceeds available balance")} ${record?.second_slot_balance} !`);
                } else {
                  return Promise.resolve();
                }
              },
            },
          ]}
          hasFeedback
        >
          <InputNumber style={{ width: '100%' }} placeholder={t("common.Amount")} min={0} />
        </Form.Item>
        <Form.Item
          name="ttype"
          label={t("common.Transfer Type")}
          validateStatus={apiErrors.ttype ? 'error' : ''}
          help={apiErrors.ttype}
          rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please select the transfer type!')}`,
            },
          ]}
          hasFeedback
        >
            <Select
              placeholder={t("common.Transfer Type")}
              options={holdWalletTransferType(t)}
            />
        </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={`${t("holdwallet.Transfer Hold Wallet")} - ${record?.username}`}
      okText={t("common.Transfer")}
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
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        t={t}
      />
    </Modal>
  );
};
const TransferHoldWallet = ({ record, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [TransferHoldWallet, { isLoading }] = useTransferHoldWalletMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])
  
  const onCreate = async (values) => {
    const updatedValues = {
      wallet_id: record?.wallet_id,
      ttype: values?.ttype,
      amount: values?.amount
    }
    setApiErrors([])

    try {
      const data = await TransferHoldWallet(updatedValues).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Wallet Transfered Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <Button 
        type="text" 
        onClick={() => setOpen(true)}
        style={{ display: "flex", alignItems: "center" }}
      > 
        <Icon icon="mdi:safe" width="1.2rem" height="1.2rem" />
        <NumberListingField value={record?.second_slot_balance}/>
      </Button>
      <FormModal
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        record={record}
        t={t}
      />
    </>
  );
};
export default TransferHoldWallet;