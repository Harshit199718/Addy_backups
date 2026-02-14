import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import { useGetLuckyWheelHistoryListQuery } from '../../features/luckywheelhistory/luckyWheelHistoryApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import { luckyWheelHistoryBonusType, luckyWheelSlotsPriceType } from '../../customField/customOption';
import CustomOptionField from '../../ListingField/CustomOptionField';
import PermissionsAuth from '../../components/permissionAuth';
import NumberListingField from '../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';
import ReferencePlayerListingField from '../../ListingField/ReferencePlayerListingField';

const LuckyWheelHistoryList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'created_at', name: 'created_at', order: 'descend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetLuckyWheelHistoryListQuery({
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
      align: 'center',
      columnKey: 'sites_name',
    },
    {
      title: t('common.Create At'),
      dataIndex: 'created_at',
      columnKey: 'created_at',
      defaultSortOrder: 'descend', // Set default sorting order
      width: 200,
      align: 'center',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (created_at) => <DateTimeListingField dateTime={created_at} />
    },
    {
      title: t('common.Player'),
      dataIndex: 'player',
      key: 'player',
      render: (player) => <ReferencePlayerListingField filterProp={{id: [player]}} />
    }, 
    {
      title: t('common.Bonus Type'),
      dataIndex: 'bonus_type',
      align: 'center',
      columnKey: 'bonus_type',
      sorter: true,
      render: (bonus_type) => <CustomOptionField option={luckyWheelHistoryBonusType(t)} mappingText={bonus_type} />
    },
    {
      title: t('common.Price Type'),
      dataIndex: 'price_type',
      align: 'center',
      columnKey: 'price_type',
      sorter: true,
      render: (price_type) => <CustomOptionField option={luckyWheelSlotsPriceType(t)} mappingText={price_type} />
    },
    {
      title: t('common.Probability'),
      dataIndex: 'probability',
      align: 'center',
      columnKey: 'probability',
      sorter: true,
    },
    {
      title: t('common.Prize'),
      dataIndex: 'description',
      align: 'center',
      columnKey: 'description',
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'center',
      columnKey: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => <NumberListingField value={amount}/>
    },
    ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_luckywheelhistory',
    <div>
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

export default LuckyWheelHistoryList;