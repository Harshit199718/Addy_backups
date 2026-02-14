import { Button } from "antd";
import { notification } from "../features/modalSlice";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const ClipBoardButton = ({ text, notify }) => {
    const { t  } = useTranslation();
    const dispatch = useDispatch();

    const handleCopyClick = () => {
        navigator.clipboard.writeText(text)
        .then(() => {
            dispatch(notification({notification_status: 'success', notification_message: `${notify}: ${text} ${t("common.copied")}`}));
        })
        .catch((err) => {
            dispatch(notification({notification_status: 'error', notification_message: `${err} ${t("notierror.error occur while copied to clipboard")}`}));
        });
    }

    return (
        <Icon 
            icon="gala:copy" 
            width="1.2rem" 
            height="1.2rem"  
            style={{color: "black"}} 
            onClick={handleCopyClick}
        />
    )
};

export default ClipBoardButton;