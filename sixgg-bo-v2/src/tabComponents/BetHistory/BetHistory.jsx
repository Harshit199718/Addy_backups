import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersTabActions, paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import { formattedDate, getTodayDate } from '../../components/convertDate';
import { useGetBetHistoryListByPlayerQuery } from '../../features/bethistory/betHistoryApiSlices';
import BetHistoryToolBar from './BetHistoryToolBar';
import BetHistoryExpandableList from './BetHistoryExpand';
import BetHistoryTurnover from './BetHistoryTurnover';

const BetHistoryList = ({ playerid, walletid, t }) => {
  const columns = [
    {
      title: t('common.Product Name'),
      dataIndex: 'gameaccount',
      fixed: 'left',
      render: (gameaccount) => (
        gameaccount && gameaccount.product.name
      ),
    },
    {
      title: t('common.Product Category'),
      dataIndex: 'gameaccount',
      render: (gameaccount) => (
        gameaccount && gameaccount.product.category
      ),
    },
    {
      title: t('common.Game Name (Game ID)'),
      dataIndex: 'detail',
      render: (detail) => {
        detail && detail.GameName
      },
    },
    {
      title: t('common.Bet'),
      dataIndex: 'bet',
      align: 'right',
      render: (bet) => (
        <NumberListingField value={bet}/>
      ),
    },
    {
      title: t('common.Winlose'),
      dataIndex: 'winlose',
      align: 'right',
      render: (winlose) => (
        <NumberListingField value={winlose}/>
      ),
    },
    {
      title: t('common.Payout'),
      dataIndex: 'payout',
      align: 'right',
      render: (payout) => (
        <NumberListingField value={payout}/>
      ),
    },
    {
      title: t('common.Turnover'),
      dataIndex: 'turnover',
      align: 'right',
      render: (turnover) => (
        <NumberListingField value={turnover}/>
      ),
    },
    {
      title: t('common.Match Time'),
      dataIndex: 'matchtime',
      columnKey: 'matchtime',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (matchtime) => (
        <DateTimeListingField dateTime={matchtime}/>
      ),
    },
  ];
  
  const dispatch = useDispatch();
  const player = useSelector(state => state.general.player);
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);
  const [isReady, setIsReady] = useState(false)
  const { startDate, endDate } = getTodayDate();
  const fromDate = player.last_deposit ? formattedDate(player.last_deposit.updated_at) : formattedDate(startDate);
  const toDate = formattedDate(endDate);

  useEffect(() => {
    dispatch(resetTabFilters())
    dispatch(filtersTabActions({ value: player.id, type: 'default', event: 'userid' }))
    dispatch(filtersTabActions({ value: '', type: 'default', event: 'ga' }))
    dispatch(filtersTabActions({ value: fromDate, type: 'input', event: 'fromDate' }))
    dispatch(filtersTabActions({ value: toDate, type: 'input', event: 'toDate' }))
    dispatch(sortingTabAction({ field: 'matchtime', name: 'matchtime', order: 'descend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetBetHistoryListByPlayerQuery({
     pagination, 
     filters,
     sorting
  }, {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });
  
  return (
    <div>
      <BetHistoryTurnover playerid={playerid} walletid={walletid} t={t} />
      <BetHistoryToolBar isLoading={isFetching} fromDate={fromDate} toDate={toDate} t={t} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
        scroll={{
          x: 1500,
          y: 'calc(100vh - 350px)',
        }}
        size='small'
        expandable={{
          expandedRowRender: (record) => <BetHistoryExpandableList record={record} />,
        }}
        loading={isLoading}
        onChange={(pagination, filter, sorter) => {
          dispatch(paginationTabActions({ page: pagination.current, pageSize: pagination.pageSize }))
          dispatch(sortingTabAction({ field: sorter.field, name: sorter.column ? sorter.column.columnKey : null, order: sorter.order || null}))
        }}
        pagination={{
          current: pagination.currentPage,
          defaultPageSize: 10,
          showSizeChanger: true,
          total: list ? list.totalCount : 0,
          showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
        }}
      />
    </div>
  )
}

export default BetHistoryList;