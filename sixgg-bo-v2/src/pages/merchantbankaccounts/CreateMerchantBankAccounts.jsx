import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Radio, Select, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ReferenceBankField from '../../customField/ReferenceBankField';
import ReferenceRankField from '../../customField/ReferenceRankField';
import errorField from '../../features/error/errorField';
import { useAddMerchantBankMutation } from '../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

  return (
    <Form layout="vertical" form={form} name="form_in_modal">
        <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites}/>
        <ReferenceBankField name="bank" label={t("common.Bank Name")} apiErrors={apiErrors && apiErrors.bank}/>
        <Form.Item
            name="name"
            label={t("merchantbankaccount.Bank Account Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            rules={[
              {
                  required: true,
                  message: `${t('requiredmessage.Please input the name of the bank!')}`,
              },
            ]}
            hasFeedback
        >
            <Input placeholder={t("merchantbankaccount.Bank Account Name")}/>
        </Form.Item>
        <Form.Item
            name="number"
            label={t("merchantbankaccount.Bank Account Number")}
            validateStatus={apiErrors.number ? 'error' : ''}
            help={apiErrors.number}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the account number of the bank!')}`,
            },
            ]}
            hasFeedback
        >
            <Input type="number" placeholder={t("merchantbankaccount.Bank Account Number")} />
        </Form.Item>
        <ReferenceRankField name="ranks" label={t("common.Rank")} apiErrors={apiErrors && apiErrors.ranks}/>
        <ImageField name="qrcode_image" label={t("common.QRCode Image")} apiErrors={apiErrors && apiErrors.qrcode_image} require={false} />
        <Form.Item 
            name="active"
            label={t("common.Active Bank")}
         >
            <Switch checkedChildren={t("common.Active Bank")} unCheckedChildren={t("common.Bank Inactive")} defaultChecked />
        </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("merchantbankaccount.Create Merchant Bank Account")}
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
const CreateMerchantBankAccount = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [CreateMerchantBankAccount, { isLoading }] = useAddMerchantBankMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])
  
  const onCreate = async (values) => {
    if (Array.isArray(values.qrcode_image)) {
      values.qrcode_image = await ConvertImage(values.qrcode_image)
    } else {
        delete values.qrcode_image
    }
    setApiErrors([])
    try {
      const data = await CreateMerchantBankAccount(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Merchant Bank Created Successfully')}`}));
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
export default CreateMerchantBankAccount;