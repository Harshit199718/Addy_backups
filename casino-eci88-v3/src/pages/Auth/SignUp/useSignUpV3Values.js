import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectConfigData } from "../../../api/generalApi";
import useInitialValues from "../../../hooks/useInitialValues";
import { selectCurrentLang } from "../../../app/slices/general";
import { useBanksQuery } from "../../../api/hooks";

function useSignUpV3Values() {
  const { data: banks } = useBanksQuery();
  const [referProps, setReferProps] = useState({ readOnly: false });
  const location = useLocation();
  const { inputs_bg } = useSelector(selectConfigData);
  const currentLang = useSelector(selectCurrentLang);
  const { t } = useTranslation();
  const {fields: bankFields} = useInitialValues("activate");
  const bankOptions = useMemo(() => {
    if (!banks) {
      return [];
    } else {
      return banks?.map((bank) => ({
        key: bank.id,
        label: bank.name,
      }));
    }
  }, [banks]);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const referrer = searchParams.get("referrer");
    const fromRefer = localStorage.getItem("from_refer");
    if (referrer) {
      localStorage.setItem("from_refer", referrer);
      setReferProps({
        readOnly: true,
        value: referrer,
      });
    } else if (fromRefer) {
      localStorage.removeItem("from_refer");
      navigate(`/signup/?referrer=${fromRefer}&openExternalBrowser=1`);
    }
  }, [location.search]);

  const inputStyles = useMemo(() => {
    return {
      $background: inputs_bg,
      $borderRadius: "0",
      $borderColor: "#171717",
      $padding: "6px 12px",
      $color: "#838383"
    };
  }, [inputs_bg]);
  const initialValues = useMemo(
    () => [
      {
        heading: t("Personal_Information"),
        fields: [
          {
            type: "text",
            name: "username",
            placeholder: t("Username"),
            label: t("Username"),
          },
          {
            name: "mobile",
            type: "text",
            label: t("Mobile_No"),
            placeholder: "0123456789",
          },
          {
            type: "password",
            name: "password",
            placeholder: t("Password"),
            label: t("Password"),
          },
          {
            name: "password2",
            type: "password",
            placeholder: `${t("Confirm")} ${t("Password")}`,
            label: `${t("Confirm")} ${t("Password")}:`,
          },
        ],
      },
      {
        heading: t("Payment_Information"),
        fields: [
          {
            name: "bank",
            type: "select",
            label: t("Select_Bank"),
            options: bankOptions,
            $background: "transparent",
            $color: "#fff"
          },
          {
            name: "account_name",
            type: "text",
            label: t("Full_Name"),
            $background: "transparent",
            $color: "#fff"
          },
          {
            name: "account_number",
            type: "number",
            label: t("Account_Number"),
            $background: "transparent",
            $color: "#fff"
          },
        ],
      },
      {
        heading: t("Others"),
        fields: [
          {
            name: "referrer_code",
            type: "text",
            label: t("Referral_Code"),
            placeholder: t("Referral_Code") + "(Optional)",
            optional: true,
            ...referProps
          },
        ],
      },
    ],
    [bankFields, currentLang]
  );

  return initialValues?.map((val) => {
    return {
      ...val,
      fields: val?.fields?.map((field) => ({...field, ...inputStyles})),
    };
  });
}

export default useSignUpV3Values;