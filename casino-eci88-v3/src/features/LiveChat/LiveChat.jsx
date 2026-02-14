import React, { useEffect } from "react";
import useSBLogin from "./useSBLogin";
import { LiveChatContainer } from "./LiveChat.styled";
import { useSelector } from "react-redux";
import { selectLivechatVisibility } from "../../app/slices/general";

function LiveChat(props) {
  const livechatVisibility = useSelector(selectLivechatVisibility);
  useSBLogin();
  useEffect(() => {
    $(document).on("SBActiveUserLoaded", function (e, response) {
      // Your code here
      SBChat.updateConversations();
      SBChat.showDashboard();
    });
  }, []);

  return (
    <LiveChatContainer
      id="live-chat"
      $visible={livechatVisibility}
    ></LiveChatContainer>
  );
}

export default LiveChat;
