import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Form, InputNumber, Row, Switch, Tag, Typography } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification } from '../../features/modalSlice';
import { dayjsDateTime, formattedDate } from '../../components/convertDate';
import { useAddDailyCheckInMutation, useGetDailyCheckListQuery, useUpdateDailyCheckInMutation } from '../../features/dailycheckin/dailyCheckInApiSlices';
import ReferenceSiteField from '../../customField/ReferenceSiteField';
import FormSpin from '../../components/formSpin';
import SelectSiteForm from '../../customToolbar/SelectSiteFrom';
import DateField from '../../customField/DateField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const FormList = ({ apiErrors, onUpdate }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const isDarkMode = useSelector(state => state.general.isDarkMode);
    const [site, setSite] = useState();
    const { 
        data: dailycheckin,
        isLoading: dailycheckinLoading, 
        isFetching,
        refetch
    } = useGetDailyCheckListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            sites: [site]
        }
    },{
        refetchOnFocus: true,
    });

    const initialValues =  
    dailycheckin?.list[0] ?
        {
            ...dailycheckin?.list[0],
            site: site,
            lucky_wheel_check_transaction_date: dayjsDateTime(dailycheckin?.list[0].lucky_wheel_check_transaction_date),
            is_create_new: false
        }
    :
        {
            site: site,
            is_create_new: true
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
            <SelectSiteForm mode={null} placeholder={t("dailycheckin.Please select site first for daily check in")} onChange={(value)=> setSite(value)}/>
            {isFetching ? <FormSpin loading={true}/>
            :
            site && 
                <Form 
                    layout="vertical" 
                    form={form} 
                    initialValues={initialValues} 
                    onFinish={onUpdate} 
                    size='medium' 
                    style={{ background: isDarkMode ? "black" : "white" }}
                >
                    <Divider>
                        <Title level={2} >{t('dailycheckin.Daily Checkin Configuration')}</Title>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <ReferenceSiteField name="site" label={t("common.Sites")} mode={null} disabled apiErrors={apiErrors && apiErrors.site}/>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t('dailycheckin.Daily Check in')}</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                name="min_token"
                                label={t("dailycheckin.Min Reward Token")}
                                validateStatus={apiErrors.min_token ? 'error' : ''}
                                help={apiErrors.min_token}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input min reward token")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Min Reward Token")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="max_token"
                                label={t("dailycheckin.Max Reward Token")}
                                validateStatus={apiErrors.max_token ? 'error' : ''}
                                help={apiErrors.max_token}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input max reward token")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Max Reward Token")} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                name="daily_checkin_without_deposit"
                                label={t("dailycheckin.Is Deposit Needed")}
                                >
                                <Switch 
                                    checkedChildren={t("dailycheckin.Can Checkin Without Deposit" )}
                                    unCheckedChildren={t("dailycheckin.Cannot Checkin Without Deposit")} 
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="min_deposit_amount_checkin"
                                label={t("dailycheckin.Min Deposit Amount")}
                                validateStatus={apiErrors.min_deposit_amount_checkin ? 'error' : ''}
                                help={apiErrors.min_deposit_amount_checkin}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input min deposit amount")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Min Deposit Amount")} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                name="min_balance_checkin_token"
                                label={t("dailycheckin.Min Token For Checkin")}
                                validateStatus={apiErrors.min_balance_checkin_token ? 'error' : ''}
                                help={apiErrors.min_balance_checkin_token}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input min token for checkin")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Min Token For Checkin")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="checkin_days"
                                label={t("dailycheckin.Checkin Days")}
                                validateStatus={apiErrors.checkin_days ? 'error' : ''}
                                help={apiErrors.checkin_days}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input checkin days")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Checkin Days")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="expired_days"
                                label={t("dailycheckin.Token Expired Days")}
                                validateStatus={apiErrors.expired_days ? 'error' : ''}
                                help={apiErrors.expired_days}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input token expired days")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder="Please input the token expired days" min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Divider>
                        <Tag color="blue">{t('dailycheckin.Lucky Wheel')}</Tag>
                    </Divider>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <Form.Item
                                name="lucky_wheel_initial_max_number"
                                label={t("dailycheckin.Initial Max Number")}
                                validateStatus={apiErrors.lucky_wheel_initial_max_number ? 'error' : ''}
                                help={apiErrors.lucky_wheel_initial_max_number}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input initial max number")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Initial Max Number")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="lucky_wheel_increment_percent_transaction"
                                label={t("dailycheckin.Increment Percent Transaction")}
                                validateStatus={apiErrors.lucky_wheel_increment_percent_transaction ? 'error' : ''}
                                help={apiErrors.lucky_wheel_increment_percent_transaction}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input increment percent transaction")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Increment Percent Transaction")} min={0}/>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                name="lucky_wheel_min_wallet_balance"
                                label={t("dailycheckin.Min Wallet Balance to spin")}
                                validateStatus={apiErrors.lucky_wheel_min_wallet_balance ? 'error' : ''}
                                help={apiErrors.lucky_wheel_min_wallet_balance}
                                rules={[
                                    {
                                        required: true,
                                        message: `${t("requiredmessage.Please input min wallet balance to spin")}`,
                                    },
                                ]}
                                hasFeedback
                                >
                                <InputNumber style={{ width: '100%' }} placeholder={t("dailycheckin.Min Wallet Balance to spin")} min={0}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                        <Col span={8}>
                            <DateField 
                                name="lucky_wheel_check_transaction_date" 
                                label={t("dailycheckin.Check Transaction Date")} 
                                apiErrors={apiErrors && apiErrors.lucky_wheel_check_transaction_date}
                            />
                        </Col>
                    </Row>
                    <Form.Item name="is_create_new" hidden>
                        <Switch />
                    </Form.Item>
                    <Form.Item name="id" hidden>
                        <InputNumber />
                    </Form.Item>
                    {PermissionsAuth.checkPermissions('button', 'change_dailycheckin',
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

const DailyCheckIn = () => {
    const { t } = useTranslation()
    const [apiErrors, setApiErrors] = useState([])
    const [Create] = useAddDailyCheckInMutation();
    const [Update] = useUpdateDailyCheckInMutation();
    const dispatch = useDispatch()
    
    const onUpdate = async (values) => {
        values.lucky_wheel_check_transaction_date = formattedDate(values.lucky_wheel_check_transaction_date)

        setApiErrors([])
        try {
            if(values.is_create_new){
                const data = await Create(values).unwrap();
            } else {
                const data = await Update(values).unwrap();
            }
            dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.Daily Check-In Saved Successfully')}`}));
        } catch (error) {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
            setApiErrors(errorField(error));
        }
    };
    return (
        PermissionsAuth.checkPermissions('list', 'view_dailycheckin',
        <FormList
            apiErrors={apiErrors}
            onUpdate={onUpdate}
        />
    )
    )
};
export default DailyCheckIn;