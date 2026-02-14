import React, { useMemo, useState } from 'react'
import styled from 'styled-components'
import { Bank, BankListContainer } from './BankList.styled';
import { useWalletQuery, useMerchantBanksQuery, useEasypayBanksQuery } from '../../api/hooks';
import OptimizedImage from '../../components/common/OptimizedImage';
import Image from '../../components/common/Image';
import { useTranslation } from 'react-i18next';
import Modal from '../../components/common/Modal';
import Button from '../../components/common/Button';

function BankList({name, label, onChange}) {
    const { t } = useTranslation();
    const [selected, setSelected] = useState(0);
    const [selectedBank, setSelectedBank] = useState(null);
    const [copied, setCopied] = useState(false);
    const {data: wallet} = useWalletQuery();
    const {data: merchantBanks} = useMerchantBanksQuery(wallet?.rank_id, {skip: name==="easypay_bank_id"});
    const {data: easypayBanks} = useEasypayBanksQuery(wallet?.rank_id, {skip: name!=="easypay_bank_id"});
    const handleChange = (id) => {
        setSelected(id)
        onChange && onChange({target: {name, value: id}})
    }

    const allBanks = useMemo(() => {
        if ((name==="easypay_bank_id") && easypayBanks) {
            return easypayBanks?.map(easypayBank => ({
                id: easypayBank.bank_id,
                name: easypayBank.acc_name,
                icon: easypayBank.mbank_logo_path,
                number: easypayBank.acc_no
            }))
        } else if (merchantBanks) {
            return merchantBanks
        }
    }, [merchantBanks, easypayBanks])

  return (
    <BankListContainer>
        {
            label?
            <label htmlFor="">{label}</label>
            :null
        }
        <div className="banks">
            {
                allBanks?.filter(bank => (name==="easypay_bank_id") || bank.name.toLowerCase() !== 'easypay' && bank.name.toLowerCase() !== 'quickpay')
                .map(bank=>(
                    <Bank key={bank.id} $selected={selected===bank.id} onClick={() => {
                        handleChange(bank.id)
                        setSelectedBank(bank)
                    }}>
                        <Image src={bank.icon} alt="" width="auto" height="60px" skeletonHeight={60} />
                        <h3 className="name">{bank.name}</h3>
                    </Bank>
                ))
            }
        </div>
        {
        selectedBank ?
            <div className="banks-info">
                <table style={{ color: "white"}}>
                    <tbody>
                        <tr>
                            <td>{t("Bank")} {t("Account")} {t("Name")}: </td>
                            <td>{selectedBank.name}</td>
                        </tr>
                        <tr>
                            <td>{t("Bank")} {t("Account_Number")}: </td>
                            <td>{selectedBank.number}</td>
                            <td>
                                <Button $fontSize="10px" $padding="5px 10px" onClick={() => {
                                    navigator?.clipboard?.writeText(selectedBank?.number);
                                    setCopied(true)
                                }}>Copy</Button>
                            </td>
                        </tr>
                        {selectedBank?.qrcode_image &&
                        <tr>
                            <td colSpan={3}>
                                <img src={selectedBank?.qrcode_image} style={{ width: "100%" }}/>
                            </td>
                        </tr>
                        }
                    </tbody>
                </table>
            </div>
        :null
        }
        <Modal
          title={t("Copy_Link")}
          isOpen={copied}
          onClose={() => setCopied(false)}
          success={{ message: `${t("Successfully_Copied")} ${selectedBank && selectedBank.number}!` }}
        />
    </BankListContainer>
  )
}

export default BankList