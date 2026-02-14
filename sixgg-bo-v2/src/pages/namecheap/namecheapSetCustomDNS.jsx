import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification, closeModal, openModal } from '../../features/modalSlice';
import { useNamecheapSetCustomDNSMutation } from '../../features/namecheapconfig/nameCheapConfigApiSlices';
import ReferenceSiteField from '../../customField/ReferenceSiteField';

const SetCustomDNSFormList = ({ onFormInstanceReady, apiErrors, record, t}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const defaultInitialValues = record ? {
        custom_dns: "demi.ns.cloudflare.com,earl.ns.cloudflare.com",
        sites: record.sites,
    } : {}

    const initialValues = { 
        ...defaultInitialValues
    };

  return (
    <Form layout="vertical" form={form} name={`form_in_modal`} initialValues={initialValues && initialValues}>
       <Row gutter={[16, 16]}>
            <Col span={24}>
                <ReferenceSiteField name="sites" label={t("common.Sites")} mode={null} disabled apiErrors={apiErrors && apiErrors.sites}/>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="domain"
                    label={t("common.Domain")}
                    validateStatus={apiErrors.domain ? 'error' : ''}
                    help={apiErrors.domain}
                    rules={[
                        {
                            required: true,
                            message: `${t('requiredmessage.Please input the domain to set custom dns')}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder={t('requiredmessage.Please input the domain to set custom dns')} min={0}/>
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="custom_dns"
                    label={t("common.Custom DNS")}
                    validateStatus={apiErrors.custom_dns ? 'error' : ''}
                    help={apiErrors.custom_dns}
                    rules={[
                        {
                            required: true,
                            message: `${t('requiredmessage.Please input the custom_dns to set custom dns')}`,
                        },
                    ]}
                    hasFeedback
                >
                    <Input placeholder={t('requiredmessage.Please input the custom_dns to set custom dns')} min={0}/>
                </Form.Item>
            </Col>
        </Row>
    </Form>
  );
};

const SetCustomDNSFormModal = ({ open, onCreate, onCancel, apiErrors, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={record && <span>{t("common.Set Custom DNS for")} {record.username} </span>}
      okText={t("common.Set")}
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
      <SetCustomDNSFormList
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

const NamecheapSetCustomDNS = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [SetCustomDNS, { isLoading }] = useNamecheapSetCustomDNSMutation();
    const dispatch = useDispatch()

    useEffect(() => {
    if(open){
        dispatch(openModal());
    } else {
        dispatch(closeModal());
    }
    },[open])
  
    const onSetCustomDNS = async (values) => {
        setApiErrors([])

        try {
            const data = await SetCustomDNS(values).unwrap();
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Set DNS Successfully')}`}));
            setOpen(false);
        }catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
        <Button type="primary" onClick={() => setOpen(true)}  style={{ width: '100%', marginTop: 10 }}>
            {t("common.Set Custom DNS")}
        </Button>
        <SetCustomDNSFormModal
            open={open}
            onCreate={onSetCustomDNS}
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
export default NamecheapSetCustomDNS;