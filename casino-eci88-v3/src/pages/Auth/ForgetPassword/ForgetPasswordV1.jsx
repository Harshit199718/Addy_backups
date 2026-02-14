import React from 'react'
import { AuthWrapper } from '../Auth.styled';
import Loading from '../../../components/common/Loading';
import AuthImage from '../AuthImage';
import AuthForm from '../AuthForm';
import Form from '../../../components/common/Form';
import Button from '../../../components/common/Button';
import useInitialValues from '../../../hooks/useInitialValues';
import { useTranslation } from 'react-i18next';
import withForgetPassword from '../../../HOC/withForgetPassword';

function ForgetPasswordV1(props, {isLoading, handleReset, errors}) {
    const { fields } = useInitialValues("forget-password");
    const { t } = useTranslation();

    const handleSubmit = (values) => {
      handleReset(values);
    };
    return (
      <AuthWrapper>
        <Loading isLoading={isLoading} />
        <AuthImage />
        <AuthForm title={t("Forget_Password")}>
          <Form allFields={fields} onSubmit={handleSubmit} errors={errors}>
            <Button type="submit">{t("Next")}</Button>
          </Form>
        </AuthForm>
      </AuthWrapper>
    );
}

export default withForgetPassword(ForgetPasswordV1);