import React, { useCallback, useEffect } from "react";
import { useActivateMutation } from "../api/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupSuccess } from "../app/slices/userSlice";

function withActivate(WrappedComponent) {
  return (props) => {
    const [activate, {isSuccess, isError, error}] = useActivateMutation();
    // const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const handleActivate = useCallback((values) => {
        activate({...values, id});
    }, []);
    useEffect(() => {
      if (isSuccess) {
        dispatch(setSignupSuccess(true))
        // navigate(`/`);
      }
    }, [isSuccess]);

    return WrappedComponent(props, { handleActivate, isError, error });
  };
}

export default withActivate;
