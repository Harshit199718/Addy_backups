import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersTabActions, paginationTabActions, resetTabFilters, sortingTabAction } from '../../features/filtersTabSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import GameAccountListToolBar from './GameAccountToolBar';
import { useGetGameAccountByPlayerListQuery } from '../../features/gameaccount/gameAccountApiSlices';
import { BooleanField } from '../../ListingField/BooleanField';
import DiscardGameAccount from './DiscardGameAccount';
import CheckStatusGameAccount from './CheckStatusGameAccount';
import ForceStopGameAccount from './ForceStopGameAccount';
import StopAppGameAccount from './StopAppGameAccount';
import StartAppGameAccount from './StartAppGameAccount';

const GameAccountList = ({ t }) => {
  const columns = [
    {
      title: t('common.Product'),
      dataIndex: 'product',
      fixed: 'left',
      render: (product) => 
      <span>{product.name} ({product.category})</span>
    },
    {
      title: t('common.Login'),
      dataIndex: 'login',
    },
    {
      title: t('common.Password'),
      dataIndex: 'password',
    },
    {
      title: t('common.Discarded'),
      dataIndex: 'discarded',
      align: 'center',
      render: (discarded) => <BooleanField boolean={discarded} />,
    },
    {
      title: t('common.Is Started'),
      align: 'center',
      render: (record) => {
        return (
          <>
          <BooleanField boolean={record.is_started} />
          {record.discarded && record.is_started &&
            <ForceStopGameAccount record={record} t={t} />
          }
          </>
        )
      }
    },
    {
      title: t('common.Credit'),
      dataIndex: 'credit',
      align: 'right',
      render: (credit) => (
        <NumberListingField value={credit}/>
      ),
    },
    {
      title: t('common.Game Status'),
      align: 'center',
      render: (record) => {
        return (
          record.product.ltype === 'app' &&
          (
            !record.discarded && record.is_started ?
            <StopAppGameAccount record={record} t={t}/>
          :
            <StartAppGameAccount record={record} t={t} />
          )
        )
      }
    },
    {
      title: t('common.Status'),
      align: 'center',
      render: (record) => {
        return (
          !record.discarded &&
          <div>
            <CheckStatusGameAccount record={record} t={t}/>
          </div>
        )
      }
    },
    {
      title: t('common.Discard'),
      align: 'center',
      render: (record) => {
        return (
          <div>
            <DiscardGameAccount record={record} t={t} />
          </div>
        )
      }
    },
  ];
  
  const dispatch = useDispatch();
  const player = useSelector(state => state.general.player);
  const isModalTabOpen = useSelector((state) => state.modal.modalTabOpen);
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetTabFilters())
    dispatch(filtersTabActions({ value: [player.id], type: 'default', event: 'user' }))
    dispatch(filtersTabActions({ value: false, type: 'select', event: 'discarded' }))
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetGameAccountByPlayerListQuery({
     pagination, 
     filters,
     sorting
  }, isModalTabOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });
  
  return (
    <div>
      <GameAccountListToolBar isLoading={isFetching} t={t} />
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

export default GameAccountList;