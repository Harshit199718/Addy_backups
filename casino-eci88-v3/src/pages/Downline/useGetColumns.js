import { useTranslation } from "react-i18next";

const useGetColumns = () => {
  const { t } = useTranslation();
  return (type) =>{
    switch (type) {
        case "downline":
            return {
                s_no: {
                  label: t("S_No"),
                  background: "rgb(34, 86, 178)"
                },
                downline: {
                  label: t("Downline"),
                  background: "rgb(34, 86, 178)"
                },
                date_time: {
                  label: t("Registered_DateTime"),
                  background: "rgb(34, 86, 178)"
                }
              }
            break;
        case "commission":
            return {
                date: {
                  label: t("S_No"),
                  background: "rgb(34, 86, 178)"
                },
                downline: {
                  label: t("Downline"),
                  background: "rgb(34, 86, 178)"
                },
                type: {
                  label: t("Type"),
                  background: "rgb(34, 86, 178)"
                },
                win_loss: {
                  label: t("Win/Loss"),
                  background: "rgb(34, 86, 178)"
                },
                status: {
                  label: t("Status"),
                  background: "rgb(34, 86, 178)"
                },
              }
            break;
        case "laporan":
            return {
                date: {
                  label: t("Date&Time"),
                  background: "rgb(34, 86, 178)"
                },
                commission: {
                  label: t("Commission"),
                  background: "rgb(34, 86, 178)"
                }
              }
            break;
    
        default:
            break;
    }
  }
}
export default useGetColumns