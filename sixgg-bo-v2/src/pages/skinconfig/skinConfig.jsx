import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Switch, Tabs, Layout, Typography } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification } from '../../features/modalSlice';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import FormSpin from '../../components/formSpin';
import SelectSiteForm from '../../customToolbar/SelectSiteFrom';
import { useAddSkinConfigMutation, useGetSkinConfigListQuery, useLazyGetSkinConfigListQuery, useUpdateSkinConfigMutation } from '../../features/skinconfig/skinConfigApiSlices';
import { mainTab } from './skinConfigTab';
import skinConfigImageField from './skinConfigImageField'
import skinConfigArrayField from './skinConfigArrayField';
import { setGlobalLoading } from '../../features/generalSlice';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const FormList = ({ apiErrors, onUpdate, onFinishFailed }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const watchValue = form
    const [site, setSite] = useState();

    const {
        data: skinconfig,
        isLoading: skinconfigLoading,
        isFetching,
        refetch
    } = useGetSkinConfigListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            sites: [site]
        }
    },{
        refetchOnFocus: false,
    });

    const initialValues =
    skinconfig?.list[0] ?
        (() => {
            const skinConfig = skinconfig.list[0];
            const result = {
                ...skinConfig,
                sites: [site],
                is_create_new: false,
            };

            skinConfigArrayField.forEach(field => {
                if (skinConfig[field]) {
                    if (field === 'deposit_amount_list') {
                        result[field] = skinConfig[field].replace(/[{}]/g, '').split(',');
                    } else {
                        result[field] = skinConfig[field].split(',');
                    }
                } else {
                    result[field] = [];
                }
            });

            return result;
        })()
        :
        {
            sites: [site],
            is_create_new: true
        }

    useEffect(() => {
        site && form.resetFields();
    }, [initialValues, form]);

    useEffect(() => {
        refetch()
    }, [site]);
    
    useEffect(() => {
        if(isFetching){
            dispatch(setGlobalLoading({ isLoading: true }));
        } else {
            dispatch(setGlobalLoading({ isLoading: false }));
        }
    }, [isFetching])

    return (
        <Layout style={{
            maxWidth: '1400px',
            margin: '0 auto', // Align center horizontally
            padding: "16px", // Removed bottom padding
            borderRadius: "20px",
        }}>
            <SelectSiteForm mode={null} placeholder={t("skinconfig.Please select site first for skin config")} onChange={(value)=> setSite(value)} />
            <Form layout="vertical" form={form} initialValues={initialValues} onFinish={onUpdate} onFinishFailed={onFinishFailed} size='medium' disabled={!site}>
                <Divider>
                    <Title level={5} >{t("skinconfig.Skin Configuration")}</Title>
                </Divider>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <ReferenceSiteField name="sites" mode={null} disabled apiErrors={apiErrors && apiErrors.site} hidden/>
                    </Col>
                </Row>
                <Tabs
                    tabPosition="left"
                    items={mainTab(apiErrors, initialValues, watchValue, t)}
                />
                <Form.Item name="is_create_new" hidden>
                    <Switch />
                </Form.Item>
                <Form.Item name="id" hidden>
                    <InputNumber />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', marginTop: "10px" }}>
                        {t("common.Save")}
                    </Button>
                </Form.Item>
            </Form>
        </Layout>
    );
};

const SkinConfig = () => {
    const [apiErrors, setApiErrors] = useState([])
    const [Create] = useAddSkinConfigMutation();
    const [Update] = useUpdateSkinConfigMutation();
    const [GetSkinConfigInitial, { isFetching }] = useLazyGetSkinConfigListQuery()

    const dispatch = useDispatch()
    const onFinishFailed = (error) => {
        dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
    }
    const onUpdate = async (values) => {
        dispatch(setGlobalLoading({ isLoading: true }));
        try {
        if (!values.is_create_new) {
            await GetSkinConfigInitial({
                pagination: {
                    startPageRow: 0,
                    endPageRow: 100
                },
                filters : {
                    sites: values.sites
                }
            })
            .unwrap()
            .then((skinconfig) =>  {
                const skinConfig = skinconfig?.list[0] || {};

                const result = {
                    ...skinConfig,
                };

                skinConfigArrayField.forEach(field => {
                    if (skinConfig[field]) {
                        if (field === 'deposit_amount_list') {
                            result[field] = skinConfig[field].replace(/[{}]/g, '').split(',');
                        } else {
                            result[field] = skinConfig[field].split(',');
                        }
                    } else {
                        result[field] = [];
                    }
                });
                const finalResult = {
                    ...result,
                    ...values
                }
                return finalResult;

                // return {
                //     ...skinconfig?.list[0],
                //     available_paymentgateway_providers: skinconfig?.list[0].available_paymentgateway_providers ? skinconfig?.list[0].available_paymentgateway_providers.split(",") : [],
                //     available_rewards: skinconfig?.list[0].available_rewards ? skinconfig?.list[0].available_rewards.split(",") : [],
                //     available_ewallets: skinconfig?.list[0].available_ewallets ? skinconfig?.list[0].available_ewallets.split(",") : [],
                //     available_languages: skinconfig?.list[0].available_languages ? skinconfig?.list[0].available_languages.split(",") : [],
                //     deposit_amount_list: skinconfig?.list[0].deposit_amount_list ? skinconfig.list[0].deposit_amount_list.replace(/[{}]/g, '').split(",") : [],
                //     ...values
                // };
            })
            .then(updatedValues => {
                values = updatedValues;
            });
        }

        const formData = new FormData();
        formData.append("id", values.id);
        formData.append("sites", values.sites);
        // Images
        const updateImagePromises = skinConfigImageField.map(async (field) => {
            if (values.hasOwnProperty(field)) {
                if (typeof values[field] === 'string' && values[field].startsWith('http')) {
                    delete values[field];
                } else {
                    try {
                        if(values && values[field] && values[field]?.length > 0){
                            formData.append(field, values[field][0]?.originFileObj);
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

        // Array Process
        const updateArrayPromises = skinConfigArrayField.map(async (field) => {
            if (values.hasOwnProperty(field)) {
                formData.append(field, values[field].join(","));
            } else {
                formData.append(field, "");
            }
        });
        await Promise.all(updateArrayPromises);

        // Normal Input
        Object.entries(values).map(([key, value]) => {
            if (!formData.has(key)) {
                if (typeof value == "string" || typeof value == "boolean" || typeof value == "number") {
                    formData.append(key, value.toString());
                } else if (value?.file) {
                    formData.append(key, value?.file?.originFileObj);
                } else {
                    formData.append(key, "");
                }
            }
        })

        setApiErrors([])

            if(values.is_create_new){
                const data = await Create(values).unwrap();
            } else {
                const data = await Update({ skinconfig: formData, id: values.id }).unwrap();
            }
            dispatch(setGlobalLoading({ isLoading: false }));
            dispatch(notification({notification_status: 'success', notification_message: 'Skin Config saved Successfully'}));
        } catch (error) {
            dispatch(setGlobalLoading({ isLoading: false }));
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };
    return (
        PermissionsAuth.checkPermissions('list', 'view_skinconfig',
        <FormList
        apiErrors={apiErrors}
        onUpdate={onUpdate}
        onFinishFailed={onFinishFailed}
        />
        )
    )
};
export default SkinConfig;