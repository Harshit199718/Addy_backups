import React, { useMemo } from "react";
import { AuthWrapper } from "./Auth.styled";
import Loading from "../../components/common/Loading";
import AuthImage from "./AuthImage";
import AuthForm from "./AuthForm";
import Form from "../../components/common/Form";
import Button from "../../components/common/Button";
import useInitialValues from "../../hooks/useInitialValues";
import withVerifyTac from "../../HOC/withVerifyTac";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

function VerifyTac(props, {isLoading, handleVerify, errors}) {
  const { fields } = useInitialValues("verify-tac");
  const { t } = useTranslation();
  const {mobile} = useParams();

  const allFields = useMemo(() => {
    if (mobile && fields) {
      return [...fields, {
        type: "password",
        name: "password",
        placeholder: t("Password"),
        label: t("Password"),
      },]
    } else {
      return fields;
    }
  }, [mobile, fields])

  const handleSubmit = (values) => {
    handleVerify(values);
  };
  return (
    <AuthWrapper>
      <Loading isLoading={isLoading} />
      <AuthImage />
      <AuthForm title={`${t("Verify")} TAC`}>
        <Form allFields={allFields} onSubmit={handleSubmit} errors={errors}>
          {/* <Input type="password" name="password" /> */}
          <Button type="submit">{`${t("Verify")} OTP`}</Button>
        </Form>
      </AuthForm>
    </AuthWrapper>
  );
}

export default withVerifyTac(VerifyTac);
