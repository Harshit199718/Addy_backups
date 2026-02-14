import React from "react";
import { AuthWrapper } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import AuthImage from "../AuthImage";
import AuthForm from "../AuthForm";
import Form from "../../../components/common/Form";
import Button from "../../../components/common/Button";
import useInitialValues from "../../../hooks/useInitialValues";
import withRegister from "../../../HOC/withRegister";
import { useTranslation } from "react-i18next";

function Classic(props, {isLoading, handleRegister, errors}) {
  const { fields, links } = useInitialValues("signup");
  const { t } = useTranslation();


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

export default withRegister(Classic);
