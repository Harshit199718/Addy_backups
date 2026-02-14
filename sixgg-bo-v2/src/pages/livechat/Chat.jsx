import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAutomaticMessagePayload, selectLivechatVisibility, setLiveChatUnreadCount } from "../../features/generalSlice";
import { useParams } from "react-router-dom";

const hostApi = import.meta.env.VITE_APP_API_URL;
const siteName = import.meta.env.VITE_APP_SITE_NAME;
const LIVECHAT_FE_URL = import.meta.env.VITE_APP_LIVECHAT_FE_URL;
const LIVECHAT_INSTANCE_NAME = import.meta.env.VITE_APP_LIVECHAT_INSTANCE_NAME;
const LIVECHAT_INSTANCE_ID = import.meta.env.VITE_APP_LIVECHAT_INSTANCE_ID;
const IS_SUPERBO = import.meta.env.VITE_APP_IS_SUPERBO;

const Chat = (props) => {
  const token = useSelector((state) => state.auth.token);
  const iframeRef = useRef();
  const welcome = token ? `Welcome` : `Please Login`;
  const tokenAbbr = `${token.slice(0, 9)}...`;
  const automaticMessagePayload = useSelector(getAutomaticMessagePayload);
  const liveChatVisibility = useSelector(selectLivechatVisibility);
  const {username, site} = useParams();
  const dispatch = useDispatch()

  useEffect(() => {
    if (username) {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "SelectChat",
          username,
          host: window.location.hostname,
          site
        },
        "*"
      );
    }
    window.addEventListener("message", (event) => {
      const {type, unreadCount} = event.data;
      if (type==="Unread") {
        dispatch(setLiveChatUnreadCount(unreadCount))
      }
    })
  }, [username])
  
  useEffect(() => {
    if (token) {
      const token = localStorage.getItem('access') || null;
      const decodedToken = jwtDecode(token);
      const {username, site_name} = decodedToken?.user
      const loginEvent = event => {
        if (event.data === "requestCredentials") {
          event.source?.postMessage(
            {
              source: "parent",
              payload: {
                username,
                role: username==="superadminlivechat"?"admin":"agent",
                host: window.location.hostname,
                hostApi,
                token,
                siteName: "DEV",
                sites: site_name,
                instanceName: LIVECHAT_INSTANCE_NAME, 
                instanceId: LIVECHAT_INSTANCE_ID,
                isSuperBO: IS_SUPERBO
              },
            },
            "*"
          );
        }
      }
      window.addEventListener('click', () => {
        iframeRef.current?.contentWindow?.postMessage('user-interacted', "*")
      })
      window.addEventListener("message", loginEvent);
      return () => window.removeEventListener("message", loginEvent)
    }
  }, []);

  useEffect(() => {
    if (automaticMessagePayload) {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "AUTOMATIC_MESSAGE",
          isAgent: true,
          data: automaticMessagePayload,
        },
        "*"
      );
    }
  }, [automaticMessagePayload]);
  const styles = useMemo(() => {
    return liveChatVisibility
      ? {
          opacity: 1,
          pointerEvents: "visible",
        }
      : {
          opacity: 0,
          pointerEvents: "none",
          height: 0
        };
  }, [liveChatVisibility]);
  return (
    <div>
      <iframe
        style={{ width: "100%", height: "80vh", ...styles }}
        ref={iframeRef}
        src={`${LIVECHAT_FE_URL}`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default React.memo(Chat);