import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { useBatchAddProductsMutation } from '../../features/products/productsApiSlices';
import ReferenceProductTransferField from '../../customField/ReferenceProductTransferField';

const FormList = ({ onFormInstanceReady, apiErrors, selectedRowKeys, t }) => {
    const [form] = Form.useForm();
    const [product_ids] = [
        'product_ids', 
    ].map(field => Form.useWatch(field, form));

    const initialValues = {
        product_ids: selectedRowKeys
    }
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors?.sites} />
            <ReferenceProductTransferField name="product_ids" label={t("common.Product")} targetKeys={product_ids && product_ids} />
        </Form>
    );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, selectedRowKeys, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Batch Create Product")}
        okText={t("common.Batch Create")}
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
        width={550}
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

const BatchCreateProduct = ({ selectedRowKeys, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [BatchCreate, { isLoading }] = useBatchAddProductsMutation();
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
            const data = await BatchCreate(values).unwrap();

            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Batch Created Product Successfully')}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                {t("common.Batch Create Product")}
            </Button>
            <FormModal
                open={open}
                onCreate={onCreate}
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

export default BatchCreateProduct;