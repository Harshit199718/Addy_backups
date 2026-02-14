import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import { BooleanField } from '../../ListingField/BooleanField';
import { useGetPlayerReferredPlayerQuery } from '../../features/player/playerApiSlices';

const ReferredPlayerList = ({ t }) => {
  const columns = [
    {
      title: t('common.Username'),
      dataIndex: 'username',
      columnKey: 'username',
    },
    {
      title: t('common.Date Joined'),
      dataIndex: 'date_joined',
      columnKey: 'date_joined',
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.date_joined) - new Date(b.date_joined),
      render: (date_joined) => <DateTimeListingField dateTime={date_joined}/>,
    },
    {
      title: t('common.Is Active'),
      dataIndex: 'is_active',
      align: 'center',
      sorter: (a, b) => a.is_active - b.is_active,
      render: (is_active) => <BooleanField boolean={is_active} />,
    },
  ];
  
  const dispatch = useDispatch();
  const player = useSelector(state => state.general.player);
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);
  const [isReady, setIsReady] = useState(false)
  const playerID = player.id

  useEffect(() => {
    dispatch(resetTabFilters())
    dispatch(sortingTabAction({ field: 'date_joined', name: 'date_joined', order: 'descend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetPlayerReferredPlayerQuery({
      playerID,
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
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
        scroll={{
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
          defaultPageSize: 20,
          showSizeChanger: true,
          total: list ? list.totalCount : 0,
          showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
        }}
      />
    </div>
  )
}

export default ReferredPlayerList;