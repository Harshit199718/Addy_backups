import './App.css';
import { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
// import routes from './routes';
import Loading from './components/common/Loading';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import ProtectedRoute from './routes/ProtectedRoute';
import { useDispatch, useSelector } from 'react-redux';
import AuthRoutes from './routes/AuthRoutes';
import { SkeletonTheme } from 'react-loading-skeleton';
import Layout from './components/layout/Layout/Layout';
import { useLoginMutation, useSkinConfigQuery } from './api/hooks';
import { selectCurrentUser, selectSignupSuccess, setSignupSuccess } from './app/slices/userSlice';
import useGetRoutes from './hooks/useGetRoutes';
import { selectEnableLiveChat, selectGlobalError, setGlobalError, setNotificationPermission, selectNotificationPermission, selectNotificationWebMessage, setNotificationWebMessage, setDeferredPrompt } from './app/slices/general';
import Modal from './components/common/Modal';
import LiveChat from './features/LiveChat/LiveChat';
import ReactGA from 'react-ga4';
import Chat from './features/Chat/Chat';
import RequestNotificationPermission from './utils/firebase/RequestNotificationPermission';
import { WebNotificationHandler } from './utils/firebase/firebase';
import NotificationWebMessage from './utils/firebase/NotificationWebMessage';
import MetaPixel from './utils/metapixel/MetaPixel';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from './components/common/Link';
import { useTranslation } from 'react-i18next';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: "Roboto", sans-serif !important;
  }
  h1, h2 {
    font-family: "Source Sans Pro", sans-serif;
  }
  *::-webkit-scrollbar {
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(255,255,255,.2);
  }
