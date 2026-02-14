import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import PermissionsAuth from '../../components/permissionAuth';
import CouponBatchsToolBar from './couponBatchsToolBar';
import { useGetCouponBatchsListQuery } from '../../features/couponbatchs/couponBatchsApiSlices';
import GenerateCoupon from './generatecoupon/GenerateCoupon';
import NumberListingField from '../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';

const CouponBatchsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'name', name: 'name', order: 'ascend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetCouponBatchsListQuery({
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
      title: t('common.Name'),
      columnKey: 'name',
      sorter: true,
      defaultSortOrder: 'ascend',
      render: (record) => (record.name),
    },
    {
      title: t('couponbatch.Prefix'),
      dataIndex: 'prefix',
      columnKey: 'prefix',
      sorter: true,
    },
    {
      title: t('couponbatch.Quantity'),
      dataIndex: 'issue_quantity',
      columnKey: 'issue_quantity',
      align: 'center',
      sorter: true,
    },
    {
      title: t('couponbatch.Amount (Per Coupon)'),
      dataIndex: 'amount_set',
      columnKey: 'amount_set',
      align: 'right',
      sorter: (a, b) => Number(a.amount_set) - Number(b.amount_set),
      render: (amount_set) => <NumberListingField value={amount_set} />,
    },
    {
      title: t('couponbatch.Total Amount (Quantity * Amount)'),
      dataIndex: 'total_amount_set',
      columnKey: 'total_amount_set',
      align: 'right',
      sorter: (a, b) => Number(a.total_amount_set) - Number(b.total_amount_set),
      render: (total_amount_set) => <NumberListingField value={total_amount_set} />,
    },
    {
      title: t('couponbatch.Issue By'),
      dataIndex: 'issue_by_name',
      columnKey: 'issue_by_name',
      align: 'center',
    },
    {
      title: t('common.Action'),
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'add_couponbatch', false),
      render: (record) => <GenerateCoupon id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_couponbatch',
    <div>
      <CouponBatchsToolBar isLoading={isFetching} t={t} />
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

export default CouponBatchsList;