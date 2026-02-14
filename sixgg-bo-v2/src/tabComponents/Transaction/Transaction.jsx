import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersTabActions, paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import { useGetTransactionListByPlayerQuery } from '../../features/transaction/transactionApiSlices';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import TransactionToolBar from './TransactionToolBar';
import { formattedDate, getTodayDate } from '../../components/convertDate';

const TransactionList = ({ t }) => {
  const columns = [
    {
      title: t('common.TXID'),
      dataIndex: 'txid',
      fixed: 'left',
    },
    {
      title: t('common.Type'),
      dataIndex: 'ttype_display',
      render: (ttype_display) => t(`report.${ttype_display}`),
    },
    {
      title: t('common.Reference'),
      dataIndex: 'ref',
    },
    {
      title: t('common.State'),
      dataIndex: 'state',
      render: (state) => t(`common.${state}`),
    },
    {
      title: t('common.Promotion'),
      dataIndex: 'promotion_name',
    },
    {
      title: t('common.Bal Before'),
      dataIndex: 'bal_bf',
      align: 'right',
      render: (bal_bf) => (
        <NumberListingField value={bal_bf}/>
      ),
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'right',
      render: (amount) => (
        <NumberListingField value={amount}/>
      ),
    },
    {
      title: t('common.Forfeit'),
      dataIndex: 'forfeit',
      align: 'right',
      render: (forfeit) => (
        <NumberListingField value={forfeit}/>
      ),
    },
    {
      title: t('common.Bal After'),
      dataIndex: 'bal_af',
      align: 'right',
      render: (bal_af) => (
        <NumberListingField value={bal_af}/>
      ),
    },
    {
      title: t('common.Remark'),
      render: (record) => {
        let text = [
          record?.pg ? `(${record.pg})` : '',
          record?.coupon_code ? `(${record.coupon_code})` : '',
          record?.remark || ''
        ].filter(Boolean).join('');
        return (
          text
        )
      }
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (updated_at) => <DateTimeListingField dateTime={updated_at}/>
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
    dispatch(filtersTabActions({ value: [player.username], type: 'default', event: 'player' }))
    dispatch(filtersTabActions({ value: fromDate, type: 'input', event: 'fromDate' }))
    dispatch(filtersTabActions({ value: toDate, type: 'input', event: 'toDate' }))
    dispatch(filtersTabActions({ value: true, type: 'select', event: 'is_show_pg_pending' }))
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
  } = useGetTransactionListByPlayerQuery({
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
      <TransactionToolBar isLoading={isFetching} t={t} />
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

export default TransactionList;