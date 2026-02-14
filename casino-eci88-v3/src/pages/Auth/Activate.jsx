import React from "react";
import { AuthWrapper, BankDetailsHeader, BankDetailsWarning } from "./Auth.styled";
import Loading from "../../components/common/Loading";
import AuthImage from "./AuthImage";
import AuthForm from "./AuthForm";
import Form from "../../components/common/Form";
import Button from "../../components/common/Button";
import useInitialValues from "../../hooks/useInitialValues";
import withActivate from "../../HOC/withActivate";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import Steps from "../../components/common/Steps/Steps";

function Activate(props, {isLoading, handleActivate, errors, isError, error}) {
  const { fields } = useInitialValues("activate");
  const { t } = useTranslation();
  const {step} = useParams();

  const handleSubmit = (values) => {
    handleActivate(values);
  };
  return (
    <AuthWrapper>
      <Loading isLoading={isLoading} />
      <AuthImage />
      <AuthForm>
        <BankDetailsHeader>
          <h1 className="title">{t("Bank_Details")}</h1>
          <h2 className="sub-title">{t("Bank_Account_Withdrawal")}.</h2>
        </BankDetailsHeader>
        {
          step?
          <Steps totalSteps={2} currentStep={step} />
          :null
        }
        <Form allFields={fields} onSubmit={handleSubmit} errors={isError && error.data}>
          {isError && <span style={{ color: "red" }}>{t(error.data.non_field_errors)}</span>}
          <BankDetailsWarning>⚠️ {t("Bank_Account_Ensure_Warning")} </BankDetailsWarning>
          <Button type="submit">{t("Save_And_Continue")}</Button>
        </Form>
      </AuthForm>
    </AuthWrapper>
  );
}

export default withActivate(Activate);
