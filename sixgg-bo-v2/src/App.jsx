import './App.css'
import { useLocation, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import Layout from './components/Layout';
import RequireAuth from './features/auth/requireAuth';
import MainLayout from './components/MainLayout';
import NotFound404 from './components/NotFound404';
import routes from './components/useRoutes';
import NotificationHandler from './components/notificationHandler.jsx'
import GlobalSpin from './components/globalSpin.jsx'
import { ConfigProvider, theme, Button, Card, App as AntdApp } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import en_US from 'antd/es/locale/en_US'
import zh_CN from 'antd/es/locale/zh_CN'
import vi_VN from 'antd/es/locale/vi_VN'
import th_TH from 'antd/es/locale/th_TH'
import i18n from './features/localeLanguage/localeLanguage.jsx';
import { setGlobalLoading } from './features/generalSlice.jsx';

function App() {
  const dispatch = useDispatch();
  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { isDarkMode, languageSelected } = useSelector(state => state.general);
  const [locale, setLocale] = useState(en_US)
  // initially loading
  useEffect(() => {
    dispatch(setGlobalLoading({ isLoading: false }))
  },[])
  useEffect(() => {
    i18n.changeLanguage(languageSelected);
    switch (languageSelected) {
      case 'en':
        setLocale(en_US)
      break;
      case 'zh':
        setLocale(zh_CN)
      break;
      case 'vn':
        setLocale(vi_VN)
      break;
      case 'th':
        setLocale(th_TH)
      break;
      default:
        setLocale(en_US)
    }
  }, [languageSelected]);

  return (
    <ConfigProvider
    theme={{
      algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
    }}
    locale={locale}
    >
      <AntdApp>
        <GlobalSpin />
        <NotificationHandler />
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* public route */}
            <Route path="login" element={<LoginPage />} />

            {/* protected route */}
              <Route element={<RequireAuth />}>
                <Route element={<MainLayout />}>
                {routes.map(({ path, component: Component }, index) => (
                  <Route key={index} path={path} exact element={(
                      <Component />
                  )} />
                ))}
                </Route>
              </Route>

            {/* Not Found Page */}
            <Route path="*" element={<NotFound404 />} />
          </Route>
        </Routes>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
