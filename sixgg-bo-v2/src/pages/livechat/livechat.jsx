import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleLiveChat } from "../../features/generalSlice";

const Livechat = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(toggleLiveChat(true));

      return () => {
        dispatch(toggleLiveChat(false));
      };
  }, []);
  return null;
};

export default React.memo(Livechat);