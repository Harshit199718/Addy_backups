import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, InputNumber } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { useAddCouponBatchsMutation } from '../../features/couponbatchs/couponBatchsApiSlices';
import ReferencePromotionField from '../../customField/ReferencePromotionField';
import ReferenceSiteField from '../../customField/ReferenceSiteField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const [site, total_amount_set, amount_set, issue_quantity] = [
        'site',
        'total_amount_set',
        'amount_set',
        'issue_quantity',
      ].map(field => Form.useWatch(field, form));
  
      useEffect(() => {
        const excludeFields = ['site'];
        const formFields = Object.keys(form.getFieldsValue());
        formFields.forEach(fieldName => {
          if (!excludeFields.includes(fieldName)) {
            form.resetFields([fieldName]);
          }
        });
      }, [site]);

    useEffect(() => {
        if(issue_quantity && amount_set){
            form.setFieldsValue({
                total_amount_set: issue_quantity * amount_set,
            });
        }
    }, [amount_set, issue_quantity]);
    
return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <ReferenceSiteField 
            name="site" 
            label={t("common.Sites")}
            mode={null}
        />
        <ReferencePromotionField 
            name="promotion" 
            label={t('common.Promotion')}
            isRequired={true} 
            filterProp={{ sites: [site], q: "coupon" }}
        />
        <Form.Item
            name="name"
            label={t("common.Name")}
            validateStatus={apiErrors.name ? 'error' : ''}
            help={apiErrors.name}
            rules={[
            {
                required: true,
                message: `${t("requiredmessage.Please input the name")}`,
            },
            ]}
            hasFeedback
        >
            <Input placeholder={t("common.Name")} />
        </Form.Item>
        <Form.Item
            name="prefix"
            label={t("couponbatch.Prefix")}
            validateStatus={apiErrors.prefix ? 'error' : ''}
            help={apiErrors.prefix}
            rules={[
                {
                    required: true,
                    message: `${t("requiredmessage.Please input the prefix")}`,
                },
                ]}
            hasFeedback
        >
            <Input placeholder={t("couponbatch.Prefix")} />
        </Form.Item>
        <Form.Item
            name="issue_quantity"
            label={t("couponbatch.Quantity")}
            validateStatus={apiErrors.issue_quantity ? 'error' : ''}
            help={apiErrors.issue_quantity}
            rules={[
            {
                required: true,
                message:`${t("requiredmessage.Please input the quantity")}`,
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder={t("couponbatch.Quantity")} />
        </Form.Item>
        <Form.Item
            name="amount_set"
            label={t("couponbatch.Amount (Per Coupon)")}
            validateStatus={apiErrors.amount_set ? 'error' : ''}
            help={apiErrors.amount_set}
            rules={[
            {
                required: true,
                message: `${t("requiredmessage.Please input the amount (per coupon)")}`,
            },
            ]}
            hasFeedback
        >
            <InputNumber style={{ width: '100%' }} placeholder={t("couponbatch.Amount (Per Coupon)")} />
        </Form.Item>
        <Form.Item
            name="total_amount_set"
            label={t("couponbatch.Total Amount (Quantity * Amount)")}
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
            <InputNumber disabled={issue_quantity == null || amount_set == null} style={{ width: '100%' }} placeholder={t("couponbatch.Total Amount (Quantity * Amount)")} />
        </Form.Item>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("couponbatch.Create Coupon Batch")}
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

const CreateCouponBatchs = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateCouponBatchs, { isLoading }] = useAddCouponBatchsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.site = values.site
    setApiErrors([])

    try {
      const data = await CreateCouponBatchs(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Coupon Batch Created Succesfully")}`}));
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

export default CreateCouponBatchs;