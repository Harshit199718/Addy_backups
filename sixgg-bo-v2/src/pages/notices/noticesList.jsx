import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetNoticesListQuery } from '../../features/notices/noticesApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditNotices from './EditNotices';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import NoticesToolBar from './noticesToolBar'
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';
import { render } from 'react-dom';

const NoticesList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'sequence', name: 'sequence', order: 'ascend' }));
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetNoticesListQuery({
     pagination, 
     filters,
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
  });

  const typeMap =  {
    "static": t('customoption.Static'),
    "popup": t('customoption.Popup'),
};

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
      title: t('common.Link'),
      dataIndex: 'link',
      columnKey: 'link',
      align: 'center',
      sorter: true,
      width: 200,
    },
    {
      title: t('common.Status'),
      dataIndex: 'active',
      align: 'center',
      columnKey: 'active',
      sorter: true,
      width: 200,
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Show Once?'),
      dataIndex: 'is_once',
      align: 'center',
      columnKey: 'is_once',
      sorter: true,
      width: 200,
      render: (is_once) => <BooleanField boolean={is_once} />
    },
    {
      title: t('common.Type'),
      dataIndex: 'type',
      align: 'center',
      columnKey: 'type',
      width: 200,
      render: (type) => type && typeMap[type] || type  
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
      title: t('common.Image'),
      dataIndex: 'image_sm',
      align: 'center',
      width: 100,
      render: (image_sm) => <ImageListingField image={image_sm} />
    },
    {
      title: t('common.Action'),
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_notice', false),
      render: (record) => <EditNotices id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_notice',
    <div>
      <NoticesToolBar isLoading={isFetching} t={t} />
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

export default NoticesList;