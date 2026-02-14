import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import NumberListingField from '../../ListingField/NumberListingField';

const BetHistoryExpandableList = ({record}) => {
  const columns = [
    {
      title: 'Login',
      dataIndex: 'gameaccount',
      fixed: 'left',
      render: (gameaccount) => (
        gameaccount && gameaccount.login
      ),
    },
    {
      title: 'Password',
      dataIndex: 'gameaccount',
      render: (gameaccount) => (
        gameaccount && gameaccount.password
      ),
    },
    {
      title: 'Bet',
      dataIndex: 'bet',
      align: 'right',
      render: (bet) => (
        <NumberListingField value={bet}/>
      ),
    },
    {
      title: 'Winlose',
      dataIndex: 'winlose',
      align: 'right',
      render: (winlose) => (
        <NumberListingField value={winlose}/>
      ),
    },
    {
      title: 'Payout',
      dataIndex: 'payout',
      align: 'right',
      render: (payout) => (
        <NumberListingField value={payout}/>
      ),
    },
    {
      title: 'Turnover',
      dataIndex: 'turnover',
      align: 'right',
      render: (turnover) => (
        <NumberListingField value={turnover}/>
      ),
    },
    {
      title: 'Start Time',
      dataIndex: 'starttime',
      render: (starttime) => (
        <DateTimeListingField dateTime={starttime}/>
      ),
    },
    {
      title: 'End Time',
      dataIndex: 'endtime',
      render: (endtime) => (
        <DateTimeListingField dateTime={endtime}/>
      ),
    },
    {
      title: 'Settle Time',
      dataIndex: 'settletime',
      render: (settletime) => (
        <DateTimeListingField dateTime={settletime}/>
      ),
    },
  ];
  
const dataSource = [record];
  return (
    <div>
      <h4 style={{ marginLeft: '25px', textAlign: 'center' }}>Bet Details</h4>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1500,
          y: 'calc(100vh - 350px)',
        }}
        size='small'
        pagination={false}
      />
    </div>
  )
}

export default BetHistoryExpandableList;