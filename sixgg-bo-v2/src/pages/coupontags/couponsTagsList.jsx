import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import PermissionsAuth from '../../components/permissionAuth';
import { useGetCouponTagsListQuery } from '../../features/couponbatchs/couponBatchsApiSlices';
import CouponTagsToolBar from './couponTagsToolBar';
import NumberListingField from '../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';

const CouponsTagsList = () => {
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
  } = useGetCouponTagsListQuery({
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
      columnKey: 'site_name',
      render: (record) => (record.site_name),
    },
    {
      title: t('coupon.Batch Name'),
      dataIndex: 'name',
      columnKey: 'name',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('couponbatch.Prefix'),
      dataIndex: 'prefix',
      columnKey: 'prefix',
      sorter: true,
    },
    {
      title: t('common.Promotion'),
      dataIndex: 'promotion_name',
      columnKey: 'promotion_name',
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
      dataIndex: 'total_amount_issue',
      columnKey: 'total_amount_issue',
      align: 'right',
      sorter: (a, b) => Number(a.total_amount_issue) - Number(b.total_amount_issue),
      render: (total_amount_issue) => <NumberListingField value={total_amount_issue} />,
    },
    {
      title: t('coupontag.Total Claimed Amount'),
      dataIndex: 'total_claimed_amount',
      columnKey: 'total_claimed_amount',
      align: 'right',
      sorter: (a, b) => Number(a.total_claimed_amount) - Number(b.total_claimed_amount),
      render: (total_claimed_amount) => <NumberListingField value={total_claimed_amount} />,
    },
    {
      title: t('coupontag.Total User Claimed'),
      dataIndex: 'total_user_claimed',
      columnKey: 'total_user_claimed',
      align: 'center',
      sorter: true,
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_coupontag',
    <div>
      <CouponTagsToolBar isLoading={isFetching} t={t} />
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

export default CouponsTagsList;