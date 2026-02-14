
import { useTranslation } from "react-i18next";
import styled from "styled-components"
import Button from "../../components/common/Button";
import { handleRequestWebPermission } from "./firebase";
import { Icon } from '@iconify/react'
import { setNotificationPermission } from "../../app/slices/general";
import { useDispatch } from "react-redux";

const NotificationPermission = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #747474;
`

const NotificationImage = styled.img`
    max-width: 85dvw;
    margin: 0 auto;

    @media (min-width: 1024px) {
        max-width: 40dvw;
    }
`

const RequestNotificationPermission = ({ notificationPermission, enabledNotification }) => {
    const dispatch = useDispatch();

    return (
        <NotificationPermission>
            {notificationPermission?.images ?
            <NotificationImage src={notificationPermission?.images} />
            : 
            <Icon icon="gridicons:reader-follow" color="#f27474" width={70} />}
            {notificationPermission?.description}
            <Button $width="auto" onClick={() => {
                handleRequestWebPermission(enabledNotification)
                dispatch(setNotificationPermission(null))
            }}>{notificationPermission?.button}</Button>
        </NotificationPermission>
    )
}

export default RequestNotificationPermission;