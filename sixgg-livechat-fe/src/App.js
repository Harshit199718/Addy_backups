import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Chats from "./features/Chat/Chats";
import defineSockets, { socket } from "./sockets";
import {
  useAddUserAndLoginMutation,
  useCreateUserMutation,
  useGetBackofficeColorsQuery,
  useGetChatDetailsQuery,
  useGetChatWithUsernameMutation,
  useGetSettingsMutation,
  useGetUserDetailsQuery,
} from "./api/hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  selectParentUser,
  selectUser,
  selectUserAuth,
  setParentUser,
  setUser,
  setUsers,
} from "./app/slices/userSlice";
import LiveChatLayout from "./components/LiveChatLayout/LiveChatLayout";
import ChatDashboard from "./features/ChatDashboard/ChatDashboard";
import MyProfile from "./features/MyProfile/MyProfile";
import Users from "./features/Users/Users";
import Settings from "./features/Settings/Settings";
import { WhiteBox } from "./components/common/WhiteBox";
import {
  selectActiveNav,
  selectBackofficeColors,
  selectTheme,
  setActiveNav,
} from "./app/slices/generalSlice";
import Departments from "./features/Departments/Departments";
import Messages from "./components/PlayerChats/Messages";
import {
  getSelectedChat,
  getSelectedSite,
  removeChats,
  selectChats,
  selectSitesFilter,
  setMessages,
  setSelectedChat,
  setSelectedSite,
} from "./app/slices/chatSlice";
import { AUTOMATIC_MESSAGE, MARK_READ } from "./sockets/events";
import { ThemeProvider } from "styled-components";
import Select from "./components/common/Select";
import messageSound from "./assets/sounds/message.mp3";
import boMessageSound from "./assets/sounds/bo-message.mp3";
import { Button } from "./components/common/Button";
import { Box } from "./components/common/Box";
import { getFilterStyles } from "./utlis";

function debounce(func, wait) {
  let timeout,
    initial = true;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
      initial = false;
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, initial ? 0 : wait);
  };
}

