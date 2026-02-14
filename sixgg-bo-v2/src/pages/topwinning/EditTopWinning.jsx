import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row, Col, Image } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useGetTopWinningIDQuery, useUpdateTopWinningMutation } from '../../features/topwinning/topWinningApiSlices';
import { useDispatch } from 'react-redux';
import { closeModal, notification, openModal } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import FormSpin from '../../components/formSpin';
import ReferenceProductField from '../../customField/ReferenceProductField';
import DateField from '../../customField/DateField';
import CustomRichTextField from '../../customField/CustomRichTextField';
import { dayjsDateTime } from '../../components/convertDate';

const TopWinningForm = ({ onFormInstanceReady, id, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [site, description] = [
        'site',
        'description',
      ].map(field => Form.useWatch(field, form));

    useEffect(() => {
        onFormInstanceReady(form);
    }, []);

    const { data: record, isLoading: recordLoading,} = useGetTopWinningIDQuery({ id: id });
    if(recordLoading){
        return <FormSpin loading={recordLoading}/>
      }

    const initialValues = record && {
    ...record,
    start_date: dayjsDateTime(record.start_date),
    end_date: dayjsDateTime(record.end_date),
    }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={initialValues} >
        <Col span={24} >
            <ReferenceSiteField name="site" apiErrors={apiErrors && apiErrors.site} mode= "single" />
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

const TopWinningFormModal = ({ open, onUpdate, onCancel, apiErrors, id, t }) => {
    const [formInstance, setFormInstance] = useState();

return (
    <Modal
        open={open}
        title={t("common.Update Top Winning")}
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
      <TopWinningForm
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

const EditTopWinning = ({ id, t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [UpdateTopWinning, { isLoading }] = useUpdateTopWinningMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])

    const onUpdate = async (values) => {
        if (Array.isArray(values.image)) {
            values.image = await ConvertImage(values.image)
        } else {
            delete values.image
        }

    setApiErrors([])

    try {
      values.id = id;
      const data = await UpdateTopWinning(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: t('notisuccess.Top Winning Updated Successfully')}));
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
        <TopWinningFormModal
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

export default EditTopWinning;