import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import { useGetMailboxListQuery } from '../../features/mailbox/mailboxApiSlices';
import { useDispatch, useSelector } from 'react-redux';
import EditMailbox from './EditMailbox';
import MailboxToolBar from './mailboxToolBar';
import { paginationActions, resetFilters, sortingAction } from '../../features/filtersSlice';
import DateListingField from '../../ListingField/DateListingField';
import ReferenceUsersListingField from '../../ListingField/ReferenceUsersListingField';
import ViewMailHistory from './mail/ViewMailHistory';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';

const MailboxList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isModalOpen = useSelector((state) => state.modal.modalOpen);
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const sorting = useSelector((state) => state.filters.sorting);
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
  } = useGetMailboxListQuery({
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
      title: t('common.Sender'),
      dataIndex: 'sender',
      render: (sender) => <ReferenceUsersListingField id={sender} />
    },
    {
      title: t('common.Title'),
      dataIndex: 'title',
      columnKey: 'title',
    },
    {
      title: t('common.Message'),
      dataIndex: 'message',
      columnKey: 'message',
    },
    {
      title: t('common.Created Date'),
      dataIndex: 'created_at',
      columnKey: 'created_at',
      align: 'center',
      width: 200,
      defaultSortOrder: 'descend',
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (created_at) => <DateListingField date={created_at} />
    },
    {
      title: t('common.Action'),
      align: 'center',
      width: 200,
      render: (record) => {
        return (
          <Row gutter={[16, 16]}>
            <Col>
              <ViewMailHistory record={record} t={t} />
            </Col>
            <Col>
              <EditMailbox id={record.id} t={t} />
            </Col>
          </Row>
        )
      }
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_mail',
    <div>
      <MailboxToolBar isLoading={isFetching} t={t} />
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

export default MailboxList;