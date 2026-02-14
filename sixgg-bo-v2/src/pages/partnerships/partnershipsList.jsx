import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import PartnershipsToolBar from './partnershipsToolBar';
import { useGetPartnershipsListQuery } from '../../features/partnerships/partnershipsApiSlices';
import EditPartnerships from './EditPartnerships';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const PartnershipsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'name', name: 'name', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetPartnershipsListQuery({
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
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      fixed: 'left',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('common.Description'),
      dataIndex: 'description',
      columnKey: 'description',
    },
    {
      title: t('common.Logo'),
      dataIndex: 'logo',
      align: 'center',
      render: (logo) => <ImageListingField image={logo} />
    },
    {
      title: t('common.URL'),
      dataIndex: 'url',
      columnKey: 'url',
    },
    {
      title: t('common.Action'),
      align: 'center',
      hidden: PermissionsAuth.checkPermissions('button', 'change_partnership', false),
      render: (record) => <EditPartnerships id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_partnership',
    <div>
      <PartnershipsToolBar isLoading={isFetching} t={t} />
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

export default PartnershipsList;