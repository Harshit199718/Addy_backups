import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, Input, InputNumber, Row, Switch, Tag, Typography } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { dayjsDateTime, formattedDate } from '../../components/convertDate';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import FormSpin from '../../components/formSpin';
import SelectSiteForm from '../../customToolbar/SelectSiteFrom';
import DateField from '../../customField/DateField';
import PermissionsAuth from '../../components/permissionAuth';
import { useAddNamecheapConfigMutation, useGetNamecheapConfigListQuery, useUpdateNamecheapConfigMutation } from '../../features/namecheapconfig/nameCheapConfigApiSlices';
import { useTranslation } from 'react-i18next';
import NamecheapSetCustomDNS from './namecheapSetCustomDNS';

const { Title } = Typography;

const FormList = ({ apiErrors, onUpdate, t }) => {
    const [form] = Form.useForm();
    const isDarkMode = useSelector(state => state.general.isDarkMode);
    const [site, setSite] = useState();
    const { 
        data: namecheapconfig,
        isLoading: namecheapconfigLoading, 
        isFetching,
        refetch
    } = useGetNamecheapConfigListQuery({
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
    namecheapconfig?.list[0] ?
        {
            ...namecheapconfig?.list[0],
            sites: [site],
            is_create_new: false
        }
    :
        {
            sites: [site],
            is_create_new: true,
            api_url: "https://api.namecheap.com/xml.response",
            command: "namecheap.domains.dns.setCustom"
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
            {PermissionsAuth.checkPermissions('button', 'change_namecheapconfig',
                namecheapconfig?.list[0] && <NamecheapSetCustomDNS t={t} record={namecheapconfig?.list[0]} />
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
                        <Title level={2} >{t("namecheap.Namecheap Configuration")}</Title>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <ReferenceSiteField name="sites" mode={null} disabled apiErrors={apiErrors && apiErrors.sites}/>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t("namecheap.Namecheap")}</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <Form.Item
                                name="api_url"
                                label={t("namecheap.API URL")}
                                validateStatus={apiErrors.api_url ? 'error' : ''}
                                help={apiErrors.api_url}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the api url of the namecheap')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t('requiredmessage.Please input the api url of the namecheap')} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="api_key"
                                label={t("namecheap.API Key")}
                                validateStatus={apiErrors.api_key ? 'error' : ''}
                                help={apiErrors.api_key}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the api key of the namecheap')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t('requiredmessage.Please input the api key of the namecheap')} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="api_user"
                                label={t("namecheap.API User")}
                                validateStatus={apiErrors.api_user ? 'error' : ''}
                                help={apiErrors.api_user}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the api user of the namecheap')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t("requiredmessage.Please input the api user of the namecheap")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label={t("common.Username")}
                                validateStatus={apiErrors.username ? 'error' : ''}
                                help={apiErrors.username}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the username of the namecheap')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t('requiredmessage.Please input the username of the namecheap')} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={24}>
                            <Form.Item
                                name="command"
                                label={t("namecheap.Command (Namecheap Command)")}
                                validateStatus={apiErrors.command ? 'error' : ''}
                                help={apiErrors.command}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t('requiredmessage.Please input the command of the namecheap')}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input placeholder={t('requiredmessage.Please input the command of the namecheap')} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item name="is_create_new" hidden>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="id" hidden>
                        <InputNumber />
                    </Form.Item>
                    {PermissionsAuth.checkPermissions('button', 'change_namecheapconfig',
                    <Form.Item>
                        <Button 
                            type="primary" 
                            htmlType="submit" 
                            style={{ width: '100%' }}
                        >
                            {t("common.Save")}
                        </Button>
                    </Form.Item>
                    )}
                </Form>
            </>
            }
        </div>
    );
};

const NamecheapConfig = () => {
    const { t } = useTranslation();
    const [apiErrors, setApiErrors] = useState([])
    const [Create] = useAddNamecheapConfigMutation();
    const [Update] = useUpdateNamecheapConfigMutation();
    const dispatch = useDispatch()
    
    const onUpdate = async (values) => {
        setApiErrors([])
        try {
            if(values.is_create_new){
                const data = await Create(values).unwrap();
            } else {
                const data = await Update(values).unwrap();
            }
            dispatch(notification({notification_status: 'success', notification_message: `${t("namecheap.Namecheap")} ${t("common.Created Succesfully")}`}));
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };
    return (
        PermissionsAuth.checkPermissions('list', 'view_namecheapconfig',
        <FormList
            apiErrors={apiErrors}
            onUpdate={onUpdate}
            t={t}
        />
    )
    )
};
export default NamecheapConfig;