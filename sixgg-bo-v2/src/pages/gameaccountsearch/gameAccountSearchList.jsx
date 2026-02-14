import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import GameAccountSearchToolBar from './gameAccountSearchToolBar'
import { useGetGameAccountSearchListQuery } from '../../features/gameaccount/gameAccountApiSlices';
import StealthLoginListingField from '../../ListingField/StealthLogin';
import ReferencePlayerListingField from '../../ListingField/ReferencePlayerListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const GameAccountSearchList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'user_id', name: 'user_id', order: 'ascend' }));
    setIsReady(true);
  }, []); // initial sort
  
  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetGameAccountSearchListQuery({
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
      title: t('common.Sites'),
      dataIndex: 'site_name',
      fixed: 'left',
    },
    {
      title: t('referencefield.Player'),
      dataIndex: 'user_id',
      key: 'user_id',
      fixed: 'left',
      render: (user_id) => <ReferencePlayerListingField filterProp={{id: [user_id]}} />
    },
    {
      title: t('common.Login As'),
      width: 100,
      render: (record) => {
        const recordNew = {
          sites: record?.site_id,
          username: record?.username
        }
        return record && <StealthLoginListingField record={recordNew}  />;
      },
    },
    
    {
      title: t('common.Login'),
      dataIndex: 'login',
      columnKey: 'login',
      sorter: (a, b) => {
        if (!a.login) return -1; 
        if (!b.login) return 1; 
        return a.login?.localeCompare(b.login);
        },
    },
    {
      title: t('common.Password'),
      dataIndex: 'password',
      columnKey: 'password',
    },
    {
      title: t('common.Product Name'),
      dataIndex: 'product_name',
      columnKey: 'product_name',
      sorter: (a, b) => {
        if (!a.product_name) return -1; 
        if (!b.product_name) return 1; 
        return a.product_name?.localeCompare(b.product_name);
        },
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_gameaccount',
    <div>
      <GameAccountSearchToolBar isLoading={isFetching} t={t} />
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

export default GameAccountSearchList;