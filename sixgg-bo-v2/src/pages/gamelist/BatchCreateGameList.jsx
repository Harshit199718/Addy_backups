import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import errorField from '../../features/error/errorField';
import { useBatchAddGameListMutation } from '../../features/gamelist/gameListApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';

import ReferenceProductField from '../../customField/ReferenceProductField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const initialValues = {
        gamelist_data: t('gamelist.[Put JSON here]'),
      }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
        <ReferenceProductField name="product" label={t("referencefield.Product")} apiErrors={apiErrors && apiErrors.product} mode={'multiple'} />
        <Form.Item
            name="gamelist_data"
            label={t("gamelist.Game List")}
            validateStatus={apiErrors.gamelist_data ? 'error' : ''}
            help={apiErrors.gamelist_data}
            hasFeedback
        >
            <Input.TextArea autoSize={{ minRows: 25 }} placeholder={t("gamelist.Game List")} />
        </Form.Item>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("gamelist.Batch Create Game List")}
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

const BatchCreateGameList = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [BatchCreate, { isLoading }] = useBatchAddGameListMutation();
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
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Game List Created Successfully')}`}));
            setOpen(false);
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)} style={{ width: "100%" }} >
            {t("common.Batch Create")}
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

export default BatchCreateGameList;