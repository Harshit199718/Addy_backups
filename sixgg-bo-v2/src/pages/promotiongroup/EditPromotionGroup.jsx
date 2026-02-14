import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch, Image } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetPromotionGroupIDQuery, useUpdatePromotionGroupMutation } from '../../features/promotiongroup/promotionGroupApiSlices';
import FormSpin from '../../components/formSpin';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';

const PromotionGroupForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading,} = useGetPromotionGroupIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
    }
    
return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites}/>
        <Form.Item
            name="title"
            label={t("common.Title")}
            validateStatus={apiErrors.title ? 'error' : ''}
            help={apiErrors.title}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the title')}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Title")} />
        </Form.Item>
        <Form.Item
            name="sequence"
            label={t("common.Sequence")}
            validateStatus={apiErrors.sequence ? 'error' : ''}
            help={apiErrors.sequence}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the sequence')}`,
            },
            ]}
            hasFeedback
        >
            <Input type="number" placeholder={t("common.Sequence")} />
        </Form.Item>
        <ImageField name="promo_image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.promo_image} />
        <Form.Item 
            name="active"
            label={t("common.Active")}
        >
            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
        </Form.Item>
    </Form>
  );
};

const PromotionGroupFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("common.Update Promotion Group")}
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
      <PromotionGroupForm
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

const EditPromotionGroup = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdatePromotionGroup, { isLoading }] = useUpdatePromotionGroupMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        if (Array.isArray(values.promo_image)) {
            values.promo_image = await ConvertImage(values.promo_image)
        } else {
            delete values.promo_image
        }

        setApiErrors([])

    try {
        values.id = id;
        const data = await UpdatePromotionGroup(values).unwrap();
        dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Promotion Group Updated Successfully')}`}));
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
        <PromotionGroupFormModal
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
export default EditPromotionGroup;