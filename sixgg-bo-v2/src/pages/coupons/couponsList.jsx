import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import PermissionsAuth from '../../components/permissionAuth';
import { useGetCouponsListQuery } from '../../features/couponbatchs/couponBatchsApiSlices';
import CouponsToolBar from './couponsToolBar';
import { BooleanField } from '../../ListingField/BooleanField';
import NumberListingField from '../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';

const CouponsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'updated_at', name: 'updated_at', order: 'descend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetCouponsListQuery({
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
      columnKey: 'site_name',
    },
    {
      title: t('coupon.Batch Name'),
      columnKey: 'batch_name',
      render: (record) => (record.batch_name),
    },
    {
      title: t('coupon.Coupon Number'),
      dataIndex: 'coupon_number',
      columnKey: 'coupon_number',
      sorter: true,
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      columnKey: 'amount',
      align: 'right',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => <NumberListingField value={amount} />
    },
    {
      title: t('coupon.Is Claimed'),
      dataIndex: 'is_claimed',
      columnKey: 'is_claimed',
      align: 'center',
      render: (is_claimed) => <BooleanField boolean={is_claimed} />
    },
    {
      title: t('coupon.Claimed Date'),
      dataIndex: 'claimed_date',
      columnKey: 'claimed_date',
      align: 'center',
      sorter: (a, b) => new Date(a.claimed_date) - new Date(b.claimed_date),
      render: (claimed_date) => (claimed_date ? claimed_date : '-'), // Render dash if null or empty string
    },
    {
      title: t('coupon.Claimed By'),
      dataIndex: 'claimed_by_name',
      columnKey: 'claimed_by_name',
      align: 'center',
      sorter: true,
      render: (claimed_by_name) => (claimed_by_name ? claimed_by_name : '-'), // Render dash if null or empty string
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      align: 'center',
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      render: (updated_at) => (updated_at ? updated_at : '-'), // Render dash if null or empty string
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_coupon',
    <div>
      <CouponsToolBar isLoading={isFetching} t={t} />
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

export default CouponsList;