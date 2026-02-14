import React, { useCallback, useEffect, useState } from 'react'
import { useDirectRegisterMutation, useNewRegisterMutation, useRegisterMutation, useRegisterWithBankMutation, useVerifyLegacyMutation } from '../api/hooks'
import { useSelector } from 'react-redux';
import { isTacSent } from '../app/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { selectConfigData } from '../api/generalApi';

function withRegister(WrappedComponent) {
  return (props) => {
    const [register, {data}] = useRegisterMutation();
    const [newRegister, {data: legacyData, error}] = useNewRegisterMutation();
    const [registerWithBank, {error: registerBankErrors}] = useRegisterWithBankMutation();
    const [directRegister, { isSuccess: isDirectRegisterSuccess, error: directRegisterErrors}] = useDirectRegisterMutation();
    const [verifyLegacy] = useVerifyLegacyMutation();
    const tacSuccess = useSelector(isTacSent);
    const {signup_version} = useSelector(selectConfigData);
    const navigate = useNavigate();
    const [errors, setErrors] = useState(null)

    useEffect(() => {
      if (!error && !registerBankErrors && !directRegisterErrors) return;
      const {data}= error || registerBankErrors || directRegisterErrors;
      const errorsObj={}
      for (const key in data) {
          if (Array.isArray(data[key])) {
              errorsObj[key]=data[key][0];
          } else {
              errorsObj[key]=data[key];
          }
      }
      setErrors(errorsObj);
    }, [error, registerBankErrors, directRegisterErrors])
    
    // useEffect(() => {
    //   if (isDirectRegisterSuccess) {
    //     navigate("/")
    //   }
    // }, [isDirectRegisterSuccess])
    
    const handleRegister = useCallback((values) => {
      if ((!signup_version || (signup_version==="V1"))) {
        register(values);
      } else if ((signup_version==="V2") || signup_version==="V4") {
        newRegister(values)
      } else if (signup_version==="V3") {
        registerWithBank(values)
      } else if (signup_version==="V5") {
        directRegister(values)
      }
    }, []);
    const handleVerifyTac = async (values) => {
      try {
        await verifyLegacy(values).unwrap();
        return true;
      } catch (error) {
        return false
      }
    }
    useEffect(() => {
      if (tacSuccess && data) {
        if ((!signup_version || (signup_version==="V1"))) {
          navigate(`/verify-tac/${data?.id}`)
        }
      }
    }, [tacSuccess, data])
    
    return WrappedComponent(props, {handleRegister, handleVerifyTac, legacyData, errors});
  }
}

export default withRegister