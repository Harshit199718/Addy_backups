import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Select, Switch, Row, Col, Divider, Tag } from 'antd';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { openModal, closeModal, notification } from '../../features/modalSlice';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';
import { productsLaunchType, productsCategory, productURLType, productCreditType } from '../../customField/customOption';
import { useAddProductsMutation } from '../../features/products/productsApiSlices';

const FormList = ({ onFormInstanceReady, apiErrors, t }) => {
    const [form] = Form.useForm();
    const [ltype] = [
        'ltype',
    ].map(field => Form.useWatch(field, form));

    useEffect(() => {
        onFormInstanceReady(form);
    }, [form]);

    const initialValues = {
        credit_type: "CA",
        urltype : "DEFAULT",
      }

return (
    <Form layout="vertical" form={form} name="form_in_modal" initialValues={ initialValues } >
        <Row gutter={[16, 16]}>
            <Col span={12} >
                <Row gutter={[16, 16]}>
                    <Col span={12}>                
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
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="module"
                            label={t("common.Module")}
                            validateStatus={apiErrors.module ? 'error' : ''}
                            help={apiErrors.module}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input module')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input 
                                placeholder={t("common.Module")}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="ltype"
                            label={t("common.Launch Type")}
                            validateStatus={apiErrors.ltype ? 'error' : ''}
                            help={apiErrors.ltype}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the ltype')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select 
                                placeholder={t("common.Launch Type")}
                                options={productsLaunchType(t)}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                    <Form.Item
                            name="category"
                            label={t("common.Category")}
                            validateStatus={apiErrors.category ? 'error' : ''}
                            help={apiErrors.category}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the category')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select placeholder={t("common.Category")} options={productsCategory(t)} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="urltype"
                            label={t("common.URL Type")}
                            validateStatus={apiErrors.urltype ? 'error' : ''}
                            help={apiErrors.urltype}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the url type')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select 
                                placeholder={t("common.URL Type")}
                                options={productURLType(t)} 
                                onChange={(value) => setshowEasyToGo123(value === 'DEFAULT')}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="credit_type"
                            label={t("common.Credit Type")}
                            validateStatus={apiErrors.credit_type ? 'error' : ''}
                            help={apiErrors.credit_type}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please select the credit type')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Select placeholder={t("common.Credit Type")} options={productCreditType(t)}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider>
                    <Tag color="blue">EasyToGo123</Tag>
                </Divider>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="ptype"
                            label={t("common.Type")}
                            validateStatus={apiErrors.ptype ? 'error' : ''}
                            help={apiErrors.ptype}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input the type')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder={t("common.Type")} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="pcode"
                            label={t("common.Code")}
                            validateStatus={apiErrors.pcode ? 'error' : ''}
                            help={apiErrors.pcode}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input the code')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input type='number' placeholder={t("common.Code")} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={6}>
                        <Form.Item
                            name="sequence"
                            label={t("common.Sequence")}
                            validateStatus={apiErrors.sequence ? 'error' : ''}
                            help={apiErrors.sequence}
                            hasFeedback
                        >
                            <Input type="number" placeholder={t("common.Sequence")} />
                    </Form.Item>
                    </Col>
                    <Col span={6}>                
                        <Form.Item 
                            name="active"
                            label={t("common.Active")}
                        >
                            <Switch checkedChildren={t("common.Active")} unCheckedChildren={t("common.Inactive")} defaultChecked />
                    </Form.Item>
                    </Col>
                    <Col span={6}>                
                        <Form.Item 
                            name="is_live"
                            label={t("common.Live")}
                        >
                            <Switch checkedChildren={t("common.Live")} unCheckedChildren={t("common.Not Live")} defaultChecked />
                    </Form.Item>
                    </Col>
                    <Col span={6}>                
                        <Form.Item 
                            name="featured"
                            label={t("common.Featured")}
                        >
                            <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off" )}/>
                        </Form.Item>
                    </Col>
                </Row>
                {(ltype == 'app') && (
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item
                            name="android_dl_link"
                            label={t("common.Android Download Link")}
                            validateStatus={apiErrors.android_dl_link ? 'error' : ''}
                            help={apiErrors.android_dl_link}
                            hasFeedback
                        >
                            <Input placeholder={t("requiredmessage.Please input the android download link")} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item
                            name="ios_dl_link"
                            label={t("common.IOS Download Link")}
                            validateStatus={apiErrors.ios_dl_link ? 'error' : ''}
                            help={apiErrors.ios_dl_link}
                            hasFeedback
                        >
                            <Input placeholder={t("common.IOS Download Link")} />
                        </Form.Item>
                    </Col>
                </Row>
                )}
                <ReferenceSiteField name="sites" apiErrors={apiErrors && apiErrors.sites}/>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <ImageField name="image_mobile" label={t("common.Product Image")} apiErrors={apiErrors && apiErrors.image_mobile} require={true}/>
                    </Col>
                    <Col span={12}>
                        <ImageField name="image_feature" label={t("common.Feature Image")} apiErrors={apiErrors && apiErrors.image_feature} require={false}/>    
                    </Col>
                </Row>
            </Col>
            <Col span={12} >
                <Row gutter={[16, 16]}>
                    <Col span={14}>                
                        <Form.Item
                            name="min_bet"
                            label={t("common.Min Bet")}
                            validateStatus={apiErrors.min_bet ? 'error' : ''}
                            help={apiErrors.min_bet}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input min bet')}`,
                            },
                            ]}
                            hasFeedback
                        >
                            <Input placeholder={t("common.Min Bet")} />
                        </Form.Item>
                    </Col>
                    <Col span={10}>  
                        <Form.Item 
                            name="enabled_off_product"
                            label={t("common.Enabled Off Product Auto")}
                        >
                            <Switch checkedChildren={t("common.Enable")} unCheckedChildren={t("common.Disable")} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>                
                        <Form.Item
                            name="error_count_limit"
                            label={t("common.Error Count Limit")}
                            validateStatus={apiErrors.error_count_limit ? 'error' : ''}
                            help={apiErrors.error_count_limit}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input error count limit')}`,
                            },
                            ]}
                            hasFeedback
                            style={{ marginTop: '-17px' }} 
                        >
                            <Input type="number" placeholder={t("common.Error Count Limit")} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>                
                        <Form.Item
                            name="interval_in_minutes"
                            label={t("common.Interval in minutes")}
                            validateStatus={apiErrors.interval_in_minutes ? 'error' : ''}
                            help={apiErrors.interval_in_minutes}
                            rules={[
                            {
                                required: true,
                                message: `${t('requiredmessage.Please input interval in minutes')}`,
                            },
                            ]}
                            hasFeedback
                            style={{ marginTop: '-15px' }} 
                        >
                            <Input type="number" placeholder={t("common.Interval in minutes")} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item 
                            name="is_gamelist"
                            label={t("common.Is Game List")}
                        >
                            <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off")} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>                
                        <Form.Item 
                            name="is_launch_in_site"
                            label={t("common.Is Launch in Site")}
                        >
                            <Switch checkedChildren={t("common.On")} unCheckedChildren={t("common.Off")} />
                        </Form.Item>
                    </Col>
                </Row> 
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
        title={t("common.Create Product")}
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

const CreateProducts = ({ t }) => {
    const [open, setOpen] = useState(false);
    const [apiErrors, setApiErrors] = useState([])
    const [CreateProducts, { isLoading }] = useAddProductsMutation();
    const dispatch = useDispatch()

    useEffect(() => {
        if(open){
        dispatch(openModal());
        } else {
        dispatch(closeModal());
        }
    },[open])
  
    const onCreate = async (values) => {
    values.image_mobile = await ConvertImage(values.image_mobile) 
    if(values.image_feature){
        values.image_feature = await ConvertImage(values.image_feature)
    }

    setApiErrors([])
    try {
      const data = await CreateProducts(values).unwrap();
      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Product Created Successfully')}`}));
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

export default CreateProducts;