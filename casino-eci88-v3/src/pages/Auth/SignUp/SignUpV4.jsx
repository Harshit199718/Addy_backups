import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
import Captcha from "../../../components/common/Captcha";
import useSignUpValues from "./useSignUpV4Values";
import { selectConfigData } from "../../../api/generalApi";

function SignUpV4(
  props,
  { isLoading, handleRegister, handleVerifyTac, legacyData, errors }
) {
  const { t } = useTranslation();
  const { fields, links } = useSignUpValues();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef();
  const {country} = useSelector(selectConfigData);
  const fromRefer = localStorage.getItem("from_refer");
  const [values, setValues] = useState({
    account_name: "",
    password: "",
    password2: "",
    mobile: "",
    cc: country==="MY"?"60": "61",
    ...(fromRefer && { referrer_code: fromRefer })
  });
  const [verified, setVerified] = useState(false);
  const [captchaValue, setCaptchaValue] = useState({
    value: "",
  });
  const [allErrors, setAllErrors] = useState({});
  const tacSuccess = useSelector(isTacSent);

  useEffect(() => {
    setAllErrors(errors);
  }, [errors])
  

  useEffect(() => {
    let interval, timeout;
    if (tacSuccess) {
      timeout = setTimeout(() => {
        dispatch(afterTacSent(false));
      }, 60000);
      interval = setInterval(() => {
        const time = parseInt(timerRef.current.textContent);
        if (time <= 1) {
          timerRef.current.textContent = 60;
        } else {
          timerRef.current.textContent = time - 1;
        }
      }, 1000);
    } else {
      clearInterval(interval);
      clearTimeout(timeout);
    }
  }, [tacSuccess]);

  const handleChange = async (event) => {
    const { name, value, extraValues } = event.target;
    if (name === "tac") {
      if (value.length === 5) {
        const isSuccess = await handleVerifyTac({
          tac: value,
          id: legacyData?.id,
        });
        setVerified(isSuccess);
        dispatch(afterTacSent(false));
      }
      return;
    }
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      ...extraValues,
    }));
  };
  const handleSubmit = () => {
    if (captchaValue.value !== captchaValue.captcha) {
      captchaValue.setInvalid(true);
    } else if (values?.mobile?.slice(0, 2) !== "01") {
      setAllErrors({
        ...allErrors,
        mobile: "Mobile format is wrong, must start with 01"
      })
    } else {
      captchaValue.setInvalid(false);
      const mobile= values?.mobile?.slice(1)
      const updatedValues = {...values, mobile , username: (values?.cc + mobile)}
      handleRegister(updatedValues);
    }
  };
  const handleCaptcha = useCallback(
    (captcha, value, setInvalid) =>
      setCaptchaValue({ captcha, value, setInvalid }),
    []
  );
  return (
    <AuthWrapper>
      <Loading isLoading={isLoading} />
      <AuthImage />
      <AuthForm
        title={t("REGISTER")}
        linksTitle={t("Have_An_Account")}
        links={links}
      >
        <Form allFields={[]} onSubmit={handleSubmit} errors={errors}>
          {fields?.map((field) => (
            <Input
              key={field?.name}
              {...field}
              onChange={handleChange}
              error={allErrors ? field.name==="mobile"?allErrors["username"]:allErrors[field.name] : null}
              $borderRadius="4px"
              $padding="6px 12px"
              $fontSize="15px"
            />
          ))}
          <Captcha onChange={handleCaptcha} />
          <div
            className="request-otp"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
            <p className="note">
              Press GET CODE Button To Receive Verification Code Via SMS.
            </p>
            <Input
              type="text"
              placeholder="SMS OTP"
              name="tac"
              onChange={handleChange}
              $borderRadius="4px"
              $padding="6px 12px"
            />
            <div className="request-otp-btn">
              <Button
                type="submit"
                $width="auto"
                disabled={tacSuccess}
                $borderRadius="4px"
                $padding="8px 18px"
                $fontSize="15px"
              >
                {t("GET_OTP")}
              </Button>
              {tacSuccess ? (
                <p>
                  Next OTP: <span ref={timerRef}>60</span> Sec
                </p>
              ) : null}
            </div>
          </div>
        </Form>
        <Button
          disabled={!verified}
          onClick={() => {
            if (verified) {
              navigate(`/activate/${legacyData?.id}/`);
            }
          }}
        >
          {t("REGISTER")}
        </Button>
      </AuthForm>
    </AuthWrapper>
  );
}

export default withRegister(SignUpV4);
