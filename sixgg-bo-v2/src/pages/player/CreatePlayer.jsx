import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Tag, Modal, Row, Col, Divider, Alert } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddPlayerMutation } from '../../features/player/playerApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ReferenceBankField from '../../customField/ReferenceBankField';
import { generateRandomPassword } from '../../components/generalConversion';
import PhoneInput from 'antd-phone-input';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [sites] = [
        'sites',
      ].map(field => Form.useWatch(field, form));
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    const randomPassword = generateRandomPassword();
    const initialValues = {
        password: randomPassword,
        password2: randomPassword,
        }

    const handlePhoneChange = (value) => {
        form.setFieldsValue({
            cc: value.countryCode,
            mobile: value.areaCode + value.phoneNumber
        });
    };

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={ initialValues } >
        <Col span={24} >
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites} mode= "single" />
            {sites && sites.length != 0  && 
            <>
            <Form.Item
                name="username"
                label={t("common.Username")}
                validateStatus={apiErrors.username ? 'error' : ''}
                help={apiErrors.username}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the username!')}`,
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
                        message: `${t('requiredmessage.Please input the password')}`,
                    },
                ]}
                hasFeedback
            >
                <Input.Password placeholder={t("common.Password")} />
            </Form.Item>
            <Form.Item
                name="password2"
                label={t("common.Confirm Password")}
                dependencies={['password']}
                validateStatus={apiErrors.password2 ? 'error' : ''}
                help={apiErrors.password2}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the confirm password')}`,
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
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="mobile"
                        label={t("common.Mobile Number")}
                        validateStatus={apiErrors?.mobile ? 'error' : ''}
                        help={apiErrors?.mobile}
                        hasFeedback
                    >
                        <PhoneInput
                            placeholder={t("common.Mobile Number")}
                            onChange={handlePhoneChange}
                            enableSearch
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                    name="referral_code"
                    label={t("common.Referral")}
                    validateStatus={apiErrors.referral_code ? 'error' : ''}
                    help={apiErrors.referral_code}
                    hasFeedback
                >
                    <Input placeholder={t("common.Referral")} />
                </Form.Item>
                </Col>
            </Row>
            <Divider>
                <Tag color="blue">{t("common.Bank Information")}</Tag>
            </Divider>
            <ReferenceBankField name="bank" label={t("common.Bank Name")} isRequired={false}  apiErrors={apiErrors && apiErrors.bank}/>
            <Row gutter={[16, 16]}>
                <Col span={12}>
                    <Form.Item
                        name="account_name"
                        label={t("common.Account Name")}
                        validateStatus={apiErrors.account_name ? 'error' : ''}
                        help={apiErrors.account_name}
                        hasFeedback
                    >
                        <Input placeholder={t("common.Account Name")} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="account_number"
                        label={t("common.Account Number")}
                        validateStatus={apiErrors.account_number ? 'error' : ''}
                        help={apiErrors.account_number}
                        hasFeedback
                    >
                        <Input type='number' placeholder={t("common.Account Number")} />
                    </Form.Item>
                </Col>
                    <Form.Item
                        name="cc"
                        label="Country Code"
                        hidden
                    >
                        <Input readOnly placeholder="Country Code" />
                    </Form.Item>
            </Row>    
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
        title={t("common.Registration")}
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
        width={800}
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
const CreatePlayer = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreatePlayer, { isLoading }] = useAddPlayerMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.sites = [values.sites]
    setApiErrors([])
    try {
      const data = await CreatePlayer(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Registration Successful')}`}));
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

export default CreatePlayer;