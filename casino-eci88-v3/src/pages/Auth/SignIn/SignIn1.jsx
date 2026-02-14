import React, { useEffect } from "react";
import Form from "../../../components/common/Form";
import { AuthWrapper } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import Button from "../../../components/common/Button";
import AuthForm from "../AuthForm";
import AuthImage from "../AuthImage";
import withLogin from "../../../HOC/withLogin";
import useInitialValues from "../../../hooks/useInitialValues";
import { useTranslation } from "react-i18next";
import { setSignupSuccess } from "../../../app/slices/userSlice";
import { useDispatch } from "react-redux";

function SignIn(props, {isLoading, handleLogin, errors}) {
    const {fields, links} = useInitialValues("signin");
    const { t } = useTranslation();
    const dispatch = useDispatch();
    
    const handleSubmit = (values) => {
        handleLogin(values)
    }
    useEffect(() => {
      dispatch(setSignupSuccess(false));
    }, [])
    
  return (
    <AuthWrapper>
      <Loading isLoading={isLoading} />
      <AuthImage />
      <AuthForm title={t("LOGIN")} linksTitle={t("Do_Not_Have")} links={links}>
        <Form allFields={fields} onSubmit={handleSubmit} errors={errors}>
            <Button type="submit">{t("LOGIN")}</Button>
        </Form>
      </AuthForm>
    </AuthWrapper>
  );
}

export default React.memo(withLogin(SignIn));
