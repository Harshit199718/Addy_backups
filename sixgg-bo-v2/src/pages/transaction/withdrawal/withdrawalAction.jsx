import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Popconfirm, Row, Tag, Form, InputNumber, Alert} from 'antd';
import { Icon } from '@iconify/react';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { convertABSNumber, convertFirstCharacter, convertStateColor, convertTransactionDuration } from '../../../components/generalConversion';
import { useWithdrawalActionMutation } from '../../../features/transaction/withdrawal/withdrawalApiSlices';
import { useDispatch } from 'react-redux';
import errorField from '../../../features/error/errorField';
import { notification } from '../../../features/modalSlice';
import { BgColorsOutlined, CloseOutlined } from '@ant-design/icons';
import ReferenceMerchantBankAccountField from '../../../customField/ReferenceMerchantBankAccountField';
import PermissionsAuth from '../../../components/permissionAuth';
import { resetTransactionHighlight, setAutomaticMessagePayload, setTransactionHighlight } from '../../../features/generalSlice';
import { useLazyGetEnvironmentVariablesListQuery } from '../../../features/envVar/envVarApiSlices';

const WithdrawalAction = ({ record, t, transactionHighlight }) => {
    const [form] = Form.useForm();
    const [withdrawalData, setWithdrawalData] = useState({
        forfeit: record?.forfeit ? record?.forfeit : 0,
        remark: '',
        merchant_bank_account: null,
    })
    const [displayAmount, setDisplayAmount] = useState(convertABSNumber(record.req_amount))
    const [WithdrawalAction, { isLoading }] = useWithdrawalActionMutation();
    const [apiErrors, setApiErrors] = useState([])
    const dispatch = useDispatch();
    const [getEasypayEnabled, { isFetching, data }, isError] = useLazyGetEnvironmentVariablesListQuery()
    const [isEasypayEnabled, setIsEasyPayEnabled] = useState(false)
    
    useEffect(() => {
        if (record && record?.sites && record?.state === "pending" ) {
            try {
                getEasypayEnabled({
                    pagination: {
                        startPageRow: 0,
                        endPageRow: 1,
                    },
                    filters: { 
                        sites: record.sites,
                        q: "EASYPAY_WITHDRAWAL_ENABLED",
                    }
                })
                .unwrap()
                .then((payload) =>  {
                    if(payload?.list && payload?.list?.length > 0){
                        setIsEasyPayEnabled(payload?.list[0]?.value === "1" ? true : false)
                    } else {
                        setIsEasyPayEnabled(false)
                    }
                })
                .catch((error) => {
                    dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
                })
            } catch (error) {
                dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
            }
        } 
    }, [record]);

    const onWithdrawalAction = async (values, state, force_approve) => {
        values = {...values, ...withdrawalData, state: state, force_approve: force_approve}
        setApiErrors([])
        try {
          const data = await WithdrawalAction(values).unwrap();
          dispatch(notification({notification_status: 'success', notification_message: `${t("common.Withdrawal")} ${state} ${t("common.Successfully")}`}));
          dispatch(resetTransactionHighlight());
          const {remark} = withdrawalData
          dispatch(setAutomaticMessagePayload({
            type: state==="rejected"?"withdrawFailure":"withdraw",
            data: {
                username: values.player_name,
                amount: values.req_amount,
                forfeit: values.forfeit?values.forfeit:0,
                status: state,
                remark,
                site: values.sites_name
            }
          }))
        } catch (error) {
          dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
          setApiErrors(errorField(error));
        }
      };

    return(
        <Form form={form} name={`${record?.txid}_withdrawal_form`} initialValues={record}>
        <Col style={{ backgroundColor: transactionHighlight === record.txid && record.state === "pending" && "#ffe5b4" }}>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="zondicons:add-outline" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Transaction Time")}:`} <DateTimeListingField dateTime={record.created_at} />
                </Tag>
            </Row>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="iwwa:assign" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Assign To")}:`} {record.assign_to_name}
                </Tag>
            </Row>
            {record.state != 'pending' &&
            <>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="ic:sharp-update" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {t(`common.${convertFirstCharacter(record.state)}`)}{`${t("common.Time")}:`} <DateTimeListingField dateTime={record.updated_at} />
                </Tag>
                <Tag icon={<Icon icon="mdi:approve" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {t(`common.${convertFirstCharacter(record.state)}`)}{`${t("common.By")}:`} {record.approver_name}
                </Tag>
            </Row>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="game-icons:duration" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Duration")}:`} {convertTransactionDuration(record.created_at, record.updated_at)}
                </Tag>
            </Row>
            </>
            }
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="vaadin:money-withdraw" style={{marginRight: "5px"}} />} color="#4E2728" style={{marginRight: "5px"}}>
                    {`${t("common.Withdrawal")}`}
                </Tag>
                <Tag icon={<Icon icon="majesticons:chat-status" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color={convertStateColor(record.state)}>
                    {`${t("common.Status")}:`} {t(`common.${convertFirstCharacter(record.state)}`)}
                </Tag>
            </Row>
            <Row style={{ marginBottom: 5}}>
                {record.state === 'pending' ?
                    <Col span={24}>
                        <Row align="middle">
                            <Col style={{marginRight: "5px"}}>
                                <Form.Item
                                    name="forfeit"
                                    label={t("common.Forfeit")}
                                    validateStatus={apiErrors.remark ? 'error' : ''}
                                    help={apiErrors.forfeit}
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    hasFeedback
                                    style={{ marginBottom: 5, marginTop: 5  }}
                                >
                                    <InputNumber 
                                        placeholder={`Forfeit`} 
                                        onChange={(value) => {
                                            setWithdrawalData({ ...withdrawalData, forfeit: value })
                                            setDisplayAmount(convertABSNumber(record.req_amount) - Number(value))
                                        }}
                                        min={0}
                                        max={convertABSNumber(record.req_amount)}
                                    />
                                </Form.Item>
                            </Col>
                            <Col style={{marginRight: "5px"}}>
                                <Tag icon={<Icon icon="iconoir:hand-cash" style={{marginRight: "5px"}} />} color="default">
                                    {`${t("common.Require Amount")}:`} {convertABSNumber(record.req_amount)}
                                </Tag>
                            </Col>
                            <Col style={{marginRight: "5px"}}>
                                <Tag icon={<Icon icon="mdi:cash-lock-open" style={{marginRight: "5px"}} />} color="default">
                                    {`${t("common.Max Amount")}:`} {convertABSNumber(record.max_amount)}
                                </Tag>
                            </Col>
                            <Col style={{marginRight: "5px"}}>
                                <Tag icon={<Icon icon="bi:cash" style={{marginRight: "5px"}} />} color="default">
                                    {`${t("common.Amount")}:`} {displayAmount}
                                </Tag>
                            </Col>
                        </Row>
                        <ReferenceMerchantBankAccountField 
                            name="merchant_bank_account" 
                            label={t("common.Merchant Bank Account")}
                            placeholder={t("common.Please Select Merchant Bank")}
                            apiErrors={apiErrors && apiErrors.merchant_bank_account} 
                            onChange={(value) => setWithdrawalData({ ...withdrawalData, merchant_bank_account: value })}
                            filterProp={{sites: record.sites}}
                            style={{ marginBottom: 5 }}
                        />
                        <Form.Item
                            name="remark"
                            label={t("common.Remark")}
                            validateStatus={apiErrors.remark ? 'error' : ''}
                            help={apiErrors.remark}
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            hasFeedback
                            style={{  marginBottom: 0, width: '100%' }}
                                // labelCol={{ span: 3 }}
                        >
                            <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={`${record.txid} ${t("common.Remark")}`} onChange={(e)=> setWithdrawalData({ ...withdrawalData, remark: e.target.value })}/>
                        </Form.Item>
                    </Col>
                    :
                    <Tag icon={<Icon icon="ic:twotone-description" style={{marginRight: "5px"}} />} style={{marginRight: "5px", textWrap: "wrap"}} color="default">
                        {`${t("common.Remark")}:`} {record.remark}
                    </Tag>
                }
            </Row>
            {record.withdrawal_condition && record.state ==='pending' && (record.min_withdrawal_amount > 0 || record.min_withdrawal_amount_ro > 0) &&
                <Alert
                    message={`${t("common.WARNING The minimum withdrawal amount")} ${record.withdrawal_condition_display} ${t("common.is")} 
                    ${record.withdrawal_condition === 'TO' ? record.min_withdrawal_amount : record.min_withdrawal_amount_ro}. 
                    ${t("common.Please approve with caution.")}`}
                    type="warning"
                    showIcon
                    style={{ marginBottom: 10 }}
                />
            }
            {record.state === 'pending' &&
            PermissionsAuth.checkPermissions('others', 'change_withdrawal', 
            <Row>
                <Popconfirm
                    title={`${t("common.Approve the")} ${record.txid}`}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("common.Are you sure you want to")} ${record.withdrawal_condition ? t('common.force approve') : t('common.approve')}
                        ${t("common.TXID")}: ${record.txid}
                        ${t("common.Amount")}: ${record.amount}
                        ${t("common.Player")}: ${record.player_name}`}
                    </div>
                    }
                    icon={<Icon icon="solar:hand-money-outline" color={convertStateColor('approved')} style={{ marginRight: "5px" }}/>}
                    ok
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onWithdrawalAction(record, 'approved', record.withdrawal_condition ? true : false )}
                >
                    <Button 
                    icon={<Icon icon="solar:hand-money-outline" color="white" style={{ verticalAlign: 'middle' }} />} 
                    type="primary" 
                    style={{ marginRight: "5px", backgroundColor: convertStateColor('approved') }}>
                        {record.withdrawal_condition && (record.min_withdrawal_amount > 0 || record.min_withdrawal_amount_ro > 0)  ? t('common.Force Approve') : t('common.Approve')}
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title={`${t("common.Reject the")} ${record.txid}`}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("common.Are you sure you want to reject")}
                        ${t("common.TXID")}: ${record.txid}
                        ${t("common.Amount")}: ${convertABSNumber(record.req_amount)}
                        ${t("common.Player")}: ${record.player_name}`}
                    </div>
                    }
                    icon={<CloseOutlined style={{ color: convertStateColor('rejected') }} />}
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onWithdrawalAction(record, 'rejected', false)}
                >
                    <Button 
                        icon={<CloseOutlined />}
                        type="primary" 
                        danger
                        style={{ marginRight: "5px" }}>
                            {t("common.Reject")}
                    </Button>
                </Popconfirm>
                {isEasypayEnabled &&
                <Popconfirm
                    title={`${t("common.Submit the")} ${record.txid} ${t("common.to Easypay?")}`}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("common.Are you sure you want to submit to Easypay")}
                        ${t("common.TXID")}: ${record.txid}
                        ${t("common.Amount")}: ${record.amount}
                        ${t("common.Player")}: ${record.player_name}`}
                    </div>
                    }
                    icon={<Icon icon="logos:mastercard" color={convertStateColor('pending')} style={{ marginRight: "5px" }}/>}
                    ok
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onWithdrawalAction(record, 'pending', record.withdrawal_condition ? true : false )}
                >
                    <Button 
                        icon={<Icon icon="logos:mastercard" color="white" style={{ verticalAlign: 'middle' }} />} 
                        type="primary" 
                        style={{ marginRight: "5px", backgroundColor: convertStateColor('pending') }}
                    >
                        Easypay
                    </Button>
                </Popconfirm>
                }
                <Button 
                    icon={<BgColorsOutlined />}
                    type="primary" 
                    style={{ marginRight: "5px" }}
                    onClick={() => {
                        if(transactionHighlight === record.txid){
                            dispatch(resetTransactionHighlight())
                        } else {
                            dispatch(setTransactionHighlight(record.txid))
                        }
                    }}
                >
                    {transactionHighlight === record.txid ? t("common.Unhightlight") : t("common.Highlight")}
                </Button>
            </Row>
            )
            }
        </Col>
        </Form>
    )
}

export default WithdrawalAction;