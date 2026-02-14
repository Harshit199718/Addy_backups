import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { useGetBonusesListQuery } from '../../../features/bonuses/bonusesApiSlices';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../../features/filtersSlice';
import ReferenceCalculationAmountListingField from '../../../ListingField/ReferenceCalculationAmountListingField';
import ReferenceComissionPercentListingField from '../../../ListingField/ReferenceComissionPercentListingField';
import NumberListingField from '../../../ListingField/NumberListingField';
import { filterMultiBonusesType } from '../../../customField/customOption';
import { convertTtypeOption } from '../../../components/generalConversion';
import BonusesAction from './multibonusesaction/multiBonusesAction';
import PermissionsAuth from '../../../components/permissionAuth';
import MultiBonusesToolBar from './multiBonusesToolBar';
import { useTranslation } from 'react-i18next';

const MultiBonusesList = ( id ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const defaultTtype = convertTtypeOption([filterMultiBonusesType(t)[0].value, filterMultiBonusesType(t)[1].value]);
  const [isReady, setIsReady] = useState(false)

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetBonusesListQuery({
     pagination, 
     filters,
     sorting,
     id: id
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'updated_at', name: 'updated_at', order: 'descend' }));
    dispatch(filtersActions({ value: 'pending', type: 'input', event: 'state' }))
    dispatch(filtersActions({ value: defaultTtype, type: 'array', event: 'ttype' }))
    setIsReady(true)
  }, []); // initial sort

  const shouldShowActionColumn = list?.list?.some(item => item.state === 'pending');
  const extraColumnsForApproved = list?.list?.every(item => item.state === 'approved');
  const extraColumnsForRejected = list?.list?.some(item => item.state === 'rejected');

  return (
    PermissionsAuth.checkPermissions('list', 'view_multilevelreward',
    <div>
      <MultiBonusesToolBar isLoading={isFetching} t={t} />
        <Table
          rowKey="id"
          columns={[
            {
              title: t('common.Sites'),
              dataIndex: 'sites_name',
            },
            {
              title: t('common.Tx ID'),
              dataIndex: 'txid',
              columnKey: 'txid',
              fixed: 'left',
              sorter: true,
            },
            {
              title: t('common.Updated At'),
              dataIndex: 'updated_at',
              columnKey: 'updated_at',
              sorter: true,
              render: (updated_at) => <DateTimeListingField dateTime={updated_at} />
            },
            {
              title: t('common.Player'),
              dataIndex: 'player',
              key: 'player',
              render: (player) => (
                <ReferencePlayerListingField filterProp={{id: [player]}} />
              ),
            },
            {
              title: t('common.Calculated Amount'),
              dataIndex: 'ref',
              columnKey: 'ref',
              sorter: true,
              render: (ref) => <ReferenceCalculationAmountListingField id={ref} />
            },
            {
              title: t('common.Comission Percent'),
              dataIndex: 'ref',
              columnKey: 'ref',
              sorter: true,
              render: (ref) => <ReferenceComissionPercentListingField id={ref} />
            },
            {
              title: t('common.Amount'),
              dataIndex: 'amount',
              columnKey: 'amount',
              sorter: true,
              render: (amount) => <NumberListingField value={amount} />
                
            },
            {
              title: t('common.State'),
              dataIndex: 'state',
              columnKey: 'state',
            },
            {
              title: t('common.Remark'),
              dataIndex: 'remark',
              key: 'remark',
              render: (remark) => {
                return remark === null ? '-' : remark;
              },
            },
            ...(extraColumnsForApproved || extraColumnsForRejected ? [
              {
                title: extraColumnsForApproved ? t('common.Approved By') : extraColumnsForRejected ? t('common.Rejected By') : null,
                dataIndex: extraColumnsForApproved ? 'approver_name' : extraColumnsForRejected ? 'approver_name' : null,
                columnKey: extraColumnsForApproved ? 'approver_name' : extraColumnsForRejected ? 'approver_name' : null,
                sorter: true,
              },
              {
                title: extraColumnsForApproved ? t('common.Approved At') : extraColumnsForRejected ? t('common.Rejected At') : null,
                dataIndex: extraColumnsForApproved ? 'approved_at' : extraColumnsForRejected ? 'approved_at' : null,
                columnKey: extraColumnsForApproved ? 'approved_at' : extraColumnsForRejected ? 'approved_at' : null,
                sorter: true,
                render: (approved_at) => {
                  if (extraColumnsForApproved) {
                    return <DateTimeListingField dateTime={approved_at} />;
                  } else if (extraColumnsForRejected) {
                    return <DateTimeListingField dateTime={approved_at} />;
                  }
                  return null;
                },
              },
              ] : []),
            ...(shouldShowActionColumn ? [
              {
                title: t('common.Action'),
                align: 'center',
                width: 600,
                hidden: PermissionsAuth.checkPermissions('button', 'change_multilevelreward', false),
                render: (record) => {
                  const { state } = record;
                  if (state) {
                    return (
                      <div>
                        <BonusesAction record={record} t={t} />
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

export default MultiBonusesList;