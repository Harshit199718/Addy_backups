import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../../features/filtersSlice';
import DateListingField from '../../../ListingField/DateListingField';
import NumberListingField from '../../../ListingField/NumberListingField';
import { useGetSingleLevelRewardRebateQuery } from '../../../features/rewards/rewardsApiSlices';
import RebateDetail from './rebateRewardDetailList';
import RebateToolBar from './rebateToolBar';
import PermissionsAuth from '../../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const RebateList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'from_date', name: 'from_date', order: 'descend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetSingleLevelRewardRebateQuery({
     pagination, 
     filters,
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const columns = [
    {
      title: t('common.From Date'),
      dataIndex: 'from_date',
      columnKey: 'from_date',
      align: 'center',
      sorter: (a, b) => new Date(a.from_date) - new Date(b.from_date),
      render: (from_date) => <DateListingField date={from_date} />
    },
    {
      title: t('common.To Date'),
      dataIndex: 'to_date',
      columnKey: 'to_date',
      align: 'center',
      sorter: (a, b) => new Date(a.to_date) - new Date(b.to_date),
      render: (to_date) => <DateListingField date={to_date} />
    },
    {
      title: t('common.Total Payout'),
      dataIndex: 'total_payout',
      align: 'center',
      columnKey: 'total_payout',
      sorter: (a, b) => Number(a.total_payout) - Number(b.total_payout),
      render: (total_payout) => <NumberListingField value={total_payout} />
    },
    {
      title: t('common.Action'),
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('list', 'view_reward', false),
      render: (record) => <RebateDetail record={record} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_reward',
    <div>
      <RebateToolBar isLoading={isFetching} t={t} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
        scroll={{
          x: 1500,
          y: 'calc(100vh - 350px)',
        }}
        loading={isLoading}
        onChange={(pagination, filter, sorter) => {
          dispatch(paginationActions({ page: pagination.current, pageSize: pagination.pageSize }))
          dispatch(sortingAction({ field: sorter.field, name: sorter.column ? sorter.column.columnKey : null, order: sorter.order || null}))
        }}
        pagination={{
          current: pagination.currentPage,
          defaultPageSize: 10,
          showSizeChanger: true,
          total: list ? list.totalCount : 0,
          showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
          responsive: true
        }}
      />
    </div>
    )
  )
}

export default RebateList;