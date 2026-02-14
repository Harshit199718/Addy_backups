import React, { useState } from 'react';
import { Col, Input, Row, Tag, Form, Popconfirm, Button} from 'antd';
import { Icon } from '@iconify/react';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { convertFirstCharacter, convertStateColor, convertTransactionDuration } from '../../../components/generalConversion';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { notification } from '../../../features/modalSlice';
import errorField from '../../../features/error/errorField';
import PermissionsAuth from '../../../components/permissionAuth';
import { useDropTransactionGamesActionMutation } from '../../../features/transaction/dropTransactionGames/dropTransactionGameApiSlices';

const DropTransactionGamesAction = ({ record, t }) => {
    const [form] = Form.useForm();
    const [remark, setRemark] = useState('')
    const [DropTransactionGamesAction, { isLoading }] = useDropTransactionGamesActionMutation();
    const [apiErrors, setApiErrors] = useState([])
    const dispatch = useDispatch();

    const onDropTransactionGamesAction = async (values, state) => {
        values = {...values, remark: remark, state: state, player_id: values.player}
        setApiErrors([])
        try {
          const data = await DropTransactionGamesAction(values).unwrap();
          dispatch(notification({notification_status: 'success', notification_message: `${t("common.Drop Transaction Game")} ${state} ${t("common.Successfully")}`}));
        } catch (error) {
          dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
          setApiErrors(errorField(error));
        }
    };

    return(
        <Form form={form} name={`${record?.txid}_dtg_form`}>
        <Col>
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
                <Tag icon={<Icon icon="game-icons:cash" style={{marginRight: "5px"}} />} color="#5b8c00" style={{marginRight: "5px"}}>
                    {t("common.Drop Transaction Games")}
                </Tag>
                <Tag icon={<Icon icon="majesticons:chat-status" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color={convertStateColor(record.state)}>
                    {`${t("common.Status")}:`} {record.state}
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
                    <Tag icon={<Icon icon="ic:twotone-description" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                        {`${t("common.Remark")}:`} {record.remark}
                    </Tag>
                }
            </Row>
            {record.parent_txid ?
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="raphael:parent" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Deposit ID")}:`} {record.parent_txid}
                </Tag>
            </Row>
            :
            record.state === 'pending' &&
            PermissionsAuth.checkPermissions('others', 'change_droptransactiongame', 
            <Row>
                <Popconfirm
                    title={`Approve the ${record.txid}`}
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
                    onConfirm={() => onDropTransactionGamesAction(record, 'approved')}
                >
                    <Button
                        icon={<Icon icon="bi:cash-coin" color="white" style={{ verticalAlign: 'middle' }} />} 
                        type="primary" 
                        style={{ marginRight: "5px", backgroundColor: convertStateColor('approved') }}
                    >
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
                    onConfirm={() => onDropTransactionGamesAction(record, 'rejected')}
                >
                    <Button 
                        icon={<CloseOutlined />}
                        type="primary" 
                        danger
                        style={{ marginRight: "5px" }}
                    >
                        {t("common.Reject")}
                    </Button>
                </Popconfirm>
            </Row>
            )
            }
        </Col>
        </Form>
    )
}

export default DropTransactionGamesAction;