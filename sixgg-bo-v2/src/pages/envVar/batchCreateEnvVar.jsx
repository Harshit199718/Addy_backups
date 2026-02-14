import React, { useState, useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ReferenceEnvVarTransferField from '../../customField/ReferenceEnvVarTransferField';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { useBatchAddEnvironmentVariablesMutation } from '../../features/envVar/envVarApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, selectedRowKeys, t }) => {
    const [form] = Form.useForm();
    const [envvar_id] = [
        'envvar_id', 
    ].map(field => Form.useWatch(field, form));

    const initialValues = {
        envvar_id: selectedRowKeys
    }
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
            <ReferenceSiteField name="sites" apiErrors={apiErrors?.sites} />
            <ReferenceEnvVarTransferField name="envvar_id" label={t("env.Batch Create Env Var")} targetKeys={envvar_id && envvar_id} />
        </Form>
    );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, selectedRowKeys, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("env.Batch Create Env Var")}
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
        width={1100}
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
const BatchCreateEnvVar = ({ selectedRowKeys, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [BatchCreate, { isLoading }] = useBatchAddEnvironmentVariablesMutation();
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

            dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Batch Create Env Var Successfully")}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                {t("env.Batch Create Env Var")}
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
export default BatchCreateEnvVar;