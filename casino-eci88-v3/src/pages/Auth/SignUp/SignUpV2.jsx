import React, { useEffect, useRef, useState } from "react";
import { AuthWrapper } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import AuthImage from "../AuthImage";
import AuthForm from "../AuthForm";
import Form from "../../../components/common/Form";
import Button from "../../../components/common/Button";
import useInitialValues from "../../../hooks/useInitialValues";
import withRegister from "../../../HOC/withRegister";
import { useTranslation } from "react-i18next";
import Input from "../../../components/common/Input";
import Steps from "../../../components/common/Steps/Steps";
import { afterTacSent, isTacSent } from "../../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SignUpV2(props, {isLoading, handleRegister, handleVerifyTac, legacyData, errors}) {
  const { fields, links } = useInitialValues("signup");
  const fromRefer = localStorage.getItem("from_refer");
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef();
  const [values, setValues] = useState({
      username: "",
      password: "",
      password2: "",
      mobile: "",
      cc: "",
      ...(fromRefer && { referrer_code: fromRefer })
  });
    const [verified, setVerified] = useState(false);
    const [verifiedError, setVerifiedError] = useState('');
    const tacSuccess = useSelector(isTacSent);

    useEffect(() => {
      let interval, timeout;
      if (tacSuccess) {
        timeout = setTimeout(() => {
          dispatch(afterTacSent(false));
        }, 60000);
        interval = setInterval(() => {
          const time = parseInt(timerRef.current.textContent);
          if (time<=1) {
            timerRef.current.textContent=(60)
          } else {
            timerRef.current.textContent=(time-1)
          }
        }, 1000);
      } else {
        clearInterval(interval);
        clearTimeout(timeout);
      }
    }, [tacSuccess])
    
    const handleChange = async (event) => {
        setVerifiedError('')
        const {name, value, extraValues} = event.target;
        if (name==="tac") {
          if (value.length===5) {
            const isSuccess = await handleVerifyTac({tac: value, id: legacyData?.id})
            if(isSuccess){
              setVerified(isSuccess)
            } else {
              setVerifiedError(t("OTP_VERIFIED_FAILED"))
            }
            dispatch(afterTacSent(false));
          }
          return
        }
        setValues(prevValues=>({
            ...prevValues,
            [name]: value,
            ...extraValues
        }))
    }
  const handleSubmit = () => {
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
        <Steps totalSteps={2} currentStep={1} />
        <Form allFields={[]} onSubmit={handleSubmit} errors={errors}>
            {
                fields?.map(field=>(
                    <Input key={field?.name} {...field} onChange={handleChange} error={errors?errors[field.name]:null} />
                ))
            }
            <div className="request-otp" style={{display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px"}}>
                <Input type="text" placeholder="SMS OTP" name="tac" onChange={handleChange} error={verifiedError}/>
                <div className="request-otp-btn">
                  <Button type="submit" $width="auto" disabled={tacSuccess}>{t("REQUEST_OTP")}</Button>
                  {
                    tacSuccess?
                    <p>Next OTP: <span ref={timerRef}>60</span> Sec</p>
                    :null
                  }
                </div>
            </div>
        </Form>
          <Button disabled={!verified} onClick={() => {
            if (verified) {
              navigate(`/activate/${legacyData?.id}/2`);
            }
          }}>{t("REGISTER")}</Button>
      </AuthForm>
    </AuthWrapper>
  );
}

export default withRegister(SignUpV2);
