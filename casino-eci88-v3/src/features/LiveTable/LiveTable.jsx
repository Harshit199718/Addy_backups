import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Table from "../../components/common/Table/Table";
import { useTranslation } from "react-i18next";
import {
  useGetLastDepositsQuery,
  useGetLastWithdrawlsQuery,
} from "../../api/hooks";
import {
  formatData,
  getFilteredData,
  getRandomData,
  getRandomLiveTableData,
  updateTableData,
} from "./liveTable.utils";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";

const LiveTableContainer = styled.div`
  width: 100%;
`;


const LiveTableBlinkAnimation = styled.div`
    @keyframes blinkme {
      0% {
        opacity: 0;
      }
      38% {
        opacity: 0;
      }
      39% {
        opacity: 1;
      }
      100% {
        opacity: 1;
      }
    }

    background: red;
    padding: 2px;
    border-radius: 2px;
    color: #fff;
    font-weight: 400;
    animation: blinkme 1.5s linear infinite;
    margin-left: auto;
`

function LiveTable() {
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const { 
    text_color, 
    text_color_secondary, 
    live_transaction_bg, 
    live_deposit_bg, 
    live_withdraw_bg,
    currency_symbol,
    country, 
    livetable_dummy_data_game_show, 
    livetable_dummy_data_random_init, 
    livetable_dummy_data_random_multiplier,
    dummy_data_country_code, 
    dummy_data_star_between, 
    dummy_data_random_behind_mobile

  } = useSelector(selectConfigData);
  useEffect(() => {
    const fetchData = () => {
      const data = getRandomLiveTableData(
        currency_symbol,
        country, 
        livetable_dummy_data_game_show, 
        livetable_dummy_data_random_init, 
        livetable_dummy_data_random_multiplier,
        dummy_data_country_code, 
        dummy_data_star_between, 
        dummy_data_random_behind_mobile
      );
      setData(data);
    };

    fetchData(); // Initial fetch

    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  // const [displayIndex, setDisplayIndex] = useState(0);
  // const { data: depositsApiData } = useGetLastDepositsQuery();
  // const { data: withdrawalsApiData } = useGetLastWithdrawlsQuery();
  // useEffect(() => {
  //   if (depositsApiData && withdrawalsApiData) {
  //     // Initialize data with the first 5 records from each API
  //     const [filteredApiDeposits, filteredWithdrawls] = getFilteredData(
  //       depositsApiData,
  //       withdrawalsApiData
  //     );
  //     let depositsData = filteredApiDeposits.slice(0, 5);
  //     let withdrawData = filteredWithdrawls.slice(0, 5);
  //     if (filteredApiDeposits.length < 5) {
  //       depositsData = [
  //         ...filteredApiDeposits,
  //         ...Array.from({ length: 5 - filteredApiDeposits.length }).map(() =>
  //           getRandomData("deposits")
  //         ),
  //       ];
  //     }
  //     if (filteredWithdrawls.length < 5) {
  //       withdrawData = [
  //         ...filteredWithdrawls,
  //         ...Array.from({ length: 5 - filteredWithdrawls.length }).map(() =>
  //           getRandomData("withdraw")
  //         ),
  //       ];
  //     }
  //     const initialData = formatData(depositsData, withdrawData);
  //     setData(initialData);
  //     if (displayIndex === 0) {
  //       setDisplayIndex(1);
  //     }
  //   }
  // }, [depositsApiData, withdrawalsApiData]);

  // useEffect(() => {
  //   if (depositsApiData && withdrawalsApiData && displayIndex) {
  //     setTimeout(() => {
  //       const { updatedIndex, nextData } = updateTableData(
  //         displayIndex,
  //         data,
  //         depositsApiData,
  //         withdrawalsApiData
  //       );
  //       setDisplayIndex(updatedIndex);
  //       setData(nextData);
  //     }, displayIndex * 500);
  //   }
  // }, [displayIndex]);

  const columns = {
    deposit: {
      label: t("deposit"),
      span: 2,
      background: live_deposit_bg,
      color: text_color,
      fontSize: "11px",
      $bold: "bold",
      uppercase: true,
    },
    withdraw: {
      label: t("withdraw"),
      span: 3,
      background: live_withdraw_bg,
      color: text_color,
      fontSize: "11px",
      $bold: "bold",
      uppercase: true,
    },
  };
  return (
    <LiveTableContainer>
      <Table
        header={{
          label: 
          <div style={{ display: "flex", alignItems: 'center' }}>
            {`${t("Live")} ${t("Transaction")}`}
            <LiveTableBlinkAnimation>{t("Live")} ⚪</LiveTableBlinkAnimation>
          </div>,
          span: 5,
          color: text_color_secondary,
          $bold: "bold",
          fontSize: "11px",
          uppercase: true,
        }}
        sx={{ table_bg: live_transaction_bg, fontSize: "9px", padding: "5px" }}
        columns={columns}
        data={data}
      />
    </LiveTableContainer>
  );
}

export default LiveTable;
