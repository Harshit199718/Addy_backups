import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Profile2Tab,
  Profile2TabsContainer,
} from "../../Profile/Profile2.styled";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";

function Withdraw2Tabs() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { secondary_color } = useSelector(selectConfigData);
  return (
    <Profile2TabsContainer
      $withdrawStyles={{ border: `1px solid ${secondary_color}` }}
    >
      <Profile2Tab
        $active={location.pathname === "/deposit" ? secondary_color : ""}
        onClick={() => navigate("/deposit")}
      >
        {t("deposit")}
      </Profile2Tab>
      <Profile2Tab
        $active={location.pathname === "/withdraw" ? secondary_color : ""}
        onClick={() => navigate("/withdraw")}
      >
        {t("withdraw")}
      </Profile2Tab>
    </Profile2TabsContainer>
  );
}

export default Withdraw2Tabs;
