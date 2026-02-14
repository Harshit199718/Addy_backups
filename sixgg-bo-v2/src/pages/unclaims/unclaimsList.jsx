import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetUnclaimsListQuery } from '../../features/unclaims/unclaimsApiSlices';
import { BooleanField } from '../../ListingField/BooleanField';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction, filtersActions } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import UnclaimsToolBar from './unclaimsToolBar'
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import BankAccountListingField from '../../ListingField/MerchantBankAccountListingField';
import EditUnclaims from './EditUnclaims';
import PermissionsAuth from '../../components/permissionAuth';
import NumberListingField from '../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';

const UnclaimsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  
  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetUnclaimsListQuery({
     pagination, 
     filters,
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
  });

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'claim_time', name: 'claim_time', order: 'descend' }));
    dispatch(filtersActions({ value: false, type: 'select', event: 'claimed' }))
  }, []); // initial sort
  const shouldShowActionColumn = list?.list?.some(item => !item.claimed);

  return (
    PermissionsAuth.checkPermissions('list', 'view_unclaim',
    <div>
      <UnclaimsToolBar isLoading={isFetching} t={t} />
        <Table
          rowKey="id"
          columns={[
            {
              title: t('common.Sites'),
              dataIndex: 'sites',
              width: 200,
              render: (sites) => <ReferenceSiteListingField id={sites} />
            },
            {
              title: t('common.Claimed Time'),
              dataIndex: 'claim_time',
              columnKey: 'claim_time',
              align: 'center',
              width: 300,
              sorter: true,
              defaultSortOrder: 'descend',
              render: (claim_time) => <DateTimeListingField dateTime={claim_time} />
            },
            {
              title: t('common.Claimed Username'),
              dataIndex: 'claimed_username',
              columnKey: 'claimed_username',
              align: 'center',
              width: 200,
            },
            {
              title: t('common.Claim?'),
              dataIndex: 'claimed',
              align: 'center',
              columnKey: 'claimed',
              width: 200,
              render: (claimed) => <BooleanField boolean={claimed} />
            },
            {
              title: t('common.Merchant Bank Account'),
              align: 'center',
              render: (record) => <BankAccountListingField info={record.merchantbankaccount_info} icon={record.merchantbankaccount_icon} />
            },
            {
              title: t('common.Amount'),
              dataIndex: 'amount',
              align: 'center',
              columnKey: 'amount',
              width: 200,
              sorter: (a, b) => Number(a.amount) - Number(b.amount),
              render: (amount) => <NumberListingField value={amount} />,
            },
            {
              title: t('common.Remark'),
              dataIndex: 'remark',
              align: 'center',
              columnKey: 'remark',
            },
            {
              title: t('common.Deposit'),
              dataIndex: 'deposit_info',
            },
            ...(shouldShowActionColumn ? [
              {
                title: t('common.Action'),
                align: 'center',
                width: 100,
                hidden: PermissionsAuth.checkPermissions('button', 'change_unclaim', false),
                render: (record) => {
                  const { claimed, id } = record;
                  if (!claimed) {
                    return (
                      <div>
                        <EditUnclaims id={record.id} t={t} />
                      </div>
                    );
                  }
                  return null; // Return null if claimed is true
                },
              },
              ] : []),
            ]}
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

export default UnclaimsList;