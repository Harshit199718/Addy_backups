import React, { useState } from 'react';
import { Col, Input, Row, Tag, Form, Popconfirm, Button} from 'antd';
import { Icon } from '@iconify/react';
import { convertStateColor } from '../../../../components/generalConversion';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { notification } from '../../../../features/modalSlice';
import errorField from '../../../../features/error/errorField';
import { useUpdateBonusesMutation } from '../../../../features/bonuses/bonusesApiSlices';

const BonusesAction = ({ record, t }) => {
    const [remark, setRemark] = useState('')
    const [BonusesAction, { isLoading }] = useUpdateBonusesMutation();
    const [apiErrors, setApiErrors] = useState([])
    const dispatch = useDispatch();

    const onBonusesAction = async (values, state) => {
        values = {...values, remark: remark, state: state, player_id: values.player}
        setApiErrors([])
        try {
          const data = await BonusesAction(values).unwrap();
          dispatch(notification({notification_status: 'success', notification_message: `${t("common.Bonuses")} ${state} ${t("common.Successfully")}`}));
        } catch (error) {
          dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
          setApiErrors(errorField(error));
        }
    };

    return(
        <Form>
        <Col>
            <Row style={{ marginBottom: 5}}>
                {record.state === 'pending' ?
                    <Form.Item
                        name="remark"
                        validateStatus={apiErrors.remark ? 'error' : ''}
                        help={apiErrors.remark}
                        hasFeedback
                        style={{  marginBottom: 0, width: '100%' }}
                    >
                        <Input.TextArea autoSize={{ minRows: 6, maxRows: 12 }} placeholder={t('common.Remark')} onChange={(e)=> setRemark(e.target.value)}/>
                    </Form.Item>
                    :
                    <Tag icon={<Icon icon="ic:twotone-description" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                        {t("common.Remark:")} {record.remark}
                    </Tag>
                }
            </Row>
            {record.state === 'pending' &&
                <Row style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Popconfirm
                    title={t(`bonusaction.Approve Bonuses`)}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {t(`bonusaction.Are you sure you want to approve this bonuses?`)} 
                    </div>
                    }
                    ok
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onMultiBonusesAction(record, 'approved')}
                >
                    <Button
                    type="primary" 
                    style={{ marginRight: "10px", backgroundColor: convertStateColor('approved') }}>
                        {t("common.Approve")}
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title={t(`bonusaction.Reject Bonuses`)}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {t(`bonusaction.Are you sure you want to reject this bonuses?`)}
                    </div>
                    }
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onMultiBonusesAction(record, 'rejected')}
                >
                    <Button 
                    icon={<CloseOutlined />}
                    type="primary" 
                    danger
                    style={{ marginRight: "5px" }}>
                        {t("common.Reject")}
                    </Button>
                </Popconfirm>
            </Row>
            }
        </Col>
        </Form>
    )
}

export default BonusesAction;