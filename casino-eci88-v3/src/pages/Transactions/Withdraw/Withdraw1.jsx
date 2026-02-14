import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { TransactionHeader, WalletContainer, WithdrawContainer } from '../Transactions.styled'
import LayoutSpacing from '../../../features/Layout/LayoutSpacing'
import Button from '../../../components/common/Button'
import withWithdraw from '../../../HOC/withWithdraw'
import Input from '../../../components/common/Input'
import OptimizedImage from '../../../components/common/OptimizedImage'
import { useCustomerBanksQuery, useStopAllProductsMutation, useWalletQuery } from '../../../api/hooks'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectConfigData } from '../../../api/generalApi'
import Loading from '../../../components/common/Loading'
import Image from '../../../components/common/Image'
import { addThousandSeparator } from '../../../components/common/NumberConvertion'

export const OpionLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 14px;

    img {
        width: 40px;
    }
`
function Withdraw(props, {isLoading, handleWithdraw, errors}) {
    // const {fields} = useInitialValues("withdraw");
  const { t } = useTranslation();
  const {data: banks} = useCustomerBanksQuery();
  const {data: wallet} = useWalletQuery();
  const [stopAllProducts, {isLoading: isStopping}] = useStopAllProductsMutation();
  const [values, setValues] = useState({
    amount: ""
  })
  const {enable_chips, currency_symbol, withdraw_title, country} = useSelector(selectConfigData);
  const [creditOptions] = useState([
    {
      key: "CA",
      label: t("Cash"),
    },
    ...(enable_chips?[{
      key: "CH",
      label: t("Chips"),
    }]:[]),
  ])
  const [selectedBank, setSelectedBank] = useState("")

    const bankOptions = useMemo(() => {
        if (!banks) {
            return [];
        } else {
            return banks?.map(bank=>({
                key: bank.id,
                label: (
                  <OpionLabel key={bank?.id}>
                    <OptimizedImage
                      src={bank.icon}
                      alt={bank.name}
                      width="40px"
                    />
                    {bank.name} {bank.number}
                  </OpionLabel>
                )
            }));
        }
    }, [banks])
    const handleSubmit = (event) => {
        event.preventDefault();
        handleWithdraw({...values, errorTitle: "Withdraw"});
    };
    const handleChange = useCallback((event) => {
      const {name, value} = event.target;
      if (name === "credit_type") {
          setValues(prevValues=>({
              ...prevValues,
              [name]: value,
              amount: value==="CA"?wallet?.balance:wallet?.chips_balance
          }))
      } else if (name === "customer_bank_account") {
        const sBank = banks.filter(bank=> bank.id === value)[0];
        setSelectedBank(sBank);
      }
      setValues(prevValues=>({
          ...prevValues,
          [name]: value
      }))
  }, [wallet])
  
  useEffect(() => {
    stopAllProducts()
  }, [])

  return (
    <WithdrawContainer>
        <Loading isLoading={isLoading || isStopping} />
        <TransactionHeader><Image src={withdraw_title} width="300px" /></TransactionHeader>
        <LayoutSpacing>
            <WalletContainer>
                <div className="wallet">
                    <h3 className="type">{t("Cash")}</h3>
                    <h3 className="value"><span>{currency_symbol}</span> {addThousandSeparator(wallet?.balance, country)}</h3>
                </div>
                {
                  enable_chips?
                  <>
                    <div className="divider" />
                    <div className="wallet">
                        <h3 className="type">{t("Chips")}</h3>
                        <h3 className="value"><span>{currency_symbol}</span> {addThousandSeparator(wallet?.chips_balance, country)}</h3>
                    </div>
                  </>
                  :null
                }
            </WalletContainer>
            <Input type="select" name="customer_bank_account" placeholder={"--"+ t("Choose") + " " + t("Your_Account") + "--"} options={bankOptions} onChange={handleChange} error={errors?errors["customer_bank_account"]:null} message={selectedBank?.number && <p className='text'>{t("Bank")} {t("Account_Number")}: {selectedBank?.number}</p>} />
            <Input type="select" name="credit_type" placeholder={"--"+ t("Choose") + " " + t("Credit_Type") + "--"} options={creditOptions} onChange={handleChange} error={errors?errors["credit_type"]:null} />
            <Input type="text" name="amount" placeholder={t("Amount")} value={addThousandSeparator(values.amount, country)} readOnly error={errors?errors["amount"]:null} />
            <div className='withdraw-buttons'>
              <Button $width="auto" onClick={() => stopAllProducts()}>{t("refresh")}</Button>
              <Button $width="auto" onClick={handleSubmit}>{t("withdraw")}</Button>
            </div>
        </LayoutSpacing>
    </WithdrawContainer>
  )
}

export default withWithdraw(Withdraw)