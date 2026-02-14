import React, { useEffect, useState } from 'react';
import { Table, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import EditMessageTemplate from './EditMessageTemplate';
import MessageTemplateToolBar from './messageTemplateToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import ReferenceSiteListingField from '../../ListingField/ReferenceSiteListingField';
import { useGetMessageTemplateListQuery } from '../../features/messagetemplate/messagetemplateApiSlices';
import SendMessageTemplate from './sendmessage/messageTemplateSendMessage';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const MessageTemplateList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    dispatch(resetFilters())
    dispatch(sortingAction({ field: 'title', name: 'title', order: 'ascend' }));
    setIsReady(true)
  }, []); // initial sort

  const { 
    data: list,
    isLoading, 
    isFetching, 
    isSuccess, 
    isError, 
    error
  } = useGetMessageTemplateListQuery({
     pagination, 
     filters,
     sorting,
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
      columnKey: 'sites',
      width: 200,
      render: (sites) => <ReferenceSiteListingField id={sites} />
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      columnKey: 'title',
      width: 400,
    },
    {
      title: t('common.Message'),
      dataIndex: 'message',
      columnKey: 'message',
    }, 
    {
      title: t('common.Action'),
      align: 'center',
      width: 300,
      hidden: PermissionsAuth.checkPermissions('button', 'send_message', false) || PermissionsAuth.checkPermissions('button', 'change_messagetemplate', false),
      render: (record) => {
        return (
          <Space>
            <SendMessageTemplate id={record.id} t={t} />
            <EditMessageTemplate id={record.id} t={t} />
          </Space>
        )
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_messagetemplate',
    <div>
      <MessageTemplateToolBar isLoading={isFetching} t={t} />
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

export default MessageTemplateList;