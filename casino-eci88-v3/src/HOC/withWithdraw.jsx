import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useWalletQuery, useWithdrawMutation } from '../api/hooks';
import { setAutomaticMessagePayload } from '../app/slices/general';
import { useDispatch } from 'react-redux';

function withWithdraw(WrappedComponent) {
    return (props) => {
        const [withdraw, { isLoading }] = useWithdrawMutation();
        const navigate = useNavigate();
        const [errors, setErrors] = useState({})
        const { data: wallet } = useWalletQuery();
        const dispatch = useDispatch();

        const withdrawHandler = async (values) => {
            try {
                const result = await withdraw(values).unwrap();
                if (result) {
                    dispatch(setAutomaticMessagePayload({
                        type: "withdrawPending",
                        data: { username: wallet?.user?.username, amount: values.amount },
                    }))
                    setErrors({});
                    navigate("/history")
                }
            } catch (error) {
                const { data } = error;
                const errorsObj = {}
                if (data.non_field_errors || data.amount) {
                    const remark = data.non_field_errors?data.non_field_errors[0]:data.amount[0]
                    dispatch(setAutomaticMessagePayload({
                        type: "withdrawFailure",
                        data: { username: wallet?.user?.username, amount: values.amount, status: "Failed", remark},
                    }))
                }
                for (const key in data) {
                    if (Array.isArray(data[key])) {
                        errorsObj[key] = data[key][0];
                    } else {
                        errorsObj[key] = data[key];
                    }
                }
                setErrors(errorsObj);
            }
        }
        const handleWithdraw = useCallback((values) => {
            withdrawHandler(values);
        }, [wallet])

        return WrappedComponent(props, { handleWithdraw, isLoading, errors })
    }
}

export default withWithdraw