import { useMemo } from "react"
import { selectConfigData } from "../../../api/generalApi";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

function usePasswordValues() {
  const {change_password_style, inputs_bg} = useSelector(selectConfigData);
    const {t} = useTranslation();
    const initialValues = useMemo(() => {
        switch (change_password_style) {
            case "2":
                return {
                    fields: [
                      {
                        name: "old_password",
                        type: "password",
                        label: "Current Password :",
                        $background: inputs_bg,
                        $borderRadius: "0",
                        $borderColor: "#171717",
                        $padding: "6px 12px"
                      },
                      {
                        name: "password",
                        type: "password",
                        label: "Password :",
                        $background: inputs_bg,
                        $borderRadius: "0",
                        $borderColor: "#171717",
                        $padding: "6px 12px"
                      },
                      {
                        name: "password2",
                        type: "password",
                        label: `${t("Confirm")} ${t("Password")} :`,
                        $background: inputs_bg,
                        $borderRadius: "0",
                        $borderColor: "#171717",
                        $padding: "6px 12px"
                      },
                    ],
                  }
        
            default:
                return {
                    fields: [
                      {
                        name: "old_password",
                        type: "password",
                        label: "Current Password :",
                      },
                      {
                        name: "password",
                        type: "password",
                        label: "Password :",
                      },
                      {
                        name: "password2",
                        type: "password",
                        label: `${t("Confirm")} ${t("Password")} :`,
                      },
                    ],
                  }
        }
    }, [change_password_style])
  return initialValues;
}

export default usePasswordValues