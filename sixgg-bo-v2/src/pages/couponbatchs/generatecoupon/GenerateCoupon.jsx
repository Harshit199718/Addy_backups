import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, InputNumber } from 'antd';
import errorField from '../../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../../features/modalSlice';
import { useAddIssueCouponMutation, useGetCouponBatchsIDQuery } from '../../../features/couponbatchs/couponBatchsApiSlices';
import FormSpin from '../../../components/formSpin';

const GenerateCouponFormList = ({ onFormInstanceReady, apiErrors, id, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  const { data: record, isLoading: recordLoading,} = useGetCouponBatchsIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
    }

  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <Form.Item
            name="name"
            label={t("common.Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            hasFeedback
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="prefix"
            label={t("couponbatch.Prefix")}
            validateStatus={apiErrors.prefix ? 'error' : ''}
            help={apiErrors.prefix}
            hasFeedback
        >
            <Input disabled />
        </Form.Item>
        <Form.Item
            name="issue_quantity"
            label={t("couponbatch.Quantity")}
            validateStatus={apiErrors.issue_quantity ? 'error' : ''}
            help={apiErrors.issue_quantity}
            rules={[
            {
                required: true,
                message: `${t('requiredmessage.Please input the quantity')}`,
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder={t("couponbatch.Quantity")} />
        </Form.Item>
        {/* <Form.Item
            name="min_amount_set"
            label="Min Amount Set"
            validateStatus={apiErrors.min_amount_set ? 'error' : ''}
            help={apiErrors.min_amount_set}
            rules={[
            {
                required: true,
                message: 'Please input the min amount set',
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder="Please input the min amount set" />
        </Form.Item>
        <Form.Item
            name="max_amount_set"
            label="Max Amount Set"
            validateStatus={apiErrors.max_amount_set ? 'error' : ''}
            help={apiErrors.max_amount_set}
            rules={[
            {
                required: true,
                message: 'Please input the max amount set',
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder="Please input the max amount set" />
        </Form.Item> */}
        <Form.Item
            name="total_amount_set"
            label={t("couponbatch.Total Amount Set")}
            validateStatus={apiErrors.total_amount_set ? 'error' : ''}
            help={apiErrors.total_amount_set}
            rules={[
            {
                required: true,
                message: `${t("requiredmessage.Please input the total amount set")}`,
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder={t("couponbatch.Total Amount Set")} />
        </Form.Item>
    </Form>
  );
};

const GenerateCouponFormModal = ({ open, onCreate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("couponbatch.Generate Coupon")}
        okText={t("common.Save")}
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
      <GenerateCouponFormList
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

const GenerateCoupon = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Create, { isLoading }] = useAddIssueCouponMutation();
  const dispatch = useDispatch()

  useEffect(() => {
      if(open){
      dispatch(openModal());
      } else {
      dispatch(closeModal());
      }
  },[open])

  const onCreates = async (values) => {
      setApiErrors([])
      
  try {
    values.id = id;
    const data = await Create(values).unwrap();
    dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Coupon Generated Successfully")}`}));
    setOpen(false);
  } catch (error) {
    dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    setApiErrors(errorField(error));
  }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("couponbatch.Generate Coupon")}
      </Button>
      <GenerateCouponFormModal
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

export default GenerateCoupon;