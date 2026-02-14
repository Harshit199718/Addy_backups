import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Col } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import { useGetUnclaimsIDQuery, useUpdateUnclaimsMutation } from '../../features/unclaims/unclaimsApiSlices';
import DateField from '../../customField/DateField';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import { dayjsDateTime } from '../../components/convertDate';
import ReferencePlayerField from '../../customField/ReferencePlayerField';
import { convertIDToArray } from '../../components/generalConversion';
import { useTranslation } from 'react-i18next';

const UnclaimsForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading,} = useGetUnclaimsIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
      }

    const initialValues = record && {
    ...record,
    claim_time: dayjsDateTime(record.claim_time),
    merchant_bank_account: record.merchant_bank_account
    }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
      <Col span={24} >
        <DateField name="claim_time" label={t("common.Date")} disabled={true} apiErrors={apiErrors && apiErrors.claim_time} />
        <ReferencePlayerField name="claim_user" label={t("common.Player")} apiErrors={apiErrors && apiErrors.claim_user} />
        <ReferenceMerchantBankAccountField 
          name="merchant_bank_account" 
          label={t("common.Merchant Bank Account")}
          placeholder={t("common.Please Select Merchant Bank Account")}
          disabled
          filterProp={{ type: "B" }}
          apiErrors={apiErrors && apiErrors.merchant_bank_account} 
        />
        <Form.Item
          name="amount"
          label={t("common.Amount")}
          validateStatus={apiErrors.amount ? 'error' : ''}
          help={apiErrors.amount}
          rules={[
            {
              message: t('requiredmessage.Please input the amount'),
            },
          ]}
          hasFeedback
        >
          <Input type="number" placeholder={t("common.Amount")} disabled />
        </Form.Item>
        <Form.Item
          name="remark"
          label={t("common.Remark")}
          validateStatus={apiErrors.remark ? 'error' : ''}
          help={apiErrors.remark}
          hasFeedback
        >
          <Input placeholder={t("common.Remark")} />
        </Form.Item>
      </Col>      
    </Form>
  );
};

const UnclaimsFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("common.Update Unclaim")}
      okText={t("common.Update")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
      autoFocus: true,
      }}
      onCancel={onCancel}
      width={1000}
      destroyOnClose
      onOk={async () => {
      try {
        const values = await formInstance?.validateFields();

        onUpdate(values);
      } catch (error) {
      }
      }}
    >
      <UnclaimsForm
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

const EditUnclaims = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [EditUnclaims, { isLoading }] = useUpdateUnclaimsMutation();
  const dispatch = useDispatch()

  useEffect(() => {
      if(open){
      dispatch(openModal());
      } else {
      dispatch(closeModal());
      }
  },[open])

  const onUpdate = async (values) => {
  if(values.claim_user != null){
      values.claimed = true;
  }
  else values.claimed = false;

  const [claim_user, wallet_id] = convertIDToArray(values.claim_user)
  values.claim_user = claim_user;
  values.wallet_id = wallet_id;
  setApiErrors([])

  try {
    values.id = id;
    const data = await EditUnclaims(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Unclaim Updated Successfully')}));
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
      <UnclaimsFormModal
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

export default EditUnclaims;