import React from "react";
import { UserMessage } from "./Messages.styled";
import { useSelector } from "react-redux";
import { selectIsSearched } from "../../../app/slices/chatSlice";
import { selectUser } from "../../../app/slices/userSlice";
const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;

function Message({
  message,
  setScrollToSearch,
  searchRef,
  setPreviewImage,
  searchText,
}) {
  const user = useSelector(selectUser);
  const isSearched = useSelector(selectIsSearched);
  const highlightSearchTerm = (text, term) => {
    if (!term) return text; // If no search term is provided, return the original text.

    const regex = new RegExp(`(${term})`, "gi"); // Case-insensitive search.
    return text.replace(regex, '<span class="highlight">$1</span>');
  };
  let fromMe = user?._id === message?.sender?._id 
  if ((user?.role==="agent" || user?.role==="admin")) {
    fromMe = (message?.sender?.role==="agent" || message?.sender?.role==="admin")
  }
  return (
    <UserMessage
      key={message._id}
      $fromMe={fromMe}
      ref={(ref) => {
        if (
          ref &&
          isSearched &&
          message.message?.toLowerCase()?.includes(isSearched?.toLowerCase())
        ) {
          searchRef.current = ref;
          setScrollToSearch(true);
        }
      }}
    >
      {(fromMe) ? (
        <span className="username">
          {message.sender._id === user?._id ? "Me" : message.sender.username}
        </span>
      ) : null}
      {message.type === "image" ? (
        <div
          className="img-message"
          onClick={() =>
            setPreviewImage(LIVECHAT_API_URL + "/uploads/" + message.message)
          }
        >
          <img src={LIVECHAT_API_URL + "/uploads/" + message.message} alt="" />
        </div>
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: highlightSearchTerm(message.message, searchText),
          }}
        />
      )}
      <span className="time">{message?.time}</span>
    </UserMessage>
  );
}

export default React.memo(Message);
