import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddUnclaimsMutation } from '../../features/unclaims/unclaimsApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import DateField from '../../customField/DateField';
import ReferencePlayerField from '../../customField/ReferencePlayerField';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import { getCurrentTime } from '../../components/convertDate';
import { useTranslation } from 'react-i18next';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
  const [form] = Form.useForm();
  const [sites] = [
      'sites',
    ].map(field => Form.useWatch(field, form));
  
  useEffect(() => {
    onFormInstanceReady(form);
  }, []);

  const initialValues = { 
    claim_time: getCurrentTime()
  };

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
        <Col span={24} >
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.site} mode= "single" />
            {sites && sites.length != 0  && 
            <>
              <DateField name="claim_time" label={t("common.Date")} disabled={true} apiErrors={apiErrors && apiErrors.claim_time} />
              <ReferencePlayerField disabled={true} label={t("common.Player")} apiErrors={apiErrors && apiErrors.claim_user} />
              <Form.Item
                label={t("common.Merchant Bank")}
              >
                <ReferenceMerchantBankAccountField 
                  name="merchant_bank_account" 
                  placeholder={t("common.Please Select Merchant Bank Account")}
                  label={null}
                  filterProp={{ type: "B", sites: [sites] }}
                  apiErrors={apiErrors && apiErrors.merchant_bank_account} 
                />
              </Form.Item> 
              <Form.Item
                name="amount"
                label={t("common.Amount")}
                validateStatus={apiErrors.amount ? 'error' : ''}
                help={apiErrors.amount}
                rules={[
                  {
                      required: true,
                      message: t('requiredmessage.Please input the amount'),
                  },
                ]}
                hasFeedback
              >
                <Input type="number" placeholder={t("common.Amount")} />
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
            </>
            }
        </Col>      
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("common.Create Unclaim")}
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
      width={500}
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

const CreateUnclaims = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateUnclaims, { isLoading }] = useAddUnclaimsMutation();
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
      const data = await CreateUnclaims(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Unclaim Created Successfully')}));
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

export default CreateUnclaims;