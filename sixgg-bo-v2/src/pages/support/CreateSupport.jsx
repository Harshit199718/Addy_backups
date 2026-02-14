import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Col, Select, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddSupportsMutation } from '../../features/support/supportsApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import DateField from '../../customField/DateField';
import ReferenceUserGroupsField from '../../customField/ReferenceUserGroupsField';
import { supportType } from '../../customField/customOption';
import ReferenceMerchantBankAccountField from '../../customField/ReferenceMerchantBankAccountField';
import { getCurrentTime } from '../../components/convertDate';
import { generateRandomPassword } from '../../components/generalConversion';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const randomPassword = generateRandomPassword();
    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    const initialValues = {
        support_type: "N",
        password : randomPassword,
        password2 : randomPassword,
        date_joined : getCurrentTime(),
        }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={ initialValues } >
        <Col span={24}>
        <ReferenceSiteField name="site_ids" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.site_ids} />
            <Form.Item
                name="username"
                label={t("common.Username")}
                validateStatus={apiErrors.username ? 'error' : ''}
                help={apiErrors.username}
                rules={[
                    {
                        required: true,
                        message: t('requiredmessage.Please input the username'),
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Username")} />
            </Form.Item>
            <Form.Item
                name="password"
                label={t("common.Password")}
                validateStatus={apiErrors.password ? 'error' : ''}
                help={apiErrors.password}
                rules={[
                    {
                        required: true,
                        message: t('requiredmessage.Please input the password'),
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder={t("common.Password")} />
            </Form.Item>
            <Form.Item
                name="password2"
                label={t("common.Confirm Password")}
                validateStatus={apiErrors.password2 ? 'error' : ''}
                help={apiErrors.password2}
                rules={[
                    {
                      required: true,
                      message: t('requiredmessage.Please input the confirm password'),
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error(t('common.The passwords do not match!')));
                      },
                    }),
                  ]}
                hasFeedback
            >
                <Input.Password placeholder={t("common.Confirm Password")} />
            </Form.Item>
            <ReferenceUserGroupsField name="groups" label={t("common.Group")} apiErrors={apiErrors && apiErrors.groups} 
            // filterProp={{ name: ["Master", "Support", "Caller", "Report", "Support_Deposit", "Support_Withdrawal"] }}
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
                <Select placeholder={t("common.Support Type")} options={supportType(t)} />
            </Form.Item>
            <ReferenceMerchantBankAccountField
                name="paymentgateway_bank" 
                placeholder={t("common.Please Select Merchant Bank")}
                label={null}
                filterProp={{ type: "B" } }
                apiErrors={apiErrors && apiErrors.paymentgateway_bank} 
                required={false}
            />
            <Form.Item 
                name="is_active"
                label={t("common.Active")}
            >
                <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
            </Form.Item>
        </Col>          
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Create Support")}
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

const CreateSupport = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateSupport, { isLoading }] = useAddSupportsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        values.is_staff = true;
        values.groups = [values.groups];
        const arrgroup = values.groups.toString().split('').map(Number);
        values.groups = arrgroup;
        setApiErrors([])
        
        try {
            const data = await CreateSupport(values).unwrap();
            dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Support Created Successfully')}));
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
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            t={t}
      />
    </>
  );
};
export default CreateSupport;