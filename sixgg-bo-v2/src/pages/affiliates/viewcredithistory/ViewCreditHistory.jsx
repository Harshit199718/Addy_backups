import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import DateListingField from '../../../ListingField/DateListingField'
import NumberListingField from '../../../ListingField/NumberListingField';
import ReferenceAffiliatesListingField from '../../../ListingField/ReferenceAffiliatesListingField';
import { useGetAffiliatesCreditHistoryListQuery, useGetAffiliatesIDQuery } from '../../../features/affiliates/affiliatesApiSlices';
import { paginationTabActions, resetTabFilters, sortingTabAction } from '../../../features/filtersTabSlice';

const CreditHistoryForm = ({ id, t }) => {
  const dispatch = useDispatch();
  const [isReady, setIsReady] = useState(false)
  const pagination = useSelector((state) => state.filtersTab.pagination);
  const filters = useSelector((state) => state.filtersTab.filters);
  const sorting = useSelector((state) => state.filtersTab.sorting);

  useEffect(() => {
    dispatch(resetTabFilters())
    setIsReady(true)
  }, []); // initial sort
  
  const { data: list, isLoading, isSuccess, isError, refetch } = useGetAffiliatesCreditHistoryListQuery(
    {
      pagination, 
      filters,
      sorting,
      id: id,
    },
    {
      refetchOnFocus: true,
      skip: !isReady
    }
  );

  const columns = [
    {
      title: t('viewcredithistory.From'),
      dataIndex: 'fr_affiliate',
      sorter: (a, b) => a.fr_affiliate - b.fr_affiliate,
      render: (fr_affiliate) => <ReferenceAffiliatesListingField id={fr_affiliate} />,
    },
    {
      title: t('viewcredithistory.To'),
      dataIndex: 'to_affiliate',
      sorter: (a, b) => a.to_affiliate - b.to_affiliate,
      render: (to_affiliate) => <ReferenceAffiliatesListingField id={to_affiliate} />,
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      align: 'right',
      render: (amount) => <NumberListingField value={amount} />,
    },
    {
      title: t('common.Remark'),
      dataIndex: 'remark',
      sorter: (a, b) => a.remark.localeCompare(b.remark),
    },
    {
      title: t('common.Date'),
      dataIndex: 'date',
      align: 'center',
      sorter: (a, b) => a.date.localeCompare(b.date),
      render: (date) => <DateListingField date={date} />,
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={list && list.list}
      loading={isLoading}
      onChange={(pagination, filter, sorter) => {
        dispatch(paginationTabActions({ page: pagination.current, pageSize: pagination.pageSize }))
        dispatch(sortingTabAction({ field: sorter.field, name: sorter.column ? sorter.column.columnKey : null, order: sorter.order || null}))
      }}
      pagination={{
        current: pagination.currentPage,
        defaultPageSize: 10,
        showSizeChanger: true,
        total: list ? list.totalCount : 0,
        showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
      }}
      className="antd-report-table"
      bordered
    />
  );
};

const CreditHistoryFormModal = ({ open, onCancel, apiErrors, id, t }) => {
  const { data: record, isLoading: recordLoading } = useGetAffiliatesIDQuery({ id: id });

  return (
    record &&
    <Modal
      open={open}
      title={`${t("viewcredithistory.Credit History")} - ${record.name}`}
      cancelText={t("common.Close")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      style={{ top: 65 }}
      footer={null} // Remove the footer which includes the "OK" button
      width={800}
    >
      <CreditHistoryForm 
        id={id} 
        apiErrors={apiErrors}
        t={t}
      />
    </Modal>
  );
};

const AffiliatesCreditHistory = ({ id, t }) => {
    const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} >
        {t("viewcredithistory.Credit History")}
      </Button>
      <CreditHistoryFormModal
        open={open}
        onCancel={() => setOpen(false)}
        id={id && id}
        t={t}
      />
    </>
  );
};
export default AffiliatesCreditHistory;