import React, { useEffect } from "react";
import { useLogoutMutation } from "../../api/hooks";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/slices/userSlice";

function useAuth() {
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = (cb) => {
    logout();
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("user");
      dispatch(setCurrentUser(null));
    }
  }, [isSuccess]);

  return { logoutHandler, isLoading };
}

export default useAuth;
