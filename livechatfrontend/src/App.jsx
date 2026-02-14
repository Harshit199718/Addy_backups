import { useEffect, useState } from "react";
import "./App.css";
import Chats from "./features/Chat/Chats";
import defineSockets, { socket } from "./sockets";
import {
  useAddUserAndLoginMutation,
  useGetUserDetailsQuery,
} from "./api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  livechatCreds,
  selectUser,
  selectUserAuth,
  setParentAuth,
} from "./app/slices/userSlice";
import LiveChatLayout from "./components/LiveChatLayout/LiveChatLayout";
import ChatDashboard from "./features/ChatDashboard/ChatDashboard";
import MyProfile from "./features/MyProfile/MyProfile";
import Users from "./features/Users/Users";
import Settings from "./features/Settings/Settings";
import { WhiteBox } from "./components/common/WhiteBox";
import { selectActiveNav, setActiveNav } from "./app/slices/generalSlice";
import { useParams } from "react-router-dom";

function LiveChat() {
  const queryParams = new URLSearchParams(window.location.search);
  const siteName = queryParams.get("siteName");
  const [payload, setPayload] = useState();
  const [addUserAndLogin, { data: loginData }] = useAddUserAndLoginMutation();
  useGetUserDetailsQuery(loginData?.data?.access, { skip: !loginData });
  const dispatch = useDispatch();
  const userAuth = useSelector(selectUserAuth);
  const user = useSelector(selectUser);
  const activeNav = useSelector(selectActiveNav);

  useEffect(() => {
    window?.parent?.postMessage("requestCredentials", "*");
    window.addEventListener("message", (e) => {
      if (e.data.source === "parent") {
        if (e.data.event === "logout") {
          return 
        }
        const { username, host, token, hostApi } = e.data.payload;
        setPayload({ username, host });
        localStorage.setItem(
          "parent_auth",
          JSON.stringify({ username, host, token, hostApi })
        );
        dispatch(setParentAuth({ username, host, token, hostApi }));
      }
    });
  }, []);
  useEffect(() => {
    if (siteName) {
      localStorage.setItem("SITE_NAME", siteName);
    }
  }, [siteName]);

  console.log("siteName", siteName);
  useEffect(() => {
    if (payload?.username && payload?.host) {
      const { username, host } = payload;
      addUserAndLogin({
        username,
        password: "123456",
        role: username === "superadminlivechat" ? "admin" : "agent",
        host: host,
      });
    }
  }, [payload]);

  useEffect(() => {
    if (user?.role === "admin") {
      dispatch(setActiveNav("users"));
    }
    if (user && socket) {
      window.addEventListener("message", (e) => {
        console.log("ON_ACTIVE chatId", e.data);
        if (e.data.source === "parent") {
          if (e.data.event === "logout") {
            socket.emit("INACTIVE", { userId: user?._id });
            window?.parent?.postMessage("loggedOut", "*");
          }
        }
      })
      socket.emit("ON_ACTIVE", { userId: user?._id });
      return () => {
        socket.emit("INACTIVE", { userId: user?._id });
      };
    }
  }, [user]);

  useEffect(() => {
    if (userAuth) {
      defineSockets(userAuth?.access);
      if (socket) {
        return () => {
          socket.disconnect();
        };
      }
    }
  }, [userAuth]);
  return (
    <div className="App">
      <LiveChatLayout>
        {activeNav === "dashboard" ? <ChatDashboard /> : null}
        {activeNav === "profile" ? <MyProfile /> : null}
        {activeNav === "chats" && user?.role !== "admin" ? <Chats /> : null}
        {activeNav === "users" ? <Users /> : null}
        {activeNav === "settings" ? (
          <WhiteBox>
            <Settings />
          </WhiteBox>
        ) : null}
      </LiveChatLayout>
    </div>
  );
}

export default LiveChat;
