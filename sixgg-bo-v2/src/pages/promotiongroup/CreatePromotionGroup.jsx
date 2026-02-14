import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Switch } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddPromotionGroupMutation } from '../../features/promotiongroup/promotionGroupApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
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
        <ImageField name="promo_image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.promo_image}/>
        <Form.Item 
            name="active"
            label={t("common.Active")}
        >
            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
        </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Create Promotion Group")}
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
const CreatePromotionGroup = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreatePromotionGroup, { isLoading }] = useAddPromotionGroupMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.promo_image = await ConvertImage(values.promo_image)

    setApiErrors([])
    try {
      const data = await CreatePromotionGroup(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Promotion Group Created Successfully')}`}));
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
export default CreatePromotionGroup;