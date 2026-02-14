import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

function useSignUpValues() {
  const [referProps, setReferProps] = useState({readOnly: false});
  const location = useLocation();
  const {t} = useTranslation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get('referrer');
    const fromRefer = localStorage.getItem("from_refer");
    if (referrer) {
        localStorage.setItem("from_refer", referrer);
        setReferProps({
            readOnly: true,
            value: referrer
        })
    } else if (fromRefer) {
    localStorage.removeItem("from_refer");
    navigate(`/signup/?referrer=${fromRefer}&openExternalBrowser=1`)
    }
  }, [location.search])
  return {
    fields: [
      {
        type: "text",
        horizontal: true,
        name: "account_name",
        placeholder: t("Full_Name"),
        label: `${t("Bank")} ${t("Account")} ${t("Name")}`,
        warning: "* Must Be The Same As Your Bank Account Name."
      },
      {
        name: "mobile",
        type: "text",
        horizontal: true,
        label: t("Mobile_No"),
        placeholder: "0123456789",
      },
      {
        type: "password",
        horizontal: true,
        name: "password",
        placeholder: t("Password"),
        label: t("Password"),
      },
      {
        name: "password2",
        type: "password",
        horizontal: true,
        placeholder: `${t("Confirm")} ${t("Password")}`,
        label: `${t("Confirm")} ${t("Password")}:`,
      },
      {
        name: "referrer_code",
        type: "text",
        horizontal: true,
        label: t("Referral_Code"),
        placeholder: t("Referral_Code") + "(Optional)",
        optional: true,
        ...referProps
      },
    ],
    links: [
      {
        path: "/signin",
        title: t("Login_Here"),
      },
    ],
  }
}

export default useSignUpValues