import { t } from "i18next";

export const sidebar_menu_items = [
  {
    icon: "bi-house-fill",
    title: t("Home"),
    path: "/",
  },
  {
    icon: "bi-megaphone",
    title: t("Promotions"),
    path: "/promotions",
  },
  {
    icon: "bi-people",
    title: t("Game_Accounts"),
    path: "/app-accounts",
  },
  {
    icon: "bi-people",
    title: t("Bank_Accounts"),
    path: "/bank-accounts",
  },
  {
    icon: "bi-credit-card",
    title: t("deposit"),
    path: "/deposit",
  },
  {
    icon: "bi-cash",
    title: t("withdrawal"),
    path: "/withdraw",
  },
  {
    icon: "bi-clock-history",
    title: t("Orders_History"),
    path: "/history",
  },
  {
    icon: "bi-clock-history",
    title: t("Bet_History"),
    path: "/bet-history",
  },
  {
    icon: "bi-people",
    title: t("Change_Password"),
    path: "/change-password",
  },
  {
    icon: "bi-telephone",
    title: "Say Hi",
    path: "/contactus",
  },
  {
    icon: "bi-person-square",
    title: t("Profile"),
    path: "/profile",
  },
  {
    icon: "bi-square",
    title: t("VIP_Ranking"),
    path: "/vip-ranking",
  },
];
