import { Avatar, Badge, FloatButton, Menu, Row } from 'antd';
import React, { useEffect } from 'react';
import { useGetNotificationBadgeQuery } from '../../features/general/generalApiSlices';
import notificationSoundFile from '../../assets/notificationSound/eventually.mp3'
import { Icon } from '@iconify/react';
import { CommentOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { mainTransaction } from '../transaction/mainTransaction';
import { useSelector } from 'react-redux';
import PermissionsAuth from '../../components/permissionAuth';
import { selectLivechatUnreadCount } from '../../features/generalSlice';

const notificationSound = new Audio(notificationSoundFile);

const NotificationBadge = () => {
    // Supportboard 
    const livechatUrl = import.meta.env.VITE_LIVECHAT_SITEURL
    const livechatSecretKey = import.meta.env.VITE_X_LIVECHAT_SECRET_KEY
    const livechatEnabled = import.meta.env.VITE_LIVECHAT_ENABLED
    const livechatType = import.meta.env.VITE_APP_CONTACTUS_OPTION
    const windowRef = React.useRef()

    const generateSHA256 = async (message) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        return crypto.subtle.digest('SHA-256', data).then(arrayBuffer => {
          const hashArray = Array.from(new Uint8Array(arrayBuffer));
          const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
          return hashHex;
        });
    };
    const generateToken = async (secretKey) => {
        const timestamp = new Date().getTime().toString();
        const token = await generateSHA256(`${secretKey}${timestamp}`);
        return { timestamp, token };
    };
    const { transactionHighlight } = useSelector((state) => state.general);
    const isModalOpen = useSelector((state) => state.modal.modalOpen);
    const isModalTabOpen = useSelector((state) => state.modal.modalTabOpen);
    const isEitherModalOpen = isModalOpen || isModalTabOpen;
    const livechatUnreadCount = useSelector(selectLivechatUnreadCount);
    
    const navigate = useNavigate();
    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error
    } = useGetNotificationBadgeQuery({}, 
        isEitherModalOpen ? {} : {
        pollingInterval: 5000,
        // skipPollingIfUnfocused: true,
        refetchOnFocus: true,
    });
    const { deposit_count = 0, withdrawal_count = 0, bonus_count = 0 } = list || {};
    const hasPermissionForDeposit = PermissionsAuth.checkPermissions('others', 'view_deposit', deposit_count);
    const hasPermissionForWithdrawal = PermissionsAuth.checkPermissions('others', 'view_withdrawal', withdrawal_count);
    const hasPermissionForBonuses = PermissionsAuth.checkPermissions('others', 'view_bonus', bonus_count);

    const total_count = hasPermissionForDeposit + hasPermissionForWithdrawal + hasPermissionForBonuses + livechatUnreadCount
    
    useEffect(() => {
        const intervalId = setInterval(() => {
            if((hasPermissionForDeposit > 0 || hasPermissionForWithdrawal > 0 || hasPermissionForBonuses > 0) && !transactionHighlight){
                notificationSound.play();
            }
        }, 5000);
    
        return () => clearInterval(intervalId);
    }, [list, transactionHighlight]); 

    return (
        <>
        {
        (
            PermissionsAuth.checkPermissions('menu', 'view_deposit', true) ||
            PermissionsAuth.checkPermissions('menu', 'view_withdrawal', true) ||
            PermissionsAuth.checkPermissions('menu', 'view_bonus', true)
        ) &&
            <FloatButton.Group
                trigger="hover"
                type="primary"
                icon={<InfoCircleOutlined />}
                badge={{
                    count: total_count,
                    color: 'red',
                    size: 'small'
                }}
                style={{
                    bottom: 10,
                    left: 10
                }}
            >
                {PermissionsAuth.checkPermissions('others', 'view_deposit', 
                <FloatButton 
                    badge={{
                        count: deposit_count,
                        color: '#55acee',
                        size: 'small'
                    }}
                    icon={<Icon icon="vaadin:money-deposit" width="1.2rem" height="1.2rem" />}
                    onClick={() => {
                        navigate(mainTransaction.url)
                    }}
                >
                </FloatButton>
                )}
                {PermissionsAuth.checkPermissions('others', 'view_withdrawal', 
                <FloatButton 
                    badge={{
                        count: withdrawal_count,
                        color: '#4E2728',
                        size: 'small'
                    }}
                    icon={<Icon icon="vaadin:money-withdraw" width="1.2rem" height="1.2rem" />}
                    onClick={() => {
                        navigate(mainTransaction.url)
                    }}
                />
                )}
                {PermissionsAuth.checkPermissions('others', 'view_bonus', 
                <FloatButton 
                    badge={{
                        count: bonus_count,
                        color: '#4E2728',
                        size: 'small'
                    }}
                    icon={<Icon icon="game-icons:cash" width="1.2rem" height="1.2rem" />}
                    onClick={() => {
                        navigate(mainTransaction.url)
                    }}
                />
                )}
                {/* Supportboard  */}
                {
                livechatType === "supportboard" && 
                livechatEnabled &&
                <FloatButton 
                    badge={{
                        color: '#4E2728',
                        size: 'small'
                    }}
                    icon={<Icon icon="simple-icons:livechat" width="1.2rem" height="1.2rem" />}
                    onClick={() => {
                        windowRef.current = window.open(`${livechatUrl}/admin.php/`, "_blank")
                        window.addEventListener('message', (event) => {
                            if (event.data == "send-creds") {
                                generateToken(livechatSecretKey).then(({ timestamp, token }) => {
                                    const username = localStorage.getItem("username");
                                    let hostname = "email.com" 
                                    if (window && window.location && window.location.hostname) {
                                        hostname = window.location.hostname;
                                    }
                                    windowRef.current?.postMessage({username, hostname, token, timestamp}, '*');
                                });
                            }
                        })
                    }}
                />
                }
                {
                livechatType === "customlivechat" && 
                livechatEnabled && 
                <FloatButton 
                    badge={{
                        count: livechatUnreadCount,
                        color: '#4E2728',
                        size: 'small'
                    }}
                    icon={<Icon icon="wpf:chat" width="1.2rem" height="1.2rem" />}
                    onClick={() => {
                        navigate("/livechat")
                    }}
                />
                }
            </FloatButton.Group>}
        </>
    )
}

export default NotificationBadge;