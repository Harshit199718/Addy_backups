import React, { useCallback, useEffect } from "react";
import { useActivateMutation } from "../api/hooks";
import { useNavigate, useParams } from "react-router-dom";

function withActivate(WrappedComponent) {
  return (props) => {
    const [activate, {isSuccess, isError, error}] = useActivateMutation();
    const navigate = useNavigate();
    const {id} = useParams();
    const handleActivate = useCallback((values) => {
        activate({...values, id});
    }, []);
    useEffect(() => {
      if (isSuccess) {
        navigate(`/`);
      }
    }, [isSuccess]);

    return WrappedComponent(props, { handleActivate, isError, error });
  };
}

export default withActivate;
