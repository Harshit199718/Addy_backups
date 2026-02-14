import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import { useGetBanksListQuery } from '../../features/bank/banksApiSlices';
import BankToolBar from './bankToolBar';
import EditBank from './EditBank';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ImageListingField from '../../ListingField/ImageListingField'
import PermissionsAuth from '../../components/permissionAuth'
import { useTranslation } from 'react-i18next';

const BankList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'sequence', name: 'sequence', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetBanksListQuery({
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
      title: t("bank.Bank Icon"),
      dataIndex: 'icon',
      fixed: 'left',
      width: '100px',
      render: (icon) => <ImageListingField image={icon} preview={false} />
    },
    {
      title: t("bank.Bank Code"),
      dataIndex: 'code',
      columnKey: 'code',
      sorter: true,
      fixed: 'left'
    },
    {
      title: t("bank.Bank Name"),
      dataIndex: 'name',
      columnKey: 'name',
      sorter: true,
      fixed: 'left'
    },
    {
      title: t("common.Sequence"),
      dataIndex: 'sequence',
      defaultSortOrder: 'ascend',
      columnKey: 'sequence',
      sorter: true,
    },
    {
      title: t("common.Active / Inactive"),
      dataIndex: 'active',
      columnKey: 'active',
      sorter: true,
      align: 'center',
      render: (active) => (
        <BooleanField boolean={active} />
      ),
    },
    {
      title: t("bank.Show in FE"),
      dataIndex: 'show_in_fe',
      columnKey: 'show_in_fe',
      sorter: true,
      align: 'center',
      render: (show_in_fe) => (
        <BooleanField boolean={show_in_fe} />
      ),
    },
    {
      title: t("common.Action"),
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_bank', false),
      render: (record) => {
        return (
            <EditBank id={record.id} t={t}/>
        )
      }
    },
  ];
  
  return (
    PermissionsAuth.checkPermissions('list', 'view_bank',
    <div>
      <BankToolBar isLoading={isFetching} t={t}/>
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

export default BankList;