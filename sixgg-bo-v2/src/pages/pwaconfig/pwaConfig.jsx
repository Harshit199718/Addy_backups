import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Typography, Row, Col, Tag, Input, Switch, InputNumber } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import FormSpin from '../../components/formSpin';
import SelectSiteForm from '../../customToolbar/SelectSiteFrom';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';
import { useAddPWAConfigMutation, useGetPWAConfigListQuery, useUpdatePWAConfigMutation } from '../../features/pwaconfig/pwaConfigApiSlices';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import ImageField from '../../customField/ImageField';
import ConvertImage from '../../components/convertImage';

const { Title } = Typography;

const FormList = ({ apiErrors, onUpdate }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const isDarkMode = useSelector(state => state.general.isDarkMode);
    const [sites, setSites] = useState();
    const { 
        data: pwaconfig,
        isLoading: pwaconfigLoading, 
        isFetching,
        refetch
    } = useGetPWAConfigListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            sites: [sites]
        }
    },{
        // refetchOnFocus: true,
    });

    const initialValues =  
    pwaconfig?.list[0] ?
        {
            ...pwaconfig?.list[0],
            sites: [sites],
            is_create_new: false
        }
    :
        {
            sites: [sites],
            is_create_new: true
        }

    useEffect(() => {
        sites && form.resetFields(); 
    }, [initialValues, form]);

    useEffect(() => {
        refetch()
    }, [sites]);


    return (
        <div style={{ 
            width: '800px',
            margin: '0 auto', // Align center horizontally
            background: isDarkMode ? "black" : "white",
            padding: "16px", // Removed bottom padding
            borderRadius: "20px",
        }}>
            <SelectSiteForm mode={null} placeholder={t("common.Please select site first for PWA Configuration")} onChange={(value)=> setSites(value)}/>
            {isFetching ? <FormSpin loading={true}/>
            :
            sites && 
                <Form 
                    layout="vertical" 
                    form={form} 
                    initialValues={initialValues} 
                    onFinish={onUpdate} 
                    size='medium' 
                    style={{ background: isDarkMode ? "black" : "white" }}
                >
                    <Form.Item name="is_create_new" hidden>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="id" hidden>
                        <InputNumber />
                    </Form.Item>
                    <Divider>
                        <Title level={2} >{t('common.PWA Configuration')}</Title>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <ReferenceSiteField name="sites" label={t("common.Sites")} mode={null} disabled apiErrors={apiErrors && apiErrors.sites}/>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t('common.PWA Configuration')}</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <ImageField 
                                name="logo" 
                                label={t("common.Logo")} 
                                apiErrors={apiErrors && apiErrors.logo} 
                            />
                        </Col>
                        <Col span={6}>
                            <Form.Item
                                name="title"
                                label={t("common.Title")}
                            >
                                <Input placeholder={t("common.Title")} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="provider_name"
                                label={t("common.Provider Name")}
                            >
                                <Input placeholder={t("common.Provider Name")} />
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item
                                name="app_contain"
                                label={t("common.App Contain")}
                            >
                                <Input placeholder={t("common.App Contain")} />
                            </Form.Item>
                        </Col>
                    </Row>                       
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                name="rate"
                                label={`${t("common.Rating")} (0.00 - 5.00)`}
                            >
                                <Input placeholder={t("common.Rating")} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="review"
                                label={`${t("common.Review")} (1k - 1b)+`}
                            >
                                <Input placeholder={t("common.Review")} />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="download"
                                label={`${t("common.Download")} (1M+)`}
                            >
                                <Input placeholder={t("common.Download")} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <ImageField 
                                name="game_demo_image1" 
                                label={t("common.Game Demo Image 1")} 
                                apiErrors={apiErrors && apiErrors.game_demo_image1} 
                            />
                        </Col>
                        <Col span={8}>
                            <ImageField 
                                name="game_demo_image2" 
                                label={t("common.Game Demo Image 2")} 
                                apiErrors={apiErrors && apiErrors.game_demo_image2 } 
                            />
                        </Col>
                        <Col span={8}>
                            <ImageField 
                                name="game_demo_image3" 
                                label={t("common.Game Demo Image 3")} 
                                apiErrors={apiErrors && apiErrors.game_demo_image3 } 
                            />
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="about_this_description"
                                label={t("common.About This Description")}
                            >
                                <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} placeholder={t("common.About This Description")} />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="tag"
                                label={`${t("common.Tag")} ["tag1","tag2"]`}
                            >
                                <Input.TextArea autoSize={{ minRows: 4, maxRows: 4 }} placeholder={t("common.Tag")} />
                            </Form.Item>
                        </Col>
                    </Row>
                    {PermissionsAuth.checkPermissions('button', 'change_pwaconfig',
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: '100%' }}
                        >
                            {t('common.Save')}
                        </Button>
                    </Form.Item>
                    )}
                </Form>
            }
        </div>
    );
};

const PWAConfig = () => {
    const { t } = useTranslation()
    const [apiErrors, setApiErrors] = useState([])
    const [Create] = useAddPWAConfigMutation();
    const [Update] = useUpdatePWAConfigMutation();
    const dispatch = useDispatch()
    
    const onUpdate = async (values) => {
        const ImageField = [
            "logo",
            "game_demo_image1",
            "game_demo_image2",
            "game_demo_image3"
        ]

        const updateImagePromises = ImageField.map(async (field) => {
            if (values.hasOwnProperty(field)) {
                if (typeof values[field] === 'string' && values[field].startsWith('http')) {
                    delete values[field];
                } else {
                    try {
                        if(values && values[field] && values[field]?.length > 0){
                            values[field] = await ConvertImage(values[field])
                        } 
                    } catch (error) {
                        delete values[field];
                    }
                }
            } else {
                delete values[field];
            }
        });
        await Promise.all(updateImagePromises);

        setApiErrors([])
        try {
            if(values.is_create_new){
                const data = await Create(values).unwrap();
            } else {
                const data = await Update(values).unwrap();
            }
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.PWA Configuration Saved Successfully')}`}));
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };
    return (
        PermissionsAuth.checkPermissions('list', 'view_pwaconfig',
        <FormList
            apiErrors={apiErrors}
            onUpdate={onUpdate}
        />
    )
    )
};
export default PWAConfig;