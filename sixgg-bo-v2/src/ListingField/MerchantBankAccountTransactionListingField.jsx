import React from 'react';
import { Row, Tag } from 'antd';
import { Icon } from '@iconify/react';
import ClipBoardButton from '../components/clipboard';
import ImageListingField from './ImageListingField';

const BankAccountTransactionListingField = ({ icon, info, label="Merchant Bank" }) => {

    return (
        <Row style={{ marginBottom: 5, display: 'flex', alignItems: 'center' }}>
            <Tag icon={<Icon icon="mdi:bank" style={{ marginRight: "5px" }} />} color="default">
                <span style={{ marginRight: 5 }}>{label}:</span>
                {icon ?
                <>
                    <ImageListingField image={icon} width={18} height={18} preview={false}/>
                    <span style={{ marginLeft: 5 }} >{info}</span>
                </>
                :
                <span>-</span>
                }
            </Tag>
            <ClipBoardButton text={info} notify={label} />
        </Row>
    );
}

export default BankAccountTransactionListingField;
