import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetGameListListQuery } from '../../features/gamelist/gameListApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import EditGameList from './EditGameList';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ImageListingField from '../../ListingField/ImageListingField'
import GameListToolBar from './gameListToolBar'
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const GameListList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'name', name: 'name', order: 'ascend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetGameListListQuery({
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
      title: t('gamelist.Product Description'),
      dataIndex: 'product_description',
      columnKey: 'product_description',
      align: 'center',
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
      align: 'center',
      columnKey: 'name',
      sorter: true,
      defaultSortOrder: 'ascend',
    },
    {
      title: t('gamelist.Game Code'),
      dataIndex: 'game_code',
      align: 'center',
      columnKey: 'game_code',
      sorter: true,
    },
    {
      title: t('gamelist.Game Category'),
      dataIndex: 'game_category',
      columnKey: 'game_category',
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
      hidden: PermissionsAuth.checkPermissions('button', 'change_gamelist', false),
      render: (record) => <EditGameList id={record.id} t={t} />
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_gamelist',
    <div>
      <GameListToolBar isLoading={isFetching} t={t} />
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

export default GameListList;