import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import { useGetPlayerListQuery } from '../../features/player/playerApiSlices';
import NumberListingField from '../../ListingField/NumberListingField';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import { StatusListingField } from '../../ListingField/StatusListingField';
import StealthLoginListingField from '../../ListingField/StealthLogin';
import PlayerToolBar from './playerToolBar';
import PermissionsAuth from '../../components/permissionAuth';
import TransferHoldWallet from './TransferHoldWallet';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useTranslation } from 'react-i18next';
import { setSelectedPlayer } from '../../features/generalSlice';

const PlayerList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'date_joined', name: 'date_joined', order: 'descend' }));
    setIsReady(true);
  }, [dispatch]); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error,
  } = useGetPlayerListQuery({
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
      title: t('common.Username'),
      dataIndex: 'username',
      fixed: 'left'
    },
    {
      title: t('common.Register Date'),
      dataIndex: 'date_joined',
      columnKey: 'date_joined',
      defaultSortOrder: 'descend',
      sorter: true,
      render: (date_joined) => <DateTimeListingField dateTime={date_joined}/>
    },
    {
      title: t('common.Status'),
      dataIndex: 'registration_stage',
      align: 'center',
      render: (registration_stage) => <StatusListingField status={registration_stage}/>
    },
    {
      title: t('common.Login As'),
      align: 'center',
      render: (record) => record.is_active && <StealthLoginListingField record={record}/>
    },
    {
      title: t('common.Chat'),
      align: 'center',
      render: (record) => (
        <Icon 
          icon="material-symbols:chat" 
          width="1.2rem" 
          height="1.2rem"  
          style={{cursor: 'pointer'}} 
          onClick={() => {
            navigate(`/livechat/${record.username}/${record.sites_name}`)
          }} 
        />
      ),
    },
    {
      title: t('common.Mobile Number'),
      dataIndex: 'mobile',
      fixed: 'left'
    },
    {
      title: t('common.Balance'),
      dataIndex: 'balance',
      align: 'right',
      render: (balance) => <NumberListingField value={balance}/>
    },
    {
      title: t('common.Hold Wallet'),
      align: 'right',
      render: (record) => <TransferHoldWallet record={record} t={t} />
    },
    {
      title: t('common.Token'),
      dataIndex: 'checkin_token_available',
      align: 'right',
      render: (checkin_token_available) => <NumberListingField value={checkin_token_available}/>
    },
    {
      title: t('common.Referral Code'),
      dataIndex: 'referral_code',
    },
    {
      title: t('common.Referrer Code'),
      dataIndex: 'referrer_code',
    },
    {
      title: t('common.Transaction'),
      children: [
      {
        title: t('common.Deposit'),
        children: [
          {
            title: t('common.Last Deposit'),
            dataIndex: 'last_deposit',
            render: (last_deposit) => <DateTimeListingField dateTime={last_deposit && last_deposit.updated_at}/>
          },
          {
            title: t('common.Count'),
            dataIndex: 'total_deposit_count',
            align: 'center',
          },
          {
            title: t('common.Amount'),
            dataIndex: 'total_deposit_amount',
            align: 'right',
            render: (total_deposit_amount) => <NumberListingField value={total_deposit_amount}/>
          },
        ]
      },
      {
        title: t('common.Bonus'),
        children: [
          {
            title: t('common.Count'),
            dataIndex: 'total_bonus_count',
            align: 'center',
          },
          {
            title: t('common.Amount'),
            dataIndex: 'total_bonus_amount',
            align: 'right',
            render: (total_bonus_amount) => <NumberListingField value={total_bonus_amount}/>
          },
        ]
      },
      {
        title: t('common.Withdrawal'),
        children: [
          {
            title: t('common.Last Withdrawal'),
            dataIndex: 'last_withdrawal',
            render: (last_withdrawal) => <DateTimeListingField dateTime={last_withdrawal && last_withdrawal.updated_at}/>
          },
          {
            title: t('common.Count'),
            dataIndex: 'total_withdrawal_count',
            align: 'center',
          },
          {
            title: t('common.Amount'),
            dataIndex: 'total_withdrawal_amount',
            align: 'right',
            render: (total_withdrawal_amount) => <NumberListingField value={total_withdrawal_amount}/>
          },
        ]
      },
      {
        title: t('common.Winloss'),
        dataIndex: 'winloss',
        align: 'right',
        render: (winloss) => <NumberListingField value={winloss}/>
      },
    ]
    },
    {
      title: t('common.Is Active'),
      dataIndex: 'is_active',
      align: 'center',
      render: (is_active) => <BooleanField boolean={is_active} />
    },
    {
      title: t('common.Ranking'),
      children: [
      {
        title: t('common.Deposit Rank'),
        dataIndex: 'deposit_rank',
        align: 'center'
      },
      {
        title: t('common.Max Deposit Amount'),
        dataIndex: 'max_deposit_amt',
        align: 'right',
        render: (max_deposit_amt) => <NumberListingField value={max_deposit_amt}/>
      },
      ...(import.meta.env.VITE_MODULES_EXCLUDED_JQK ? 
        [
          {
            title: t('common.Easypay Ranking'),
            dataIndex: 'easypay_ranking',
            empty: '-'
          },
          {
            title: t('common.Easypay Client Balance'),
            dataIndex: 'easypay_client_balance',
            align: 'right',
            render: (easypay_client_balance) => <NumberListingField value={easypay_client_balance}/>
          }
        ] : [])
      ]
    },
    {
      title: t('common.Remark'),
      dataIndex: 'remarks',
    }
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_player',
    <div>
      <PlayerToolBar isLoading={isFetching} t={t} />
      <Table
        rowKey="id"
        bordered
        id='player'
        style={{cursor: "pointer"}}
        onRow={(record) => ({
          onClick: (e) => {
            const clickedElement = e?.target?.parentElement?.tagName?.toLowerCase()
            if(clickedElement === "tr" || clickedElement === "td"){
              dispatch(setSelectedPlayer({record: record}))
            } 
          },
        })}
        columns={columns}
        dataSource={list && list.list}
        scroll={{
          x: 2500,
          y: 'calc(100vh - 420px)',
        }}
        size='small'
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

export default PlayerList;