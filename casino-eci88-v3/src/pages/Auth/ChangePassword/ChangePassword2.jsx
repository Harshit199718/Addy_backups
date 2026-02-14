import React, { useEffect, useState } from 'react'
import { Auth2Title, AuthForm2, AuthForm2Container, AuthWrapper } from '../Auth.styled';
import Loading from '../../../components/common/Loading';
import AuthImage from '../AuthImage';
import AuthForm from '../AuthForm';
import Form from '../../../components/common/Form';
import Button from '../../../components/common/Button';
import { useTranslation } from 'react-i18next';
import withChangePassword from '../../../HOC/withChangePassword';
import Modal from '../../../components/common/Modal';
import usePasswordValues from './usePasswordValues';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../../api/generalApi';
import { Profile2Container } from '../../Profile/Profile2.styled';
import Profile2Tabs from '../../Profile/Profile2Tabs';

function ChangePassword2(props, {isLoading, handleReset, errors, isSuccess}) {
    const { fields } = usePasswordValues();
    const { t } = useTranslation();
    const [changeSuccess, setChangeSuccess] = useState(false);
  const {change_password_style} = useSelector(selectConfigData);

    useEffect(() => {
      if (isSuccess) {
        setChangeSuccess(true)
      }
    }, [isSuccess])
    
    const handleSubmit = (values) => {
      handleReset(values);
    };
    return (
      <>
        <Profile2Container>
          <Profile2Tabs />
        </Profile2Container>
          <Auth2Title>{t("Change_Password")}</Auth2Title>
        <AuthForm2Container style={{maxWidth: "500px", margin: "0 auto"}}>
          <Loading isLoading={isLoading} />
          <AuthForm2>
            <Form allFields={fields} onSubmit={handleSubmit} errors={errors}>
              <Button type="submit" $borderRadius={change_password_style==="2"?"25px":""}>{t("Change_Password")}</Button>
            </Form>
          </AuthForm2>
          <Modal
            title={t("Change_Password")}
            isOpen={changeSuccess}
            onClose={() => setChangeSuccess(false)}
            success={{ message: `The password modification has been completed successfully.` }}
          />
        </AuthForm2Container>
      </>
    );
}

export default withChangePassword(ChangePassword2);