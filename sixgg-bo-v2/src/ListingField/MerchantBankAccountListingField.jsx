import React from 'react';
import ClipBoardButton from '../components/clipboard';
import ImageListingField from './ImageListingField';

const BankAccountListingField = ({ icon, info, label="Merchant Bank" }) => {

    return (
        <>
            {icon ?
                <>
                    <ClipBoardButton text={info} notify={label} />
                    <ImageListingField image={icon} preview={false} />
                    <span style={{ marginLeft: 5 }} >{info}</span>
                </>
                :
                <span>-</span>
            }
        </>
    );
}

export default BankAccountListingField;
