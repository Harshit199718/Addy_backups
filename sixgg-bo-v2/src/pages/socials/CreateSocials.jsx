import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddSocialsMutation } from '../../features/socials/socialsApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { socialsProvider } from '../../customField/customOption'

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <ReferenceSiteField name="sites" apiErrors={apiErrors && apiErrors.sites}/>
        <Form.Item
            name="name"
            label={t("common.Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            rules={[
            {
                required: true,
                message: t('requiredmessage.Please input the name'),
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Name")} />
        </Form.Item>
        <Form.Item
            name="description"
            label={t("common.Description")}
            validateStatus={apiErrors.description ? 'error' : ''}
            help={apiErrors.description}
            hasFeedback
        >
            <Input placeholder={t("requiredmessage.Please input the description")} />
        </Form.Item>
        <Form.Item
            name="provider"
            label={t("common.Provider")}
            validateStatus={apiErrors.provider ? 'error' : ''}
            help={apiErrors.provider}
            rules={[
            {
                required: true,
                message: t('requiredmessage.Please select the provider'),
            },
            ]}
            hasFeedback
        >
            <Select placeholder={t("common.Provider")} options={socialsProvider(t)} />
        </Form.Item>
        <Form.Item 
            name="active"
            label={t("common.Active")}
        >
            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
        </Form.Item>
        <Form.Item
            name="sequence"
            label={t("common.Sequence")}
            validateStatus={apiErrors.sequence ? 'error' : ''}
            help={apiErrors.sequence}
            rules={[
            {
                required: true,
                message: t('requiredmessage.Please input the sequence'),
            },
            ]}
            hasFeedback
        >
            <Input type="number" placeholder={t("common.Sequence")} />
        </Form.Item>
        <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image}/>
        <Form.Item
            name="action_link"
            label={t("common.Action Link")}
            validateStatus={apiErrors.action_link ? 'error' : ''}
            help={apiErrors.action_link}
            hasFeedback
        >
                <Input type="text" placeholder={t("common.Action Link")} />
        </Form.Item>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Create Social")}
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

const CreateSocials = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateSocials, { isLoading }] = useAddSocialsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.image = await ConvertImage(values.image)

    setApiErrors([])
    try {
      const data = await CreateSocials(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Social Created Successfully')}));
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

export default CreateSocials;