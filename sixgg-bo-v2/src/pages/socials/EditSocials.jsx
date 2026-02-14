import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch, Select, Image } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetSocialsIDQuery, useUpdateSocialsMutation } from '../../features/socials/socialsApiSlices';
import FormSpin from '../../components/formSpin';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { socialsProvider } from '../../customField/customOption'

const SocialsForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

    const { data: record, isLoading: recordLoading,} = useGetSocialsIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
    }
    
return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites}/>
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
        <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image} />
        <Form.Item
            name="action_link"
            label={t("common.Action Link")}
            validateStatus={apiErrors.action_link ? 'error' : ''}
            help={apiErrors.action_link}
            hasFeedback
        >
                <Input type="text" placeholder={t("common.Action Link")}/>
        </Form.Item>
    </Form>
  );
};

const SocialsFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("common.Update Social")}
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
      <SocialsForm
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

const EditSocials = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateSocials, { isLoading }] = useUpdateSocialsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        if (Array.isArray(values.image)) {
            values.image = await ConvertImage(values.image)
        } else {
            delete values.image
        }

    setApiErrors([])

    try {
      values.id = id;
      const data = await UpdateSocials(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Social Updated Successfully')}));
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
        <SocialsFormModal
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

export default EditSocials;