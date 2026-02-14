import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetPromotionGroupListQuery } from '../../features/promotiongroup/promotionGroupApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditPromotionGroup from './EditPromotionGroup';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import PromotionGroupToolBar from './promotionGroupToolBar'
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const PromotionGroupList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'sequence', name: 'sequence', order: 'ascend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetPromotionGroupListQuery({
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
      width: 200,
      render: (sites, record) => <ReferenceSiteListingField id={record.sites} />
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      columnKey: 'sequence',
      align: 'center',
      width: 200,
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      columnKey: 'title',
    },
    {
      title: t('common.Image'),
      dataIndex: 'promo_image',
      width: 100,
      render: (promo_image) => <ImageListingField image={promo_image} />
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      align: 'center',
      columnKey: 'active',
      sorter: true,
      width: 200,
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Action'),
      width: 100,
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'change_promotiongroup', false),
      render: (record) => <EditPromotionGroup id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_promotiongroup',
    <div>
      <PromotionGroupToolBar isLoading={isFetching} t={t} />
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

export default PromotionGroupList;