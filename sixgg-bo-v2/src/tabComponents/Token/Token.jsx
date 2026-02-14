import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersTabActions, paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import TokenToolBar from './TokenToolBar';
import { formattedDate, getTodayDate } from '../../components/convertDate';
import { BooleanField } from '../../ListingField/BooleanField';
import { useGetTokenListQuery } from '../../features/token/tokenApiSlices';

const TokenList = ({ t }) => {
  const columns = [
    {
      title: t('common.Created At'),
      dataIndex: 'created_at',
      columnKey: 'created_at',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (created_at) => <DateTimeListingField dateTime={created_at}/>
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      sorter: true,
      render: (updated_at) => <DateTimeListingField dateTime={updated_at}/>
    },
    {
      title: t('common.Expired At'),
      dataIndex: 'expire_at',
      columnKey: 'expire_at',
      sorter: true,
      render: (expire_at) => <DateTimeListingField dateTime={expire_at}/>
    },
    {
      title: t('token.Is Claimed'),
      dataIndex: 'is_claimed',
      columnKey: 'is_claimed',
      sorter: true,
      render: (is_claimed) => <BooleanField boolean={is_claimed}/>
    },
    {
      title: t('common.Approved By'),
      dataIndex: 'approver_name',
      render: (approver_name) => <span>{approver_name ? approver_name : t("token.Claimed in FE")}</span>
    },
  ];
  
  const dispatch = useDispatch();
  const player = useSelector(state => state.general.player);
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const { startDate, endDate } = getTodayDate();
    const fromDate = formattedDate(startDate);
    const toDate = formattedDate(endDate);
    dispatch(resetTabFilters())
    dispatch(filtersTabActions({ value: player.id, type: 'default', event: 'player' }))
    dispatch(filtersTabActions({ value: fromDate, type: 'input', event: 'fromDate' }))
    dispatch(filtersTabActions({ value: toDate, type: 'input', event: 'toDate' }))
    dispatch(sortingTabAction({ field: 'updated_at', name: 'updated_at', order: 'descend' }));
    setIsReady(true)
  }, [player]); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetTokenListQuery({
     pagination, 
     filters,
     sorting
  }, {
    pollingInterval: 30000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });
  
  return (
    <div>
      <TokenToolBar isLoading={isFetching} t={t} player={player}/>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
        scroll={{
          x: 1500,
          y: 'calc(100vh - 350px)',
        }}
        size='small'
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

export default TokenList;