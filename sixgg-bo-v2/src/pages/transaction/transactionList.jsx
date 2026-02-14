import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import TransactionToolBar from './transactionToolBar';
import { useGetTransactionListQuery } from '../../features/transaction/transactionApiSlices';
import { formattedDate, getTodayDate } from '../../components/convertDate';
import { bonusType, depositType, dropTransactionDepositType, dropTransactionGamesType, withdrawalType } from '../../customField/customOption';
import { convertTransactionDuration, convertTtypeOption } from '../../components/generalConversion';
import Deposit from './deposit/deposit';
import DepositAction from './deposit/depositAction';
import Withdrawal from './withdrawal/withdrawal';
import WithdrawalAction from './withdrawal/withdrawalAction';
import Bonus from './bonus/bonus';
import BonusAction from './bonus/bonusAction';
import General from './general/general';
import GeneralAction from './general/generalAction';
import PermissionsAuth from '../../components/permissionAuth';
import DropTransactionDepositAction from './droptransactiondeposit/dropTransactionDepositAction';
import DropTransactionDeposit from './droptransactiondeposit/dropTransactionDeposit';
import DropTransactionGames from './droptransactiongames/dropTransactionGames';
import DropTransactionGamesAction from './droptransactiongames/dropTransactionGamesAction';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import { UserOutlined } from '@ant-design/icons';
import ImageTransactionListingField from '../../ListingField/ImageTransactionListingField';
import BankAccountListingField from '../../ListingField/MerchantBankAccountListingField';
import EllipseListingField from '../../ListingField/EllipseListingField';
import { useTranslation } from 'react-i18next';
import { setSelectedPlayer } from '../../features/generalSlice';

