import { useEffect, useMemo, useState } from "react";
import { useBanksQuery } from "../api/hooks";
import { OpionLabel } from "../pages/Transactions/Withdraw/Withdraw1";
import OptimizedImage from "../components/common/OptimizedImage";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectConfigData } from "../api/generalApi";
import { selectCurrentLang } from "../app/slices/general";

function useInitialValues(type) {
  const { data: banks } = useBanksQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [referProps, setReferProps] = useState({readOnly: false});
  const location = useLocation();
  const {login_style, phone_format} = useSelector(selectConfigData);
  const currentLang = useSelector(selectCurrentLang);
  const bankOptions = useMemo(() => {
    if (!banks) {
      return [];
    } else {
      return banks?.map((bank) => ({
        key: bank.id,
        label: (
          <OpionLabel>
            <OptimizedImage src={bank.icon} alt={bank.name} width="40px" />
            {bank.name} {bank.number}
          </OpionLabel>
        ),
      }));
    }
  }, [banks]);
  useEffect(() => {
    if (type==="signup") {
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
    }
  }, [type, location.search])
  const initialValues = useMemo(() => {
    switch (type) {
      case "signin":
        let label = "";
        let placeholder = "";
        if (login_style==="3") {
          label = t("Mobile_No");
          placeholder="0123456789"
        }
        return {
          fields: [
            {
              type: "text",
              name: "username",
              placeholder: placeholder?placeholder:t("Username"),
              label: label?label:t("Username"),
            },
            {
              type: "password",
              name: "password",
              placeholder: t("Password"),
              label: t("Password"),
            },
          ],
          links: [
            {
              title: t("REGISTER"),
              path: "/signup",
            },
            {
              title: t("Forget_Password"),
              path: "/forget-password",
            },
          ],
        };
      case "signup":
        return {
          fields: [
            {
              type: "text",
              name: "username",
              placeholder: t("Username"),
              label: t("Username"),
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
              label: `${t("Confirm")} ${t("Password")} :`,
            },
            {
              name: "mobile",
              type: "phone",
              label: t("Mobile_No"),
              onlyCountries: [phone_format],
            },
            {
              name: "referrer_code",
              type: "text",
              label: t("Referral_Code"),
              placeholder: t("Referral_Code"),
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
        };
      case "forget-password":
        return {
          fields: [
            {
              name: "mobile",
              type: "phone",
              label: t("Mobile_No"),
              onlyCountries: [phone_format],
            },
          ],
        };
      case "verify-tac":
        return {
          fields: [
            {
              name: "tac",
              type: "multi-input",
              label: "",
              length: 5,
            },
          ],
        };
      case "activate":
        return {
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
        };

      default:
        return {};
    }
  }, [type, referProps, login_style, currentLang]);
  return initialValues;
}

export default useInitialValues;
