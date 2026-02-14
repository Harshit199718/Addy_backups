import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { AuthForm2Container } from "../../Auth/Auth.styled";
import LayoutSpacing from "../../../features/Layout/LayoutSpacing";
import Withdraw2Tabs from "../Withdraw/Withdraw2Tabs";
import withDeposit from "../../../HOC/withDeposit";
import TelcoPayProvider from "../TelcoPayProvider";
import CouponCode from "../CouponCode";
import BankList from "../../../features/BankList/BankList";
import Input from "../../../components/common/Input";
import Upload from "../../../components/common/Upload/Upload";
import BonusSelection from "../../../features/BonusSelection/BonusSelection";
import Button from "../../../components/common/Button";
import useImports from "../../../hooks/useImports";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import { LayoutCard } from "../../../components/common/LayoutCard/LayoutCard.styled";
import Loading from "../../../components/common/Loading";
import { imgToBase64 } from "../../../utils/helper";

function DepositForm2({
  initialValues,
  id,
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
  const { BankList, Upload } = useImports();
  const { t } = useTranslation();
  const [values, setValues] = useState(initialValues);
  const { inputs_bg } = useSelector(selectConfigData);

  useEffect(() => {
    if (initialValues) {
      setValues(initialValues);
    }
  }, [id]);
  
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

  const handleDeposit = () => {
    depositHandler(values);
  };
  const inputStyles = useMemo(() => {
    return {
      $background: inputs_bg,
      $borderRadius: "0",
      $borderColor: "#171717",
      $padding: "6px 12px",
      $color: "#838383",
    };
  }, [inputs_bg]);
  return (
    <>
      {showProviders ? (
        <LayoutCard>
          <TelcoPayProvider onChange={handleChange} />
        </LayoutCard>
      ) : null}
      {showCoupon ? 
      <LayoutCard>
        <CouponCode values={values} setValues={setValues} /> 
      </LayoutCard>
      : null}

      {showAmounts ? (
        <LayoutCard>
          <Input
            label={t("Amount")}
            type="number"
            name="amount"
            value={values.amount}
            onChange={handleChange}
            {...inputStyles}
          />
          <p className="amount-needed">{t("Total_Amount_Need")} <span>{values.amount}</span></p>
        </LayoutCard>
      ) : null}

      {showBanks ? (
        <LayoutCard>
          <Suspense fallback={<Loading isLoading={true} />}>
            <BankList name="merchant_bank_account" label={t("To_Number")} onChange={handleChange} />
          </Suspense>
        </LayoutCard>
      ) : null}
      {id==="easypay_manual_deposit" && showBanks ? (
        <LayoutCard>
          <Suspense fallback={<Loading isLoading={true} />}>
            <BankList name="easypay_bank_id" label={t("To_Number")} onChange={handleChange} />
          </Suspense>
        </LayoutCard>
      ) : null}
      {paymentOptions && paymentOptions.length ? (
        <LayoutCard>
          <Input
            type="select"
            name="bankcode"
            options={paymentOptions}
            onChange={handleChange}
            {...inputStyles}
          />
        </LayoutCard>
      ) : null}
      {showUpload ? (
        <Suspense fallback={<Loading isLoading={true} />}>
          <Upload label="Bank Slip" onChange={handleImageUpload} />
        </Suspense>
      ) : null}
      {/* <BonusSelection onChange={handleBonusSelect} /> */}
      <Button onClick={handleDeposit}>{t("deposit")}</Button>
      {children}
    </>
  );
}

export default withDeposit(DepositForm2);