const TransactionList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const { transactionHighlight } = useSelector((state) => state.general);
  const [isReady, setIsReady] = useState(false)
  const [isSummaryView, setIsSummaryView] = useState(false)

  useEffect(() => {
    const { startDate, endDate } = getTodayDate();
    const fromDate = formattedDate(startDate);
    const toDate = formattedDate(endDate);
    const defaultTtype = convertTtypeOption([
      PermissionsAuth.checkPermissions('undefined', 'view_deposit', depositType(t).value),
      PermissionsAuth.checkPermissions('undefined', 'view_withdrawal', withdrawalType(t).value),
      PermissionsAuth.checkPermissions('undefined', 'view_bonus', bonusType(t).value),
    ].filter(Boolean))
    dispatch(resetFilters())
    dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }))
    dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }))
    dispatch(filtersActions({ value: defaultTtype, type: 'array', event: 'ttype' }))
    dispatch(filtersActions({ value: ['pending'], type: 'input', event: 'state' }))
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
  } = useGetTransactionListQuery({
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
        title: t('common.Transaction'),
        width: 1200,
        render: (record) => {
          if((depositType(t).value).includes(record.ttype)){
             return <Deposit record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} transactionHighlight={transactionHighlight} />
            } else if ((withdrawalType(t).value).includes(record.ttype)){
              return <Withdrawal record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} transactionHighlight={transactionHighlight} />
            } else if ((bonusType(t).value).includes(record.ttype)){
              return <Bonus record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} />
            } else if ((dropTransactionDepositType(t).value).includes(record.ttype)){
              return <DropTransactionDeposit record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} />
            } else if ((dropTransactionGamesType(t).value).includes(record.ttype)){
              return <DropTransactionGames record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} />
            } else {
              return <General record={record} setSelectedPlayer={(player) => dispatch(setSelectedPlayer({record: player}))} t={t} />
            }
        }
    },
    {
        title: t('common.Action'),
        render: (record) => {
          if((depositType(t).value).includes(record.ttype)){
              return <DepositAction record={record} t={t} transactionHighlight={transactionHighlight} />
            } else if ((withdrawalType(t).value).includes(record.ttype)){
              return <WithdrawalAction record={record} t={t} transactionHighlight={transactionHighlight} />
            } else if ((bonusType(t).value).includes(record.ttype)){
              return <BonusAction record={record} t={t} transactionHighlight={transactionHighlight} />
            } else if ((dropTransactionDepositType(t).value).includes(record.ttype)){
              return <DropTransactionDepositAction record={record} t={t} />
            } else if ((dropTransactionGamesType(t).value).includes(record.ttype)){
              return <DropTransactionGamesAction record={record} t={t} />
            } else {
              return <GeneralAction record={record} t={t} />
          }
        }
    }
];

  
  const summaryColumns = [
    {
      title: t('common.Sites'),
      dataIndex: 'sites_name',
      width: 100,
    },
    {
      title: t('common.TXID'),
      dataIndex: 'txid',
      fixed: 'left',
    },
    {
      title: t('common.Player'),
      render: (record) => {
        return (
          <Tag icon={<UserOutlined />} color='default' onClick={()=> setSelectedPlayer(record.player)} style={{ cursor: "pointer" }}>
            {record.player_name}
          </Tag>
        )
      }
    },
    {
      title: t('common.Type'),
      dataIndex: 'ttype_display',
      render: (ttype_display) => t(`common.${ttype_display}`),
    },
    {
      title: t('common.State'),
      dataIndex: 'state',
      render: (state) => t(`common.${state}`),
    },
    {
      title: t('common.Promotion'),
      dataIndex: 'promotion_name',
      render: (promotion_name) => (
        promotion_name ? promotion_name : '-'
      ),
    },
    {
      title: t('common.Bal Before'),
      dataIndex: 'bal_bf',
      align: 'right',
      render: (bal_bf) => (
        <NumberListingField value={bal_bf}/>
      ),
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'right',
      render: (amount) => (
        <NumberListingField value={amount}/>
      ),
    },
    {
      title: t('common.Forfeit'),
      dataIndex: 'forfeit',
      align: 'right',
      render: (forfeit) => (
        <NumberListingField value={forfeit}/>
      ),
    },
    {
      title: t('common.Bal After'),
      dataIndex: 'bal_af',
      align: 'right',
      render: (bal_af) => (
        <NumberListingField value={bal_af}/>
      ),
    },
    {
      title: t('common.Proof'),
      dataIndex: 'proof',
      align: 'center',
      render: (proof) => (
        proof ? <ImageTransactionListingField image={proof} showLabel={false} /> : '-'
      ),
    },
    {
      title: t('common.Merchant Bank Account'),
      align: 'left',
      width: 300,
      render: (record) => (
        (record.merchantbankaccount_icon && record.merchantbankaccount_info) ?
        <BankAccountListingField icon={record.merchantbankaccount_icon} info={record.merchantbankaccount_info}/>
        :
        '-'
      ),
    },
    {
      title: t('common.Customer Bank Account'),
      align: 'left',
      width: 200,
      render: (record) => (
        (record.customerbankaccount_icon && record.customerbankaccount_info) ? 
        <BankAccountListingField icon={record.customerbankaccount_icon} info={record.customerbankaccount_info}/>
        :
        '-'
      ),
    },
    {
      title: t('common.Payment Gateway'),
      dataIndex: 'pg',
      render: (pg) => (
        pg ? pg : '-'
      ),
    },
    ...PermissionsAuth.checkPermissions('menu', 'view_easypay_detail_deposit', true) ?
    [{
      title: t('common.Easypay'),
      render: (record) => {
        return (
          record?.easypay_ranking ? 
          <>
          <NumberListingField value={record.easypay_client_balance} /> [{record?.easypay_ranking}]
          </>
          :
          '-'
        )
      }
    }]: [],
    {
      title: t('common.Remark'),
      dataIndex: 'remark',
      render: (remark) => (
        <EllipseListingField text={remark}/>
      ),
    },
    {
      title: t('common.Assignee'),
      dataIndex: 'assign_to_name',
      render: (assign_to_name) => (
        assign_to_name ? assign_to_name : '-'
      ),
    },
    {
      title: t('common.Approver'),
      dataIndex: 'approver_name',
      render: (approver_name) => (
        approver_name ? approver_name : '-'
      ),
    },
    {
      title: t('common.Duration'),
      render: (record) => (
        convertTransactionDuration(record.created_at, record.updated_at)
      )
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (updated_at) => (
        <DateTimeListingField dateTime={updated_at}/>
      ),
    },
  ];
  return (
    <div>
      <TransactionToolBar t={t} isLoading={isFetching} isSummaryView={isSummaryView} setIsSummaryView={(e) => {return setIsSummaryView(e)}} sorting={sorting}/>
      <Table
        rowKey="id"
        columns={isSummaryView ? summaryColumns : columns}
        dataSource={list && list.list}
        scroll={{
          x: isSummaryView ? 2800 : 1500,
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
        className={isSummaryView ? 'antd-report-table' : ''}
      />
    </div>
  )
}

export default TransactionList;