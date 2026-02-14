import React, { useEffect } from 'react'
import { useWalletQuery } from '../../api/hooks';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectEnableLiveChat } from '../../app/slices/general';

function useSBLogin() {
  const { data: wallet } = useWalletQuery();
    const enableLiveChat = useSelector(selectEnableLiveChat);
  const loaction = useLocation();
    
  useEffect(() => {
    if (wallet && enableLiveChat && window.SBF) {
        setTimeout(() => {
            window.SBF && window.SBF.getActiveUser(true, () => {
                let hostname = "email.com" 
                if (location && location.hostname) {
                    hostname = location.hostname;
                }
                if (!window.SBF.activeUser() || (window.SBF.activeUser().email != `${wallet?.user?.username}@${hostname}`)) {
                    window.SBF.ajax({
                        function: "add-user-and-login",
                        settings: { profile_image: "https://board.support/media/docs/user.png", first_name: wallet?.user?.username, email: `${wallet?.user?.username}@${hostname}`, password: "12345678" },
                        // settings_extra: { phone: ["123456789", "Phone"], city: ["London", "City"] }
                    }, (response) => {
                        if (!window.SBF.errorValidation(response)) {
                            window.SBF.loginCookie(response[1]);
                            window.SBF.activeUser(new window.SBUser(response[0]));
                            window.SBChat.initChat();
                            SBChat.setConversation(SBF.activeUser().conversations)
                            let settings = JSON.parse(localStorage.getItem('support-board'))
                            if (settings != null && window.SBF.setting('welcome')) {
                                settings['welcome'] = '';
                                localStorage.setItem('support-board', JSON.stringify(settings))
                            }
                        } else if (response[1] == "duplicate-email") {
                            window.SBF.login(`${wallet?.user?.username}@${hostname}`, "12345678", "", "", () => { window.SBChat.initChat(); });
                        }
                    });
                } else {
                    window.SBChat.initChat();
                }
            });
        }, 2000);
    }
  }, [wallet, enableLiveChat])
  
}

export default useSBLogin