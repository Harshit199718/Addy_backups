import React, { Suspense } from "react";
import { AuthWrapper } from "../Auth.styled";
import Loading from "../../../components/common/Loading";
import AuthImage from "../AuthImage";
import AuthForm from "../AuthForm";
import Form from "../../../components/common/Form";
import Button from "../../../components/common/Button";
import useInitialValues from "../../../hooks/useInitialValues";
import { useTranslation } from "react-i18next";
import withForgetPassword from "../../../HOC/withForgetPassword";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import ForgetPasswordV1 from "./ForgetPasswordV1";
import ForgetPasswordV2 from "./ForgetPasswordV2";

function ForgetPassword(props, { isLoading, handleReset, errors }) {
  const { signup_version, login_style } = useSelector(selectConfigData);

  return (
  // (signup_version !== "V4" && login_style !== "4") ? (
    <Suspense fallback={<Loading isLoading />}>
      <ForgetPasswordV1 />
    </Suspense>
  // ) : (
  //   <Suspense fallback={<Loading isLoading />}>
  //     <ForgetPasswordV2 />
  //   </Suspense>
  );
}

export default ForgetPassword;
