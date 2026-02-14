import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import AffiliatesToolBar from './affiliatesToolBar'
import AffiliatesCreditHistory from './viewcredithistory/ViewCreditHistory';
import ReferenceAgentsListingField from '../../ListingField/ReferenceAgentsListingField';
import { useGetAffiliatesListQuery } from '../../features/affiliates/affiliatesApiSlices';
import { BooleanField } from '../../ListingField/BooleanField';
import AffiliatesTransferCredit from './transfercredit/TransferCredit';
import ResetPassword from '../general/ResetPassword'
import CreateSubAgent from './CreateSubAgent';
import ReferenceAffiliatesListingField from '../../ListingField/ReferenceAffiliatesListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const AffiliatesList = ({ id }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'user', name: 'user', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetAffiliatesListQuery({
     pagination, 
     filters,
     sorting,
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady,
    id: id
  });

  const columns = [
    {
      title: t('common.Username'),
      columnKey: 'user',
      fixed: 'left',
      width: 200,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.user - b.user,
      render: (record) => <ReferenceAgentsListingField id={record.user} />
    },
    {
      title: t('common.Upline'),
      dataIndex: 'parent',
      fixed: 'left',
      columnKey: 'parent',
      render: (parent) => <ReferenceAffiliatesListingField id={parent} />
    },
    {
      title: t('common.Mobile Number'),
      dataIndex: 'mobile',
      columnKey: 'mobile',
    },
    {
      title: t('common.Referral Code'),
      dataIndex: 'referral_code',
      columnKey: 'referral_code',
    }, 
    {
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      sorter: (a, b) => a.name - b.name,
    }, 
    {
      title: t('affiliate.Position'),
      dataIndex: 'position_taking',
      columnKey: 'position_taking',
      sorter: (a, b) => Number(a.position_taking) - Number(b.position_taking),
      render: (position_taking) => <NumberListingField value={position_taking}/> 
    },
    {
      title: t('common.Active'),
      dataIndex: 'is_active',
      align: 'center',
      columnKey: 'is_active',
      sorter: true,
      render: (is_active) => <BooleanField boolean={is_active} />
    }, 
    {
      title: t('affiliate.Today Closing'),
      dataIndex: 'today_closing_balance',
      columnKey: 'today_closing_balance',
      sorter: (a, b) => Number(a.today_closing_balance) - Number(b.today_closing_balance),
      render: (today_closing_balance) => <NumberListingField value={today_closing_balance}/> 
    },
    {
      title: t('common.Sites'),
      dataIndex: 'sites',
      render: (sites) => <ReferenceSiteListingField id={sites} />
    },
    {
      title: t('common.Action'),
      align: 'center',
      width: 300,
      hidden: PermissionsAuth.checkPermissions('button', 'change_affiliate', false),
      render: (record) => {
        return (
          <Space>
            <AffiliatesCreditHistory id={record.id} t={t} />
            <AffiliatesTransferCredit id={record.id} t={t} />
            <CreateSubAgent record={record} t={t} />
            <ResetPassword role='affiliates' userID={record.id} />
          </Space>
        )
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_affiliate',
    <div>
      <AffiliatesToolBar isLoading={isFetching} t={t} />
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

export default AffiliatesList;