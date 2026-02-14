import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation, useVerifyTacMutation } from "../api/hooks";

function withVerifyTac(WrappedComponent) {
  return (props) => {
    const [verifyTac, {isSuccess}] = useVerifyTacMutation();
    const [resetPassword, {isSuccess: isResetSuccess}] = useResetPasswordMutation();
    const navigate = useNavigate();
    const {id, mobile} = useParams();
    const handleVerify = useCallback((values) => {
      if (!mobile) {
        verifyTac({...values, id});
      } else {
        resetPassword({...values, mobile});
      }
    }, []);
    useEffect(() => {
      if (isSuccess && !mobile) {
        navigate(`/activate/${id}`);
      } else if (isResetSuccess) {
        navigate(`/signin`);
      }
    }, [isSuccess, isResetSuccess]);

    return WrappedComponent(props, { handleVerify });
  };
}

export default withVerifyTac;
