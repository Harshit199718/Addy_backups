import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetLuckyWheelSlotsListQuery } from '../../features/luckywheelslots/luckyWheelSlotsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditLuckyWheelSlots from './EditLuckyWheelSlots';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import { luckyWheelSlotsBonusType } from '../../customField/customOption';
import NumberListingField from '../../ListingField/NumberListingField'
import PercentListingField from '../../ListingField/NumberListingField'
import LuckyWheelToolBar from './luckyWheelToolBar';
import ColorPickerListingField from '../../ListingField/ColorPickerListingField';
import CustomOptionField from '../../ListingField/CustomOptionField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const LuckyWheelSlotsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'bonus_type', name: 'bonus_type', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetLuckyWheelSlotsListQuery({
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
      dataIndex: 'sites',
      width: 200,
      render: (sites) => <ReferenceSiteListingField id={sites} />
    },
    {
      title: t('common.Bonus Type'),
      dataIndex: 'bonus_type',
      align: 'center',
      columnKey: 'bonus_type',
      sorter: true, 
      defaultSortOrder: 'ascend', // Set default sorting order
      width: 200,
      render: (bonus_type) => <CustomOptionField option={luckyWheelSlotsBonusType(t)} mappingText={bonus_type} />
    },
    {
      title: t('common.Active'),
      dataIndex: 'is_active',
      align: 'center',
      columnKey: 'is_active',
      sorter: true,
      width: 200,
      render: (is_active) => <BooleanField boolean={is_active} />
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
      align: 'center',
      columnKey: 'description',
    },
    {
      title: t('common.Color'),
      dataIndex: 'color',
      key: 'color',
      align: 'center',
      width: 200,
      render: (color) => <ColorPickerListingField color={color} />,
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'center',
      columnKey: 'amount',
      width: 200,
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => <NumberListingField value={amount}/>
    },
    {
      title: t('common.Probability'),
      dataIndex: 'probability',
      align: 'center',
      columnKey: 'probability',
      width: 200,
      sorter: (a, b) => Number(a.probability) - Number(b.probability),
      render: (probability) => <PercentListingField value={probability} />
    },
    {
      title: t('common.Image'),
      dataIndex: 'image',
      width: 100,
      render: (image) => <ImageListingField image={image} />
    },
    {
      title: t('common.Action'),
      width: 100,
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'change_luckywheelslots', false),
      render: (record) => <EditLuckyWheelSlots id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_luckywheelslots', 
    <div>
      <LuckyWheelToolBar isLoading={isFetching} t={t} />
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

export default LuckyWheelSlotsList;