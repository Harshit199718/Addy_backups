import React, { useState } from 'react'
import { AuthWrapper } from '../Auth.styled';
import Loading from '../../../components/common/Loading';
import AuthImage from '../AuthImage';
import AuthForm from '../AuthForm';
import Form from '../../../components/common/Form';
import Button from '../../../components/common/Button';
import useInitialValues from '../../../hooks/useInitialValues';
import { useTranslation } from 'react-i18next';
import withForgetPassword from '../../../HOC/withForgetPassword';
import Input from '../../../components/common/Input';

function ForgetPasswordV2(props, {isLoading, handleReset, errors, otpSent, otpVerified}) {
    const { fields } = useInitialValues("forget-password");
    const { t } = useTranslation();
    const [resetValues, setResetValues] = useState({})
    const handleChange = (event) => {
      const {name, value} = event.target;
      setResetValues({
        [name]: value
      })
    }
    const handleSubmit = (values) => {
      handleReset({...values, ...resetValues}, otpSent, otpVerified);
    };
    return (
      <AuthWrapper>
        <Loading isLoading={isLoading} />
        <AuthImage />
        <AuthForm title={t("Forget_Password")}>
          <Form allFields={[]} onSubmit={handleSubmit} errors={errors}>
            <Input type="text" placeholder={t("Username")} name="username" onChange={handleChange} />
            <div className="request-otp" style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px"}}>
                  <Input type="text" placeholder="SMS OTP" name="code" disabled={!otpSent || otpVerified} onChange={handleChange} />
                  <div className="request-otp-btn">
                    <Button type="submit" $width="auto">{t("REQUEST_OTP")}</Button>
                    {
                      otpSent?
                      <p>Next OTP: <span ref={timerRef}>60</span> Sec</p>
                      :null
                    }
                  </div>
              </div>
            {
              otpVerified?
              <>
                <Input type="password" name="password" label="Password: " onChange={handleChange} error={errors?errors[field.name]:null} />
                <Input type="password" name="password2" label="Current Password: " onChange={handleChange} error={errors?errors[field.name]:null} />
                <Button type='submit'>{t("Next")}</Button>
              </>
              :null
            }
          </Form>
        </AuthForm>
      </AuthWrapper>
    );
}

export default withForgetPassword(ForgetPasswordV2);