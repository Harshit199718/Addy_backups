import React, { useMemo, useState } from "react";
import Tabs from "../../components/common/Tabs";
import Table from "../../components/common/Table/Table";
import LayoutSpacing from "../../features/Layout/LayoutSpacing";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { Status3, TransactionData } from "./History3.styled";
import { useGetBetHistoryQuery, useTransactionsQuery } from "../../api/hooks";
import { formatDate } from "../../utils/helper";
import { historyColumns } from "./columns";
import { useTranslation } from "react-i18next";
import { addThousandSeparator } from "../../components/common/NumberConvertion";

function History3() {
  const { t } = useTranslation();
  const { data: transactions } = useTransactionsQuery();
  const { data: betHistory } = useGetBetHistoryQuery();
  const { border_color, currency_symbol, country } = useSelector(selectConfigData);
  const [selectedCategory, setSelectedCategory] = useState("history");
  const tabs = useMemo(() => [
    {
      key: "history",
      label: t("Transactions"),
    },
    {
      key: "bet_history",
      label: t("Bet_History"),
    },
  ]);
  const { columns, data } = useMemo(() => {
    let data = [];
    if (selectedCategory === "history") {
      data = transactions?.map((transaction) => {
        const { date, time } = formatDate(transaction?.created_at);
        return {
          transactions: {
            value: (
              <TransactionData>
                <h3 className="data-display">
                  {t(transaction?.ttype_display)} <br />
                  {transaction?.txid}
                </h3>
                <h3 className="amount-display">
                  <span>{t("Actual")}: </span>
                  {currency_symbol} {addThousandSeparator(transaction?.amount, country)}
                </h3>
                {transaction?.forfeit > 0 ? (
                  <h3 className="amount-display">
                    <span>{t("Forfeited")}: </span>
                    {currency_symbol} {addThousandSeparator(transaction?.forfeit, country)}
                  </h3>
                ) : null}
                <h3 className="data-display">
                  {date} {time}
                </h3>
              </TransactionData>
            ),
          },
          status: {
            value: <Status3 $status={transaction?.state}>
              <div className="status" />
              {t(transaction?.state)}
              </Status3>,
          },
        };
      });
    } else if (selectedCategory === "bet_history") {
      data = betHistory?.map((history) => ({
        date_time: {
          value: (
            <TransactionData>
              <h3 className="data-display">
                {new Date(history?.matchtime).toLocaleString()}
              </h3>
            </TransactionData>
          ),
        },
        game: {
          value: (
            <TransactionData>
              <h3 className="data-display">
                {history?.product_name} {history?.detail?.GameName}
              </h3>
            </TransactionData>
          ),
        },
        amount: {
          value: (
            <TransactionData>
              <h3 className="data-display">{history?.bet}</h3>
            </TransactionData>
          ),
        },
        win_loss: {
          value: (
            <TransactionData $color={history?.winlose>0?"green":"red"}>
              <h3 className="data-display">
                {Number(history?.winlose) < 0 ? "Lose" : "Win"}{" "}
                {history?.winlose}
              </h3>
            </TransactionData>
          ),
        },
      }));
    }
    return { columns: historyColumns[selectedCategory], data };
  }, [selectedCategory, transactions, betHistory]);
  return (
    <LayoutSpacing>
      <Tabs
        gap="0"
        defaultActive={selectedCategory}
        tabs={tabs}
        tabStyles={{
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
        }}
        onChange={(tab) => setSelectedCategory(tab)}
      >
        <Table
          columns={columns}
          data={data}
          sx={{
            $borderColor: border_color,
            responsive_text: true,
          }}
        />
      </Tabs>
    </LayoutSpacing>
  );
}

export default History3;
