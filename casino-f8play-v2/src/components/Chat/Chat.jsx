import React, { useMemo, useRef, useState } from "react";
import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   //   selectAutomaticMessagePayload,
//   selectLivechatVisibility,
//   setUnreadMessages,
// } from "../../app/slices/general";
import userService from "../../services/user.service";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const siteName = process.env.REACT_APP_LIVECHAT_SITE_NAME;
const LIVECHAT_FE_URL = process.env.REACT_APP_LIVECHAT_FE_URL;
const LIVECHAT_INSTANCE_NAME = process.env.REACT_APP_LIVECHAT_INSTANCE_NAME;
const LIVECHAT_INSTANCE_ID = process.env.REACT_APP_LIVECHAT_INSTANCE_ID;

const getDeviceIdentifier = async () => {
  // Initialize an agent at application startup.
  const fp = await FingerprintJS.load();

  // Get the visitor identifier when you need it.
  const result = await fp.get();

  // This is the visitor identifier.
  const visitorId = result.visitorId;

  return visitorId;
};
function Chat({liveChatVisibility, setUnreadMessages, isLoggedIn}) {
  //   const automaticMessagePayload = useSelector(selectAutomaticMessagePayload);
  const iframeRef = useRef();
//   const liveChatVisibility = useSelector(selectLivechatVisibility);
//   const dispatch = useDispatch();
  const [wallet, setWallet] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const getWalletInfo = async () => {
    setIsFetching(true);
    const response = await userService.getBalance();
    setWallet(response?.data);
    setIsFetching(false);
  };
  useEffect(() => {
    if (isLoggedIn) {
        getWalletInfo();
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    const loginEvent = async (event) => {
      if (event.data === "requestCredentials") {
        event.source?.postMessage(
          {
            source: "parent",
            payload: {
              username: wallet?.user?.username,
              role: !wallet?.user?.username ? "anonymous" : "user",
              deviceId: !wallet?.user?.username
                ? await getDeviceIdentifier()
                : "",
              host: window.location.hostname,
              siteName,
              sites: [siteName],
              instanceName: LIVECHAT_INSTANCE_NAME,
              instanceId: LIVECHAT_INSTANCE_ID,
            },
          },
          "*"
        );
      }
      if (event.data.unreadCount) {
        // dispatch(setUnreadMessages(event.data.unreadCount));
        setUnreadMessages(event.data.unreadCount);
      }
    };
    window.addEventListener("message", loginEvent);
    return () => window.removeEventListener("message", loginEvent);
  }, [wallet]);

  //   useEffect(() => {
  //     if (automaticMessagePayload) {
  //       iframeRef.current?.contentWindow?.postMessage(
  //         {
  //           type: "AUTOMATIC_MESSAGE",
  //           data: automaticMessagePayload,
  //         },
  //         "*"
  //       );
  //     }
  //   }, [automaticMessagePayload]);
  const styles = useMemo(() => {
    if (liveChatVisibility) {
      iframeRef.current?.contentWindow?.postMessage({ type: "MARK_READ" }, "*");
    }
    return liveChatVisibility
      ? {
          opacity: 1,
          pointerEvents: "visible",
          background: "rgba(255, 255, 255, 0.9)"
        }
      : {
          opacity: 0,
          pointerEvents: "none",
          height: 0,
        };
  }, [liveChatVisibility]);

    return (
      !isFetching && (
        <iframe
          className="chat-iframe"
          ref={iframeRef}
          onLoad={() => console.log("message: Iframe loaded")}
          style={{ ...styles }}
          src={LIVECHAT_FE_URL}
          frameBorder="0"
        ></iframe>
      )
    );
}

export default Chat;
