import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddKioskAccessMutation } from '../../features/kioskaccess/kioskAccessApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import ReferenceProductField from '../../customField/ReferenceProductField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites} />
        <ReferenceProductField name="product" label={t("common.Product")} apiErrors={apiErrors && apiErrors.product} />
        <Form.Item
            name="username"
            label={t("common.Username")}
            validateStatus={apiErrors.username ? 'error' : ''}
            help={apiErrors.username}
            rules={[
                {
                    required: true,
                    message: `${t('requiredmessage.Please input the username')}`,
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
            <Input placeholder={t("common.Password")} />   
        </Form.Item>
        <Form.Item
            name="site_url"
            label={t("common.Site URL")}
            validateStatus={apiErrors.site_url ? 'error' : ''}
            help={apiErrors.site_url}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the site_url')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Site URL")} />   
        </Form.Item>
        <ImageField name="reference" label={t("common.Image")} apiErrors={apiErrors && apiErrors.reference}/>
        <Form.Item
            name="remarks"
            label={t("common.Remark")}
            validateStatus={apiErrors.remarks ? 'error' : ''}
            help={apiErrors.remarks}
            hasFeedback
        >
                <Input type="text" placeholder={t("common.Remark")}/>
        </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("kioskaccess.Create Kiosk Access")}
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
const CreateKioskAccess = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateKioskAccess, { isLoading }] = useAddKioskAccessMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.reference = await ConvertImage(values.reference)

    setApiErrors([])
    try {
      const data = await CreateKioskAccess(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Kiosk Access Created Successfully')}`}));
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

export default CreateKioskAccess;