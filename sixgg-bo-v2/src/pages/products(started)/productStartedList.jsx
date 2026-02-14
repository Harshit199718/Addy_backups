import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction, filtersActions } from '../../features/filtersSlice';
import ProductStartedToolBar from './productStartedToolBar'
import { useGetGameAccountByPlayerListQuery } from '../../features/gameaccount/gameAccountApiSlices';
import StealthLoginListingField from '../../ListingField/StealthLogin';
import NumberListingField from '../../ListingField/NumberListingField';
import { BooleanField } from '../../ListingField/BooleanField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const ProductStartedList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'username', name: 'username', order: 'ascend' }));
    dispatch(filtersActions({ value: true, type: 'select', event: 'is_started' }))
    setIsReady(true);
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
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const columns = [
    {
      title: t('common.Sites'),
      columnKey: 'sites',
      render: (record) => { return record.product.sites_name }
    },
    {
      title: t('common.Product'),
      columnKey: 'product',
      fixed: 'left',
      sorter: true,
      render: (record) => { return `${record.product.name} (${record.product.category})` }
    },
    {
      title: t('common.Username'),
      dataIndex: 'username',
      columnKey: 'username',
      fixed: 'left',
      sorter: (a, b) => {
        if (!a.username) return -1; 
        if (!b.username) return 1; 
        return a.username?.localeCompare(b.username);
      },
      defaultSortOrder: 'ascend',
    },
    {
      title: t('common.Login As'),
      render: (record) => {
        const recordNew = {
          sites: record?.product.sites,
          username: record?.username
        }
        return record && <StealthLoginListingField record={recordNew}  />;
      },
    },
    
    {
      title: t('common.Login'),
      dataIndex: 'login',
      columnKey: 'login',
      sorter: true,
    },
    {
      title: t('common.Password'),
      dataIndex: 'password',
      columnKey: 'password',
    },
    {
      title: t('common.Discarded'),
      dataIndex: 'discarded',
      align: 'center',
      columnKey: 'discarded',
      sorter: true,
      render: (discarded) => <BooleanField boolean={discarded} />
    },
    {
      title: t('common.Is Started'),
      dataIndex: 'is_started',
      align: 'center',
      columnKey: 'is_started',
      sorter: true,
      render: (is_started) => <BooleanField boolean={is_started} />
    },
    {
      title: t('common.Credit'),
      columnKey: 'credit',
      render: (record) => {
        return record.credit >= 0 ? <NumberListingField value={record.credit}/> : t("common.N/A");
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_gameaccount',
    <div>
      <ProductStartedToolBar isLoading={isFetching} t={t} />
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

export default ProductStartedList;