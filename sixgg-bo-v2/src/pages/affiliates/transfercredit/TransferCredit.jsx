import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { useAddAffiliatesCreditMutation } from '../../../features/affiliates/affiliatesApiSlices';

const AddCreditFormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <Form.Item
            name="amount"
            label= {t('common.Amount')}
            validateStatus={apiErrors.amount ? 'error' : ''}
            help={apiErrors.amount}
            rules={[
                {
                    required: true,
                    message: `${t("requiredmessage.Please input the amount")}`,
                },
            ]}
            hasFeedback
        >
        <Input type='number' placeholder={t('common.Amount')} />
        </Form.Item>
        <Form.Item
            name="remark"
            label={t("common.Remark")}
            validateStatus={apiErrors.amount ? 'error' : ''}
            help={apiErrors.remark}
            rules={[
                {
                    required: true,
                    message: `${t("requiredmessage.Please input the remark")}`
                },
            ]}
            hasFeedback
        >
        <Input placeholder={t("common.Remark")}/>
        </Form.Item>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("transfercredit.Transfer Credit")}
        okText= {t("common.Save")}
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
      <AddCreditFormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        id={id}
        t={t}
      />
    </Modal>
  );
};

const AffiliatesTransferCredit = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [Create, { isLoading }] = useAddAffiliatesCreditMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreates = async (values) => {
        delete values.password;
        delete values.password2;
        values.credit_type = "TR";
        setApiErrors([])
        
    try {
      values.id = id;
      const data = await Create(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t(`notisuccess.Credit Transferred Successfully`)}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
          {t("transfercredit.Transfer Credit")}
        </Button>
        <FormModal
            open={open}
            onCreate={onCreates}
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            id={id && id}
            t={t}
      />
    </>
  );
};

export default AffiliatesTransferCredit;