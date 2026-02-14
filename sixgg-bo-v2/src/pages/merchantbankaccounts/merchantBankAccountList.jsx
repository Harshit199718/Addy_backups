import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetMerchantBankListQuery } from '../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditMerchantBankAccount from './EditMerchantBankAccount';
import MerchantBankAccountsToolBar from './merchantBankToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ImageListingField from '../../ListingField/ImageListingField'
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const MerchantBankAccountList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'bank_name_type', name: 'bank_name', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetMerchantBankListQuery({
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
      dataIndex: 'sites_name',
    },
    {
      title: t('common.Bank Icon'),
      dataIndex: 'icon',
      fixed: 'left',
      width: '100px',
      render: (icon) => <ImageListingField image={icon} preview={false} />
    },
    {
      title: t('common.Bank Name'),
      dataIndex: 'bank_name_type',
      columnKey: 'bank_name',
      defaultSortOrder: 'ascend',
      sorter: true,
    },
    {
      title: t('common.Account Name'),
      dataIndex: 'name',
      columnKey: 'name',
      fixed: 'left',
      sorter: true,
    },
    {
      title: t('common.Account Number'),
      dataIndex: 'number',
    },
    {
      title: t('common.Balance'),
      dataIndex: 'today_closing_balance',
      align: 'right'
    },
    {
      title: t('common.Active / Inactive'),
      dataIndex: 'active',
      align: 'center',
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Action'),
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_merchantbankaccount', false),
      render: (record) => <EditMerchantBankAccount id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_merchantbankaccount',
    <div>
      <MerchantBankAccountsToolBar isLoading={isFetching} t={t} />
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

export default MerchantBankAccountList;