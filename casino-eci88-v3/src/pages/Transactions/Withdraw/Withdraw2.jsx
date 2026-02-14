import React, { useCallback, useMemo, useState } from "react";
import styled from "styled-components";
import LayoutSpacing from "../../../features/Layout/LayoutSpacing";
import Button from "../../../components/common/Button";
import withWithdraw from "../../../HOC/withWithdraw";
import Input from "../../../components/common/Input";
import {
  useCustomerBanksQuery,
  useStopAllProductsMutation,
  useWalletQuery,
} from "../../../api/hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import Loading from "../../../components/common/Loading";
import { LayoutCard } from "../../../components/common/LayoutCard/LayoutCard.styled";
import { AuthForm2Container } from "../../Auth/Auth.styled";
import Withdraw2Tabs from "./Withdraw2Tabs";
import { WithdrawContainer2 } from "./Withdraw2.styled";

export const OpionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;

  img {
    width: 40px;
  }
`;
function Withdraw2(props, { isLoading, handleWithdraw, errors }) {
  // const {fields} = useInitialValues("withdraw");
  const { t } = useTranslation();
  const { data: banks } = useCustomerBanksQuery();
  const { data: wallet } = useWalletQuery();
  const [stopAllProducts, { isLoading: isStopping }] =
    useStopAllProductsMutation();
  const [values, setValues] = useState({
    amount: "",
  });
  const { enable_chips, inputs_bg, withdraw_chip_bg } =
    useSelector(selectConfigData);
  const [creditOptions] = useState([
    {
      key: "CA",
      label: t("Cash"),
    },
    ...(enable_chips
      ? [
          {
            key: "CH",
            label: t("Chips"),
          },
        ]
      : []),
  ]);
  const [selectedBank, setSelectedBank] = useState("");

  const bankOptions = useMemo(() => {
    if (!banks) {
      return [];
    } else {
      return banks?.map((bank) => ({
        key: bank.id,
        label: (
          <OpionLabel key={bank?.id}>
            {bank.name} {bank.number}
          </OpionLabel>
        ),
      }));
    }
  }, [banks]);
  const handleSubmit = (event) => {
    event.preventDefault();
    handleWithdraw({ ...values, errorTitle: "Withdraw" });
  };
  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === "credit_type") {
        setValues((prevValues) => ({
          ...prevValues,
          [name]: value,
          amount: value === "CA" ? wallet?.balance : wallet?.chips_balance,
        }));
      } else if (name === "customer_bank_account") {
        const sBank = banks.filter((bank) => bank.id === value)[0];
        setSelectedBank(sBank);
      }
      setValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    [wallet]
  );
  const inputStyles = useMemo(() => {
    return {
      $background: inputs_bg,
      $borderRadius: "0",
      $borderColor: "#e4ae60",
      $padding: "6px 12px",
      $color: "#fff"
    };
  }, [inputs_bg]);
  
  useEffect(() => {
    stopAllProducts()
  }, [])
  
  return (
    <AuthForm2Container>
      <WithdrawContainer2>
        <LayoutSpacing>
          <Withdraw2Tabs />
        </LayoutSpacing>
          <Loading isLoading={isLoading || isStopping} />
          <LayoutSpacing>
            <LayoutCard>
              <Input
                label={t("To_Number")}
                type="select"
                name="customer_bank_account"
                placeholder={"--" + t("Choose") + " " + t("Your_Account") + "--"}
                options={bankOptions}
                onChange={handleChange}
                error={errors ? errors["customer_bank_account"] : null}
                {...inputStyles}
              />
            </LayoutCard>
            <LayoutCard>
              <Input
                label={t("Credit_Type")}
                type="select"
                name="credit_type"
                placeholder={"--" + t("Choose") + " " + t("Credit_Type") + "--"}
                options={creditOptions}
                onChange={handleChange}
                error={errors ? errors["credit_type"] : null}
                {...inputStyles}
              />
            </LayoutCard>
            <LayoutCard>
              <Input
                label={t("Amount")}
                type="text"
                name="amount"
                placeholder={t("Amount")}
                value={values.amount}
                readOnly
                error={errors ? errors["amount"] : null}
                {...inputStyles}
              />
              <p className="amount-needed">{t("Total_Amount_Need")} <span>{values.amount}</span></p>
            </LayoutCard>
            <div className="withdraw-buttons">
              <Button $background={withdraw_chip_bg} $width="48%" onClick={() => stopAllProducts()}>
                {t("Refresh")}
              </Button>
              <Button $width="48%" onClick={handleSubmit}>
                {t("withdraw")}
              </Button>
            </div>
          </LayoutSpacing>
          <p className="refresh-msg">{t("Refresh_before_submit")}</p>
      </WithdrawContainer2>
    </AuthForm2Container>
  );
}

export default withWithdraw(Withdraw2);
