import React from "react";
import { BonusWinoverContainer, ProgressContainer } from "./Profile1.styled";
import withWallet from "../../HOC/withWallet";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { useTranslation } from "react-i18next";

function BonusWinover({wallet, progress, padding, textAlign}) {
    const {t} = useTranslation();
    const {currency_symbol, enable_chips, show_bonus_winover_in_profile} = useSelector(selectConfigData);
  return (
    show_bonus_winover_in_profile ? 
    <BonusWinoverContainer $padding={padding} $textAlign={textAlign}>
      <label>{t("Bonus_Winover_Requirement")}:</label>
      <ProgressContainer
        $progress={`${
          progress?.cash ? parseFloat(progress?.cash)?.toFixed(2) : "00"
        }%`}
      >
        <h3 className="balance">
          <span className="key">{t("Cash")}:</span>
          <span className="value">
            {currency_symbol} {wallet?.balance}
          </span>
        </h3>
        <div className="progressbar" />
      </ProgressContainer>
      {enable_chips ? (
        <ProgressContainer
          $progress={`${
            progress?.chips ? parseFloat(progress?.chips)?.toFixed(2) : "00"
          }%`}
        >
          <h3 className="balance">
            <span className="key">{t("Chips")}:</span>
            <span className="value">
              {currency_symbol} {wallet?.chips_balance}
            </span>
          </h3>
          <div className="progressbar" />
        </ProgressContainer>
      ) : null}
    </BonusWinoverContainer>
    : null
  );
}

export default withWallet(BonusWinover);
