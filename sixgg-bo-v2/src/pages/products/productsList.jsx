import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useGetProductsListQuery } from '../../features/products/productsApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { BooleanField } from '../../ListingField/BooleanField';
import EditProducts from './EditProducts';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import { productsCategory, productsLaunchType } from '../../customField/customOption'
import ProductsToolBar from './productsToolBar'
import CustomOptionField from '../../ListingField/CustomOptionField';
import BatchCreateProduct from './batchCreateProduct';
import BatchUpdateProduct from './batchUpdateProduct';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const ProductsList = () => {
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
  } = useGetProductsListQuery({
     pagination, 
     filters,
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 10000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      selectedRowKeys?.length > 0 && PermissionsAuth.checkAdminPermissions('others', true) && {
        key: 'batchcreate',
        text: <BatchCreateProduct selectedRowKeys={selectedRowKeys} t={t} />,
      },
      selectedRowKeys?.length > 0 && PermissionsAuth.checkAdminPermissions('others', true) && {
        key: 'batchupdate',
        text: <BatchUpdateProduct selectedRowKeys={selectedRowKeys} t={t} />,
      },
    ]
  };

  const columns = [
    {
      title: t('common.Sites'),
      columnKey: 'sites',
      width: 200,
      render: (record) => <ReferenceSiteListingField id={record.sites} />,
    },
    {
      title: t('common.Name'),
      dataIndex: 'name',
      columnKey: 'name',
      fixed: 'left',
      sorter: (a, b) => {
        if (!a.name) return -1; 
        if (!b.name) return 1; 
        return a.name?.localeCompare(b.name);
      },
    },
    {
      title: t('common.Category'),
      dataIndex: 'category',
      align: 'center',
      columnKey: 'category',
      render: (category) => <CustomOptionField option={productsCategory(t)} mappingText={category} />
    },
    {
      title: t('common.Launch Type'),
      dataIndex: 'ltype',
      align: 'center',
      columnKey: 'ltype',
      render: (ltype) => <CustomOptionField option={productsLaunchType(t)} mappingText={ltype} />
    },
    {
      title: t('common.Module'),
      dataIndex: 'module',
      align: 'center',
      columnKey: 'module',
    },
    {
      title: t('common.Credit Type'),
      dataIndex: 'credit_type',
      align: 'center',
      render: (text, record) => {
        // Render the credit type based on the value in the record
        switch (record.credit_type) {
          case 'CA':
            return t('common.Cash');
          case 'CH':
            return t('common.Chips');
          case 'CC':
            return t('common.Cash & Chips');
          default:
            return '';
        }
      },
      columnKey: 'credit_type',
    },
    {
      title: t('common.URL Type'),
      dataIndex: 'urltype',
      align: 'center',
      columnKey: 'urltype',
    },
    {
      title: t('common.Active'),
      dataIndex: 'active',
      align: 'center',
      columnKey: 'active',
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Live'),
      dataIndex: 'is_live',
      align: 'center',
      columnKey: 'is_live',
      sorter: true,
      render: (active) => <BooleanField boolean={active} />
    },
    {
      title: t('common.Image'),
      dataIndex: 'image_mobile',
      width: '100px',
      render: (image_mobile) => <ImageListingField image={image_mobile} />
    },
    {
      title: t('common.Action'),
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_product', false),
      render: (record) => <EditProducts id={record.id} t={t} />
    },
  ];
  
  return (
    PermissionsAuth.checkPermissions('list', 'view_product',
    <div>
      <ProductsToolBar isLoading={isFetching} t={t} />
      <Table
        rowSelection={rowSelection}
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

export default ProductsList;