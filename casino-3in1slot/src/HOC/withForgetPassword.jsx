import React, { useCallback, useMemo, useState } from 'react'
import { useRequestOTPV2Mutation, useResetPasswordV2Mutation, useResetTacMutation, useVerifyResetV2Mutation } from '../api/hooks';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../api/generalApi';

function withForgetPassword(WrappedComponent) {
    return (props) => {
      const [resetTac, {isLoading}] = useResetTacMutation();
      const [requestOTPV2, {isLoading: isGettingTac}] = useRequestOTPV2Mutation();
      const [verifyResetV2, {isLoading: isVerifying}] = useVerifyResetV2Mutation();
      const [resetPasswordV2, {isLoading: isReseting}] = useResetPasswordV2Mutation();
      const [errors, setErrors] = useState({});
      const [otpSent, setOtpSent] = useState(false);
      const [otpVerified, setOtpVerified] = useState(false);
      const navigate = useNavigate();
      const {signup_version, login_style} = useSelector(selectConfigData);
      
      const resetHandler = async (values, otpSent, otpVerified) => {
        try {
            // if (signup_version!=="V1" && login_style!=="4") {
            //     if (otpVerified) {
            //         const result = await resetPasswordV2(values).unwrap();
            //         if (result) {
            //             navigate(`/signin`)
            //         }
            //     } else if (otpSent) {
            //         const result = await verifyResetV2(values).unwrap();
            //         if (result) {
            //             setOtpVerified(true);
            //         }
            //     } else {
            //         const result = await requestOTPV2(values).unwrap();
            //         if (result) {
            //             setOtpSent(true);
            //         }
            //     }
            // } else {
                const result = await resetTac(values).unwrap();
                if (result) {
                    setErrors({});
                    navigate(`/verify-tac/${result?.id}/${values?.mobile}`)
                }
            // }
        } catch (error) {
            const {data}= error;
            const errorsObj={}
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    errorsObj["mobile"]=data[key][0];
                } else {
                    errorsObj["mobile"]=data[key];
                }
            }
            setErrors(errorsObj);
        }
      }
      const handleReset = useCallback((values) => {
          resetHandler(values, otpSent, otpVerified)
      }, [])
    return WrappedComponent(props, {handleReset, isLoading, errors, otpSent, otpVerified})
  }
}

export default withForgetPassword