import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Table } from 'antd';
import { useGetBetHistoryTurnoverByPlayerQuery } from '../../features/bethistory/betHistoryApiSlices';
import NumberListingField from '../../ListingField/NumberListingField';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import { useSelector } from 'react-redux';
import AdjustTurnover from './AdjustTurnover';
import ClearTurnover from './ClearTurnover';

const BetHistoryTurnover = ({ playerid, walletid, t }) => {
  const columns = [
    {
      title: t('common.Category'),
      dataIndex: 'category',
    },
    {
      title: t('common.Last Deposit'),
      render: (record) => <DateTimeListingField dateTime={record.last_deposit_date} />
    },
    {
      title: t('common.Turnover Min Withdrawal'),
      dataIndex: 'min_withdrawal_amt_turnover',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Turnover Lack Withdrawal'),
      dataIndex: 'lack_withdrawal_turnover',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Rollover Min Withdrawal'),
      dataIndex: 'min_withdrawal_amt_rollover',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Rollover Lack Withdrawal'),
      dataIndex: 'lack_withdrawal_rollover',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Total Round'),
      dataIndex: 'total_round',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Total Bet'),
      dataIndex: 'total_bet',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Total Win/Lose'),
      dataIndex: 'total_winlose',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Total Turnover'),
      dataIndex: 'total_turnover',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
  ];
  
  const columnsDetail = [
    {
      title: t('common.Category'),
      dataIndex: 'category',
    },
    {
      title: t('common.Casino Round'),
      dataIndex: 'casino_round',
      align: 'right',
      render: (casino_round) => <NumberListingField value={casino_round}/>
    },
    {
      title: t('common.Casino Bet'),
      dataIndex: 'casino_bet',
      align: 'right',
      render: (casino_bet) => <NumberListingField value={casino_bet}/>
    },
    {
      title: t('common.Casino Winlose'),
      dataIndex: 'casino_winlose',
      align: 'right',
      render: (casino_winlose) => <NumberListingField value={casino_winlose}/>
    },
    {
      title: t('common.Casino Turnover'),
      dataIndex: 'casino_turnover',
      align: 'right',
      render: (casino_turnover) => <NumberListingField value={casino_turnover}/>
    },
    {
      title: t('common.Slots Round'),
      dataIndex: 'slots_round',
      align: 'right',
      render: (slots_round) => <NumberListingField value={slots_round}/>
    },
    {
      title: t('common.Slots Bet'),
      dataIndex: 'slots_bet',
      align: 'right',
      render: (slots_bet) => <NumberListingField value={slots_bet}/>
    },
    {
      title: t('common.Slots Winlose'),
      dataIndex: 'slots_winlose',
      align: 'right',
      render: (slots_winlose) => <NumberListingField value={slots_winlose}/>
    },
    {
      title: t('common.Slots Turnover'),
      dataIndex: 'slots_turnover',
      align: 'right',
      render: (slots_turnover) => <NumberListingField value={slots_turnover}/>
    },
    {
      title: t('common.Others Round'),
      dataIndex: 'others_round',
      align: 'right',
      render: (others_round) => <NumberListingField value={others_round}/>
    },
    {
      title: t('common.Others Bet'),
      dataIndex: 'others_bet',
      align: 'right',
      render: (others_bet) => <NumberListingField value={others_bet}/>
    },
    {
      title: t('common.Others Winlose'),
      dataIndex: 'others_winlose',
      align: 'right',
      render: (others_winlose) => <NumberListingField value={others_winlose}/>
    },
    {
      title: t('common.Others Turnover'),
      dataIndex: 'others_turnover',
      align: 'right',
      render: (others_turnover) => <NumberListingField value={others_turnover}/>
    },
  ];
  
  const player = useSelector(state => state.general.player);
  const playerId = player.id
  const [betHistory, setBetHistory] = useState([])
  const [betHistoryDetail, setBetHistoryDetail] = useState([])

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetBetHistoryTurnoverByPlayerQuery({
    playerId
  }, {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
  });

  useEffect(()=>{
    if(!isLoading){
      const convertToString = JSON.stringify(list && list[0]);
      const betHistoryJSON = JSON.parse(convertToString);
      setBetHistory([
        {
          key: 'cash',
          category: 'Cash',
          last_deposit_date: betHistoryJSON.last_deposit_date_cash,
          min_withdrawal_amt_turnover: betHistoryJSON.min_withdrawal_amt_turnover,
          lack_withdrawal_turnover: betHistoryJSON.lack_withdrawal_turnover,
          min_withdrawal_amt_rollover: betHistoryJSON.min_withdrawal_amt_rollover,
          lack_withdrawal_rollover: betHistoryJSON.lack_withdrawal_rollover,
          total_round: betHistoryJSON.total_round_cash,
          total_bet: betHistoryJSON.total_bet_cash,
          total_winlose: betHistoryJSON.total_winlose_cash,
          total_turnover: betHistoryJSON.total_turnover_cash,
        },
        {
          key: 'chip',
          category: 'Chip',
          last_deposit_date: betHistoryJSON.last_deposit_date_chip,
          min_withdrawal_amt_turnover: '',
          lack_withdrawal_turnover: '',
          min_withdrawal_amt_rollover: '',
          lack_withdrawal_rollover: '',
          total_round: betHistoryJSON.total_round_chip,
          total_bet: betHistoryJSON.total_bet_chip,
          total_winlose: betHistoryJSON.total_winlose_chip,
          total_turnover: betHistoryJSON.total_turnover_chip,
        },
      ])
      setBetHistoryDetail([
        {
          key: 'cash',
          category: 'Cash',
          casino_round: betHistoryJSON.casino_round_cash,
          casino_bet: betHistoryJSON.casino_bet_cash,
          casino_winlose: betHistoryJSON.casino_winlose_cash,
          casino_turnover: betHistoryJSON.casino_turnover_cash,
          slots_round: betHistoryJSON.slots_round_cash,
          slots_bet: betHistoryJSON.slots_bet_cash,
          slots_winlose: betHistoryJSON.slots_winlose_cash,
          slots_turnover: betHistoryJSON.slots_turnover_cash,
          others_round: betHistoryJSON.others_round_cash,
          others_bet: betHistoryJSON.others_bet_cash,
          others_winlose: betHistoryJSON.others_winlose_cash,
          others_turnover: betHistoryJSON.others_turnover_cash,
        },
        {
          key: 'chip',
          category: 'Chip',
          casino_round: betHistoryJSON.casino_round_chip,
          casino_bet: betHistoryJSON.casino_bet_chip,
          casino_winlose: betHistoryJSON.casino_winlose_chip,
          casino_turnover: betHistoryJSON.casino_turnover_chip,
          slots_round: betHistoryJSON.slots_round_chip,
          slots_bet: betHistoryJSON.slots_bet_chip,
          slots_winlose: betHistoryJSON.slots_winlose_chip,
          slots_turnover: betHistoryJSON.slots_turnover_chip,
          others_round: betHistoryJSON.others_round_chip,
          others_bet: betHistoryJSON.others_bet_chip,
          others_winlose: betHistoryJSON.others_winlose_chip,
          others_turnover: betHistoryJSON.others_turnover_chip,
        },
      ])
    }
  },[isLoading, list])

    return (
      <>
        <Row gutter={[24,24]} display="inline-flex" >
          <Col xs={12} sm={12} md={9} lg={7} xl={5} xxl={4} align="left" style={{ marginRight: "30px"}}> 
            <ClearTurnover action="min_withdrawal_amount" playerid={playerid} walletid={walletid} t={t} />
          </Col>
          <Col xs={12} sm={12} md={9} lg={7} xl={5} xxl={4} align="left" style={{ marginRight: "30px"}}> 
            <ClearTurnover action="max_daily_withdrawals" playerid={playerid} walletid={walletid} t={t} />
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={2} align="left" style={{ marginRight: "30px"}}> 
            <AdjustTurnover playerid={playerid} walletid={walletid} t={t} />
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={betHistory}
          pagination={false}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 350px)',
          }}
        />
        <Table
          columns={columnsDetail}
          dataSource={betHistoryDetail}
          pagination={false}
          style={{marginBottom: '10px'}}
          scroll={{
            x: 1500,
            y: 'calc(100vh - 350px)',
          }}
        />
      </>
    );
}

export default BetHistoryTurnover;