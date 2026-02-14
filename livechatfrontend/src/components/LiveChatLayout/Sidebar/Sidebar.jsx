import { Icon } from "@iconify/react";
import { NavLink, NavLinks, SidebarContainer } from "./Sidebar.styled";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveNav, setActiveNav } from "../../../app/slices/generalSlice";
import { selectUser } from "../../../app/slices/userSlice";
function Sidebar() {
  const dispatch = useDispatch()
  const activeNav = useSelector(selectActiveNav);
  const user = useSelector(selectUser);
  const menuItems = [
    user?.role!=="admin"?{
      id: "chats",
      icon: "ph:chat-dots-thin",
    }:{},
    user?.role==="admin"?{
      id: "users",
      icon: "clarity:users-line",
    }:{},
    {
      id: "profile",
      icon: "flowbite:profile-card-solid",
    },
    user?.role==="admin"?{
      id: "settings",
      icon: "material-symbols:settings-outline",
    }:{},
  ];

  return (
    <SidebarContainer>
      <NavLinks>
        {menuItems.map((item) => (
          <NavLink key={item.id} $active={activeNav===item.id} onClick={() => dispatch(setActiveNav(item.id))}>
            <Icon icon={item.icon} fontSize="1.2em" /> {item.id}
          </NavLink>
        ))}
      </NavLinks>
    </SidebarContainer>
  );
}

export default Sidebar;
