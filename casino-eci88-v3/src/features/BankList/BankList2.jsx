import React, { useEffect, useMemo, useState } from 'react'
import Input from '../../components/common/Input';
import { OpionLabel } from '../../pages/Transactions/Withdraw/Withdraw1';
import Image from '../../components/common/Image';
import { useEasypayBanksQuery, useMerchantBanksQuery, useWalletQuery } from '../../api/hooks';
import { useTranslation } from 'react-i18next';
import Table from '../../components/common/Table/Table';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';

function BankList2({name, onChange}) {
    const {t} = useTranslation();
    const {data: wallet} = useWalletQuery();
    const [selected, setSelected] = useState(null);
    const [copied, setCopied] = useState(false);
    const {data: merchantBanks} = useMerchantBanksQuery(wallet?.rank_id, {skip: name==="easypay_bank_id"});
    const {data: easypayBanks} = useEasypayBanksQuery(wallet?.rank_id, {skip: name!=="easypay_bank_id"});
    const handleChange = (event) => {
        onChange && onChange({target: {name, value: event.target.value}})
        const bank = merchantBanks?.filter(mBank=>mBank.id===event.target.value)[0];
        setSelected(bank)
    }
    
    const bankOptions = useMemo(() => {
        if (!merchantBanks && !easypayBanks) {
            return [];
        } else if (name==="easypay_bank_id") {
            return easypayBanks?.map(bank=>({
                key: bank.bank_id,
                label: (
                  <OpionLabel key={bank.bank_id}>
                    <Image
                      src={bank.mbank_logo_path}
                      alt={bank.acc_name}
                      width="40px"
                    />
                    {bank.acc_name} {bank.acc_no}
                  </OpionLabel>
                )
            }));
        } else {
            return merchantBanks?.map(bank=>({
                key: bank.id,
                label: (
                  <OpionLabel key={bank.id}>
                    <Image
                      src={bank.icon}
                      alt={bank.name}
                      width="40px"
                    />
                    {bank.name} {bank.number}
                  </OpionLabel>
                )
            }));
        }
    }, [merchantBanks, easypayBanks, name])
    useEffect(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
        }, 1000)
      }
    }, [copied])
  return (
    <>
        <Input type="select" placeholder={"--"+ t("Choose") + " " + t("Your_Account") + "--"} name="merchant_bank_account" options={bankOptions} onChange={handleChange} />
        {
          selected?
          <Table sx={{table_bg: "#343434"}} data={[
            {
              account_name: {
                value: "Bank Account Name"
              },
              account_name_value: {
                value: selected?.name,
                span: 2
              },
            },
            {
              account_name: {
                value: "Bank Account Number"
              },
              account_name_value: {
                value: selected?.number,
                color: "#DCAD23"
              },
              account_name_copy: {
                value: <Button $fontSize="10px" $padding="5px 10px" $background="#4a89dc" onClick={() => {
                  navigator?.clipboard?.writeText(selected?.number);
                  setCopied(true)
                }}>Copy</Button>
              },
            },
          ]} />
          :null
        }
        <Modal
          title={t("Copy_Link")}
          isOpen={copied}
          onClose={() => setCopied(false)}
          success={{ message: `${t("Successfully_Copied")}!` }}
        />
    </>
  )
}

export default BankList2