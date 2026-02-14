import { useEffect, useRef, useState } from "react";
import {
  BlockMsg,
  MessageInputContainer,
  MessagesContainer,
} from "./PlayerChats.styled";
import { useSelector } from "react-redux";
import { getSelectedChat } from "../../app/slices/chatSlice";
import {
  useGetDepartmentsQuery,
  useGetSettingsMutation,
  useUploadImageMutation,
} from "../../api/hooks";
import { socket } from "../../sockets";
import { NEW_MESSAGE } from "../../sockets/events";
import sendIcon from "../../assets/icons/send-icon.png";
import { Icon } from "@iconify/react";
import { selectUser } from "../../app/slices/userSlice";
import MessagesHeader from "./Messages/MessagesHeader";
import PlayerMessages from "./Messages/PlayerMessages";
import { selectSettings } from "../../app/slices/generalSlice";

function Messages({setOpenUserDetails}) {
  const user = useSelector(selectUser);
  const settings = useSelector(selectSettings);
  const selectedChat = useSelector(getSelectedChat);
  const containerRef = useRef(null);
  const [message, setMessage] = useState("");
  const [getSettings] = useGetSettingsMutation();
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [quickMessages, setQuickMessages] = useState([]);
  useGetDepartmentsQuery();
  const [uploadImage] = useUploadImageMutation();
  const [image, setImage] = useState();
  const [previewImage, setPreviewImage] = useState("");
  const [initialMessages, setInitialMessages] = useState(true);

  useEffect(() => {
    if (user) {
      getSettings(user?.role)
    }
  }, [user])
  
  useEffect(() => {
    if (!message) return
    const timerId = setTimeout(() => {
      socket.emit("STOP_TYPING", {
        chatId: selectedChat?._id,
        userId: user?._id,
      });
    }, 2000); // Delay in milliseconds

    // Cleanup timeout on component unmount or query change
    return () => clearTimeout(timerId);
  }, [message]);

  useEffect(() => {
    if (settings) {
      setQuickMessages(
        settings?.find((setting) => setting.key === "quickMessages")
          ?.settings
      );
    }
  }, [settings]);

  useEffect(() => {
    if (!previewImage && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current?.scrollHeight;
    }
  }, [previewImage]);

  const sendMessage = async (quickMessage) => {
    try {
      let type = "text";
      let filePath = "";
      if (image) {
        type = "image";
        const { data } = await uploadImage(image).unwrap();
        filePath = data?.filePath;
      }
      if (quickMessage || message || filePath) {
        socket.emit(NEW_MESSAGE, {
          chatId: selectedChat?._id,
          senderId: user?._id,
          message: filePath || quickMessage || message,
          type,
        });
        setMessage("");
        setImage(null);
        setPreviewImage(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const selectFile = (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 5 MB in bytes

    if (file.size > maxSize) {
      alert("File size should not exceed 2MB");
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setImage(file);
    setPreviewImage(objectUrl);
  };
  return (
    <MessagesContainer userType={user?.role}>
      {selectedChat ? (
        <>
          <MessagesHeader
            setOpenUserDetails={setOpenUserDetails}
            initialMessages={initialMessages}
            setInitialMessages={setInitialMessages}
          />
          <PlayerMessages
            key={selectedChat?._id}
            previewImage={previewImage}
            setPreviewImage={setPreviewImage}
            initialMessages={initialMessages}
            setInitialMessages={setInitialMessages}
            setImage={setImage}
          />
          {!user?.block ? (
            <MessageInputContainer $disableSend={!message?.length && !image}>
              <input
                type="text"
                value={message}
                disabled={image}
                onChange={(event) => {
                  setMessage(event.target.value);
                  socket.emit("TYPING", {
                    chatId: selectedChat?._id,
                    userId: user?._id,
                  });
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && (message?.length || image)) {
                    sendMessage()
                  }
                }}
              />
              {
                ((user?.role==="agent") || (user?.role==="admin"))?
                <div className="quick-messages_container">
                  {showQuickReplies ? (
                    <div className="quick-messages">
                      {quickMessages?.map((quickMessage) => (
                        <h5
                          key={quickMessage?.key}
                          className="quick-message"
                          onClick={() => {
                            sendMessage(quickMessage.value);
                            setShowQuickReplies(false);
                          }}
                          dangerouslySetInnerHTML={{
                            __html: quickMessage?.value,
                          }}
                        />
                      ))}
                    </div>
                  ) : null}
                  <Icon
                    icon="material-symbols:quickreply"
                    fontSize={22}
                    onClick={() => setShowQuickReplies(!showQuickReplies)}
                  />
                </div>
                :null
              }
              <div className="file-input_container">
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  name=""
                  id=""
                  onChange={selectFile}
                />
                <Icon icon="iconoir:attachment" fontSize={22} />
              </div>
              <img src={sendIcon} alt="" onClick={() => (message?.length || image) && sendMessage()} />
            </MessageInputContainer>
          ) : (
            <BlockMsg>You have been blocked by Admin</BlockMsg>
          )}
        </>
      ) : (
        <BlockMsg>Select a Conversation to Start Chat</BlockMsg>
      )}
    </MessagesContainer>
  );
}

export default Messages;
