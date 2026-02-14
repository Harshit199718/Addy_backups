import React, { useState } from 'react'
import { Bank, BankListContainer } from './BankList.styled';
import Image from '../../components/common/Image';

function BankList3({label, name, onChange, paymentOptions, value}) {
    const handleChange = (id) => {
        onChange && onChange({target: {name: name,value: id}})
    }
    return (
        <BankListContainer>
            {
                label?
                <label htmlFor="">{label}</label>
                :null
            }
            <div className="banks">
                {
                    paymentOptions
                    .map(bank=> {
                        return (
                            <Bank key={bank.key} $selected={value===bank.key} onClick={() => {
                                handleChange(bank.key)
                            }}>
                                <Image src={require(`../../assets/images/Bank/Ewallet/QuickPay/${bank.key}.png`).default} alt="" width="auto" height="60px" skeletonHeight={60} />
                                <h3 className="name">{bank.label}</h3>
                            </Bank>
                        )
                    })
                }
            </div>
        </BankListContainer>
    )
}

export default BankList3