`;

const CONTACTUS_OPTION = import.meta.env.VITE_APP_CONTACTUS_OPTION;
const GOOGLE_ANALYTICS = import.meta.env.VITE_APP_GOOGLE_ANALYTICS;
const META_PIXEL = import.meta.env.VITE_APP_META_PIXEL;

function App() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const { data: configData } = useSkinConfigQuery();
  const currentUser = useSelector(selectCurrentUser);
  const globalError = useSelector(selectGlobalError);
  const enableLiveChat = useSelector(selectEnableLiveChat);
  const notificationPermission = useSelector(selectNotificationPermission);
  const notificationWebMessage = useSelector(selectNotificationWebMessage);
  const signupSuccess = useSelector(selectSignupSuccess);
  const routes = useGetRoutes();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const timerRef = useRef();
  const {t} = useTranslation();
  const [login, {isLoading}] = useLoginMutation();

  useEffect(() => {
    if(!isIOS && configData && configData?.show_notification_accept){
      const getPermission = Notification.permission
      if (getPermission != 'granted' && getPermission != 'denied') {
        dispatch(setNotificationPermission({
              title: configData ? configData?.notification_accept_title : "Follow Us !",
              description: configData ? configData?.notification_accept_description : "Follow us to get latest update !",
              button: configData ? configData?.notification_accept_button_text : "Follow us to get latest update !",
              images: configData && configData?.notification_accept_images,
          }))
      }
    }
  },[configData])

  const loginUser = async (user) => {
    let userData = user;
    if (configData?.login_style==="3") {
      userData = {...user, username: `6${user.username}`}
    }
    const result = await login(userData).unwrap();
    console.log("login result", result)
    if (result) {
        navigate("/")
    }
  }
  useEffect(() => {
    let interval, timeout;
    if (signupSuccess) {
      timeout = setTimeout(() => {
        clearTimeout(timeout);
        clearInterval(interval);
        // navigate("/signin")
        const userData = JSON.parse(localStorage.getItem("initUser"))
        loginUser(userData)
      }, 5000);
      interval = setInterval(() => {
        const time = parseInt(timerRef.current.textContent);
        if (time<=1) {
          timerRef.current.textContent=5
          clearInterval(interval);
        } else {
          timerRef.current.textContent=(time-1)
        }
      }, 1000);
    }
  }, [signupSuccess])
  
  
  if(GOOGLE_ANALYTICS){
    ReactGA.initialize(GOOGLE_ANALYTICS);
    ReactGA.send({ hitType: "pageview" })
  }

  return (
    <div className="App">
      {!isIOS && configData  && configData?.show_notification_accept && <WebNotificationHandler enabledNotification={configData?.show_notification_accept}/>}
      {META_PIXEL && <MetaPixel code={META_PIXEL}/>}
      <SkeletonTheme baseColor="#CFD8DC" highlightColor="#ECEFF1">
      <ThemeProvider theme={configData?configData:{}}>
          <GlobalStyles />
          <Layout>
            <Routes>
              {routes.auth.map(({ path, component: Component }) => (
                <Route key={path} element={<AuthRoutes isAuth={currentUser} />}>
                  <Route
                    key={path}
                    path={path}
                    element={(
                      <Suspense fallback={<Loading isLoading />}>
                        <Component />
                      </Suspense>
                      )}
                  />
                </Route>
              ))}
              {routes.public.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={(
                    <Suspense fallback={<Loading isLoading />}>
                      <Component />
                    </Suspense>
                    )}
                />
              ))}
              {routes.protected.map(({ path, component: Component }) => (
                <Route key={path} element={<ProtectedRoute isAuth={currentUser} />}>
                  <Route
                    key={path}
                    path={path}
                    element={(
                      <Suspense fallback={<Loading isLoading />}>
                        <Component />
                      </Suspense>
                      )}
                  />
                </Route>
              ))}
              <Route path="*" element={<PageNotFound />} />
            </Routes>

            {/* To Show Notification Accept*/}
            {!isIOS && configData && configData?.show_notification_accept &&
            <Modal 
              title={notificationPermission?.title} 
              isOpen={notificationPermission} 
              onClose={() => dispatch(setNotificationPermission(null))} 
              error={notificationPermission} 
            >
              <RequestNotificationPermission notificationPermission={notificationPermission} enabledNotification={configData?.show_notification_accept}/>
            </Modal>
            }
            {/* To Show Notification*/}
            {!isIOS && configData && configData?.show_notification_accept &&
            <Modal 
              // title={notificationWebMessage?.title} 
              isOpen={notificationWebMessage} 
              onClose={() => dispatch(setNotificationWebMessage(null))} 
              error={notificationWebMessage} 
            >
              <NotificationWebMessage title={notificationWebMessage?.title}  image={notificationWebMessage?.image} body={notificationWebMessage?.body} />
            </Modal>
            }
            {signupSuccess &&
              <Modal 
                isOpen={signupSuccess} 
                onClose={() => {}} 
                $overflowY="visible"
              >
                <div className="signup-popup-content">
                  <div className="icon-container">
                    <Icon icon="ep:success-filled" color="#22bb33" width={100} style={{background: "#fff", borderRadius: "50%"}} />
                  </div>
                  <spam className="message">
                    {t("Signup_Success")}
                  </spam>
                  <p style={{color: configData?.text_color_secondary}}>{t("Redirecting_in")} <span className='redirect' ref={timerRef}>5</span> sec</p>
                  <span className='redirect'>{t("If_not_redirected")} <Link to="/signin" className="click-here-btn" style={{color: configData?.text_color_secondary}}>{t("here")}</Link></span>
                </div>
              </Modal>
            }
            {/* To Show Global Error */}
            <Modal 
              title={globalError?.errorTitle} 
              isOpen={globalError} 
              onClose={() => dispatch(setGlobalError(null))} 
              error={globalError} 
            />
            {
              enableLiveChat?(
                CONTACTUS_OPTION==="supportboard"?
                <LiveChat />
                :
                <Chat />
              )
              :null
            }
          </Layout>
      </ThemeProvider>
      </SkeletonTheme>
    </div>
  );
}

export default App;
