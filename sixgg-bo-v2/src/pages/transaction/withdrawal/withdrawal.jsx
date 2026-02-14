import React from 'react';
import { Col, Row, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import BankAccountTransactionListingField from '../../../ListingField/MerchantBankAccountTransactionListingField';
import { convertABSNumber } from '../../../components/generalConversion';
import NumberListingField from '../../../ListingField/NumberListingField';
import ClipBoardButton from '../../../components/clipboard';

const Withdrawal = ({ record, setSelectedPlayer, t}) => {

    return(
        <Row>
            <Col span={5}>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<UserOutlined />} color='default' onClick={()=> setSelectedPlayer(record.player)} style={{ cursor: "pointer" }}>
                        {record.player_name}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="vaadin:money-withdraw" style={{marginRight: "5px"}} />} color="#4E2728" style={{marginRight: "5px"}}>
                        {t("common.Withdrawal")}
                    </Tag>
                    <Tag icon={<Icon icon="bi:info" style={{marginRight: "5px"}} />} color="default">
                        {t(`common.${record.ttype_display}`)}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="material-symbols:grid-3x3" style={{marginRight: "5px"}} />} color="default">
                        {record.txid}
                    </Tag>
                    <ClipBoardButton text={record.txid} notify={t('common.TXID')} />
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
                    <Tag icon={<Icon icon="streamline:payment-cash-out-3" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Forfeit")}:`} <NumberListingField value={record.forfeit} />
                    </Tag>
                    <Tag icon={<Icon icon="bi:cash" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Bal After")}:`} <NumberListingField value={record.bal_af} />
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="iconoir:hand-cash" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Require Amount")}:`} {convertABSNumber(record.req_amount)}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5}}>
                    <Tag icon={<Icon icon="mdi:cash-lock-open" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Max Amount")}:`} {convertABSNumber(record.max_amount)}
                    </Tag>
                </Row>
                <BankAccountTransactionListingField icon={record.customerbankaccount_icon} info={record.customerbankaccount_info} label={t("common.Customer Bank")} />
                <BankAccountTransactionListingField icon={record.merchantbankaccount_icon} info={record.merchantbankaccount_info} label={t("common.Merchant Bank")} />
            </Col>
        </Row>
    )
}

export default Withdrawal;