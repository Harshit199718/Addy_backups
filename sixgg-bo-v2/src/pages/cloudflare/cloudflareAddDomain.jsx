import React, { useState, useEffect } from 'react';
import { Alert, Button, Col, Form, Input, Modal, Row, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification, closeModal, openModal } from '../../features/modalSlice';
import { useCloudflareAddDomainMutation } from '../../features/cloudflareconfig/cloudflareConfigApiSlices';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { t } from 'i18next';

const AddDomainFormList = ({ onFormInstanceReady, apiErrors, record, successMessage, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const defaultInitialValues = record ? {
        sites: record.sites,
        update_namecheap_dns: true,
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
                            message: `${t('requiredmessage.Please input the domain to add!')}`,
                        },
                    ]}
                    hasFeedback
                    >
                    <Input placeholder={t("common.Domain")} min={0}/>
                </Form.Item>
            </Col>
            {successMessage && 
            <Col span={24}>
                <Alert message={successMessage} type="success" showIcon/>
            </Col>
            }
        </Row>
    </Form>
  );
};

const AddDomainFormModal = ({ open, onCreate, onCancel, apiErrors, record, successMessage, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={record && <span>{t("cloudflare.Add Domain for")} {record.client_auth_email} </span>}
      okButtonProps={{
        autoFocus: true,
      }}
      footer={
        <>
          <Button type='default' onClick={()=> {
            onCancel()
          }}>
            {t("common.Cancel")}
          </Button>
          {(!successMessage) &&
              <Button type="primary" onClick={async () => {
                try {
                  const values = await formInstance?.validateFields();
                  onCreate(values);
                } catch (error) {
                }
              }}>
                {t("cloudflare.Add Domain")}
              </Button>
          }
        </>
        }
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
      <AddDomainFormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        successMessage={successMessage}
        t={t}
      />
    </Modal>
  );
};

const CloudflareAddDomain = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [successMessage, setSuccessMessage] = useState(null)
    const [AddDomain, { isLoading }] = useCloudflareAddDomainMutation();
    const dispatch = useDispatch()

    useEffect(() => {
    if(open){
        dispatch(openModal());
    } else {
        dispatch(closeModal());
    }
    },[open])
  
    const onAddDomain = async (values) => {
        setApiErrors([])

        try {
            const data = await AddDomain(values).unwrap();
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Set DNS Successfully')}`}));
            setSuccessMessage(data?.domain)
        }catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
        <Button type="primary" onClick={() => setOpen(true)}  style={{ width: '100%', marginTop: 10 }}>
            {t("cloudflare.Add Domain to Cloudflare")}
        </Button>
        <AddDomainFormModal
          open={open}
          onCreate={onAddDomain}
          onCancel={() => {
              setOpen(false)
              setApiErrors([])
              setSuccessMessage(null)
          }}
          apiErrors={apiErrors}
          record={record}
          successMessage={successMessage}
          t={t}
        />
        </>
    );
};
export default CloudflareAddDomain;