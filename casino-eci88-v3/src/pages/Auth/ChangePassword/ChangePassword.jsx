import React, { useEffect, useState } from 'react'
import { AuthWrapper } from '../Auth.styled';
import Loading from '../../../components/common/Loading';
import AuthImage from '../AuthImage';
import AuthForm from '../AuthForm';
import Form from '../../../components/common/Form';
import Button from '../../../components/common/Button';
import useInitialValues from '../../../hooks/useInitialValues';
import { useTranslation } from 'react-i18next';
import withChangePassword from '../../../HOC/withChangePassword';
import Modal from '../../../components/common/Modal';
import usePasswordValues from './usePasswordValues';

function ChangePassword(props, {isLoading, handleReset, errors, isSuccess}) {
    const { fields } = usePasswordValues();
    const { t } = useTranslation();
    const [changeSuccess, setChangeSuccess] = useState(false);

    useEffect(() => {
      if (isSuccess) {
        setChangeSuccess(true)
      }
    }, [isSuccess])
    
    const handleSubmit = (values) => {
      handleReset(values);
    };
    return (
      <AuthWrapper>
        <Loading isLoading={isLoading} />
        <AuthImage />
        <AuthForm title={t("Change_Password")}>
          <Form allFields={fields} onSubmit={handleSubmit} errors={errors}>
            <Button type="submit">{t("Change_Password")}</Button>
          </Form>
        </AuthForm>
        <Modal
          title={t("Change_Password")}
          isOpen={changeSuccess}
          onClose={() => setChangeSuccess(false)}
          success={{ message: `The password modification has been completed successfully.` }}
        />
      </AuthWrapper>
    );
}

export default withChangePassword(ChangePassword);