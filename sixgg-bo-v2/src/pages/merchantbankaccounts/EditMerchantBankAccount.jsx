import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ReferenceBankField from '../../customField/ReferenceBankField';
import ReferenceRankField from '../../customField/ReferenceRankField';
import errorField from '../../features/error/errorField';
import { useGetMerchantBankIDQuery, useUpdateMerchantBankMutation } from '../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import FormSpin from '../../components/formSpin';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';

const MerchantBankAccountForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  const { 
    data: record,
    isLoading: recordLoading,
  } = useGetMerchantBankIDQuery({ id: id });

  if(recordLoading){
    return <FormSpin loading={recordLoading}/>
  }
  
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
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
        <Input placeholder={t("merchantbankaccount.Bank Account Name")} />
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
        <Input type="number" placeholder={t("merchantbankaccount.Bank Account Number")}/>
      </Form.Item>
      <ReferenceRankField name="ranks" label={t("common.Rank")} apiErrors={apiErrors && apiErrors.ranks}/>
      <ImageField name="qrcode_image" label={t("common.QRCode Image")} apiErrors={apiErrors && apiErrors.qrcode_image} require={false} />
      <Form.Item 
        name="active"
        label={t("common.Active Bank")}
      >
        <Switch checkedChildren={t("common.Active Bank")} unCheckedChildren={t("common.Bank Inactive")} />
      </Form.Item>
    </Form>
  );
};

const MerchantBankAccountFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("merchantbankaccount.Update Merchant Bank Account")}
      okText={t("common.Update")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onUpdate(values);
        } catch (error) {
        }
      }}
    >
      <MerchantBankAccountForm
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

const EditMerchantBankAccount = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [UpdateMerchantBankAccount, { isLoading }] = useUpdateMerchantBankMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])

  const onUpdate = async (values) => {
    if (Array.isArray(values.qrcode_image)) {
      values.qrcode_image = await ConvertImage(values.qrcode_image)
    } else {
      delete values.qrcode_image
    }
    setApiErrors([])
    try {
      values.id = id;
      const data = await UpdateMerchantBankAccount(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Merchant Bank Updated Successfully')}`}));
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
      <MerchantBankAccountFormModal
        open={open}
        onUpdate={onUpdate}
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
export default EditMerchantBankAccount;