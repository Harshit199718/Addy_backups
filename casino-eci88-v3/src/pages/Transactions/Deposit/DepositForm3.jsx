import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import Input, { ErrorMessage } from "../../../components/common/Input";
import {
  AmountButton,
  AmountButtons,
  DepositForm3Container,
} from "./Deposit3.styled";
import { useMerchantBanksQuery, useWalletQuery } from "../../../api/hooks";
import { useTranslation } from "react-i18next";
import withDeposit from "../../../HOC/withDeposit";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import Loading from "../../../components/common/Loading";
import useImports from "../../../hooks/useImports";
import { imgToBase64 } from "../../../utils/helper";
import Button from "../../../components/common/Button";
import { addThousandSeparator, convertNumberToCurrency } from "../../../components/common/NumberConvertion";
import TelcoPayProvider from "../TelcoPayProvider";
import CouponCode from "../CouponCode";
import TelcoPayProvider3 from "./TelcopayProvider3";
import { LayoutCard } from "../../../components/common/LayoutCard/LayoutCard.styled";
import BankList3 from "../../../features/BankList/BankList3";
import BankList from "../../../features/BankList/BankList";
import BonusSelection from "../../../features/BonusSelection/BonusSelection";

function DepositForm3({
  initialValues,
  id,
  accountId,
  accountName,
  depositHandler,
  showBanks,
  showUpload,
  showProviders,
  showCoupon,
  showAmounts,
  paymentOptions,
  error,
  children,
}) {
  const { Upload } = useImports();
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const { inputs_bg, deposit_amount_list, country } =
    useSelector(selectConfigData);
  const amountList = [
    "10",
    "30",
    "50",
    "100",
    "200",
    "250",
    "300",
    "500",
    "1000",
    "3000",
    "5000",
    "10000",
  ];

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [id, accountId]);
  
  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }, []);

  const handleImageUpload = async (file) => {
    const base64 = await imgToBase64(file);
    handleChange({
      target: {
        name: "proof",
        value: {
          title: file.name,
          base64,
        },
      },
    });
  };

  const handleBonusSelect = (bonus) => {
    if (bonus) {
        setValues(prevValues=>({
            ...prevValues,
            promotion: bonus
        }))
    } else {
        setValues(({promotion, ...restValues})=>({
            ...restValues,
        }))
    }
  }

  const handleDeposit = () => {
    depositHandler(values);
  };
  return (
    <LayoutCard>
      <DepositForm3Container>
        <h2 className="deposit-heading">{t(id?.toUpperCase())}</h2>
        {showProviders ? (
            <TelcoPayProvider3 onChange={handleChange} />
        ) : null}
        {showCoupon ? (
          <div id="coupons-input">
              <CouponCode values={values} setValues={setValues} />
          </div>
        ) : null}
        {showBanks ? (
          <BankList name={id==="easypay_manual_deposit" ? "easypay_bank_id" : "merchant_bank_account"} onChange={handleChange}/>
        ) : null}
        {
          paymentOptions && paymentOptions.length ?
            (id?.includes("dgpay")) ?
              <Input type="select" label={t("Please_select_an_option")} error={error?.data?.bankcode} name="bankcode" options={paymentOptions} onChange={handleChange} />
            :  id === "quickpay" ?
              <Input type="select" label={t("Please_select_an_option")} error={error?.data?.channel} name="channel" options={paymentOptions} onChange={handleChange} />
            : id === "quickpay-ewallet" ?
              <BankList3 label={t("Please_select_an_option")} name="channel" onChange={handleChange} paymentOptions={paymentOptions} value={values.channel}/>
            : null
          :null
        }
        {showAmounts ? (
          <>
            <AmountButtons>
              {deposit_amount_list
                ? deposit_amount_list?.split(",").map((amount) => (
                    <AmountButton
                      key={amount}
                      $active={values.amount == amount}
                      onClick={() =>
                        handleChange({
                          target: { name: "amount", value: Number(amount) },
                        })
                      }
                    >
                      {addThousandSeparator(amount, country, 0)}
                    </AmountButton>
                  ))
                : amountList.map((amount) => (
                    <AmountButton
                      key={amount}
                      $active={values.amount == amount}
                      onClick={() =>
                        handleChange({
                          target: { name: "amount", value: Number(amount) },
                        })
                      }
                    >
                      {addThousandSeparator(amount, country, 0)}
                    </AmountButton>
                  ))}
            </AmountButtons>
            <Input
              label={t("Amount")}
              type="number"
              name="amount"
              error={error?.data?.amount}
              value={addThousandSeparator(values.amount, country)}
              placeholder={t("Amount")}
              onChange={(e) => convertNumberToCurrency(e.target.value, country, handleChange)}
            />
          </>
        ) : null}
        {showUpload ? (
          <Suspense fallback={<Loading isLoading={true} />}>
            <Upload label="Bank Slip" onChange={handleImageUpload} />
            <ErrorMessage>{t(error?.data?.proof)}</ErrorMessage>
          </Suspense>
        ) : null}
        <BonusSelection onChange={handleBonusSelect} />
        <Button onClick={handleDeposit}>{t("deposit")}</Button>
        {children}
      </DepositForm3Container>
    </LayoutCard>
  );
}

export default withDeposit(DepositForm3);
