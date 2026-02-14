import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { useSwitchProducthModuleMutation } from '../../../features/products/productsApiSlices';
import ReferenceProductField from '../../../customField/ReferenceProductField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal" >
            <ReferenceProductField name="product_id" label={t("referencefield.Product")} apiErrors={apiErrors && apiErrors.product_id} />
            <Form.Item
                name="module_name"
                label={t("feature.Module Name")}
                validateStatus={apiErrors.module_name ? 'error' : ''}
                help={apiErrors.module_name}
                rules={[
                    {
                        required: true,
                        message: `${t("feature.Module Name")}${t("common.Is Required")}`,
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("feature.Module Name")} />
            </Form.Item>
        </Form>
    );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("feature.Product Switch")}
        okText={t("feature.Switch")}
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
const ProductSwitch = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [Switch, { isLoading }] = useSwitchProducthModuleMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        setApiErrors([])
        try {
            const data = await Switch(values).unwrap();
            if(data?.status === 'failed'){
                throw new Error(data?.details)
            }
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Product Switch Successfully')}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', 
            notification_message: `${t('notierror.There is some error while switching product, please enable product and try again')}` }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%", height: 120, whiteSpace: 'wrap' }}>
                {t("feature.Product Switch")}
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
export default ProductSwitch;