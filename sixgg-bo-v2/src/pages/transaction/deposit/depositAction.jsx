import React, { useState } from 'react';
import { Button, Col, Input, Popconfirm, Row, Tag, Form} from 'antd';
import { Icon } from '@iconify/react';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { convertFirstCharacter, convertStateColor, convertTransactionDuration } from '../../../components/generalConversion';
import { useDepositActionMutation } from '../../../features/transaction/deposit/depositApiSlices';
import { useDispatch } from 'react-redux';
import errorField from '../../../features/error/errorField';
import { notification } from '../../../features/modalSlice';
import { BgColorsOutlined, CloseOutlined } from '@ant-design/icons';
import PermissionsAuth from '../../../components/permissionAuth';
import { resetTransactionHighlight, setAutomaticMessagePayload, setTransactionHighlight } from '../../../features/generalSlice';

const DepositAction = ({ record, t, transactionHighlight }) => {
    const [form] = Form.useForm();
    const [remark, setRemark] = useState('')
    const [DepositAction, { isLoading }] = useDepositActionMutation();
    const [apiErrors, setApiErrors] = useState([])
    const dispatch = useDispatch();

    const onDepositAction = async (values, state) => {
        values = {...values, remark: remark, state: state}
        setApiErrors([])
        try {
          const data = await DepositAction(values).unwrap();
          dispatch(notification({notification_status: 'success', notification_message: `${t("common.Deposit")} ${state} ${t("common.Successfully")}`}));
          dispatch(resetTransactionHighlight());
          dispatch(setAutomaticMessagePayload({
            type: state==="rejected"?"depositFailure":"deposit",
            data: {
              username: values.player_name,
              amount: values.amount,
              status: state,
              depositId: values.txid,
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
        <Form form={form} name={`${record?.txid}_deposit_form`}>
        <Col style={{ backgroundColor: transactionHighlight === record.txid && record.state === "pending" && "#ffe5b4" }}>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="zondicons:add-outline" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Transaction Time")}:`} <DateTimeListingField dateTime={record.created_at} />
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
                <Tag icon={<Icon icon="vaadin:money-deposit" style={{marginRight: "5px"}} />} color="#55acee" style={{marginRight: "5px"}}>
                    {`${t("common.Deposit")}`}
                </Tag>
                <Tag icon={<Icon icon="majesticons:chat-status" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color={convertStateColor(record.state)}>
                    {`${t("common.Status")}:`} {t(`common.${convertFirstCharacter(record.state)}`)}
                </Tag>
            </Row>
            <Row style={{ marginBottom: 5}}>
                {record.state === 'pending' ?
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
                    >
                        <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={`${record.txid} ${t("common.Remark")}`} onChange={(e)=> setRemark(e.target.value)}/>
                    </Form.Item>
                    :
                    <Tag icon={<Icon icon="ic:twotone-description" style={{marginRight: "5px"}} />} style={{marginRight: "5px", textWrap: "wrap"}} color="default">
                        {`${t("common.Remark")}:`} {record.remark}
                    </Tag>
                }
            </Row>
            {record.state === 'pending' && PermissionsAuth.checkPermissions('others', 'change_deposit', 
            <Row>
                <Popconfirm
                    title={`${t("common.Approve the")} ${record.txid}`}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("common.Are you sure you want to approve")}
                        ${t("common.TXID")}: ${record.txid}
                        ${t("common.Amount")}: ${record.amount}
                        ${t("common.Player")}: ${record.player_name}`}
                    </div>
                    }
                    icon={<Icon icon="bi:cash-coin" color={convertStateColor('approved')} style={{ marginRight: "5px" }}/>}
                    ok
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onDepositAction(record, 'approved')}
                >
                    <Button 
                    icon={<Icon icon="bi:cash-coin" color="white" style={{ verticalAlign: 'middle' }} />} 
                    type="primary" 
                    style={{ marginRight: "5px", backgroundColor: convertStateColor('approved') }}>
                        {t("common.Approve")}
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title={`${t("common.Reject the")} ${record.txid}`}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("common.Are you sure you want to reject")}
                        ${t("common.TXID")}: ${record.txid}
                        ${t("common.Amount")}: ${record.amount}
                        ${t("common.Player")}: ${record.player_name}`}
                    </div>
                    }
                    icon={<CloseOutlined style={{ color: convertStateColor('rejected') }} />}
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onDepositAction(record, 'rejected')}
                >
                    <Button 
                    icon={<CloseOutlined />}
                    type="primary" 
                    danger
                    style={{ marginRight: "5px" }}>
                        {t("common.Reject")}
                    </Button>
                </Popconfirm>
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

export default DepositAction;