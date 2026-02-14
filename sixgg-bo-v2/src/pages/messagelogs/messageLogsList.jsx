import React, { useEffect, useState } from 'react';
import { Form, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMessageLogsListQuery, useAddMessageLogsMutation, useUpdateMessageLogsMutation } from '../../features/messagelogs/messageLogsApiSlices';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import errorField from '../../features/error/errorField';
import { notification } from '../../features/modalSlice';
import MessageLogsToolBar from './messageLogsToolBar';
import DateListingField from '../../ListingField/DateListingField'
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const MessageLogsList = () => {
  const { t } = useTranslation();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [apiErrors, setApiErrors] = useState([])
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'created_at', name: 'created_at', order: 'descend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading,
    isFetching,
    isSuccess, 
    isError, 
    error
  } = useGetMessageLogsListQuery({
     pagination, 
     filters, 
     sorting
  }, isModalOpen ? {} : {
    pollingInterval: 100000,
    skipPollingIfUnfocused: true,
    refetchOnFocus: true,
    skip: !isReady
  });

  const [Update] = useUpdateMessageLogsMutation();
  const [Create] = useAddMessageLogsMutation();
  const emptyRow = { id: 'new', sites: '', text: '', sequence: '', status: '' };
  const handleAddNewRow = () => {
    form.resetFields();
    setEditingRow('new');
  };

  const onFinish = async (values) => {
    setApiErrors([])
    try {
      let action;
      if(editingRow === 'new'){
        action = t('common.Create')
        const data = await Create(values).unwrap();
      }else{
        action = t('common.Update')
        values.id = editingRow;
        const data = await Update(values).unwrap();
      }
      dispatch(notification({notification_status: 'success', notification_message: `${t("common.Message Log")} ${action} ${t("common.Successfully")}`}));
      setEditingRow(null)
    } catch (error) {
      dispatch(notification({notification_status: 'error', notification_message: JSON.stringify(error)}));
      setApiErrors(errorField(error));
    }
  };

  const columns = [
    {
      title: t('common.Sites'),
      dataIndex: 'sites',
      width: 200,
      render: (sites) => <ReferenceSiteListingField id={sites}/>
    },
    {
      title: t('common.Date'),
      dataIndex: 'created_at',
      columnKey: 'created_at',
      align: 'center',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      width: 200,
      render: (created_at) => <DateListingField date={created_at} />,
    },
    {
      title: t('common.Mobile Number'),
      dataIndex: 'number',
      columnKey: 'number',
      align: 'center',
      width: 200,
    },
    {
      title: t('common.Message'),
      dataIndex: 'message',
      columnKey: 'message',
      width: 500,
    },
    {
      title: t('common.Payload'),
      dataIndex: 'payload',
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_messagelog',
    <div>
      <MessageLogsToolBar isLoading={isFetching} handleAddNewRow={handleAddNewRow} t={t} />
      <Form form={form} onFinish={onFinish}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={editingRow === 'new' ? [emptyRow, ...(list && list.list ? list.list : [])] : (list && list.list ? list.list : [])}
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
      </Form>
    </div>
    )
  )
}

export default MessageLogsList;