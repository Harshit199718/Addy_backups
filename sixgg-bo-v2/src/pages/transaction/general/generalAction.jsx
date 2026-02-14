import React from 'react';
import { Col, Input, Row, Tag, Form, Popconfirm, Button} from 'antd';
import { Icon } from '@iconify/react';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { convertFirstCharacter, convertStateColor, convertTransactionDuration } from '../../../components/generalConversion';

const GeneralAction = ({ record, t }) => {

    return(
        <Col>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="zondicons:add-outline" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Transaction Time")}:`}<DateTimeListingField dateTime={record.created_at} />
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
                <Tag icon={<Icon icon="majesticons:chat-status" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color={convertStateColor(record.state)}>
                    {`${t("common.Status")}:`} {t(`common.${convertFirstCharacter(record.state)}`)}
                </Tag>
            </Row>
            <Row style={{ marginBottom: 5}}>
                <Tag icon={<Icon icon="ic:twotone-description" style={{marginRight: "5px"}} />} style={{marginRight: "5px"}} color="default">
                    {`${t("common.Remark")}:`} {record.remark}
                </Tag>
            </Row>
        </Col>
    )
}

export default GeneralAction;