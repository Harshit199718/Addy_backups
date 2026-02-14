import React, { useMemo, useState } from "react";
import styled from "styled-components";
import LayoutSpacing from "../features/Layout/LayoutSpacing";
import Table from "../components/common/Table/Table";
import { useTranslation } from "react-i18next";
import { createFakeData, getItemWithExpiry, setItemWithExpiry } from "./leaderboardUtils";
import Button from "../components/common/Button";
import { useSelector } from "react-redux";
import { selectConfigData } from "../api/generalApi";

const LeaderBoardHeader = styled.div`
  font-size: 1.5em;
  color: ${({ theme }) => theme.text_color_secondary};
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.text_color_secondary};
`;
function Leaderboard() {
  const { country, leaderboard_dummy_data_game_show, leaderboard_dummy_data_random_bet, leaderboard_dummy_data_random_payout, dummy_data_country_code, dummy_data_star_between, dummy_data_random_behind_mobile } = useSelector(selectConfigData);
  const { t } = useTranslation();
  const [filter, setFilter] = useState("today");

  const allData = useMemo(() => {
    let today, yesterday;

    if(country && leaderboard_dummy_data_game_show && leaderboard_dummy_data_random_bet && leaderboard_dummy_data_random_payout && dummy_data_country_code && dummy_data_star_between && dummy_data_random_behind_mobile) {
      if (getItemWithExpiry('leaderboard-today')) {
          today = getItemWithExpiry('leaderboard-today')
      } else {
          today = createFakeData(50, country, leaderboard_dummy_data_game_show, leaderboard_dummy_data_random_bet, leaderboard_dummy_data_random_payout, dummy_data_country_code, dummy_data_star_between, dummy_data_random_behind_mobile)
          setItemWithExpiry('leaderboard-today', today, 60*24);
      }
      if (getItemWithExpiry('leaderboard-yesterday')) {
          yesterday = getItemWithExpiry('leaderboard-yesterday')
      } else {
          yesterday = createFakeData(50, country, leaderboard_dummy_data_game_show, leaderboard_dummy_data_random_bet, leaderboard_dummy_data_random_payout, dummy_data_country_code, dummy_data_star_between, dummy_data_random_behind_mobile)
          setItemWithExpiry('leaderboard-yesterday', yesterday, 60*24);
      }
      return {
        today,
        yesterday: createFakeData(50, country, leaderboard_dummy_data_game_show, leaderboard_dummy_data_random_bet, leaderboard_dummy_data_random_payout, dummy_data_country_code, dummy_data_star_between, dummy_data_random_behind_mobile),
      };
    } else {
      return today = [], yesterday = []
    }

  }, [leaderboard_dummy_data_game_show, leaderboard_dummy_data_random_bet, leaderboard_dummy_data_random_payout, country]);
  return (
    <LayoutSpacing>
      <LeaderBoardHeader>Leaderboard</LeaderBoardHeader>
      <Button
        $width="fit-content"
        $margin="5px 10px"
        $background={filter !== "yesterday" ? "transparent" : ""}
        onClick={() => setFilter("yesterday")}
      >
        Yesterday
      </Button>
      <Button
        $width="fit-content"
        $margin="5px 10px"
        $background={filter !== "today" ? "transparent" : ""}
        onClick={() => setFilter("today")}
      >
        Today
      </Button>
      <Table
        showAll
        sx={{
          columnBorder: false,
          text_align: "center",
          responsive_text: true,
          padding: "13px 0",
        }}
        columns={{
          rank: {
            label: t("Rank"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
          player: {
            label: t("Player"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
          game: {
            label: t("Game"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
          bet: {
            label: t("Bet"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
          win: {
            label: t("Win"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
          payout_ratio: {
            label: t("PayoutRatio"),
            span: 1,
            background: (props) => props.theme.primary_color,
          },
        }}
        data={allData[filter]}
      />
    </LayoutSpacing>
  );
}

export default Leaderboard;
