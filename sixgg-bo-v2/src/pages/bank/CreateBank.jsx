import React, { useState, useEffect } from 'react';
import { Button, Col, Form, Input, InputNumber, Modal, Row, Select, Switch } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../features/modalSlice';
import { useAddBankMutation } from '../../features/bank/banksApiSlices';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { bankType } from '../../customField/customOption';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

  return (
    <Form layout="vertical" form={form} name="form_in_modal">
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
      <ImageField name="icon" label={t("common.Icon")} apiErrors={apiErrors && apiErrors.icon} require={true}/>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item 
            name="active"
            label={t("common.Active / Inactive")}
          >
            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item 
            name="show_in_fe"
            label={t("bank.Show in FE / Hide In FE")}
          >
            <Switch checkedChildren={t("bank.Show in FE")} unCheckedChildren={t("bank.Hide In FE")} defaultChecked />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={`${t("common.Create")} ${t("bank.Bank")}`}
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
const CreateBank = ({ t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [Create, { isLoading }] = useAddBankMutation();
  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModal());
    } else {
      dispatch(closeModal());
    }
  },[open])
  
  const onCreate = async (values) => {
    values.icon = await ConvertImage(values.icon)
    setApiErrors([])

    try {
      const data = await Create(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message:  `${t("notisuccess.Bank Created Succesfully")}`}));
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
export default CreateBank;