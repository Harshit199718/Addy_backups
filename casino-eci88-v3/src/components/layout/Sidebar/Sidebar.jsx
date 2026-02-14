import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MenuItem,
  MenuItems,
  SidebarBg,
  SidebarContainer,
  SidebarWrapper,
} from "./Sidebar.styled";
import { useLogoutMutation, useWalletQuery } from "../../../api/hooks";
import { selectCurrentCountry, selectCurrentLang, toggleSidebar } from "../../../app/slices/general";
import Loading from "../../common/Loading";
import { selectCurrentUser, setCurrentUser } from "../../../app/slices/userSlice";
import Image from "../../common/Image";
import { useTranslation } from "react-i18next";
import useMenu from "./useMenu";
import { selectConfigData } from "../../../api/generalApi";
import LanguageMenu from "./LanguageMenu";
import { countries } from "../../../i18n/countries";
import { addThousandSeparator } from "../../common/NumberConvertion";

export function Item({ isLogout, isLanguage, isLanguageLabel, item, itemStyles }) {
  const location = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const currentCountry = useSelector(selectCurrentCountry);
  const currentLang = useSelector(selectCurrentLang);
  const [languageOpen, setLanguageOpen] = useState(false);

  const handleClick = () => {
    if (isLogout) {
      dispatch(toggleSidebar());
      currentUser?
      logout():
      navigate("/signin");
    } else if (isLanguage) {
      setLanguageOpen(!languageOpen);
    } else {
      navigate(item.path || item.defaultPath);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.removeItem("user");
      dispatch(setCurrentUser(null));
    }
  }, [isSuccess]);
  return (
    <>
      <MenuItem onClick={handleClick} style={itemStyles}>
        {isLogout && <Loading isLoading={isLoading} />}
        {
          item.image?
          <Image src={item.image} alt="" width="30px" circle skeletonHeight={30} />
          :<Icon icon={item.defaultImage} />
        }
        {
          isLanguage?
          // <h3>{countries[currentCountry]?.languages[currentLang]}</h3>
            <h3>{t("Select_Language")}</h3>
          :
          isLanguageLabel ? 
            <h3>{item.title || item.defaultTitle}</h3>
          : 
            <h3>{t(item.title || item.defaultTitle)}</h3>
        }
        {location.pathname === (item.path || item.defaultPath) ? (
          <div className="dot" />
        ) : (
          <Icon icon="uil:angle-right" fontSize="22px" />
        )}
      </MenuItem>
      {
        isLanguage?
        <LanguageMenu languageOpen={languageOpen} />
        :null
      }
    </>
  );
}
function Sidebar() {
  const { t } = useTranslation();
  const { sidebarOpen } = useSelector((state) => state.general);
  const {data: wallet} = useWalletQuery();
  const dispatch = useDispatch();
  const sidebar_menu_items = useMenu()
  const {login_icon, language_icon, currency_symbol, country} = useSelector(selectConfigData);
  return (
    <SidebarContainer $open={sidebarOpen}>
      <SidebarBg
        $open={sidebarOpen}
        onClick={() => {
          dispatch(toggleSidebar());
        }}
      />
      <SidebarWrapper $open={sidebarOpen}>
        {wallet && 
        <div className="user-details">
          <h3 className="username">{wallet?.user.username || "No Account"}</h3>
          <h3 className="balance">{currency_symbol} {addThousandSeparator(wallet?.balance, country)}</h3>
        </div>
        }
        <MenuItems>
          {sidebar_menu_items.map((item, index) => (
            <Item key={item.title + index} item={item} />
          ))}
          <Item key="language-menu" isLanguage item={{
              title: "Language",
              image: language_icon,
              defaultImage: "bi-globe2"
            }} />
        </MenuItems>
        <MenuItems>
          <Item
            isLogout
            item={{
              title: wallet?t("Logout"):t("LOGIN"),
              image: login_icon,
              path: "/signin",
              defaultImage: "bi-bar-chart-fill"
            }}
          />
        </MenuItems>
      </SidebarWrapper>
    </SidebarContainer>
  );
}

export default React.memo(Sidebar);
