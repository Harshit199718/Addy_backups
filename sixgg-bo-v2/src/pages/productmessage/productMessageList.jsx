import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import DateTimeListingField from '../../ListingField/DateTimeListingField';
import ProductMessageToolBar from './productMessageToolBar'
import ClipBoardButton from '../../components/clipboard';
import { useGetProductMessageListQuery } from '../../features/productmessage/productMessageApiSlices';
import PermissionsAuth from '../../components/permissionAuth';
import ProductMessageExpandList from './productMessageExpandList';
import { useTranslation } from 'react-i18next';

const ProductMessageList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'updated_at', name: 'updated_at', order: 'descend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetProductMessageListQuery({
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
      dataIndex: 'site_name',
      width: 200,
    },
    {
      title: t('common.Product Name'),
      columnKey: 'product_name',
      align: 'left',
      fixed: 'left',
      render: (record) => { return record.product_name }
    },
    {
      title: t('common.API URL'),
      dataIndex: 'api_url',
      columnKey: 'api_url',
      align: 'left',
    },
    {
      title: t('common.Status Code'),
      dataIndex: 'status_code',
      columnKey: 'status_code',
      align: 'center',
      sorter: true,
      width: 200,
    },
    {
      title: t('common.Message Type'),
      dataIndex: 'message_type_display',
      columnKey: 'message_type_display',
      align: 'center',
      width: 200,
    },
    {
      title: t('common.Date'),
      dataIndex: 'updated_at',
      columnKey: 'updated_at',
      defaultSortOrder: 'descend',
      align: 'center',
      sorter: true,
      width: 200,
      render: (updated_at) => <DateTimeListingField dateTime={updated_at} />
    },
    {
      title: t('common.Product Message'),
      align: 'center',
      width: 200,
      render: (record) => {
        const productMessage = `${t("common.Request URL")}: ${record.api_url}\n${t("common.Payload")}: ${record.payload}\n${t("common.Response")}: ${record.response}`;
        return (
            <ClipBoardButton text={productMessage} notify={t('common.Message')} />
        );
      },
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_productmessage',
    <div>
      <ProductMessageToolBar isLoading={isFetching} />
      <Table
        rowKey="id"
        columns={columns}
        expandable={{
          expandedRowRender: (record) => <ProductMessageExpandList record={record} t={t} />,
        }}
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

export default ProductMessageList;