import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ReferenceEnvVarTransferField from '../../customField/ReferenceEnvVarTransferField';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import { useBatchUpdateEnvironmentVariablesMutation } from '../../features/envVar/envVarApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, selectedRowKeys }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal">
            <ReferenceSiteField name="sites" apiErrors={apiErrors?.sites} />
        </Form>
    );
};
const FormModal = ({ open, onUpdate, onCancel, apiErrors, selectedRowKeys, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("env.Batch Update Env Var")}
        okText={t("env.Batch Update")}
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
      />
    </Modal>
  );
};
const BatchUpdateEnvVar = ({ selectedRowKeys, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [BatchUpdate, { isLoading }] = useBatchUpdateEnvironmentVariablesMutation();
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

            dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Batch Update Env Var Successfully")}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)}>
                {t("env.Batch Update Env Var")}
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
export default BatchUpdateEnvVar;