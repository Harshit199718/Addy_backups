import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Modal, Row } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch, useSelector } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import { useUpdatePlayerMutation } from '../../features/player/playerApiSlices';
import { useGetSupportsIDQuery, useUpdateSupportsMutation } from '../../features/support/supportsApiSlices';
import FormSpin from '../../components/formSpin';
import { setPlayerActions } from '../../features/generalSlice';
import { useGetAffiliatesIDQuery, useUpdateAffiliatesMutation } from '../../features/affiliates/affiliatesApiSlices';
import { useTranslation } from 'react-i18next';

const FormList = ({ onFormInstanceReady, apiErrors, player, role, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);

  if(!player){
    return <FormSpin loading={true}/>
  }

  return (
    <Form layout="vertical" form={form} name={`${role}_form_in_modal`}>
      <Form.Item
        name="password"
        label={t("resetpassword.New Password")}
        validateStatus={apiErrors.password ? 'error' : ''}
        help={apiErrors.password}
        rules={[
          {
              required: true,
              message: `${t("resetpassword.New Password")} ${t("common.Is Required")}`,
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={t("resetpassword.New Password")}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item
        name="password2"
        label={t("resetpassword.Confirm New Password")}
        validateStatus={apiErrors.password2 ? 'error' : ''}
        help={apiErrors.password2}
        rules={[
          {
            required: true,
            message: `${t("resetpassword.Confirm New Password")} ${t("common.Is Required")}`,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t('The passwords do not match!')));
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder={t("resetpassword.Confirm New Password")}
          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
    </Form>
  );
};

const FormModal = ({ open, onCreate, onCancel, apiErrors, player, role, t }) => {
  const [formInstance, setFormInstance] = useState();

  return (
    <Modal
      open={open}
      title={t("resetpassword.Reset Password")}
      okText={t("resetpassword.Reset")}
      cancelText={t("common.Cancel")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      onOk={async () => {
        try {
          const values = await formInstance?.validateFields();
          onCreate(values);
        } catch (error) {
        }
      }}
      width={300}
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        player={player}
        role={role}
        t={t}
      />
    </Modal>
  );
};

const ResetPassword = ({ role='player', userID=null }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [ResetPassword, { isLoading }] = useUpdatePlayerMutation();
  const [ResetPasswordSupport] = useUpdateSupportsMutation();
  const [ResetPasswordAffiliates] = useUpdateAffiliatesMutation();

  let user
  if (role === 'player') {
    user = useSelector((state) => state.general.player);
  } else if (role === 'support' || role === 'support-edit') {
    const { data, isLoading, isError } = useGetSupportsIDQuery({ id: userID });
    user = data;
  } else if (role === 'affiliates') {
    const { data, isLoading, isError } = useGetAffiliatesIDQuery({ id: userID });
    user = data;
  }

  const dispatch = useDispatch()
  useEffect(() => {
    if(open){
      dispatch(openModalTab());
    } else {
      dispatch(closeModalTab());
    }
  },[open])
  
  const onResetPassword = async (values) => {
    values = {...user, ...values}

    setApiErrors([])
    try {
      let data
      switch(role){
        case 'player':
          values.password1 = values.password
          data = await ResetPassword(values).unwrap();
          dispatch(setPlayerActions({ record: data }))
        break;
        case 'support-edit':
          data = await ResetPasswordSupport(values).unwrap();
        case 'support':
          data = await ResetPasswordSupport(values).unwrap();
        break;
        case 'affiliates':
          data = await ResetPasswordAffiliates(values).unwrap();
        break;
        default:
          data = await ResetPassword(values).unwrap();
      }
      dispatch(notification({notification_status: 'success', notification_message: 'Reset Password Successfully'}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      {role === 'player' ? (
        <Button type="primary" onClick={() => setOpen(true)}>
        {t("resetpassword.Reset Password")}
      </Button>
      ) : role === 'support-edit' ? (
        <Button type="primary" danger onClick={() => setOpen(true)}>
        {t("resetpassword.Reset Password")}
      </Button>
      ) : role === 'affiliates' ? (
        <Button type="primary" onClick={() => setOpen(true)}>
        {t("resetpassword.Reset Password")}
      </Button>
      ) : 
      <span onClick={() => setOpen(true)}>
        {t("resetpassword.Reset Password")}
      </span>
      }
      <FormModal
        open={open}
        onCreate={onResetPassword}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        player={user}
        role={role}
        t={t}
      />
    </>
  );
};

export default ResetPassword;