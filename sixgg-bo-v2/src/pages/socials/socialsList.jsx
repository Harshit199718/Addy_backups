import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetSocialsListQuery } from '../../features/socials/socialsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditSocials from './EditSocials';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import { socialsProvider } from '../../customField/customOption';
import SocialsToolBar from './socialsToolBar'
import CustomOptionField from '../../ListingField/CustomOptionField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const SocialsList = () => {
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
  } = useGetSocialsListQuery({
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
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      fixed: 'left',
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
      columnKey: 'description',
    },
    {
      title: t('common.Provider'),
      dataIndex: 'provider',
      columnKey: 'provider',
      align: 'center',
      width: 400,
      render: (provider) => <CustomOptionField option={socialsProvider(t)} mappingText={provider} />
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
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      align: 'center',
      columnKey: 'sequence',
      sorter: true,
      width: 200,
      defaultSortOrder: 'ascend', // Set default sorting order
    },
    {
      title: t('common.Action Link'),
      dataIndex: 'action_link',
      columnKey: 'action_link',
      align: 'center',
    },
    {
      title: t('common.Image'),
      dataIndex: 'image',
      width: 100,
      render: (image) => <ImageListingField image={image} />
    },
    {
      title: t('common.Action'),
      align: 'center',
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_social', false),
      render: (record) => <EditSocials id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_social',
    <div>
      <SocialsToolBar isLoading={isFetching} t={t} />
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

export default SocialsList;