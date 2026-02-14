import React from 'react';
import { Badge, Col, Descriptions, Row, Space, Tag } from 'antd';
import { TwitterOutlined, UserOutlined } from '@ant-design/icons';
import { Icon } from '@iconify/react';
import ImageTransactionListingField from '../../../ListingField/ImageTransactionListingField';
import BankAccountTransactionListingField from '../../../ListingField/MerchantBankAccountTransactionListingField';
import NumberListingField from '../../../ListingField/NumberListingField';
import ClipBoardButton from '../../../components/clipboard';
import { isItemExpired } from '../../../components/convertDate';
import DepositAddBonus from './depositAddBonus';
import PermissionsAuth from '../../../components/permissionAuth';

const Deposit = ({ record, setSelectedPlayer, t }) => {

    return(
        <Row>
            <Col span={5}>
                <Row style={{ marginBottom: 5 }}>
                    <Tag icon={<UserOutlined />} color='default' onClick={()=> setSelectedPlayer(record.player)} style={{ cursor: "pointer" }}>
                        {record.player_name}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5 }}>
                    <Tag icon={<Icon icon="vaadin:money-deposit" style={{marginRight: "5px"}} />} color="#55acee" style={{marginRight: "5px"}}>
                        {t("common.Deposit")}
                    </Tag>
                    <Tag icon={<Icon icon="bi:info" style={{marginRight: "5px"}} />} color="default">
                        {t(`common.${record.ttype_display}`)}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5 }}>
                    <Tag icon={<Icon icon="material-symbols:grid-3x3" style={{marginRight: "5px"}} />} color="default">
                        {record.txid}
                    </Tag>
                    <ClipBoardButton text={record.txid} notify={t('common.TXID')} />
                </Row>
                <Row style={{ marginBottom: 5 }}>
                    <Tag icon={<Icon icon="fluent:gift-card-money-20-regular" style={{marginRight: "5px"}} />} color="default">
                        {`${t("common.Promo")}:`} {record.promotion_name ? record.promotion_name : "-"}
                    </Tag>
                </Row>
                <Row style={{ marginBottom: 5 }}>
                    <Tag icon={<Icon icon="iconoir:hand-cash" style={{ marginRight: "5px" }} />} color="default">
                        {`${t("common.Bonus")}:`} {record.bonus_amount ? <NumberListingField value={record.bonus_amount} /> : "-"}
                    </Tag>
                    <div>
                        {PermissionsAuth.checkPermissions('others', 'add_bonus', true) &&
                            !isItemExpired(record.updated_at) &&
                            record.bonus_amount <= 0 &&
                            record.state === "approved" && (
                                <DepositAddBonus record={record} t={t} />
                            )}
                    </div>
                </Row>
                <Row style={{ marginBottom: 5 }}>
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
                <BankAccountTransactionListingField label={t("common.Merchant Bank")} icon={record.merchantbankaccount_icon} info={record.merchantbankaccount_info} record={record}/>
                {(record?.ttype === "PG" || record?.ttype === "EW" || record?.ttype === "TEC") ? 
                    record?.pg &&
                    <>
                        <Tag icon={<Icon icon="carbon:license-third-party" style={{marginRight: "5px"}} />} color="default">
                            {`${t("common.Provider")}:`} {record?.pg}
                        </Tag>
                        {record?.pg === 'easypay' &&
                        <Tag icon={<Icon icon="carbon:license-third-party" style={{marginRight: "5px"}} />} color="default">
                            {`${t("common.Customer Bank Balance")}:`} <NumberListingField value={record.easypay_client_balance} /> [{record?.easypay_ranking}]
                        </Tag>
                        }
                    </>
                : 
                    <ImageTransactionListingField image={record.proof} />
                }
            </Col>
        </Row>
    )
}

export default Deposit;