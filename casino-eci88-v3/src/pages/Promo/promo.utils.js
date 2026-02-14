const promotionMessageMappings = {
    limit_per_user: "Limit_Per_User",
    is_product_launch: "Is_Product_Launch",
    group_applied_can_claim_promo_group: "Group_Promotion_Can_Claim_Together",
    group_applied: "Group_Promotion_Applied",
    is_bankaccount_required: "Is_Bank_Account_Required",
    new_member: "New_Member",
    first_deposit: "First_Deposit",
    amount_in_x_days: "Amount_in_X_Days",
    min_x_deposit_min_y_amount: "Min_X_Deposit_Min_Y_Amount",
    is_daily_x_deposit: "Is_Daily_Deposit",
    start_date: "Start_Date",
    start_time: "Start_Time",
    end_date: "End_Date",
    end_time: "End_Time",
    not_deposit_yet: "Not_Deposited_Yet",
    num_deposits_required: "Num_Deposits_Required",
    limit: "Limit",
    active: "Active",
    min_deposit: "Min_Deposit",
    total_deposit_required: "Total_Deposit_Required",
    deposit_not_needed: "Deposit_Not_Needed",
    bonus_amount: "Bonus_Amount",
    promotion_day: "Promotion_Day",
    referral_check: "Referral_Check",
    referral_deposit_check: "Referral_Deposit_Check",
    min_x_deposit_min_y_amount_z_downline: "Min_X_Deposit_Min_Y_Amount_Z_Downline",
    sites: "Sites",
    first_deposit_CA: "First_Deposit_CA",
    first_deposit_CH: "First_Deposit_CH",
    recurrence_frequency: "Recurrence_Frequency",
    reward_type_deposit: "Reward_Type_Deposit",
    reward_type: "Reward_Type",
    check_promotion_applied_deposit_date: "Check_promotion_applied_deposit_date"
};

export function formatPromotionMessage(item, t) {
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
            return t(promotionMessageMappings[key]) + " ✅ "
          } else {
            return t(promotionMessageMappings[key]) + " ❌ "
          }
        } else {
          return key + ": " + value
        }
      }
    }
  }