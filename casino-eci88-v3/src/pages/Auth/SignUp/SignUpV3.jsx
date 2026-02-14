import React, { useCallback, useEffect, useState } from "react";
import { Auth2Title, AuthForm2, AuthForm2Container } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import Form from "../../../components/common/Form";
import Button from "../../../components/common/Button";
import withRegister from "../../../HOC/withRegister";
import useSignUpV3Values from "./useSignUpV3Values";
import Input from "../../../components/common/Input";
import Captcha from "../../../components/common/Captcha";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";

function SignUpV3(props, { isLoading, handleRegister, errors }) {
  const initValues = useSignUpV3Values();
  const {country} = useSelector(selectConfigData);
  const [values, setValues] = useState({
    cc: country==="MY"?"60": "61",
  });
  const [allErrors, setAllErrors] = useState({});
  const [captchaValue, setCaptchaValue] = useState({
    value: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    setAllErrors(errors);
  }, [errors]);

  const handleChange = async (event) => {
    const { name, value, extraValues } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      ...extraValues,
    }));
  };
  const handleCaptcha = useCallback(
    (captcha, value, setInvalid) =>
      setCaptchaValue({ captcha, value, setInvalid }),
    []
  );
  const handleSubmit = () => {
    if (captchaValue.value !== captchaValue.captcha) {
      captchaValue.setInvalid(true);
    } else if (values?.mobile?.slice(0, 2) !== "01") {
      setAllErrors({
        ...allErrors,
        mobile: "Mobile format is wrong, must start with 01",
      });
      captchaValue.setInvalid(false);
    } else {
        captchaValue.setInvalid(false);
        handleRegister(values);
    }
  };
  return (
    <>
      <Loading isLoading={isLoading} />
      {initValues?.map((val) => {
        return (
          <React.Fragment key={val?.heading}>
            <Auth2Title>{val?.heading}</Auth2Title>
            <AuthForm2>
              {val?.fields?.map((field) => (
                <Input
                  key={field?.name}
                  {...field}
                  onChange={handleChange}
                  error={allErrors ? allErrors[field.name] : null}
                />
              ))}
            </AuthForm2>
          </React.Fragment>
        );
      })}
      <AuthForm2>
        <Captcha onChange={handleCaptcha} />
        <Button $borderRadius={"25px"} onClick={handleSubmit}>
          {t("Register")}
        </Button>
      </AuthForm2>
    </>
  );
}

export default withRegister(SignUpV3);
