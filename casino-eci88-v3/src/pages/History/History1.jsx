import React, { useCallback, useMemo, useState } from "react";
import Tabs from "../../components/common/Tabs";
import { formatDate, timeDifferences } from "../../utils/helper";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
import Table from "../../components/common/Table/Table";
import withHistory from "../../HOC/withHistory";
import { HistoryContainer, Status } from "./History1.styled";
import Loading from "../../components/common/Loading";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { addThousandSeparator } from "../../components/common/NumberConvertion";

function History1({transactions, chips, rewards, transfers, deleteTransaction, isLoading}) {
  const [selectedType, setSelectedType] = useState("transactions")
  const { currency_symbol, country } = useSelector(selectConfigData);
  const { t } = useTranslation();
  const tabs = [
    {
      key: "transactions",
      label: t("Orders&Bonuses"),
    },
    // {
    //   key: "chips",
    //   label: t("Chips"),
    // },
    {
      key: "rewards",
      label: t("Rewards"),
    },
    {
      key: "transfers",
      label: t("Transfers"),
    },
  ];
  const allHistory = useMemo(() => {
    const allHist = {
      columns: {
        s_no: {
          label: t("S_No"),
          span: 1,
          background: props=>props.theme.primary_color,
        },
        type: {
          label: t("Type&NO"),
          span: 1,
          background: props=>props.theme.primary_color,
        },
        amount: {
          label: t("Amount"),
          span: 1,
          background: props=>props.theme.primary_color,
        },
        date_time: {
          label: t("Time"),
          span: 1,
          background: props=>props.theme.primary_color,
        },
        status: {
          label: t("Status"),
          span: 1,
          background: props=>props.theme.primary_color,
        },
      },
      data: []
    };
    const history={
      transactions, chips, rewards, transfers
    }
    const data = history[selectedType];
    if (data?.length) {
      if(selectedType === "rewards") {
        data.forEach((row, index) => {
          const {date: fromDate} = formatDate(row?.from_date)
          const {date: toDate} = formatDate(row?.to_date)
          allHist.data.push({
            s_no: {
              value: index + 1
            },
            type: {
              value: <>
              {row?.ttype === "RB" ? t("Rebate") :  t("Referral")} <br />
              {row?.referred_player && `(Referred: ${row.referred_player})`}
            </>},
            amount:{ 
            value: row?.reward_amount &&
            <span>{addThousandSeparator(row?.reward_amount, country)}</span>
            }
            ,
            date_time: {value: <>
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{t("From")}:</span> {fromDate}
              </span>
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{t("To")}:</span> {toDate}
              </span>
            </>},
            status: {value: <Status $status={row?.state}>
              <div className="status">
                {row?.state}
              </div>
            </Status>}
          })
        });
      } else {
        data.forEach((row, index) => {
          const {date, time} = formatDate(row?.updated_at)
          allHist.data.push({
            s_no: {
              value: index + 1
            },
            type: {
              value: <>
              {row?.ttype_display === "BL" ? "LuckyWheel" : t(row?.ttype_display)}<br />
              {row?.txid || row?.cid}
            </>},
            amount:{ 
            value: row?.reward_amount?
            <span>{addThousandSeparator(row?.reward_amount, country)}</span>
            :<>
              {row?.req_amount != 0 &&
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{t("Requested")}:</span> {addThousandSeparator(row?.req_amount, country)}
              </span>
              }
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>{t("Actual")}:</span> {addThousandSeparator(row?.amount, country)}
              </span>
            </>}
            ,
            date_time: {value: <>
              {date} <br />
              {time}
            </>},
            status: {value: <Status $status={row?.state}>
              <div className="status">
                {t(row?.state)}
              </div>
              {
                ((row?.state === "pending") && (selectedType!=="rewards"))?
                timeDifferences(row?.updated_at) > 5 &&
                <div className="delete" onClick={() => deleteTransaction(row?.id)}><Icon icon="ic:outline-delete" /></div>
                :null
              }
            </Status>}
          })
        });
      }
    }
    return allHist
  }, [transactions, selectedType]);
  
  const handleTabChange = useCallback((tab) => {
    setSelectedType(tab)
  },[])
  
  return (
    <HistoryContainer>
      <Loading isLoading={isLoading} />
      <Tabs
        defaultActive={tabs[0].key}
        tabs={tabs}
        onChange={handleTabChange}
      >
        <Table 
          sx={{
            columnBorder: false,
            text_align: "center",
            responsive_text: true,
            padding: "13px 0"
          }} 
          columns={allHistory.columns} 
          data={allHistory.data} 
        />
      </Tabs>
    </HistoryContainer>
  );
}

export default withHistory(History1);
