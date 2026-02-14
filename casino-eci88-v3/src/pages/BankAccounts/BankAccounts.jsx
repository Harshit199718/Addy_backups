import React, { Suspense, useEffect, useMemo, useState } from 'react'
import Button from '../../components/common/Button'
import { BankAccountsContainer } from './BankAccounts.styled'
import { useTranslation } from 'react-i18next';
import Image from '../../components/common/Image';
import { useAddBankMutation, useBanksQuery, useCustomerBanksQuery, useWalletQuery } from '../../api/hooks';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { OpionLabel } from '../Transactions/Withdraw/Withdraw1';
// import BankCard from './BankCard';
import useImports from '../../hooks/useImports';
import Loading from '../../components/common/Loading';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';
import LayoutSpacing from '../../features/Layout/LayoutSpacing';

function BankAccounts({removeAdd}) {
  const {BankCard} = useImports();
  const { t } = useTranslation();
  const {data: customerBanks} = useCustomerBanksQuery();
  const {data: banks} = useBanksQuery();
  const {data: wallet} = useWalletQuery();
  const [addCustomerBank, {isSuccess}] = useAddBankMutation();
  const [addBank, setAddBank] = useState(false);
  const [values, setValues] = useState({})
  const {bank_accounts_style} = useSelector(selectConfigData);

  const bankOptions = useMemo(() => {
    if (!banks) {
        return [];
    } else {
        return banks?.map(bank=>({
            key: bank.id,
            label: (
              <OpionLabel key={bank?.id}>
                <Image
                  src={bank.icon}
                  alt={bank.name}
                  width="40px"
                  height="40px"
                />
                {bank.name} {bank.number}
              </OpionLabel>
            )
        }));
    }
}, [banks])

useEffect(() => {
  if (isSuccess) {
    setAddBank(false)
  }
}, [isSuccess]);

useEffect(() => {
  if (customerBanks && wallet) {
    setValues({
        ...values,
        name: customerBanks?customerBanks[0]?.name:"",
        wallet: wallet?.id,
        user: wallet?.user?.id
    })
  }
}, [customerBanks, wallet])



const handleChange = (event) => {
    const {name, value} = event.target;
    setValues(prevValues=>({
        ...prevValues,
        [name]: value
    }))
}
  return (
    <>
      <BankAccountsContainer>
        {
          !removeAdd?
          <Button $borderRadius={bank_accounts_style==="2"?"25px":""} onClick={() => setAddBank(true)}>{t("Add_Bank")} {t("Account")}</Button>
          :null
        }
          {
              customerBanks?.map(cuBank=>{
                  const filteredBank = banks?.filter(bank => bank.id == cuBank.bank)
                  return (
                    <Suspense key={cuBank?.id} fallback={<Loading isLoading />}>
                      <BankCard key={cuBank.id} cuBank={cuBank} filteredBank={filteredBank} />
                    </Suspense>
              )})
          }
          <Modal title={t("Add_Bank") + " " + t("Account")} isOpen={addBank} onClose={() => setAddBank(false)}>
              {customerBanks ? 
              customerBanks[0]?.name && <Input type="text" readOnly label={t("Full_Name")} name="name" value={customerBanks?customerBanks[0]?.name:""} />
              :
              <Input type="text" label={t("Full_Name")} name="name" onChange={handleChange} />
              }
              <Input type="select" name="bank" placeholder={"--"+ t("Choose") + " " + t("Your_Account") + "--"} label={t("Select_Bank")} options={bankOptions} onChange={handleChange} />
              <Input type="text" label={t("Account_Number")} name="number" onChange={handleChange} />
              <Button onClick={() => addCustomerBank(values)}>{t("Add_Bank")}</Button>
          </Modal>
      </BankAccountsContainer>
    </>
  )
}

export default BankAccounts