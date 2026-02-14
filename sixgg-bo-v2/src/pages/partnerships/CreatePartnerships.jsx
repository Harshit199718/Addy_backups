import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { useAddPartnershipsMutation } from '../../features/partnerships/partnershipsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <Col span={24} >
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.site} mode= "single" />
            <Form.Item
                name="name"
                label={t("common.Name")}
                validateStatus={apiErrors.name ? 'error' : ''}
                help={apiErrors.name}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the name')}`,
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Name")} />
            </Form.Item>
            <Form.Item
                name="description"
                label={t("common.Description")}
                validateStatus={apiErrors.description ? 'error' : ''}
                help={apiErrors.description}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the description')}`,
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.Description")} />
            </Form.Item>
            <ImageField name="logo" label={t("common.Logo")} apiErrors={apiErrors && apiErrors.logo} require={true} />
            <Form.Item
                name="url"
                label={t("common.URL")}
                validateStatus={apiErrors.url ? 'error' : ''}
                help={apiErrors.url}
                rules={[
                    {
                        required: true,
                        message: `${t('requiredmessage.Please input the url')}`,
                    },
                ]}
                hasFeedback
            >
                <Input placeholder={t("common.URL")} />
            </Form.Item>
        </Col>          
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("partnership.Create Partnerships")}
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

const CreatePartnerships = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreatePartnerships, { isLoading }] = useAddPartnershipsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.logo = await ConvertImage(values.logo) 
    values.sites = [values.sites]

    setApiErrors([])
    try {
      const data = await CreatePartnerships(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Partnership Created Successfully')}`}));
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
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            t={t}
        />
    </>
  );
};

export default CreatePartnerships;