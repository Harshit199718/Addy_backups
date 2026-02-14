import React, { useEffect, useMemo, useState } from "react";
import { useMinDepositQuery, useWalletQuery } from "../api/hooks";

function withWallet(WrappedComponent) {
  return (props) => {
    const { data: wallet } = useWalletQuery();
    const { data: minDeposit } = useMinDepositQuery();
    const [progress, setProgress] = useState({
      cash: "",
      chips: "",
      minWithdraw: "",
    });

    useEffect(() => {
      if (!minDeposit) return;

      const {
        ttype,
        cash_balance,
        chip_balance,
        min_turnover,
        total_bet,
        min_rollover,
      } = minDeposit;

      const toFixed2 = (value) => parseFloat(value).toFixed(2);

      const progressRate = (balance, turnover) =>
        (toFixed2(balance) / toFixed2(turnover)) * 100;

      setProgress((prevProgress) => ({
        ...prevProgress,
        chips:
          progressRate(chip_balance, min_turnover) < 100
            ? progressRate(chip_balance, min_turnover)
            : 100,
        cash:
          ttype === "TO"
            ? progressRate(cash_balance, min_turnover) < 100
              ? progressRate(cash_balance, min_turnover)
              : 100
            : progressRate(total_bet, min_rollover) < 100
            ? progressRate(total_bet, min_rollover)
            : 100,
        minWithdraw:
          ttype === "TO" ? toFixed2(min_turnover) : toFixed2(min_rollover),
      }));
    }, [minDeposit]);

    const defaultProps = useMemo(() => {
        return {
            wallet,
            minDeposit,
            progress
        }
    }, [wallet, minDeposit, progress])

    return <WrappedComponent {...defaultProps} {...props} />;
  };
}

export default withWallet;
