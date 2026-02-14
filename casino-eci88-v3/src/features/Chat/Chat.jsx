import React, { useMemo, useRef } from "react";
import { useEffect } from "react";
import { useWalletQuery } from "../../api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAutomaticMessagePayload,
  selectEnableLiveChat,
  selectLivechatVisibility,
  setUnreadMessages,
} from "../../app/slices/general";
import { selectCurrentUser } from "../../app/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { getDeviceIdentifier } from "../../utils/helper";

const siteName = import.meta.env.VITE_APP_LIVECHAT_SITE_NAME;
const LIVECHAT_FE_URL = import.meta.env.VITE_APP_LIVECHAT_FE_URL;
const LIVECHAT_INSTANCE_NAME = import.meta.env.VITE_APP_LIVECHAT_INSTANCE_NAME;
const LIVECHAT_INSTANCE_ID = import.meta.env.VITE_APP_LIVECHAT_INSTANCE_ID;
function Chat() {
  const { data: wallet, isFetching } = useWalletQuery();
  const automaticMessagePayload = useSelector(selectAutomaticMessagePayload);
  const iframeRef = useRef();
  const liveChatVisibility = useSelector(selectLivechatVisibility);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginEvent = async (event) => {
      if (event.data === "requestCredentials") {
          event.source?.postMessage(
            {
              source: "parent",
              payload: {
                username: wallet?.user?.username,
                role: !wallet?.user?.username ? "anonymous" : "user",
                deviceId: !wallet?.user?.username ? await getDeviceIdentifier() : "",
                host: window.location.hostname,
                siteName,
                sites: [siteName],
                instanceName: LIVECHAT_INSTANCE_NAME, 
                instanceId: LIVECHAT_INSTANCE_ID
              },
            },
            "*"
          );
      }
      if (event.data.unreadCount) {
        dispatch(setUnreadMessages(event.data.unreadCount))
      }
    };
    window.addEventListener("message", loginEvent);
    return () => window.removeEventListener("message", loginEvent);
  }, [wallet]);

  useEffect(() => {
    if (automaticMessagePayload) {
      iframeRef.current?.contentWindow?.postMessage(
        {
          type: "AUTOMATIC_MESSAGE",
          data: automaticMessagePayload,
        },
        "*"
      );
    }
  }, [automaticMessagePayload]);
  const styles = useMemo(() => {
    if (liveChatVisibility) {
      iframeRef.current?.contentWindow?.postMessage(
        {type: "MARK_READ"},
        "*"
      )
    }
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
    !isFetching && (
      <iframe
        ref={iframeRef}
        onLoad={() => console.log("message: Iframe loaded")}
        style={{ width: "100%", height: "calc(100dvh - 114px)", ...styles }}
        src={LIVECHAT_FE_URL}
        frameBorder="0"
      ></iframe>
    )
  );
}

export default Chat;