function App() {
  const [addUserAndLogin, { data: loginData }] = useAddUserAndLoginMutation();
  const [createUser, { data: newChat }] = useCreateUserMutation();
  const userAuth = useSelector(selectUserAuth);
  const theme = useSelector(selectTheme);
  useGetUserDetailsQuery(userAuth?.access, { skip: !userAuth?.access });
  const dispatch = useDispatch();
  const parentUser = useSelector(selectParentUser);
  const user = useSelector(selectUser);
  const activeNav = useSelector(selectActiveNav);
  const selectedSite = useSelector(getSelectedSite);
  const sitesFilter = useSelector(selectSitesFilter);
  const chats = useSelector(selectChats);
  const { data: chatDetails } = useGetChatDetailsQuery(user?.assignedChat, {
    skip: !user?.assignedChat,
  });
  const [lastUser, setLastUser] = useState();
  const [getSettings] = useGetSettingsMutation();
  useGetBackofficeColorsQuery(null, {skip: (user?.role!=="agent") && (user?.role!=="admin")})
  const backofficeColors = useSelector(selectBackofficeColors);
  const [audioReady, setAudioReady] = useState(false);
  const selectedChat = useSelector(getSelectedChat);
  const [isSocketChanged, setIsSocketChanged] = useState(false)
  const [getChatWithUsername] = useGetChatWithUsernameMutation();

  useEffect(() => {
    if (user) {
      getSettings(user?.role)
    }
  }, [user])

  const backofficeTheme = useMemo(() => {
    if (backofficeColors) {
        return {
          primary_color: backofficeColors.primary,
          secondary_color: backofficeColors.secondary,
          tertiary_color: backofficeColors.tertiary,
        }
    }
  }, [backofficeColors])
  
  const debouncedLogin = useMemo(() => {
    return debounce(addUserAndLogin, 0);
  }, [addUserAndLogin]);

  const handleUserInteraction = (event) => {
    console.log("user-interacted", event)
    if (event.data === "user-interacted") {
      const audio = new Audio(boMessageSound);
      audio
        .play() // attempt to play and catch immediately can unlock further plays
        .then(() => {
          console.log("audio.pause")
          audio.pause(); // Pause immediately
          setAudioReady(true);
        })
        .catch((error) => console.error("Failed to play:", error));
    }
  };

  useEffect(() => {
    // Function to get query parameters
    const handleSelectChat = async (event) => {
      const {type, username, host, site} = event.data;
      if (type==="SelectChat" && chats?.length) {
        let chat = chats.find(chat => chat.user.username===`${username}_user`)
        if (chat) {
          dispatch(setSelectedChat(chat))
        } else {
          const result = await createUser({
            username,
            password: "123456",
            role: "user",
            host,
            sites: [site],
          }).unwrap();
          chat = result.data
          if (result.message==="Chat Added") {
            dispatch(setSelectedChat(result.data))
          }
        }
        socket.emit("JOIN_CHAT", { chatId: chat?._id });
      }
    }
    window.addEventListener("message", handleSelectChat);
    return () => {
      window.removeEventListener("message", handleSelectChat);
    };
  }, [chats]);
  
  useEffect(() => {
    window.addEventListener("message", handleUserInteraction);
    return () => {
      window.removeEventListener("message", handleUserInteraction);
    };
  }, []);
  
  useEffect(() => {
    window?.parent?.postMessage("requestCredentials", "*");
    window.addEventListener("message", (event) => {
      if (event?.data?.source === "parent") {
        const {instanceName, instanceId, isSuperBO} = event.data.payload;
        localStorage.setItem("instanceName", instanceName)
        localStorage.setItem("instanceId", instanceId)
        localStorage.setItem("isSuperBO", isSuperBO)
        dispatch(setParentUser(event.data.payload));
      }
    });
  }, []);

  useEffect(() => {
    if (parentUser) {
      let { username, role, host, sites, deviceId, isSuperBO } = parentUser;
      if (role && host && sites) {
        localStorage.setItem("siteName", sites);
        debouncedLogin({
          username,
          password: "123456",
          role: username === "admin" ? "admin" : role,
          deviceId,
          host,
          sites,
          isSuperBO
        });
      }
    }
  }, [parentUser]);

  useEffect(() => {
    console.log("user?.role", user?.role)
    if (user?.role === "agent") {
      localStorage.removeItem("isFE")
      localStorage.setItem("isBO", true)
    } else if (user?.role === "user" || user?.role === "anonymous") {
      localStorage.removeItem("isBO")
      localStorage.setItem("isFE", true)
    }
    if (user && socket) {
      if (lastUser) {
        socket.emit("INACTIVE", { userId: lastUser });
      }
      setLastUser(user?._id);
      socket.emit("ON_ACTIVE", { userId: user?._id });
    }
    const unloadListener = (event) => {
      // Send a message to the parent window before unloading
      if (user) {
        socket.emit("INACTIVE", { userId: user?._id });
      }
      localStorage.removeItem("livechat_parentuser");
      localStorage.removeItem("livechat_user");
      dispatch(setParentUser(null));
      dispatch(setUser(null));
    };
    window.addEventListener("unload", unloadListener);
  }, [user]);
  useEffect(() => {
    if (
      socket &&
      chatDetails &&
      (user?.role === "user" || user?.role === "anonymous")
    ) {
      dispatch(setSelectedChat(chatDetails?.data));
      socket.emit("JOIN_CHAT", { chatId: chatDetails?.data?._id });
    }
  }, [user, chatDetails]);

  useEffect(() => {
    const handleMessage = async (event) => {
      const { type, data, isAgent } = event.data;
      if (type === "AUTOMATIC_MESSAGE") {
        let chatId = chatDetails?.data?._id;
        if (isAgent) {
          const response = await getChatWithUsername({username: data.data.username, site: data.data.site}).unwrap()
          chatId = response.data?._id;
        }
        socket.emit(AUTOMATIC_MESSAGE, {
          chatId,
          isAgent,
          ...data,
        });
      } else if (type === "MARK_READ" && user?.role === "user") {
        socket.emit(MARK_READ, user?.assignedChat);
      }
    };

    window.addEventListener("message", handleMessage);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [chats, chatDetails]); // Dependencies that cause the effect to re-run

  const userRole = user?.role;
  const selectedChatId = selectedChat?._id
  useEffect(() => {
    if (isSocketChanged && selectedChat) {
      socket.emit("JOIN_CHAT", { chatId: selectedChatId });
      setIsSocketChanged(false)
    }
  }, [isSocketChanged, selectedChat])
  
  const socketChanged = useCallback(() => {
    setIsSocketChanged(true)
  }, [])
  useEffect(() => {
    if (userAuth && userRole) {
      console.log("userRole", userRole)
      defineSockets(userAuth?.access, parentUser?.siteName, userRole==="agent", socketChanged, user?._id);
      if (socket) {
        return () => {
          socket.disconnect();
        };
      }
    }
  }, [userAuth, userRole]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={((user?.role==="agent" || user?.role==="admin") && backofficeTheme)?backofficeTheme:theme}>
      {
        ((user?.role === "agent") || (user?.role === "admin"))?
        <Box $justifyContent="flex-start" $gap="10px">
          {(((user?.role === "agent") || (user?.role === "admin")))?["All", ...user?.sites]?.map((site) => (
            <Button $fontSize="1em" {...getFilterStyles(selectedSite, site)} onClick={() => dispatch(setSelectedSite(site))}>{site}</Button>
          )):null}
        </Box>
        :null
      }
      {user?.role === "anonymous" || user?.role === "user" ? (
        <Messages />
      ) : (
        <LiveChatLayout>
          {activeNav === "dashboard" ? <ChatDashboard /> : null}
          {activeNav === "profile" ? <MyProfile /> : null}
          {activeNav === "chats" ? <Chats /> : null}
          {activeNav === "users" ? <Users /> : null}
          {activeNav === "departments" ? (
            <WhiteBox>
              <Departments />
            </WhiteBox>
          ) : null}
          {activeNav === "settings" ? (
            <WhiteBox>
              <Settings />
            </WhiteBox>
          ) : null}
        </LiveChatLayout>
      )}
    </ThemeProvider>
  );
}

export default App;
