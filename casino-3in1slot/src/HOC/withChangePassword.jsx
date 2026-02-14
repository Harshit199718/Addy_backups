import React, { useCallback, useMemo, useState } from 'react'
import { useChangePasswordMutation, useWalletQuery } from '../api/hooks';
import { useNavigate } from 'react-router-dom';

function withChangePassword(WrappedComponent) {
    return (props) => {
      const [changePassword, {isLoading, isSuccess, error}] = useChangePasswordMutation();
      const {data: wallet} = useWalletQuery();
      
      const errors = useMemo(() => {
        if (error) {
            const {data}= error;
            const errorsObj={}
            for (const key in data) {
                if (Array.isArray(data[key])) {
                    errorsObj[key]=data[key][0];
                } else {
                    if (key==="old_password") {
                        errorsObj[key]=data[key][key];
                    } else {
                        errorsObj[key]=data[key];
                    }
                }
            }
            return errorsObj
        }
        return {};
      }, [error])
      
      const resetHandler = useCallback((values) => {
            changePassword({userId: wallet?.user?.id, payload: values});
      }, [wallet?.user?.id])
      const handleReset = useCallback((values) => {
          resetHandler(values)
      }, [wallet?.user?.id])
    return WrappedComponent(props, {handleReset, isLoading, errors, isSuccess})
  }
}

export default withChangePassword