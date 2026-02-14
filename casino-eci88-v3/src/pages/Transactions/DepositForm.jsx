import React, { Suspense, useCallback, useEffect, useState } from "react";
import Upload from "../../components/common/Upload/Upload";
import BonusSelection from "../../features/BonusSelection/BonusSelection";
import { useParams } from "react-router-dom";
import Button from "../../components/common/Button";
import BankList from "../../features/BankList/BankList";
import { DepositFormContainer } from "./Transactions.styled";
import { imgToBase64 } from "../../utils/helper";
import withDeposit from "../../HOC/withDeposit";
import Select from "../../components/common/Select";
import Input, { ErrorMessage } from "../../components/common/Input";
import { useTranslation } from "react-i18next";
import TelcoPayProvider from "./TelcoPayProvider";
import CouponCode from "./CouponCode";
import useImports from "../../hooks/useImports";
import Loading from "../../components/common/Loading";
import { addThousandSeparator } from "../../components/common/NumberConvertion";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

function DepositForm({
  initialValues,
  id: depositId,
  accountName: depositName,
  depositHandler,
  showBanks,
  showUpload,
  showProviders,
  showCoupon,
  showAmounts,
  paymentOptions,
  error,
  showEasypayBanks,
  easypayBanks,
  children,
}) {
  const { BankList, Upload } = useImports();
  const { id = depositId, accountName = depositName } = useParams();
  const { t } = useTranslation();
  const { deposit_amount_list, country } = useSelector(selectConfigData);
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
  const [values, setValues] = useState(initialValues);

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
      setValues((prevValues) => ({
        ...prevValues,
        promotion: bonus,
      }));
    } else {
      setValues(({ promotion, ...restValues }) => ({
        ...restValues,
      }));
    }
  };
  const handleDeposit = () => {
    depositHandler(values);
  };
  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [id]);
  return (
    <DepositFormContainer>
      <h2 className="deposit_heading">{accountName ? accountName : id}</h2>
      {showProviders ? <TelcoPayProvider onChange={handleChange} /> : null}
      {showCoupon ? <CouponCode values={values} setValues={setValues} /> : null}
      {showBanks ? (
        <Suspense fallback={<Loading isLoading={true} />}>
          <BankList name={id==="easypay_manual_deposit" ? "easypay_bank_id" : "merchant_bank_account"} onChange={handleChange} />
        </Suspense>
      ) : null}
      {/* {showEasypayBanks ? (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Input
            type="select"
            label={"Select Bank"}
            name="easypay_bank_id"
            error={error?.data?.easypay_bank_id}
            options={easypayBanks}
            onChange={handleChange}
          />
        </Suspense>
      ) : null} */}

      {showAmounts ? (
        <>
          <Input
            type="number"
            error={error?.data?.amount}
            name="amount"
            value={values.amount}
            placeholder={t("Amount")}
            onChange={handleChange}
          />
          <div className="amount-list">
            {deposit_amount_list
              ? deposit_amount_list?.split(",").map((amount) => (
                  <button
                    key={amount}
                    className="amount"
                    onClick={() =>
                      handleChange({
                        target: { name: "amount", value: Number(amount) },
                      })
                    }
                  >
                    {addThousandSeparator(amount, country, 0)}
                  </button>
                ))
              : amountList.map((amount) => (
                  <button
                    key={amount}
                    className="amount"
                    onClick={() =>
                      handleChange({
                        target: { name: "amount", value: Number(amount) },
                      })
                    }
                  >
                    {addThousandSeparator(amount, country, 0)}
                  </button>
                ))}
          </div>
        </>
      ) : null}
      {paymentOptions && paymentOptions.length ? (
        id?.includes("dgpay") ? (
          <Input
            type="select"
            label={t("Please_select_an_option")}
            error={error?.data?.bankcode}
            name="bankcode"
            options={paymentOptions}
            onChange={handleChange}
          />
        ) : id?.includes("quickpay") ? (
          <Input
            type="select"
            label={t("Please_select_an_option")}
            error={error?.data?.channel}
            name="channel"
            options={paymentOptions}
            onChange={handleChange}
          />
        ) : null
      ) : null}
      {showUpload ? (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Upload label="Bank Slip" onChange={handleImageUpload} />
          <ErrorMessage>{error?.data?.proof}</ErrorMessage>
        </Suspense>
      ) : null}
      {!showProviders && <BonusSelection onChange={handleBonusSelect} />}
      <Button onClick={handleDeposit}>{t("deposit")}</Button>
      {children}
    </DepositFormContainer>
  );
}

export default withDeposit(DepositForm);
