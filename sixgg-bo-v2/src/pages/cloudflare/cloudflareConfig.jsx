import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Switch, Tag, Typography } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import FormSpin from '../../components/formSpin';
import SelectSiteForm from '../../customToolbar/SelectSiteFrom';
import PermissionsAuth from '../../components/permissionAuth';
import { useAddCloudflareConfigMutation, useGetCloudflareConfigListQuery, useUpdateCloudflareConfigMutation } from '../../features/cloudflareconfig/cloudflareConfigApiSlices';
import { useTranslation } from 'react-i18next';
import CloudflareAddDomain from './cloudflareAddDomain';
import CloudflareAddDomainProject from './cloudflareAddDomainProject';

const { Title } = Typography;

const FormList = ({ apiErrors, onUpdate, t }) => {
    const [form] = Form.useForm();
    const isDarkMode = useSelector(state => state.general.isDarkMode);
    const [site, setSite] = useState();
    const { 
        data: cloudflareconfig,
        isLoading: cloudflareconfigLoading, 
        isFetching,
        refetch
    } = useGetCloudflareConfigListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            sites: [site]
        }
    },{
        // refetchOnFocus: true,
    });

    const initialValues =  
    cloudflareconfig?.list[0] ?
        {
            ...cloudflareconfig?.list[0],
            sites: [site],
            is_create_new: false
        }
    :
        {
            sites: [site],
            is_create_new: true,
            api_url: "https://api.cloudflare.com/client/v4"
        }

    useEffect(() => {
        site && form.resetFields(); 
    }, [initialValues, form]);

    useEffect(() => {
        refetch()
    }, [site]);


    return (
        <div style={{ 
            width: '800px',
            margin: '0 auto', // Align center horizontally
            background: isDarkMode ? "black" : "white",
            padding: "16px", // Removed bottom padding
            borderRadius: "20px",
        }}>

            <SelectSiteForm mode={null} placeholder={t("common.Sites")} onChange={(value)=> setSite(value)}/>
            {PermissionsAuth.checkPermissions('button', 'change_cloudflareconfig',
            cloudflareconfig?.list[0] && 
            <>
                <CloudflareAddDomain t={t} record={cloudflareconfig?.list[0]} />
                <CloudflareAddDomainProject t={t} record={cloudflareconfig?.list[0]} />
            </>
            )}
            {isFetching ? <FormSpin loading={true}/>
            :
            site && 
            <>
                <Form 
                    layout="vertical" 
                    form={form} 
                    initialValues={initialValues} 
                    onFinish={onUpdate} 
                    size='medium' 
                    style={{ background: isDarkMode ? "black" : "white" }}
                >
                    <Divider>
                        <Title level={2} >{t("cloudflare.Cloudflare Configuration")}</Title>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <ReferenceSiteField name="sites" mode={null} disabled apiErrors={apiErrors && apiErrors.sites}/>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t("cloudflare.Cloudflare")}</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="api_url"
                                label={t("common.API URL")}
                                validateStatus={apiErrors.api_url ? 'error' : ''}
                                help={apiErrors.api_url}

                                hasFeedback
                                >
                                <Input placeholder={t("common.API URL")} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t("cloudflare.Client Cloudflare")}</Tag>
                    </Divider>
                     <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="client_auth_email"
                                label={t("cloudflare.Cloudflare Email")}
                                validateStatus={apiErrors.client_auth_email ? 'error' : ''}
                                help={apiErrors.client_auth_email}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the email of the cloudflare!')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t("cloudflare.Cloudflare Email")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="client_auth_key"
                                label={t("cloudflare.Cloudflare Key")}
                                validateStatus={apiErrors.client_auth_key ? 'error' : ''}
                                help={apiErrors.client_auth_key}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the key of the cloudflare!')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t("cloudflare.Cloudflare Key")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="client_account_id"
                                label={t("common.Account ID")}
                                validateStatus={apiErrors.client_account_id ? 'error' : ''}
                                help={apiErrors.client_account_id}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the account id of the cloudflare!')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t("common.Account ID")} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="is_create_new" hidden>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="id" hidden>
                        <InputNumber />
                    </Form.Item>
                    {PermissionsAuth.checkPermissions('button', 'change_cloudflareconfig',
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: '100%' }}
                        >
                            Save
                        </Button>
                    </Form.Item>
                    )}
                </Form>
            </>
            }
        </div>
    );
};

const CloudflareConfig = () => {
    const { t } = useTranslation();
    const [apiErrors, setApiErrors] = useState([])
    const [Create] = useAddCloudflareConfigMutation();
    const [Update] = useUpdateCloudflareConfigMutation();
    const dispatch = useDispatch()
    
    const onUpdate = async (values) => {
        setApiErrors([])
        try {
            if(values.is_create_new){
                const data = await Create(values).unwrap();
            } else {
                const data = await Update(values).unwrap();
            }
            dispatch(notification({notification_status: 'success', notification_message: `${t("coudflare.Coudflare")} ${t("common.Created Succesfully")}`}));
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };
    return (
        PermissionsAuth.checkPermissions('list', 'view_cloudflareconfig',
        <FormList
            apiErrors={apiErrors}
            onUpdate={onUpdate}
            t={t}
        />
    )
    )
};
export default CloudflareConfig;