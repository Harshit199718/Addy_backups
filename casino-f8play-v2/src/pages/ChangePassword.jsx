import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import Toast from "../components/common/Toast";
import useToast from "../useToast";
import Loading from "../components/common/Loading/Loading";

const initialValues = {
  old_password: "",
  password: "",
  password2: "",
};

function ChangePassword({ isLoggedIn, setOpenChangePswd }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState();
  const [changePswdLoading, setChangePswdLoading] = useState(false);
  const [values, setValues] = useState(initialValues);
  // const [toast, setToast] = useState(false);
  const [validations, setValidations] = useState({
    old_password: "",
    password: "",
    password2: "",
    refreshVal: "",
  });
  const {
    old_password: currentPW,
    password: newPW,
    password2: newPWConfirm,
    refreshVal,
  } = validations;
  const toast = useToast();

  const getWalletInfo = async () => {
    try {
      const wallet = await userService.getBalance()
      setUserId(wallet?.data.user.id)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (isLoggedIn) {
      getWalletInfo()
    }
  }, [isLoggedIn])

  const handleChange = (e) => {
    setValues((values) => {
      return { ...values, [e.target.name]: e.target.value };
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setChangePswdLoading(true)
    try {
      await authService.changePassword({ values, userId });
      // setTimeout(() => {
      //   setToast(true)
      // }, 5000)
      // setToast(false)
      toast.success(
        "The password modification has been completed successfully."
        // { theme: "dark" }
      );
      setChangePswdLoading(false)
      navigate("/");
    } catch (err) {
      setChangePswdLoading(false)
      console.log(err.response.data);
      setValidations({
        ...validations,
        old_password:
          err.response.data &&
          err.response.data.old_password &&
          err.response.data.old_password.old_password,
        password: err.response.data && err.response.data.password,
        password2: err.response.data && err.response.data.password2,
        refreshVal: err.response.data && err.response.data.detail,
      });
    }
  };

  return (
<>
<div className="bg-[#2256B2] max-h-[80vh] overflow-y-scroll change-pswd-container">
      {
        toast.ToastContainer
      }
      {/* <div className="change_pswd_header flex w-full items-center bg-[#06D6FA] justify-between">
        <p>Modify Password</p>
        <span
          className="rounded-full mr-9"
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <Icon
            icon="oi:x"
            fontSize={35}
            style={{ color: "#3C3339", fontWeight: 800 }}
          />
        </span>
      </div> */}
      <div className="change_pswd_inputs">
        <div className="">
          <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>Old password
          </p>
          <div className="not_null_text mt-auto"> {currentPW === "" ? "Must not be null" : validations.old_password}</div>
          </div>
          <div className="flex gap-x-24 flex-wrap">
            <input type="password" name="old_password" onChange={handleChange} />
            {/* <div className="not_null_text mt-auto"> {currentPW === "" ? "Must not be null" : validations.old_password}</div> */}
          </div>
        </div>
        <div className="md:pt-1 pt-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>New password
          </p>
            <div className="not_null_text mt-auto"> {newPW === "" ? "Must not be null" : validations.password}</div>
        </div>
          <div className="flex gap-x-24 flex-wrap">
            <input type="password" name="password" onChange={handleChange} />
            {/* <div className="not_null_text mt-auto"> {newPW === "" ? "Must not be null" : validations.password}</div> */}
          </div>
        </div>
        <div className="md:pt-1 pt-2">
        <div className="flex items-center justify-between">
          <p className="flex items-center">
            <span className="me-3">*</span>Confirm new password
          </p>
          <div className="not_null_text mt-auto"> {newPWConfirm === "" ? "Must not be null" : validations.password2}</div>
        </div>
          <div className="flex gap-x-24 flex-wrap">
            <input type="password" name="password2" onChange={handleChange} />
            {/* <div className="not_null_text mt-auto"> {newPWConfirm === "" ? "Must not be null" : validations.password2}</div> */}
          </div>
        </div>
        <div className="chnage_pswd_btns pt-2 gap-x-4 ">
          <div className="chnage_pswd_ok" onClick={handleSubmit}>OK</div>
          <div className="chnage_pswd_exit" onClick={(e) => {
            e.preventDefault();
            // navigate("/");
            setOpenChangePswd(false)
          }} >Exit</div>
        </div>
      </div>
    </div>
      {changePswdLoading && <Loading fullscreen />}
</>
  );
}

export default ChangePassword;
