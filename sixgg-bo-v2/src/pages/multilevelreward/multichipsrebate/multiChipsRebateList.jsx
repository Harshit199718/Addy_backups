import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../../features/filtersSlice';
import ReferenceCalculationAmountListingField from '../../../ListingField/ReferenceCalculationAmountListingField';
import ReferenceComissionPercentListingField from '../../../ListingField/ReferenceComissionPercentListingField';
import NumberListingField from '../../../ListingField/NumberListingField';
import { useGetChipsRebateListQuery } from '../../../features/chipsrebate/chipsRebateApiSlices';
import { filterMultiChipsRebateType, multiChipsRebateTtype } from '../../../customField/customOption';
import CustomOptionField from '../../../ListingField/CustomOptionField';
import ReferenceSiteListingField from '../../../ListingField/ReferenceSiteListingField'
import ReferenceSupportsListingField from '../../../ListingField/ReferenceSupportsListingField';
import ReferenceMerchantBankListingField from '../../../ListingField/ReferenceMerchantBankListingField';
import ReferenceCustomerBankListingField from '../../../ListingField/ReferenceCustomerBankListingField';
import { convertTtypeOption } from '../../../components/generalConversion';
import PermissionsAuth from '../../../components/permissionAuth';
import MultiChipsRebateToolBar from './multiChipsRebateToolBar';
import MultiChipsRebateAction from './multichipsrebateaction/multiChipsRebateAction';
import { useTranslation } from 'react-i18next';

const MultiChipsRebateList = ( id ) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const defaultTtype = convertTtypeOption([filterMultiChipsRebateType(t)[0].value, filterMultiChipsRebateType(t)[1].value]);
  const [isReady, setIsReady] = useState(false)

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetChipsRebateListQuery({
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
  const extraColumnsForDeleted = list?.list?.some(item => item.state === 'deleted');
  const extraColumnsForError = list?.list?.some(item => item.state === 'error');

  return (
    PermissionsAuth.checkPermissions('list', 'view_multilevelreward',
    <div>
      <MultiChipsRebateToolBar isLoading={isFetching} t={t} />
      <div className="ant-responsive-table">
        <Table
          rowKey="id"
          columns={[
            {
              title: t('common.Sites'),
              dataIndex: 'sites',
              sorter: true,
              render: (sites) => <ReferenceSiteListingField id={sites} />
            },
            {
              title: t('common.Chips ID'),
              dataIndex: 'cid',
              columnKey: 'cid',
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
              title: t('common.Type'),
              dataIndex: 'ttype',
              columnKey: 'ttype',
              sorter: true,
              render: (ttype) => <CustomOptionField option={multiChipsRebateTtype(t)} mappingText={ttype} />
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
              render: (ref) => {
                return ref ? <ReferenceCalculationAmountListingField id={ref} /> : '-';
              },
            },
            {
              title: t('common.Comission Percent'),
              dataIndex: 'ref',
              columnKey: 'ref',
              sorter: true,
              render: (ref) => {
                return ref ? <ReferenceComissionPercentListingField id={ref} /> : '-';
              },           
            },
            {
              title: t('common.Amount'),
              dataIndex: 'amount',
              columnKey: 'amount',
              sorter: true,
              render: (amount) => <NumberListingField value={amount} />
            },
            ...(extraColumnsForApproved || extraColumnsForRejected || extraColumnsForDeleted || extraColumnsForError ? [
              {
                title: t('common.Parent'),
                dataIndex: 'parent',
                columnKey: 'parent',
                sorter: true,
              },
              {
                title: t('common.Bal Before'),
                dataIndex: 'bal_bf',
                columnKey: 'bal_bf',
                sorter: true,
                render: (bal_bf) => <NumberListingField value={bal_bf} />
              },
              {
                title: t('common.Bal After'),
                dataIndex: 'bal_af',
                columnKey: 'bal_af',
                sorter: true,
                render: (bal_af) => <NumberListingField value={bal_af} />
              },
              {
                title: t('common.Req Amount'),
                dataIndex: 'req_amount',
                columnKey: 'req_amount',
                sorter: true,
                render: (req_amount) => <NumberListingField value={req_amount} />
              },
              {
                title: t('common.Forfeit'),
                dataIndex: 'forfeit',
                columnKey: 'forfeit',
                sorter: true,
                render: (forfeit) => <NumberListingField value={forfeit} />
              },
              ...(!extraColumnsForDeleted && !extraColumnsForError ? [
              {
                title: t('common.Customer Bank A/C'),
                dataIndex: 'customer_bank_account',
                columnKey: 'customer_bank_account',
                sorter: true,
                render: (customer_bank_account) => <ReferenceCustomerBankListingField id={customer_bank_account} /> 
              },
              ] : []),
              ...(!extraColumnsForRejected && !extraColumnsForDeleted ? [
                {
                title:  t('common.Merchant Bank Account'),
                dataIndex: 'merchant_bank_account',
                columnKey: 'merchant_bank_account',
                sorter: true,
                render: (merchant_bank_account) => <ReferenceMerchantBankListingField id={merchant_bank_account} /> 
              },
              ] : []),
              ...(!extraColumnsForDeleted && !extraColumnsForError ? [
              {
                title: extraColumnsForApproved ? t('common.Approved By') : extraColumnsForRejected ? t('common.Rejected By') : null,
                dataIndex: extraColumnsForApproved ? 'approved_by' : extraColumnsForRejected ? 'approved_by' : null,
                columnKey: extraColumnsForApproved ? 'approved_by' : extraColumnsForRejected ? 'approved_by' : null,
                sorter: true,
                render: (record) => {
                  if (extraColumnsForApproved) {
                    return <ReferenceSupportsListingField id={record} />;
                  } else if (extraColumnsForRejected) {
                    return <ReferenceSupportsListingField id={record} />;
                  }
                  return null;
                },
              },
              ] : []),
              ] : []),
            ...(shouldShowActionColumn ? [
              {
                title: t('common.Action'),
                align: 'center',
                hidden: PermissionsAuth.checkPermissions('button', 'change_multilevelreward', false),
                render: (record) => {
                  const { state } = record;
                  if ( state ) {
                    return (
                      <div>
                        <MultiChipsRebateAction record={record} t={t} />
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
    </div>
    )
  )
}

export default MultiChipsRebateList;