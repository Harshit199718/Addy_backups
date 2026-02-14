import React, { useEffect, useState } from "react";
import authService from "../services/auth.service";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./SignIn.css";
import CryptoJS from "crypto-js";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Loading from "../components/common/Loading/Loading";
import tokenService from "../services/token.service";

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY

function SignIn({ deferredInstallPrompt, setDeferredInstallPrompt, isLoggedIn, setIsLoggedIn, appRef, setIsFullScreen, configData, toggleLiveChat }) {
  const [openAndroidInstall, setOpenAndroidInstall] = useState(false);
  const [openIOSInstall, setOpenIOSInstall] = useState(false);
  const [openIOSInstallButton, setOpenIOSInstallButton] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token_id = searchParams.get("token_id");

  useEffect(() => {
    if (token_id) {
      tokenService.removeUser();
      handleStealthLogin(token_id);
    }
  }, [token_id]);

  const handleStealthLogin = async (tokenId) => {
    setIsLoading(true);
    try {
      const { data } = await authService.stealthLogin(tokenId);
      if (data && data.access) {
        setTimeout(() => {
          tokenService.setUser(data);
          setIsLoading(false);
          navigate("/");
          setIsLoggedIn(true);
        }, 500);
      }
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  }
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
  useEffect(() => {
    if (isIos() && !isInStandaloneMode()) {
      setOpenIOSInstallButton(true);
    }
  }, []);

  const handleClickOpen = () => {
    setOpenAndroidInstall(true);
  };

  const handleClose = () => {
    setOpenAndroidInstall(false);
  };

  const handleIOSClose = () => {
    setOpenIOSInstall(false);
  };

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [payload, setPayload] = useState({
    username:(localStorage.getItem("remember_me") && localStorage.getItem("user_creds")) ? decryptData(JSON.parse(localStorage.getItem("user_creds")).username).toString(CryptoJS.enc.Utf8): "",
    password:(localStorage.getItem("remember_me") && localStorage.getItem("user_creds")) ? decryptData(JSON.parse(localStorage.getItem("user_creds")).password).toString(CryptoJS.enc.Utf8): "",
  });
  const [rememberMe, setRememberMe] = useState(localStorage.getItem("remember_me") ? localStorage.getItem("remember_me"): false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setPayload((prevPayload) => {
      prevPayload = { ...prevPayload, [e.target.name]: e.target.value };
      return prevPayload;
    });
  };

  function openFullscreen() {
    if (appRef.current.requestFullscreen) {
      appRef.current.requestFullscreen();
    } else if (appRef.current.webkitRequestFullscreen) {
      /* Safari */
      appRef.current.webkitRequestFullscreen();
    } else if (appRef.current.msRequestFullscreen) {
      /* IE11 */
      appRef.current.msRequestFullscreen();
    }
    setIsFullScreen(true);
  }
function encryptData(data) {
  return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY);
}
function decryptData(data) {
  return CryptoJS.AES.decrypt(data, ENCRYPTION_KEY);
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const response = await authService.login(payload);
      if (rememberMe) {
        const username = encryptData(payload.username).toString()
        const password = encryptData(payload.password).toString()
        localStorage.setItem("user_creds", JSON.stringify({username, password}));
        localStorage.setItem("remember_me", rememberMe);
      } else{
        localStorage.removeItem("remember_me");
      }
      if (response && response.access) {
        openFullscreen();
        setIsLoading(false)
        setIsLoggedIn(true);
        navigate("/lobby");
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error: ", error);
      if (error && error.response && error.response.data) {
        setErrors((prevErrors) => {
          if (error.response.data.username) {
            prevErrors = {
              ...prevErrors,
              username: error.response.data.username,
            };
          } else {
            prevErrors = {
              ...prevErrors,
              username: "",
            };
          }
          if (error.response.data.password) {
            prevErrors = {
              ...prevErrors,
              password: error.response.data.password,
            };
          } else {
            prevErrors = {
              ...prevErrors,
              password: "",
            };
          }
          return prevErrors;
        });
        if (error.response.data.password) {
          setErrors({
            ...errors,
            password: error.response.data.password,
          });
        }
      }
    }
  };

  if (isLoggedIn) {
    navigate("/");
    return;
  }
  return (
    <div className="login_page flex items-end justify-center w-full pb-3 relative" style={{ 
      backgroundPosition: "center", /* Center the image */
      backgroundRepeat : "no-repeat", /* Do not repeat the image */
      backgroundSize: "cover",
      height: "100%",
      backgroundImage: `url(${configData && configData.sign_in_background_image})`, 
    }}
    >
      <div className="login_container rounded-3xl relative">
        <div className="login_football absolute z-10">
          <img src={configData && configData.sign_in_left_model} alt="" />
        </div>
        <div className="login_model absolute z-10">
          <img src={configData && configData.sign_in_model} alt="" />
        </div>
        {/* <div className="login_crown w-1/5 flex items-center justify-center absolute left-2/4 -translate-x-1/2 rounded-3xl">
          <img
            src={require("../assets/images/Crown.png")}
            alt=""
            className="w-40"
          />
        </div> */}
        <div className="login_heading">
          <img src={configData && configData.logo_login} alt="" />
        </div>
        {/* <div className="w-6/12 flex items-center login_heading rounded-3xl">
          <img src={require("../assets/images/logo.png")} alt="" />
          <svg
            style={{ visibility: "hidden", position: "absolute" }}
            width="0"
            height="0"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
          >
            <defs>
              <filter id="round">
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="5"
                  result="blur"
                />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                  result="goo"
                />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div> */}

        <hr className="h-2.5 bg-[#063782]" style={{ height: "1vmin" }} />
        <hr className="h-6 bg-[#063782] mt-2" style={{ height: "2.4vmin" }} />
        <hr className="h-2.5 bg-[#063782] mt-2" style={{ height: "1vmin" }} />

        <div className="login_form flex items-center justify-center flex-col py-3">
          <div className="flex items-center justify-center w-[100%] gap-x-4">
            <label className="uppercase text-white" for="uname">
              <b>User name</b>
            </label>
            <div className="w-[35%]">
              <div className="login_input rounded-2xl p-1 border-2 border-white">
                <input
                  className="w-full h-full rounded-xl px-2 border-2 text-white focus:bg-transparent"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  placeholder="ENTER USERNAME"
                  required
                  value={payload.username}
                />
              </div>
              {/* {errors.username ? (
                  <p className="ps-2 error-msg text-red-500">{errors.username}</p>
                ) : null} */}
            </div>
          </div>
          <div className="flex items-center justify-center w-[100%] gap-x-4 mt-4">
            <label className="uppercase text-white" for="psw">
              <b>Password</b>
            </label>
            <div className="w-[35%]">
              <div className="login_input rounded-2xl p-1 border-2 border-white">
                <input
                  className="w-full h-full rounded-xl px-2 border-2 text-white focus:bg-transparent"
                  type="password"
                  name="password"
                  onChange={handleChange}
                  placeholder="ENTER PASSWORD"
                  required
                  value={payload.password}
                />
              </div>
              {errors.password ? (
                <p className="ps-2 error-msg text-red-500">{errors.password}</p>
              ) : null}
            </div>
          </div>
          <div className="login_language flex items-center rounded-sm">
            <div className="border-r-2 border-[#0056A6] h-full">
              <div className="flex items-center h-full" style={{padding:"6px"}}>
                <img
                  src={require("../assets/images/flag.png")}
                  alt=""
                  className="h-full"
                />
              </div>
            </div>
            <div className="w-[79%] h-full flex items-center border-l-2 border-[#1472C6]">
              <div className="w-full flex items-center h-full p-2">
                <p className="w-full flex items-center justify-center text-white language-text">
                  En
                </p>
                <Icon
                  icon="bxs:down-arrow"
                  style={{ color: "#268ffe", fontSize: "3.104vmax" }}
                />
              </div>
            </div>
          </div>
          <div className="remember_pswd flex items-center justify-center">
            <input id="first_name" type="checkbox" checked={rememberMe} onChange={(e) =>{
              setRememberMe(e.target.checked);
            }}/>
            <label for="first_name">Remember Passwords</label>
          </div>
          <div className="w-full flex items-center justify-center gap-x-3 mt-3">
          <div className="login_btn flex items-center justify-center">
            <button className="bg-[#5ae6fd] relative" onClick={handleSubmit}>
              <div className="login_highlight"></div>
              <span className="relative z-10">LOGIN</span>
            </button>
          </div>
          <div className="login_btn flex items-center justify-center">
            <button className="bg-[#5ae6fd] relative" onClick={() => toggleLiveChat()}>
              <div className="login_highlight"></div>
              <span className="relative z-10">REGISTER</span>
            </button>
          </div>
          {
          (deferredInstallPrompt || openIOSInstallButton) &&
          <div className="login_btn flex items-center justify-center">
            <button className="bg-[#5ae6fd] relative"
              onClick={async () => {
                deferredInstallPrompt ? handleClickOpen() : setOpenIOSInstall(true);
              }}
            >
              <div className="login_highlight"></div>
              <span className="relative z-10">DOWNLOAD</span>
            </button>
          </div>
          }
          </div>
        </div>
      </div>
            {/* Android prompt install */}
            <Dialog open={openAndroidInstall} onClose={handleClose}>
        <DialogTitle>Install 3in1slot App</DialogTitle>
        <DialogContent>
          <p>Would you like to install the app on your phone to improve loading speed?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (deferredInstallPrompt) {
                console.log("clicked here")
                deferredInstallPrompt.prompt();
                deferredInstallPrompt.userChoice.then((choiceResult) => {
                  if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the installation prompt');
                  } else {
                    console.log('User declined the installation prompt');
                  }
                  setDeferredInstallPrompt(null)
                  handleClose();
                });
              } 
            }}
            color="primary"
          >
            Install
          </Button>
        </DialogActions>
      </Dialog>
      {/* IOS prompt install */}
      <Dialog open={openIOSInstall} onClose={handleIOSClose}>
        <DialogTitle>Install 3in1slot App</DialogTitle>
        <DialogContent>
          {/* <p>Would you like to install the app on your phone to improve loading speed?</p> */}
          <img
              style={{width: "280px"}}
              src={require("../assets/images/install-pwa-ios.png")}
              alt=""
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleIOSClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
      {isLoading && <Loading fullscreen />}
    </div>
  );
}

export default SignIn;
