import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { useBatchUpdateProductsMutation } from '../../features/products/productsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, selectedRowKeys, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal">
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors?.sites} />
        </Form>
    );
};

const FormModal = ({ open, onUpdate, onCancel, apiErrors, selectedRowKeys, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Batch Update Product")}
        okText={t("common.Batch Update")}
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
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        selectedRowKeys={selectedRowKeys}
        t={t}
      />
    </Modal>
  );
};

const BatchUpdateProduct = ({ selectedRowKeys, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [BatchUpdate, { isLoading }] = useBatchUpdateProductsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onUpdate = async (values) => {
        const updatedValues = {
            value: {
                sites: values.sites,
            },
            ids: selectedRowKeys
        }
        setApiErrors([])
        try {
            const data = await BatchUpdate(updatedValues).unwrap();

            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Batch Update Product Successfully')}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                {t("common.Batch Update Product")}
            </Button>
            <FormModal
                open={open}
                onUpdate={onUpdate}
                onCancel={() => {
                    setOpen(false)
                    setApiErrors([])
                }}
                apiErrors={apiErrors}
                selectedRowKeys={selectedRowKeys}
                t={t}
            />
        </>
    );
};

export default BatchUpdateProduct;