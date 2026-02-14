import React, { useRef, useEffect, useState } from "react";
// import SunEditor from 'suneditor-react';
// import SunEditorCore from "suneditor/src/lib/core";
// import "../suneditor.min.css"

export const promotionMessageMappings = {
  limit_per_user: "Limit Per User",
  is_product_launch: "Is Product Launch",
  group_applied_can_claim_promo_group: "Group Promotion can claim together",
  group_applied: "Group Promotion Applied",
  is_bankaccount_required: "Is Bank Account Required",
  new_member: "New Member",
  first_deposit: "First Deposit",
  amount_in_x_days: "Amount in X Days",
  min_x_deposit_min_y_amount: "Min X Deposit Min Y Amount",
  is_daily_x_deposit: "Is Daily Deposit",
  start_date: "Start Date",
  start_time: "Start Time",
  end_date: "End Date",
  end_time: "End Time",
  not_deposit_yet: "Not Deposited Yet",
  num_deposits_required: "Num Deposits Required",
  limit: "Limit",
  active: "Active",
  min_deposit: "Min Deposit",
  total_deposit_required: "Total Deposit Required",
  deposit_not_needed: "Deposit Not Needed",
  bonus_amount: "Bonus Amount",
  promotion_day: "Promotion Day",
  referral_check: "Referral Check",
  referral_deposit_check: "Referral Deposit Check"
  // Add more mappings for other keys here
};

export function formatPromotionMessage(item) {
  if (typeof item === "string") {
    return (
      <span style={{ color: "red" }}>{item}</span>
    );
  } else if (typeof item === "object") {
    const key = Object.keys(item)[0];
    const value = Object.values(item)[0];

    if (value !== "no_checking") {
      if (promotionMessageMappings[key]) {
        if (value === "Pass") {
          return (
            <>
              {promotionMessageMappings[key] + ": "}
              * <span style={{ color: "lightgreen" }}>{value}</span>
            </>
          );
        } else {
          return (
            <>
              {promotionMessageMappings[key] + ": "}
              * <span style={{ color: "red" }}>{value}</span>
            </>
          );
        }
      } else {
        return (
          <>
            * {key + ": " + value}
          </>
        );
      }
    }
  }
}

const PromotionDescription = ({field,data}) => {      
    // style="text-align: center;"
    const [modifiedHtml, setModifiedHtml] = useState('');
    useEffect(() => {
      // Modify the HTML string as needed
      // const modifiedField = field.replaceAll('<table>', '<table style="border: 1px solid #ddd; width: 100%;">')
      // .replaceAll('<th>', '<th style="background-color: rgb(74,134,232); border: 1px solid #ddd;">')
      // .replaceAll('<th colspan="2" rowspan="1">', '<th colspan="2" rowspan="1" style="background-color: rgb(74,134,232); border: 1px solid #ddd;">')
      // .replaceAll('<td>', '<td style="border: 1px solid #ddd; padding: 8px;">')
      // .replaceAll('<td colspan="2">', '<td colspan="2" style="border: 1px solid #ddd; padding: 8px;">')
      // .replaceAll('<td colspan="3">', '<td colspan="3" style="border: 1px solid #ddd; padding: 8px;">')
      // .replaceAll('<td colspan="4">', '<td colspan="4" style="border: 1px solid #ddd; padding: 8px;">')
      // .replaceAll('<td colspan="5">', '<td colspan="5" style="border: 1px solid #ddd; padding: 8px;">');

      setModifiedHtml(field);
    }, [field]);
    return (
        <>
        {/* {data && data.applicable &&<p>Amount : {data.bonus_amount}</p>} */}
        <div
            className="sun-editor-editable"
            style={{
              padding: "10px"
            }}
            dangerouslySetInnerHTML={{
            __html: `${modifiedHtml}`,
            }}
        ></div>
        {data && data.message ?
            <div>
                {/* <p style={{ color: "yellow" }}>Condition Meet: {data && data.applicable && data.applicable ? 
                <span style={{ color: "lightgreen"}}>Pass</span> : <span style={{ color: "red"}}>Not Meet</span>}</p>
                {data && data.message.map((item, index) => (
                <div key={index}>
                    {formatPromotionMessage(item)}
                </div>
                ))} */}
            </div>
        :
        <div>
            <p>Please Login to claim</p>
        </div>
        }
        </>
    );
};

export default PromotionDescription;