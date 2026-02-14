import React, { useState } from 'react';
import { Col, Row, Popconfirm, Button} from 'antd';
import { convertStateColor } from '../../../../components/generalConversion';
import { useDispatch } from 'react-redux';
import { CloseOutlined } from '@ant-design/icons';
import { notification } from '../../../../features/modalSlice';
import errorField from '../../../../features/error/errorField';
import { useUpdateChipsRebateMutation } from '../../../../features/chipsrebate/chipsRebateApiSlices';
import { getCurrentTime } from '../../../../components/convertDate';

const ChipsRebateAction = ({ record, t }) => {
    const [ChipsRebateAction, { isLoading }] = useUpdateChipsRebateMutation();
    const [apiErrors, setApiErrors] = useState([]) 
    const dispatch = useDispatch();

    const onChipsRebateAction = async (values, state) => {
        values = {...values, state: state, player_id: values.player, approved_at: getCurrentTime()  }
        setApiErrors([])
        try {
          const data = await ChipsRebateAction(values).unwrap();
          dispatch(notification({notification_status: 'success', notification_message: `${t("common.Chips")} ${state} ${t("common.Successfully")}`}));
        } catch (error) {
          dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
          setApiErrors(errorField(error));
        }
    };

    return(
        <Col>
            {record.state === 'pending' &&
                <Row >
                <Popconfirm
                    title={t(`chipsrebateaction.Approve Chips`)}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("chipsrebateaction.Are you sure you want to approve this chips?")}
                        ${t("chipsrebateaction.Current State")} ${record.state}
                        `} 
                    </div>
                    }
                    ok
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onMultiChipsRebateAction(record, 'approved')}
                >
                    <Button
                    type="primary" 
                    style={{ marginRight: "10px", backgroundColor: convertStateColor('approved') }}>
                        {t("common.Approve")}
                    </Button>
                </Popconfirm>
                <Popconfirm
                    title={t(`chipsrebateaction.Reject Chips`)}
                    description={
                    <div style={{ whiteSpace: 'pre-line' }}>
                        {`${t("chipsrebateaction.Are you sure you want to reject this chips?")}
                        ${t("chipsrebateaction.Current State")} ${record.state}
                        `}
                    </div>
                    }
                    okText={t("common.Yes")}
                    cancelText={t("common.No")}
                    onConfirm={() => onMultiChipsRebateAction(record, 'rejected')}
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
    )
}

export default ChipsRebateAction;