import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col, Select, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetSupportsIDQuery, useUpdateSupportsMutation } from '../../features/support/supportsApiSlices';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import DateField from '../../customField/DateField';
import { dayjsDateTime } from '../../components/convertDate';
import ReferenceUserGroupsField from '../../customField/ReferenceUserGroupsField';
import { supportType } from '../../customField/customOption';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import ResetPassword from '../general/ResetPassword';

const SupportForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  const { data: record, isLoading: recordLoading,} = useGetSupportsIDQuery({ id: id });
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

    if(recordLoading){
      return <FormSpin loading={recordLoading}/>
    }

  const initialValues = record && {
    ...record,
    date_joined: dayjsDateTime(record.date_joined),
    paymentgateway_bank: record.paymentgateway_bank ? Number(record.paymentgateway_bank) : null,
    id:record.id
  };

return (
  record &&
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
      <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.site_ids} />
      <Form.Item
        name="username"
        label={t("common.Username")}
      >
        <Input disabled/>
      </Form.Item>
      <ReferenceUserGroupsField name="groups" label={t("common.Group")} apiErrors={apiErrors && apiErrors.groups} 
      // filterProp={{ name: ["Master", "Support", "Caller", "Report", "Support_Deposit", "Support_Withdrawal", "DCMaster"] }}
      />
      <DateField name="date_joined" label={t("common.Date")} disabled={true} apiErrors={apiErrors && apiErrors.claim_time} /> 
      <Form.Item
        name="support_type"
        label={t("common.Support Type")}
        validateStatus={apiErrors.support_type ? 'error' : ''}
        help={apiErrors.support_type}
        rules={[
        {
            required: true,
            message: t('requiredmessage.Please select the support type'),
        },
        ]}
        hasFeedback
      >
        <Select placeholder={t("common.Support Type")} options={supportType(t)}/>
      </Form.Item>
      <Form.Item
        label={t("common.Merchant Bank A/C")}
      >
        <ReferenceMerchantBankAccountField
          id="paymentgateway_bank" 
          name="paymentgateway_bank" 
          filterProp={{ type: "B" } }
          placeholder={t("common.Please Select Merchant Bank")}
          label={null}
          apiErrors={apiErrors && apiErrors.paymentgateway_bank} 
          required={false}
        />
      </Form.Item>
      <Row gutter={[16, 16]}>
        <Col span={12}>                
          <Form.Item 
            name="is_active"
            label={t("common.Active")}
          >
              <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
          </Form.Item>
        </Col>
        <Col span={12}>                
          <Form.Item 
            name="totp_device_confirmed"
            label={t("common.2FA Disabled?")}
          >
            <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} disabled />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const SupportFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const dispatch = useDispatch();
    const [formInstance, setFormInstance] = useState();
    const { data: record, isLoading: recordLoading } = useGetSupportsIDQuery({ id: id });

    useEffect(() => {
      if (record && record.username) {
          dispatch(openModal({ username: record.username }));
      }
      return () => {
          dispatch(closeModal());
      };
  }, [record]);

  return (
    record &&
      <Modal
        open={open}
        title={`${t("common.Update Support")} - ${record.username}`}
        okButtonProps={{
        autoFocus: true,
        }}
        footer={
          <Row gutter={[8, 8]} align={"left"}>
            <Col span={4}>
              <ResetPassword role='support-edit' userID={id} />
            </Col>
            <Col span={16}>
              <Button type='default' onClick={onCancel}>
                {t("common.Cancel")}
              </Button>
            </Col>
            <Col span={4}>
              <Button type='primary' 
              onClick={async () => {
                try {
                  const values = await formInstance?.validateFields();
                  onUpdate(values);
                } catch (error) {
                }
              }}>
                {t("common.Update")}
              </Button>
            </Col>
          </Row>
        }
        onCancel={onCancel}
        destroyOnClose
        style={{ top: 0 }}
        onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onUpdate(values);
        } catch (error) {
        }
        }}
      >
      <SupportForm
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

const EditSupport = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [UpdateSupport, { isLoading }] = useUpdateSupportsMutation();
  const dispatch = useDispatch()

  useEffect(() => {
      if(open){
      dispatch(openModal());
      } else {
      dispatch(closeModal());
      }
  },[open])

  const onUpdate = async (values) => {
      values.site_ids = values.sites
      delete values.password;
      if(values.groups === 1){
          values.is_staff = false;
      }
      else{
          values.is_staff = true;
      }

      if (!Array.isArray(values.groups)) {
          values.groups = [values.groups];
      }
      setApiErrors([])

  try {
    values.id = id;
    const data = await UpdateSupport(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Support Updated Successfully')}));
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
      <SupportFormModal
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
export default EditSupport;