import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../components/common/Modal";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useDispatch, useSelector } from "react-redux";
import { useDepositMutation, useWalletQuery } from "../api/hooks";
import { selectConfigData } from "../api/generalApi";
import { useTranslation } from "react-i18next";
import { setAutomaticMessagePayload, setGlobalError } from "../app/slices/general";
import GetPaymentOptions from "../features/Deposit/GetPaymentOptions";
import VerifyV3 from "../pages/Auth/SignUp/VerifyV3";

const TranscationId = styled.p`
  text-align: center;
  color: ${props => props.theme.text_color};
`;
function withDeposit(WrappedComponent) {
  const getInitialValues = (pg, merchant_bank_account) => {
    const initialValues = {
      ttype: "PG",
      amount: "",
      pg,
    };
    if(pg?.includes("ewallet")) {
      if(pg === "dgpay-ewallet" || pg === "quickpay-ewallet"){
        return {
          ttype: "EW",
          amount: "",
          pg: pg.replace("-ewallet", ""),
        }
      } else {
        return {
          ttype: "EW",
          pg: pg.replace("-ewallet", ""),
          merchant_bank_account
        }
      }
    }
    switch (pg) {
      case "easypay_manual_deposit":
      case "manual":
        initialValues["ttype"] = "IB";
        delete initialValues["pg"];
        break;
      case "telcopay":
        initialValues["ttype"] = "TEC";
        initialValues["amount"] = "10";
        break;
      case "dgpay":
        // initialValues["provider"] = 10;
        break;

      default:
        break;
    }
    return initialValues;
  };

  return (props) => {
    const { t } = useTranslation();
    const [depositSuccessful, setDepositSuccessful] = useState("");
    const [openVerifyAccount, setOpenVerifyAccount] = useState(false);
    const { id = props.id, accountId = props.accountId } = useParams();
    const [deposit, { data, isSuccess, error }] = useDepositMutation();
    const { data: wallet } = useWalletQuery();
    const navigate = useNavigate();
    const { signup_version, phone_format, ...config } = useSelector(selectConfigData);
    const [amount, setAmount] = useState("")
    const dispatch = useDispatch("")
    useEffect(() => {
      if (isSuccess) {
        if (id !== "manual" && id !== "telcopay" && id !== "easypay_manual_deposit") {
          if(data.action){
            if (id === "dgpay" || id === "gspay" || id === "quickpay" || id === "quickpay-ewallet") {
              navigate('/history')
            }
          } else {
            dispatch(setGlobalError({
              message: t("dgpay_payment_failed")
            }))
          }
        } else {
          setDepositSuccessful(data.txid);
          dispatch(setAutomaticMessagePayload({
            type: "depositPending",
            data: {
              username: wallet?.user?.username,
              amount,
              depositId: data.txid
            }
          }))
        }
      }
    }, [isSuccess]);

    useEffect(() => {
      if (error) {
        const {non_field_errors} = error.data
        dispatch(setAutomaticMessagePayload({
          type: "depositFailure",
          data: { username: wallet?.user?.username, amount, status: "Failed", remark: non_field_errors ? non_field_errors[0] : "" },
        }))
      }
    }, [error])
    

    const depositHandler = (values) => {
      if (signup_version === "V5") {
        if (wallet?.registration_stage==="signup" || wallet?.registration_stage==="verify") {
          return setOpenVerifyAccount(true);
        }
      }
      setAmount(values.amount)
      deposit(values);
    };
    return (
      <WrappedComponent
        {...props}
        depositHandler={depositHandler}
        initialValues={getInitialValues(id, accountId)}
        showBanks={(id === "manual") || (id === "easypay_manual_deposit")}
        showUpload={(id === "manual") || (id === "easypay_manual_deposit")}
        showProviders={id === "telcopay"}
        showCoupon={id === "telcopay"}
        showAmounts={id !== "telcopay"}
        paymentOptions={(id?.includes("dgpay") || id?.includes("quickpay")) ? GetPaymentOptions(id, config, t) : null}
        error={error}
      >
        {depositSuccessful ? (
          <Modal
            title={t("Deposit Successful")}
            isOpen={true}
            onClose={() => {
              setDepositSuccessful("");
              navigate("/history");
            }}
          >
            <TranscationId>{t("Transaction_Id")}: {depositSuccessful}</TranscationId>
            <Button onClick={() => navigate("/history")}>{t("OK")}</Button>
          </Modal>
        ) : null}
        {openVerifyAccount ? (
          <Modal
            title={t("Verify Account")}
            isOpen={true}
            onClose={() => {
              setOpenVerifyAccount(false);
            }}
            $minWidth="60%"
          >
            <VerifyV3 setOpenVerifyAccount={setOpenVerifyAccount} />
          </Modal>
        ) : null}
      </WrappedComponent>
    );
  };
}

export default withDeposit;
