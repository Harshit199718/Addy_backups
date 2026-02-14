import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Row, Button } from 'antd';
import errorField from '../../features/error/errorField';
import { useDispatch } from 'react-redux';
import { notification, openModalTab, closeModalTab } from '../../features/modalSlice';
import { useGetSupportsIDQuery } from '../../features/support/supportsApiSlices';
import { useLazyGet2FAQRCodeQuery, useVerify2FAQRCodeMutation } from '../../features/support/2FAApiSlices';
import ImageListingField from '../../ListingField/ImageListingField';
import FormSpin from '../../components/formSpin';

const FormList = ({ onFormInstanceReady, apiErrors, QRImage, isFetching, t }) => {
  const [form] = Form.useForm();
  useEffect(() => {
      onFormInstanceReady(form);
  }, []);
  
  if(isFetching){
    return <FormSpin loading={isFetching}/>
  }

  return (
    QRImage &&
    <Form layout="vertical" form={form} name={`qrcode_form_in_modal`} style={{ textAlign: "center" }}>
      <ImageListingField
        image={`data:image/png;base64,${QRImage}`}
        width={350}
        height={350}
      />
      <Form.Item
        name="totp_code"
        label={t("general.2FA Code (Scanned from your phone)")}
        validateStatus={apiErrors.detail ? 'error' : ''}
        help={apiErrors.detail}
        rules={[
          {
              required: true,
              message: `${t('requiredmessage.Please enter the 2FA code from your phone!')}`,
          },
        ]}
        hasFeedback
      >
        <Input.OTP length={6}/>
      </Form.Item>
    </Form>
  );
};
const FormModal = ({ open, onCreate, onCancel, apiErrors, user, t }) => {
  const [formInstance, setFormInstance] = useState();
  const [GetQRCode, { isFetching }] = useLazyGet2FAQRCodeQuery()
  const [QRImage, setQRImage] = useState(null)
  const [GenerateQR, setGenerateQR] = useState(false)

  useEffect(()=>{
    if(user){
      if(user?.totp_device_confirmed && !GenerateQR){
        setQRImage(null)
      } else {
        GetQRCode()
        .unwrap()
        .then((payload) =>  {
          setQRImage(payload?.qr_code_image)
        })
        .catch((error) => {
            dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error) }));
        })
      }
    }
  },[GenerateQR, user])

  return (
    user &&
    <Modal
      open={open}
      title={user && user.username ? <span>{t("general.2FA for")} {user.username}</span> : t('general.2FA Configuration')}
      okButtonProps={{
        autoFocus: true,
      }}
      footer={
      <>
        <Button type='default' onClick={()=> {
          onCancel()
          setGenerateQR(false)
        }}>
          {t("common.Cancel")}
        </Button>
        {(user?.totp_device_confirmed && !GenerateQR) ?
            <Button danger onClick={() => setGenerateQR(true)}>
              {t("general.Reset 2FA")}
            </Button>
          :
            <Button type='primary' 
            onClick={async () => {
              try {
                const values = await formInstance?.validateFields();
                onCreate(values);
                setGenerateQR(false)
              } catch (error) {
              }
            }}>
              {t("general.Set 2FA")}
            </Button>
        }
      </>
      }
      onCancel={()=> {
        onCancel()
        setGenerateQR(false)
      }}
      destroyOnClose
    >
      <FormList
        onFormInstanceReady={(instance) => {
          setFormInstance(instance);
        }}
        apiErrors={apiErrors}
        user={user}
        QRImage={QRImage}
        isFetching={isFetching}
        t={t}
      />
    </Modal>
  );
};

const TwoFAConfiguration = ({ userID=null, t }) => {
  const [open, setOpen] = useState(false);
  const [apiErrors, setApiErrors] = useState([])
  const [ Verify ] = useVerify2FAQRCodeMutation();
  const { data, isLoading, isError } = useGetSupportsIDQuery({ id: userID });

  const dispatch = useDispatch()

  useEffect(() => {
    if(open){
      dispatch(openModalTab());
    } else {
      dispatch(closeModalTab());
    }
  },[open])
  
  const on2FAConfig = async (values) => {
    setApiErrors([])
    try {
      const data = await Verify(values).unwrap();

      dispatch(notification({notification_status: 'success', notification_message: `${t('notisuccess.2FA verified Successfully')}`}));
      setOpen(false);
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  return (
    <>
      <span onClick={() => setOpen(true)}>
        {t("general.2FA Config")}
      </span>
      <FormModal
        open={open}
        onCreate={on2FAConfig}
        onCancel={() => {
          setOpen(false)
          setApiErrors([])
        }}
        apiErrors={apiErrors}
        user={data && data}
        t={t}
      />
    </>
  );
};
export default TwoFAConfiguration;