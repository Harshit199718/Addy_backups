import React, { useEffect, useState } from 'react';
import { Table, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ImageListingField from '../../ListingField/ImageListingField'
import PromotionToolBar from './missionsToolBar';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import CustomOptionField from '../../ListingField/CustomOptionField';
import { missionCategory, missionOfferType } from '../../customField/customOption';
import NumberListingField from '../../ListingField/NumberListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';
import { useGetMissionsListQuery } from '../../features/missions/missionsApiSlices';
import EditMissions from './EditMissions';
import PercentListingField from '../../ListingField/PercentListingField';

const MissionsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    setIsReady(true);
    dispatch(filtersActions({ value: true, type: 'select', event: 'is_active' }))
    dispatch(sortingAction({ field: 'is_active', name: 'is_active', order: 'descend' }));
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetMissionsListQuery({
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
      columnKey: 'sites',
      render: (sites) => <ReferenceSiteListingField id={sites} />
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      columnKey: 'title',
    },
    {
      title: t('common.Category'),
      dataIndex: 'category',
      columnKey: 'category',
      render: (category) => <CustomOptionField option={missionCategory(t)} mappingText={category} />
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      columnKey: 'sequence',
      align: 'center',
    },
    {
      title: t('common.Offer Type'),
      dataIndex: 'type_offer',
      columnKey: 'type_offer',
      align: 'center',
      render: (type_offer) => <CustomOptionField option={missionOfferType(t)} mappingText={type_offer} />
    },
    {
      title: t('common.Quantity Offer'),
      dataIndex: 'quantity_offer',
      columnKey: 'quantity_offer',
      align: 'center',
    },
    {
      title: t('common.Recurrence Frequency'),
      dataIndex: 'recurrence_frequency',
      columnKey: 'recurrence_frequency',
      align: 'center',
      render: (recurrence_frequency) => 
        recurrence_frequency ? (
          <Tag color="blue" style={{ borderRadius: '10px', marginBottom: '5px', marginRight: '3px' }}>
            {recurrence_frequency}
          </Tag>
        ) : null
    },
    {
      title: t('common.Limit Per User'),
      dataIndex: 'limit_per_user',
      columnKey: 'limit_per_user',
      align: 'center',
    },
    {
      title: t('common.Image'),
      dataIndex: 'image',
      align: 'center',
      render: (image) => <ImageListingField image={image} />
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      columnKey: 'active',
      align: 'center',
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Action'),
      hidden: PermissionsAuth.checkPermissions('button', 'change_mission', false),
      render: (record) => {
        return (
          <div>
            <EditMissions id={record.id} t={t} />
          </div>
        )
      }
    },
  ];
  
  return (
    PermissionsAuth.checkPermissions('list', 'view_mission',
    <div>
      <PromotionToolBar isLoading={isFetching} t={t} />
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
        scroll={{
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
  )
}

export default MissionsList;