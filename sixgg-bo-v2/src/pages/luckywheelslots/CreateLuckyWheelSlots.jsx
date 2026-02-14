import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch, Row, Col } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useAddLuckyWheelSlotsMutation } from '../../features/luckywheelslots/luckyWheelSlotsApiSlices';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { luckyWheelSlotsBonusType, luckyWheelSlotsPriceType } from '../../customField/customOption';
import CustomRichTextField from '../../customField/CustomRichTextField';
import ColorPickerField from '../../customField/ColorPickerField'

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [terms_condition] = [
        'terms_condition',
    ].map(field => Form.useWatch(field, form));

    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

return (
    <Form layout="vertical" form={form} name="form_in_modal" >
        <Row gutter={[16, 16]}>
            <Col span={12} >
                <Row gutter={[16, 16]}>
                    <Col span={24}>                
                        <ReferenceSiteField name="sites" label={t("common.Sites")} apiErrors={apiErrors && apiErrors.sites}/>
                        <Form.Item 
                            name="is_active"
                            label={t("common.Active")}
                        >
                            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="price_type"
                            label={t("common.Price Type")}
                            validateStatus={apiErrors.price_type ? 'error' : ''}
                            help={apiErrors.price_type}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the price type')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select placeholder={t("common.Price Type")} options={luckyWheelSlotsPriceType(t)}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="bonus_type"
                            label={t("common.Bonus Type")}
                            validateStatus={apiErrors.bonus_type ? 'error' : ''}
                            help={apiErrors.bonus_type}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the bonus type')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select placeholder={t("common.Bonus Type")} options={luckyWheelSlotsBonusType(t)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="amount"
                            label={t("common.Amount")}
                            validateStatus={apiErrors.amount ? 'error' : ''}
                            help={apiErrors.amount}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input amount')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input type='number' placeholder={t("common.Amount")}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="probability"
                            label={t("common.Probability")}
                            validateStatus={apiErrors.probability ? 'error' : ''}
                            help={apiErrors.probability}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input probability')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input type='number' placeholder={t("common.Probability")}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Col>
            <Col span={12} >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="description"
                            label={t("common.Description")}
                            validateStatus={apiErrors.description ? 'error' : ''}
                            help={apiErrors.description}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input description')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input type='text' placeholder={t("common.Description")} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="limit"
                            label={t("common.Limit")}
                            validateStatus={apiErrors.limit ? 'error' : ''}
                            help={apiErrors.limit}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input limit')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input type="number" placeholder={t("common.Limit")} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>                
                        <Form.Item
                            name="color"
                            label={t("common.Slot Color")}
                            validateStatus={apiErrors.color ? 'error' : ''}
                            help={apiErrors.color}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select slot color')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <ColorPickerField name='color' placeholder={t("common.Slot Color")} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <ImageField name="image" label={t("common.Image")} apiErrors={apiErrors && apiErrors.image} require={false} />
                    </Col>
                </Row> 
            </Col>   
            <Col span={24}>
                <CustomRichTextField name="terms_condition" label={t('common.Term & Condition')} value={terms_condition} />
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
        title={t("luckywheelslot.Create Lucky Slots")}
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
        width={1300}
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

const CreateLuckyWheelSlots = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateLuckyWheelSlots, { isLoading }] = useAddLuckyWheelSlotsMutation();
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
      const data = await CreateLuckyWheelSlots(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Lucky Wheel Slot Created Successfully')}`}));
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

export default CreateLuckyWheelSlots;