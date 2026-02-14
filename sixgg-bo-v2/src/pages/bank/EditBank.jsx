import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import { useGetBanksIDQuery, useUpdateBankMutation } from '../../features/bank/banksApiSlices';
import ImageField from '../../customField/ImageField';
import FormSpin from '../../components/formSpin';
import ConvertImage from '../../components/convertImage';
import { bankType } from '../../customField/customOption';

const FormList = ({ onFormInstanceReady, id, apiErrors, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  const { 
    data: record,
    isLoading: recordLoading,
  } = useGetBanksIDQuery({ id: id });

  if(recordLoading){
    return <FormSpin loading={recordLoading}/>
  }
  
  return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={record && record} >
        <Form.Item
          name="type"
          label={t("bank.Bank Type")}
          validateStatus={apiErrors.type ? 'error' : ''}
          help={apiErrors.type}
          rules={[
            {
                required: true,
                message: `${t("bank.Bank Type")} ${t("common.Is Required")}`,
            },
          ]}
          hasFeedback
        >
            <Select
              placeholder={t("bank.Bank Type")}
              options={bankType(t)}
            />
        </Form.Item>
        <Form.Item
          name="code"
          label={t("bank.Bank Code")}
          validateStatus={apiErrors.code ? 'error' : ''}
          help={apiErrors.code}
          rules={[
            {
                required: true,
                message: `${t("bank.Bank Code")} ${t("common.Is Required")}`,
            },
          ]}
          hasFeedback
        >
            <Input placeholder={t("bank.Bank Code")} />
        </Form.Item>
        <Form.Item
          name="name"
          label={t("bank.Bank Name")}
          validateStatus={apiErrors.name ? 'error' : ''}
          help={apiErrors.name}
          rules={[
            {
                required: true,
                message: `${t("bank.Bank Name")} ${t("common.Is Required")}`,
            },
          ]}
          hasFeedback
        >
            <Input placeholder={t("bank.Bank Name")} />
        </Form.Item>
        <Form.Item
          name="sequence"
          label={t("common.Sequence")}
          validateStatus={apiErrors.sequence ? 'error' : ''}
          help={apiErrors.sequence}
          rules={[
            {
                required: true,
                message: `${t("common.Sequence")} ${t("common.Is Required")}`,
            },
          ]}
          hasFeedback
        >
          <InputNumber style={{ width: '100%' }} placeholder={t("common.Sequence")} min={0}/>
        </Form.Item>
        <ImageField name="icon" label={t("common.Icon")} apiErrors={apiErrors && apiErrors.icon} require={false}/>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item 
              name="active"
              label={t("common.Active / Inactive")}
            >
              <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item 
              name="show_in_fe"
              label={t("bank.Show in FE / Hide In FE")}
            >
              <Switch checkedChildren={t("bank.Show in FE")} unCheckedChildren={t("bank.Hide In FE")} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
  );
};
const FormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={`${t("common.Update")} ${t("bank.Bank")}`}
      okText={t("common.Update")}
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
        id={id}
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const EditBank = ({ id, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Update, { isLoading }] = useUpdateBankMutation();
  
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])

  const onUpdate = async (values) => {
    if (Array.isArray(values.icon)) {
      values.icon = await ConvertImage(values.icon)
    } else {
      delete values.icon
    }
    
    setApiErrors([])
    try {
      values.id = id;
      const data = await Update(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t("notisuccess.Bank Updated Succesfully")}`}));

      setOpen(false);
    } catch (error) {
      setApiErrors(errorField(error));
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    }
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("common.Edit")}
      </Button>
      <FormModal
        open={open}
        onUpdate={onUpdate}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        id={id && id}
        t={t}
      />
    </>
  );
};
export default EditBank;