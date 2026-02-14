import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Col, Image } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import FormSpin from '../../components/formSpin';
import { useGetPartnershipsIDQuery, useUpdatePartnershipsMutation } from '../../features/partnerships/partnershipsApiSlices';

const PartnershipsForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading,} = useGetPartnershipsIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
      }

    const initialValues = record && {
    ...record
    }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
        <Col span={24} >
            <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites} mode={null} />
                <Col span={24}>
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
                        <Input placeholder={t("common.Sites")}/>
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
                    <ImageField name="logo" label={t("common.Logo")} apiErrors={apiErrors && apiErrors.logo} />
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
        </Col>      
    </Form>
  );
};

const PartnershipsFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("partnership.Update Partnerships")}
        okText={t("common.Update")}
        cancelText={t("common.Cancel")}
        okButtonProps={{
        autoFocus: true,
        }}
        onCancel={onCancel}
        width={1000}
        destroyOnClose
        style={{ top: 20 }}
        onOk={async () => {
        try {
          const values = await formInstance?.validateFields();

          onUpdate(values);
        } catch (error) {
        }
        }}
    >
      <PartnershipsForm
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

const EditPartnerships = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdatePartnerships, { isLoading }] = useUpdatePartnershipsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        if(typeof values.sites != "object"){
            values.sites = [values.sites]
        }

        if (Array.isArray(values.logo)) {
            values.logo = await ConvertImage(values.logo)
        } else {
            delete values.logo
        }

        setApiErrors([])

    try {
      values.id = id;
      const data = await UpdatePartnerships(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisucess.Partnership Updated Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
        <Button type="primary" onClick={() => setOpen(true)}>
            {t("common.Edit")}
        </Button>
        <PartnershipsFormModal
            open={open}
            onUpdate={onUpdate}
            onCancel={() => setOpen(false)}
            apiErrors={apiErrors}
            id={id && id}
            t={t}
        />
    </>
  );
};

export default EditPartnerships;