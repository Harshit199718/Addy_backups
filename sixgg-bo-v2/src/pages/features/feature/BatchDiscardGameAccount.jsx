import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import ReferenceProductField from '../../../customField/ReferenceProductField';
import ReferenceSiteField from '../../../customField/ReferenceSiteField';
import { useBatchDiscardGameAccountMutation } from '../../../features/gameaccount/gameAccountApiSlices';
import { useTranslation } from 'react-i18next';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [sites] = [
        'sites',
    ].map(field => Form.useWatch(field, form));
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    return (
        <Form layout="vertical" form={form} name="form_in_modal" >
            <ReferenceSiteField name="sites" label={t("common.Sites")} mode={null} apiErrors={apiErrors && apiErrors.sites} />
            <ReferenceProductField name="product" label={t("referencefield.Product")} apiErrors={apiErrors && apiErrors.product} filterProp={{ sites: [sites] }} />
        </Form>
    );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("feature.Discard Game Account")}
        okText={t("feature.Discard")}
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
const BatchDiscardGameAccount = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [Discard, { isLoading }] = useBatchDiscardGameAccountMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
        values.sites = [values.sites]
        setApiErrors([])
        try {
            const data = await Discard(values).unwrap();
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Game Account Discard Successfully')}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', 
            notification_message: `${t('notierror.There is some error while discard game account, please try again')}` }));
            setApiErrors(errorField(error));
        }
    };

    return (
        <>
            <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%", height: 120, whiteSpace: 'wrap' }}>
                {t("feature.Discard Game Account")}
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
export default BatchDiscardGameAccount;