import React, { useEffect, useRef, useState, useContext } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Lobby from "./pages/Lobby";
import ProtectedRoute from "./ProtectedRoute";
import authService from "./services/auth.service";
import History from "./pages/History";
import Layout from "./components/common/Layout/Layout";
import ChangePassword from "./pages/ChangePassword";
import userService from "./services/user.service";
import Games from "./pages/Games";
import { Online, Offline } from 'react-detect-offline';
import ReactGA from 'react-ga4';
import { ConfigContext } from "./ConfigContext";
import Chat from "./components/Chat/Chat";
import { Icon } from "@iconify/react/dist/iconify.js";

function App() {
  const configData = useContext(ConfigContext);
  const country = process.env.REACT_APP_COUNTRY;
  const GOOGLE_ANALYTICS = process.env.REACT_APP_GOOGLE_ANALYTICS;
  if(GOOGLE_ANALYTICS){
    ReactGA.initialize(GOOGLE_ANALYTICS);
    ReactGA.send({ hitType: "pageview" })
  }

  const appRef = useRef(document.body);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrenttUser] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [deferredInstallPrompt, setDeferredInstallPrompt] = useState('');
  const [liveChatVisibility, setLiveChatVisibility] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(0);

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    setDeferredInstallPrompt(event);
  });

  const getCurrentUser = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const toggleLiveChat = () => {
    setLiveChatVisibility(!liveChatVisibility)
  }
  
  return (
    <div style={{width: "100%", height: "100%"}}>
      {/* <Online> */}
        <div className="App">
          <Layout>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/signin"
                  element={
                    <SignIn 
                      deferredInstallPrompt={deferredInstallPrompt} 
                      setDeferredInstallPrompt={setDeferredInstallPrompt} 
                      isLoggedIn={isLoggedIn} 
                      setIsLoggedIn={setIsLoggedIn} 
                      appRef={appRef} 
                      setIsFullScreen={setIsFullScreen}
                      configData={configData}
                      toggleLiveChat={toggleLiveChat}
                    />
                  }
                />
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                  <Route
                    path="/"
                    element={
                      <Lobby
                        appRef={appRef}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        currentUser={currentUser}
                        isFullScreen={isFullScreen}
                        setIsFullScreen={setIsFullScreen}
                        country={country}
                        configData={configData}
                        toggleLiveChat={toggleLiveChat}
                        unreadMessages={unreadMessages}
                      />
                    }
                  />
                  <Route
                    path="/lobby"
                    element={
                      <Lobby
                      appRef={appRef}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      currentUser={currentUser}
                      isFullScreen={isFullScreen}
                      setIsFullScreen={setIsFullScreen}
                      configData={configData}
                      toggleLiveChat={toggleLiveChat}
                      unreadMessages={unreadMessages}
                      />
                    }
                  />
                  {/* <Route
                    path="/change-password"
                    element={
                      <ChangePassword
                      isLoggedIn={isLoggedIn}
                      />
                    }
                  /> */}
                  {/* <Route path="/history" element={<History />} /> */}
                  <Route path="/games" element={<Games />} />
                  {/* Handle other routes */}
                </Route>
              </Routes>
              {/* <div className="chat-container"> */}
                <div className="chat-box" style={{ bottom: `${isLoggedIn?"50px":"0"}` }}> 
                  <div className={`chat-container ${liveChatVisibility?"open":""}`}>
                    {/* <Chat liveChatVisibility={liveChatVisibility} setUnreadMessages={setUnreadMessages} isLoggedIn={isLoggedIn} /> */}
                  </div>
                  {!isLoggedIn && 
                  <>
                    <span className={"unreadMessage"} style={{ color: "white" }}> {unreadMessages}</span>
                    <span className="toggle-chat-btn-container" onClick={() => toggleLiveChat()}>
                      <Icon className="toggle-chat-btn" icon="bi:chat-square-dots-fill" />
                    </span>
                  </>
                  }
                </div>
              {/* </div> */}
            </BrowserRouter>
          </Layout>
        </div>
      {/* </Online>
      <Offline>
        Please connect to internet 你的设备没有联网, 请联网使用
      </Offline> */}
    </div>
  );
}

export default App;
