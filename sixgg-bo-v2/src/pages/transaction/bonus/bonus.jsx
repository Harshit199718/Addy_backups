import React from 'react';
import { Col, Row, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import NumberListingField from '../../../ListingField/NumberListingField';
import ClipBoardButton from '../../../components/clipboard';

const Bonus = ({ record, setSelectedPlayer, t }) => {
    
    return(
        <Row>
            <Col span={5}>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<UserOutlined />} color='default' onClick={()=> setSelectedPlayer(record.player)} style={{ cursor: "pointer" }}>
                        {record.player_name}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="game-icons:cash" style={{marginRight: "5px"}} />} color="#5b8c00" style={{marginRight: "5px"}}>
                        {t("common.Bonus")}
                    </Tag>
                    <Tag icon={<Icon icon="bi:info" style={{marginRight: "5px"}} />} color="default">
                        {t(`common.${record.ttype_display}`)}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="material-symbols:grid-3x3" style={{marginRight: "5px"}} />} color="default">
                        {record.txid}
                    </Tag>
                    <ClipBoardButton text={record.txid} notify={'TXID'} />
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="fluent:gift-card-money-20-regular" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Promo")}:`} {record.promotion_name ? record.promotion_name : "-"}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="dashicons:admin-site-alt3" style={{marginRight: "5px"}} />} color="default">
                        {record.sites_name}
                    </Tag>
                </Row>
            </Col>
            <Col>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="bi:cash" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Bal Before")}:`} <NumberListingField value={record.bal_bf} />
                    </Tag>
                    <Tag icon={<Icon icon="bi:cash" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Amount")}:`} <NumberListingField value={record.amount} />
                    </Tag>
                    <Tag icon={<Icon icon="bi:cash" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Bal After")}:`} <NumberListingField value={record.bal_af} />
                    </Tag>
                </Row>
                {(record?.ttype === "BCP") ? 
                <>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="mdi:coupon" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Coupon Code")}:`} {record.coupon_code ? record.coupon_code : "-"}
                    </Tag>
                </Row>
                </>
                : 
                null
            }
            </Col>
        </Row>
    )
}

export default Bonus;