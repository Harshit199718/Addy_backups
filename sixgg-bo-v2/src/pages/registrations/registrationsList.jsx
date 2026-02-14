import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetRegistrationsListQuery } from '../../features/registrations/registrationsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import RegistrationsToolBar from './registrationsToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import { StatusListingField } from '../../ListingField/StatusListingField';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import ReferencePlayerListingField from '../../ListingField/ReferencePlayerListingField';
import { useTranslation } from 'react-i18next';

const RegistrationsList = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'updated_at', name: 'updated_at', order: 'descend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetRegistrationsListQuery({
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
      width: 100,
    },
    {
      title: t('common.Status'),
      dataIndex: 'registration_stage',
      align: 'center',
      fixed: 'left',
      width: 100,
      render: (stage) => (
        <StatusListingField status={stage}/>
      ),
    },
    {
      title: t('common.Username'),
      dataIndex: 'username',
      columnKey: 'username',
      align: 'center',
      fixed: 'left',
      sorter: true,
    },
    {
      title: t('common.Password'),
      dataIndex: 'password',
      columnKey: 'password',
      sorter: true,
    },
    {
      title: t('common.Country Code'),
      dataIndex: 'cc',
      columnKey: 'cc',
      align: 'center',
      width: 150,
      render: (cc) => cc ? cc : "-"
    },
    {
      title: t('common.Mobile'),
      dataIndex: 'mobile',
      columnKey: 'mobile',
      width: 200,
      render: (mobile) => mobile ? mobile : "-"
    },
    {
      title: t('common.Tac'),
      dataIndex: 'tac',
      columnKey: 'tac',
      align: 'center',
      width: 100,
      render: (tac) => tac ? tac : "-"
    },
    {
      title: t('common.Referrer'),
      dataIndex: 'referrer_code',
      align: 'center',
      columnKey: 'referrer_code',
      render: (referrer_code) => referrer_code ? 
        <ReferencePlayerListingField filterProp={{ referral_code: referrer_code}}/>
        : "-"
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      sorter: true,
      align: 'center',
      defaultSortOrder: 'ascend', // Set default sorting order
      render: (updated_at) => <DateTimeListingField dateTime={ updated_at } />
    },
  ];  

  return (
    <div>
      <RegistrationsToolBar isLoading={isFetching} t={t} />
      <Table
        rowKey="id"
        columns={columns}
        id="registration"
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
        }}
      />
    </div>
  )
}

export default RegistrationsList;