import React, { useEffect, useMemo, useState } from "react";
import {
  useLogoutMutation,
  useMinDepositQuery,
  useWalletQuery,
} from "../api/hooks";
import { useSelector } from "react-redux";
import { selectConfigData } from "../api/generalApi";
import { useTranslation } from "react-i18next";

function withProfile(WrappedComponent) {
  return (props) => {
    const [logout, { isLoading }] = useLogoutMutation();
    const { currency_symbol, enable_chips, country, ...configData } =
      useSelector(selectConfigData);
    const { t } = useTranslation();

    const tabs = useMemo(() => {
      if (!configData) return;
      const icons = [
        "bi-people-fill",
        "bi-controller",
        "bi-bank",
        "bi-cash-coin",
        "bi-credit-card",
        "bi-clock-history",
        "bi-joystick",
        "bi-question-circle",
        "bi-people",
      ];
      const routes = [
        "/downline",
        "/bank-accounts",
        "/app-accounts",
        "/deposit",
        "/withdraw",
        "/history",
        "/bet-history",
        "/change-password",
        "/vip-ranking",
      ];
      const texts = [
        t("Referral_system"),
        t("Bank_Accounts"),
        t("Game_Accounts"),
        t("deposit"),
        t("withdrawal"),
        t("Orders_History"),
        t("Bet_History"),
        t("Change_Password"),
        t("VIP_Ranking"),
      ];
      return Array.from({ length: 9 }).map((_, index) => ({
        icon: configData[`profile_tab_icon_${index + 1}`],
        text: configData[`profile_tab_text_${index + 1}`],
        route: configData[`profile_tab_route_${index + 1}`],
        defaultRoute: routes[index],
        defaultIcon: icons[index],
        defaultText: texts[index],
      }));
    }, [configData]);

    const defaultProps = useMemo(() => {
      return {
        logout,
        currency_symbol,
        tabs,
        enable_chips,
        country,
        isLoading,
      };
    }, [
      logout,
      currency_symbol,
      tabs,
      enable_chips,
      country,
      isLoading,
    ]);

    return <WrappedComponent {...defaultProps} {...props} />;
  };
}

export default withProfile;
