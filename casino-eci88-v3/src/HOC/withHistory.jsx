import React, { useMemo } from "react";
import {
  useChipsQuery,
  useDeleteTransactionMutation,
  useRewardsQuery,
  useTransactionsQuery,
  useTransfersQuery,
} from "../api/hooks";

function withHistory(WrappedComponent) {
  return (props) => {
    const { data: transactions } = useTransactionsQuery({}, {
      refetchOnFocus: true,
    });
    const { data: chips } = useChipsQuery({}, {
      refetchOnFocus: true,
    });
    const { data: rewards } = useRewardsQuery({}, {
      refetchOnFocus: true,
    });
    const { data: transfers } = useTransfersQuery({}, {
      refetchOnFocus: true,
    });
    const [deleteTransaction, {isLoading}] = useDeleteTransactionMutation();
    const defaultProps = useMemo(
      () => ({
        transactions,
        chips,
        rewards,
        transfers,
        deleteTransaction,
        isLoading
      }),
      [transactions, chips, rewards, transfers, deleteTransaction]
    );

    return <WrappedComponent {...defaultProps} {...props} />;
  };
}

export default withHistory;
