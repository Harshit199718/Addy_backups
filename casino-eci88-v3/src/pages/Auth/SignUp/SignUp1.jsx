import React from "react";
import withRegister from "../../../HOC/withRegister";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import Classic from "./Classic";
import Legacy from "./Legacy";

function SignUp1() {
  const {signup_version} = useSelector(selectConfigData);
  return (!signup_version || (signup_version==="V1"))?<Classic />:<Legacy />;
}

export default withRegister(SignUp1);
