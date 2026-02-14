import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddTopWinningMutation } from '../../features/topwinning/topWinningApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import DateField from '../../customField/DateField';
import CustomRichTextField from '../../customField/CustomRichTextField';
import ReferenceProductField from '../../customField/ReferenceProductField';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [site, description] = [
        'site',
        'description',
    ].map(field => Form.useWatch(field, form));
    
    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    const initialValues = {
        credit_type: "CA",
        urltype : 'DEFAULT',
        }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={ initialValues } >
        <Col span={24} >
            <ReferenceSiteField name="site" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.site} mode= "single" />
            {site && site.length != 0  && 
                <>
                <Col span={24}>
                    <Form.Item
                        name="title"
                        label={t("common.Title")}
                        validateStatus={apiErrors.title ? 'error' : ''}
                        help={apiErrors.title}
                        rules={[
                            {
                                required: true,
                                message: t('requiredmessage.Please input the title'),
                            },
                        ]}
                        hasFeedback
                    >
                        <Input placeholder={t("common.Title")} />
                    </Form.Item>
                    <Form.Item
                        name="sequence"
                        label={t("common.Sequence")}
                        validateStatus={apiErrors.sequence ? 'error' : ''}
                        help={apiErrors.sequence}
                        hasFeedback
                    >
                        <Input type="number" placeholder={t("common.Sequence")} />
                    </Form.Item>
                    <ReferenceProductField name="product" label={t("common.Product")} apiErrors={apiErrors && apiErrors.product} />
                    <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image} require={true} />
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <DateField name="start_date" label={t("common.Start Date")} apiErrors={apiErrors && apiErrors.start_date} />
                        </Col>
                        <Col span={12}>
                            <DateField name="end_date" label={t("common.End Date")} apiErrors={apiErrors && apiErrors.end_date} />
                        </Col>
                    </Row>
                </Col>
                <Col span={24}>
                    <CustomRichTextField name="description" label={t("common.Description")} value={description}/>
                </Col>
                </>
            }
        </Col>          
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
        open={open}
        title={t("common.Create Top Winning")}
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

const CreateTopWinning = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateTopWinning, { isLoading }] = useAddTopWinningMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.image = await ConvertImage(values.image) 

    setApiErrors([])
    try {
      const data = await CreateTopWinning(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Top Winning Created Successfully')}));
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

export default CreateTopWinning;