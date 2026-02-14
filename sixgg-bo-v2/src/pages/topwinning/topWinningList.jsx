import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetTopWinningListQuery } from '../../features/topwinning/topWinningApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import EditTopWinning from './EditTopWinning';
import TopWinningToolBar from './topWinningToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import DateListingField from '../../ListingField/DateListingField';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const TopWinningList = () => {
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
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetTopWinningListQuery({
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
      render: (site, record) => <ReferenceSiteListingField id={[record.site]} />
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      columnKey: 'title',
      fixed: 'left',
    },
    {
      title: t('common.Product'),
      dataIndex: 'product_name',
      align: 'center',
      columnKey: 'product_name',
    },
    {
      title: t('common.Sequence'),
      dataIndex: 'sequence',
      align: 'center',
      columnKey: 'sequence',
      sorter: true,
      width: 100,
      defaultSortOrder: 'ascend', // Set default sorting order
    },
    {
      title: t('common.Start Date'),
      dataIndex: 'start_date',
      columnKey: 'start_date',
      align: 'center',
      width: 200,
      sorter: (a, b) => new Date(a.start_date) - new Date(b.start_date),
      render: (start_date) => <DateListingField date={start_date} />
    },
    {
      title: t('common.End Date'),
      dataIndex: 'end_date',
      columnKey: 'end_date',
      align: 'center',
      width: 200,
      sorter: (a, b) => new Date(a.end_date) - new Date(b.end_date),
      render: (end_date) => <DateListingField date={end_date} />
    },
    {
      title: t('common.Image'),
      dataIndex: 'image',
      align: 'center',
      width: 100,
      render: (image) => <ImageListingField image={image} />
    },
    {
      title: t('common.Action'),
      align: 'center',
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_topwinning', false),
      render: (record) => <EditTopWinning id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_topwinning',
    <div>
      <TopWinningToolBar isLoading={isFetching} t={t} />
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

export default TopWinningList;