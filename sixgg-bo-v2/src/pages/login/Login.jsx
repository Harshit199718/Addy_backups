import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Row, Alert, Layout, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';
import errorField from '../../features/error/errorField';
import { setGlobalLoading } from '../../features/generalSlice';
import { notification } from '../../features/modalSlice';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation();
  const isDarkMode = useSelector(state => state.general.isDarkMode);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate()
  useEffect(() => {
    if (token){
      navigate('/')
    }
  },[])

  // login part
  const [login, { error }] = useLoginMutation()
  const [apiErrors, setApiErrors] = useState(null)
  const [OTPRequired, setOTPRequired] = useState(false)
  const [form] = Form.useForm();
  const [username, password, totp] = [
      'username',
      'password',
      'totp'
  ].map(field => Form.useWatch(field, form));

  const onFinish = async (values) => {
    setApiErrors([])
    try {
      dispatch(setGlobalLoading({isLoading: true}));
      const data = await login(values).unwrap();
      if(data?.requiresTotp && !OTPRequired){
        setOTPRequired(true)
        dispatch(notification({notification_status: 'warning', notification_message: `${t("requiredmessage.Please enter OTP first")}`}))
      }
      if(data?.incorrectTotp){
        setApiErrors({"totp": "OTP is incorrect"})
        form.resetFields('totp')
        dispatch(notification({notification_status: 'error', notification_message: `${t("notierror.OTP is incorrect")}`}))
      }
      if(data?.access && data?.refresh){
        dispatch(setCredentials({ ...data}))
        const decodedToken = jwtDecode(data?.access);
        const userGroup = decodedToken?.user?.user_group;
        if(userGroup?.length > 0 && userGroup[0] === "Caller"){
          navigate('/report')
        } else {
          navigate('/')
        }
      }
      dispatch(setGlobalLoading({isLoading: false}));
    } catch (error) {
      setApiErrors(errorField(error));
      dispatch(notification({notification_status: 'error', notification_message: 
      error?.status === 404 ? `${error?.status} API not found` : "Please review error in form"
      }));
      dispatch(setGlobalLoading({isLoading: false}));
    }
  };

  return (
    <Layout       
      style={{ 
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Vertical centering
        minHeight: "100vh", // Ensure form stretches to full height
      }}
    >
      <Form
        form={form}
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{ 
          maxWidth: '400px',
          margin: '0 auto', // Align center horizontally
          background: isDarkMode ? "black" : "white",
          textAlign: "center",
          padding: "60px 30px", // Removed bottom padding
          borderRadius: "20px",
        }}
      >
        <LockOutlined style={{ fontSize: "90px", marginBottom: "20px" }}/>
        <Form.Item
          name="username"
          rules={[{ required: true, message: `${t('requiredmessage.Please input your username!')}` }]}
          validateStatus={apiErrors?.detail ? 'error' : ''}
          hasFeedback
        >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder={t("common.Username")} disabled={OTPRequired}/>
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
          {
              required: true,
              message: `${t('requiredmessage.Please input your password!')}`,
          },
          ]}
          validateStatus={apiErrors?.detail ? 'error' : ''}
          help={apiErrors?.detail}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={t("common.Password")}
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            disabled={OTPRequired}
          />
        </Form.Item>
        {OTPRequired &&
        <Space direction="vertical">
          <Alert message={t("common.Enter OTP below")} type="info" />
          <Form.Item
            name="totp"
            validateStatus={apiErrors?.totp ? 'error' : ''}
            help={apiErrors?.totp}
            rules={[
              {
                  required: true,
                  message: `${t('requiredmessage.Please enter the 2FA code from your phone!')}`,
              },
            ]}
            hasFeedback
          >
            <Input.OTP length={6} onChange={(e) => {
              e.length >=6 && onFinish({username: username, password: password, totp: e})
            }}/>
          </Form.Item>
        </Space>
        }
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            {t("common.Log in")}
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
  
  export default LoginPage;
  