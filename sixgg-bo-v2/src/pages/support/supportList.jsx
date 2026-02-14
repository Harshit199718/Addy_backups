import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { useGetSupportsListQuery } from '../../features/support/supportsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditSupport from './EditSupport';
import SupportToolBar from './supportToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import ReferenceUserGroupsListingField from '../../ListingField/ReferenceUserGroupsListingField';
import { supportType } from '../../customField/customOption';
import AddCredit from './addcredit/AddCredit';
import CreditHistory from './credithistory/ViewCreditHistory'
import NumberListingField from '../../ListingField/NumberListingField';
import ReferenceMerchantBankListingField from '../../ListingField/ReferenceMerchantBankListingField';
import CustomOptionField from '../../ListingField/CustomOptionField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const SupportList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'date_joined', name: 'date_joined', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetSupportsListQuery({
     pagination, 
     filters,
     sorting,
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const columns = [
    {
      title: t('common.Sites'),
      dataIndex: 'sites',
      columnKey: 'sites',
      render: (sites) => (
        <ReferenceSiteListingField id={sites} />
      ),
    },
    {
      title: t('common.Username'),
      dataIndex: 'username',
      columnKey: 'username',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => {
        if (!a.username) return -1; 
        if (!b.username) return 1; 
        return a.username?.localeCompare(b.username);
      },
    },
    {
      title: t('common.Active'),
      dataIndex: 'is_active',
      align: 'center',
      columnKey: 'is_active',
      render: (is_active) => <BooleanField boolean={is_active} />
    },
    {
      title: t('common.2FA Enabled'),
      dataIndex: 'totp_device_confirmed',
      align: 'center',
      columnKey: 'totp_device_confirmed',
      sorter: true,
      render: (totp_device_confirmed) => <BooleanField boolean={totp_device_confirmed} />
    },
    {
      title: t('common.Date Joined'),
      dataIndex: 'date_joined',
      columnKey: 'date_joined',
      align: 'center',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => new Date(a.date_joined) - new Date(b.date_joined),
      render: (date_joined) => <DateTimeListingField dateTime={date_joined} />
    },
    {
      title: t('common.Group'),
      dataIndex: 'groups',
      align: 'center',
      render: (groups) => <ReferenceUserGroupsListingField id={groups}/>
    },
    {
      title: t('common.Today Closing Balance'),
      dataIndex: 'today_closing_balance',
      align: 'center',
      columnKey: 'today_closing_balance',
      sorter: (a, b) => Number(a.today_closing_balance) - Number(b.today_closing_balance),
      render: (today_closing_balance) => (<NumberListingField value={today_closing_balance}/>)
    },
    {
      title: t('common.Support Type'),
      dataIndex: 'support_type',
      align: 'center',
      columnKey: 'support_type',
      render: (support_type) => <CustomOptionField option={supportType(t)} mappingText={support_type} />
    },
    {
      title: t('common.Merchant Bank A/C'),
      dataIndex: 'paymentgateway_bank',
      columnKey: 'paymentgateway_bank',
      align: 'center',
      width: 300,
      render: (paymentgateway_bank) => (
        <div style={{ whiteSpace: 'nowrap' }}>        
          <ReferenceMerchantBankListingField id={Number(paymentgateway_bank)} />
        </div>
      )
    },  
    {
      title: t('common.Action'),
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'change_user', false),
      render: (record) => {
        return (
          <Space>
            <AddCredit id={record.id} t={t} />
            <CreditHistory id={record.id} t={t} />
            <EditSupport id={record.id} t={t} />
          </Space>
        )
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_user',
    <div>
      <SupportToolBar isLoading={isFetching} t={t} />
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

export default SupportList;