import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditPromotion from './EditPromotion';
import { filtersActions, paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ImageListingField from '../../ListingField/ImageListingField'
import PromotionToolBar from './promotionToolBar';
import { useGetPromotionListQuery } from '../../features/promotion/promotionApiSlices';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import CustomOptionField from '../../ListingField/CustomOptionField';
import { promotionType, turnoverRolloverType } from '../../customField/customOption';
import ReferenceGroupListingField from '../../ListingField/ReferencePromoGroupListingField';
import NumberListingField from '../../ListingField/NumberListingField';
import PercentListingField from '../../ListingField/PercentListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const PromotionList = () => {
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
    dispatch(sortingAction({ field: 'active', name: 'active', order: 'descend' }));
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetPromotionListQuery({
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
      render: (sites) => <ReferenceSiteListingField id={sites} />
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      fixed: 'left'
    },
    {
      title: t('common.Promo Type'),
      dataIndex: 'promo_type',
      render: (promo_type) => <CustomOptionField option={promotionType(t)} mappingText={promo_type} />
    },
    {
      title: t('common.Promo Group'),
      dataIndex: 'group',
      render: (group) => <ReferenceGroupListingField id={[group]} />
    },
    {
      title: t('common.Bonus Percent'),
      dataIndex: 'bonus_percent',
      render: (bonus_amount) => <PercentListingField value={bonus_amount} />
    },
    {
      title: t('common.Bonus Amount'),
      dataIndex: 'bonus_amount',
      render: (bonus_amount) => <NumberListingField value={bonus_amount} />
    },
    {
      title: t('common.Max Bonus Amount'),
      dataIndex: 'max_bonus_amount',
      render: (max_bonus_amount) => <NumberListingField value={max_bonus_amount} />
    },
    {
      title: t('common.Rollover/Turnover'),
      dataIndex: 'withdrawal_condition',
      width: 150,
      render: (withdrawal_condition) => <CustomOptionField option={turnoverRolloverType(t)} mappingText={withdrawal_condition} />
    },
    {
      title: t('common.Rollover/Turnover Amount'),
      dataIndex: 'withdrawal_term',
      width: 150,
      render: (withdrawal_term) => <NumberListingField value={withdrawal_term} />
    },
    {
      title: t('common.Max Payout Amount'),
      dataIndex: 'max_payout_amount',
      render: (max_payout_amount) => <NumberListingField value={max_payout_amount} />
    },
    {
      title: t('common.Min Deposit Amount'),
      dataIndex: 'min_deposit',
      render: (min_deposit) => <NumberListingField value={min_deposit} />
    },
    {
      title: t('common.Limit Per User'),
      dataIndex: 'limit',
    },
    {
      title: t('common.Image'),
      dataIndex: 'image',
      width: '100px',
      render: (image) => <ImageListingField image={image} />
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      columnKey: 'active',
      defaultSortOrder: 'ascend',
      sorter: true,
      align: 'center',
      render: (active) => (
        <BooleanField boolean={active} />
      ),
    },
    {
      title: t('common.Action'),
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_promotion', false),
      render: (record) => {
        return (
          <div>
            <EditPromotion id={record.id} t={t} />
          </div>
        )
      }
    },
  ];
  
  return (
    PermissionsAuth.checkPermissions('list', 'view_promotion',
    <div>
      <PromotionToolBar isLoading={isFetching} t={t} />
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
        }}
      />
    </div>
    )
  )
}

export default PromotionList;