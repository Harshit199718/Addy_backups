import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Switch, InputNumber, Divider, Tag, Input, Col } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { productsCategory } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import { useAddRankRatesMutation } from '../../features/rank/rankRatesApiSlices';
import ReferenceRankField from '../../customField/ReferenceRankField';
import ReferenceProductTransferField from '../../customField/ReferenceProductTransferField';

const FormList = ({ onFormInstanceReady, apiErrors, record, site, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    const [product_category, selected_product] = [
        'product_category',
        'selected_product' 
      ].map(field => Form.useWatch(field, form));

    const initialValues = record && {
        rank: record.id,
        site: record.sites
      }

return (
  <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues}>
    <Col span={24}>
      <Form.Item
        name="product_category"
        label={t('common.Product Category')}
        validateStatus={apiErrors.product_category ? 'error' : ''}
        help={apiErrors.product_category}
        rules={[
          {
            required: true,
            message: t('requiredmessage.Please select product category'),
          },
        ]}
        hasFeedback
      >
        <SelectOption options={productsCategory(t)} width={"100%"} />
      </Form.Item>
      {product_category?.length > 0 && (
        <>
          <Divider>
            <Tag color="purple">{t('common.Rate for product')}</Tag>
          </Divider>
          <ReferenceProductTransferField name="selected_product" label={null} apiErrors={apiErrors && apiErrors.product} filterProp={{ sites: site, category: [product_category] }} targetKeys={selected_product && selected_product} />
        </>
      )}
      <Form.Item
        name="rate"
        label={t('common.Rate')}
        validateStatus={apiErrors.rate ? 'error' : ''}
        help={apiErrors.rate}
        rules={[
          {
            required: true,
            message: t('requiredmessage.Please input the rate'),
          },
        ]}
        hasFeedback
      >
        <InputNumber style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item 
        name="active"
        label={t('common.Active')}
      >
        <Switch checkedChildren={t('common.Active')} unCheckedChildren={t('common.Inactive')} defaultChecked />
      </Form.Item>
      <Form.Item 
        name="is_eztech"
        label={t('common.Is Eztech')}
      >
        <Switch checkedChildren={t('common.Yes')} unCheckedChildren={t('common.No')} defaultChecked />
      </Form.Item>
      <ReferenceRankField name={"rank"} label={t("common.Rank")} disabled mode='single'/>
      <Form.Item
        name="sequence"
        label={t('common.Sequence')}
        validateStatus={apiErrors.sequence ? 'error' : ''}
        help={apiErrors.sequence}
        rules={[
          {
            required: true,
            message: t('requiredmessage.Please input the sequence'),
          },
        ]}
        hasFeedback
      >
        <Input type="number" placeholder={t('requiredmessage.Please input the sequence')} />
      </Form.Item>
    </Col>
  </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, record, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Create Rank Rate")}
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
        width={1000}
        style={{ top: 20 }}
        record={record}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        record={record}
        site={record.sites}
        t={t}
      />
    </Modal>
  );
};

const CreateRankRate = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateRankRate, { isLoading }] = useAddRankRatesMutation();
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
      const data = await CreateRankRate(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Rank Rate Created Successfully')}`}));
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
      record={record}
      t={t}
        />
    </>
  );
};
export default CreateRankRate;