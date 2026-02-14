import React, { useState, useEffect } from "react";
import { AuthWrapper } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import AuthImage from "../AuthImage";
import AuthForm from "../AuthForm";
import Form from "../../../components/common/Form";
import Button from "../../../components/common/Button";
import useInitialValues from "../../../hooks/useInitialValues";
import withRegister from "../../../HOC/withRegister";
import { useTranslation } from "react-i18next";

function SignUpV5(props, {isLoading, handleRegister, errors}) {
  const fromRefer = localStorage.getItem("from_refer");
  const { links } = useInitialValues("signup");
  const { t } = useTranslation();
  const [fields, setFields] = useState([
    {
      type: "text",
      name: "username",
      placeholder: t("Username"),
      label: t("Username"),
    },
    {
      type: "password",
      name: "password",
      placeholder: t("Password"),
      label: t("Password"),
    },
    {
      name: "password2",
      type: "password",
      placeholder: `${t("Confirm")} ${t("Password")}`,
      label: `${t("Confirm")} ${t("Password")}`,
    },
    {
      name: "referrer_code",
      type: "text",
      placeholder: `${t("Referral_Code")}`,
      label: `${t("Referral_Code")}`,
      optional: true,
      value: fromRefer,
      disabled: fromRefer
    },
  ])

  const handleSubmit = (values) => {
    handleRegister(values)
  };
  return (
    <AuthWrapper>
      <Loading isLoading={isLoading} />
      <AuthImage />
      <AuthForm
        title={t("REGISTER")}
        linksTitle={t("Have_An_Account")}
        links={links}
      >
        <Form allFields={fields} onSubmit={handleSubmit} errors={errors}>
          <Button type="submit">{t("REGISTER")}</Button>
        </Form>
      </AuthForm>
    </AuthWrapper>
  );
}

export default withRegister(SignUpV5);
