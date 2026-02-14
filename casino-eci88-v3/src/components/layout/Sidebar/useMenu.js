import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../../api/generalApi';
import { sidebar_menu_items } from './sidebar-utils';

function useMenu() {
  const { t } = useTranslation();
  const configData = useSelector(selectConfigData);
  const icons = ["bi-house-fill", "bi-megaphone", "bi-people", "bi-people", "bi-credit-card", "bi-cash", "bi-clock-history", "bi-clock-history", "bi-people", "bi-telephone", "bi-person-square", "bi-square"]
  const routes = ["/", "/promotions", "/app-accounts", "/bank-accounts", "/deposit", "/withdraw", "/history", "/bet-history", "/change-password", "/contactus", "/profile", "/vip-ranking"]
  const texts = [
    t("Home"),
    t("Promotions"),
    t("Game_Accounts"),
    t("Bank_Accounts"),
    t("deposit"),
    t("withdrawal"),
    t("Orders_History"),
    t("Bet_History"),
    t("Change_Password"),
    t("Say Hi"),
    t("Profile"),
    t("VIP_Ranking")
  ]
  const items = useMemo(() => {
    if (configData) {
      return Array.from({length: 12}).map((_, index)=> 
        configData[`side_menu_active_${index+1}`]?({
          image: configData[`side_menu_icon_${index+1}`] || icons[index+1],
          title: configData[`side_menu_text_${index+1}`] || texts[index+1],
          // path: (configData[`side_menu_route_${index+1}`]!=="home"?configData[`side_menu_route_${index+1}`]:"/") || routes[index+1],
          path: configData[`side_menu_route_${index + 1}`] ?
            (configData[`side_menu_route_${index + 1}`] !== "home"
            ? (configData[`side_menu_route_${index + 1}`]?.startsWith("/") 
              ? configData[`side_menu_route_${index+1}`] 
              : `/${configData[`side_menu_route_${index + 1}`]}`) 
            : "/") 
          : 
            routes[index + 1],
          defaultImage: icons[index+1],
          defaultTitle: texts[index+1],
          defaultPath: routes[index+1],
        }):null
      ).filter(item=> item);
    }
    return [];
  }, [configData])
  return items;  
}

export default useMenu