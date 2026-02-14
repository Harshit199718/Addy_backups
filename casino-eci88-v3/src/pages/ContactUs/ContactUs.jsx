import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEnableLiveChat, setUnreadMessages, toggleLiveChat } from "../../app/slices/general";
import { useGetSocialsQuery } from "../../api/hooks";
import Image from "../../components/common/Image";
import { SocialsContainer } from "./ContactUs.styled";
import Chat from "../../features/Chat/Chat";

function ContactUs() {
  const enableLiveChat = useSelector(selectEnableLiveChat);
  const {data: socials} = useGetSocialsQuery(null, {skip: enableLiveChat});
  const dispatch = useDispatch();
  useEffect(() => {
    if (enableLiveChat) {
      dispatch(toggleLiveChat(true));
      dispatch(setUnreadMessages(0));
      return () => {
        dispatch(toggleLiveChat(false));
      };
    }
  }, [enableLiveChat]);

  const handleClick = (link) => {
    window.open(link, "_blank")
  }
  return !enableLiveChat?<SocialsContainer>
        {
            socials?.map(social=>(
              <div key={social?.id}>
                <Image key={social.id} src={social.image} alt={social.provider} height="auto" width="100%" skeletonHeight="150px" onClick={() => handleClick(social.action_link)} />
              </div>
            ))
        }
  </SocialsContainer>:null;
}

export default ContactUs;
