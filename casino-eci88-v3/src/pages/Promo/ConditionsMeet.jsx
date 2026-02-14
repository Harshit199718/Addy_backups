import React from "react";
import { ConditionsRequirement } from "./Promo.styled";
import { formatPromotionMessage } from "./promo.utils";
import { useTranslation } from "react-i18next";

function ConditionsMeet({ conditions }) {
    const {t} = useTranslation();
    return conditions?.message?(
      <ConditionsRequirement $isMeet={conditions?.applicable}>
        <h2 className="conditions-meet-heading">
          <span className="key">Condition Meet:</span>
          <span className="value">{conditions?.applicable?"Pass":"Not Meet"}</span>
        </h2>
        {
          conditions?.message?.map((condition, index)=>(
              <h3 key={index} className="conditions-meet">{formatPromotionMessage(condition, t)}</h3>
          ))
        }
      </ConditionsRequirement>
    ):"Please Login to Claim";
}

export function ConditionMeetExcludeWalletBalance(conditions) {
  const checkConditions = (conditions) => {
    return conditions?.every(condition => {
      const [key, value] = Object.entries(condition)[0];
      if (key === "max_wallet_balance_amount" && (value != "no_checking" || value != "Pass")) {
        return true
      }
      return value === "no_checking" || value === "Pass";
    });
  };
  return conditions && checkConditions(conditions)
}

export default ConditionsMeet;
