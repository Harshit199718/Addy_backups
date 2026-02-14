import React, { useEffect, useState } from 'react';
import { Table, Button, Space } from 'antd';
import { useGetKioskAccessListQuery } from '../../features/kioskaccess/kioskAccessApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import ImageListingField from '../../ListingField/ImageListingField'
import KioskAccessToolBar from './kioskAccessToolBar';
import EditKioskAccess from './EditKioskAccess';
import ReferenceProductListingField from '../../ListingField/ReferenceProductListingField';
import { useAddProductsBOAccessMutation } from '../../features/products/productsApiSlices';
import { notification } from '../../features/modalSlice';
import ClipBoardButton from '../../components/clipboard';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const KioskAccessList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'product', name: 'product', order: 'descend' }));
    setIsReady(true);
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetKioskAccessListQuery({
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
      title: t('common.Product'),
      dataIndex: 'product',
      align: 'center',
      columnKey: 'product',
      fixed: 'left',
      width: 400,
      defaultSortOrder: 'descend',
      render: (product) => <ReferenceProductListingField id={product} />
    },
    {
      title: t('common.Username'),
      dataIndex: 'username',
      columnKey: 'username',
      render: (username, record) =>( 
        <Space>
          <ClipBoardButton text={username} notify={'Username'} />
          {record.username}
      </Space>    
      )
    },
    {
      title: t('common.Password'),
      dataIndex: 'password',
      columnKey: 'password',
      render: (password, record) =>( 
        <Space>
          <ClipBoardButton text={password} notify={'Password'} />
          {record.password}
      </Space>    
      )
    },
    {
      title: t('common.Site URL'),
      dataIndex: 'site_url',
      columnKey: 'site_url',
    },
    {
      title: t('common.Image'),
      dataIndex: 'reference',
      align: 'center',
      width: 100,
      render: (reference) => <ImageListingField image={reference} />
    },
    {
      title: t('common.Remark'),
      dataIndex: 'remarks',
      columnKey: 'remarks',
    },
    {
      title: t('common.Action'),
      align: 'center',
      width: 100,
      hidden: PermissionsAuth.checkPermissions('button', 'change_kioskaccess', false),
      render: (record) => {
        return (
          <Space>
            <KioskAccessBO record = {record} t={t} />
            <EditKioskAccess id={record.id} t={t} />
          </Space>
        )
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_kioskaccess',
    <div>
      <KioskAccessToolBar isLoading={isFetching} t={t} />
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

const KioskAccessBO = ({ record, t }) => {
  const [apiErrors, setApiErrors] = useState([]);
  const [KioskAccessBOMutation, { isLoading }] = useAddProductsBOAccessMutation();
  const dispatch = useDispatch();

  const onHandleSubmit = async (values) => {
    try {
      const token = localStorage.getItem('access') || null;
      const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
      };

      const apiUrl = import.meta.env.VITE_APIURL;
      let newUrl = `${apiUrl}/products/nex4d_BO_Link/`;
      const requestBody = {
          data: record,
      };
      const response = await KioskAccessBOMutation({ url: newUrl, headers, body: JSON.stringify(requestBody) });
      const { data } = response;
      if (data && data.URL) {
        window.open(data.URL); // Open the URL in a new window
      }

      dispatch(notification({ notification_status: 'success', notification_message: `${t('notisuccess.Only for nex4d_BO_Link!')}` }));
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
    };

  return (
    <>
      {record && record.remarks && record.remarks.toLowerCase() === 'nex4d' && (
        <Button type="primary" onClick={onHandleSubmit}>
          {t("common.Visit BO")}
        </Button>
      )}
    </>
  );
};

export default KioskAccessList;