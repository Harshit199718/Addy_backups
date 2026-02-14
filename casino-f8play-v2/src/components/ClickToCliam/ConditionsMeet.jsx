export function ConditionMeetExcludeWalletBalance(conditions) {
    const checkConditions = (conditions) => {
        return conditions.every(condition => {
            const [key, value] = Object.entries(condition)[0];
            if (key === "max_wallet_balance_amount" && (value != "no_checking" || value != "Pass")) {
            return true
            }
            return value === "no_checking" || value === "Pass";
        });
    };
    return checkConditions(conditions)
}