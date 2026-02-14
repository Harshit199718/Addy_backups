import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, List } from 'antd';
import { useGetCreditHistoryListQuery, useGetSupportsIDQuery } from '../../../features/support/supportsApiSlices';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../features/modalSlice';
import FormSpin from '../../../components/formSpin';
import DateListingField from '../../../ListingField/DateListingField'
import NumberListingField from '../../../ListingField/NumberListingField';
import ReferenceSupportListingField from '../../../ListingField/ReferenceSupportsListingField';

const CreditHistoryForm = ({ id, t }) => {
  const dispatch = useDispatch();
  const { data: list, isLoading, isSuccess, isError, refetch } = useGetCreditHistoryListQuery(
    {
      id: id,
    },
    {
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (isSuccess) {
      dispatch(openModal());
    } else if (isError) {
      dispatch(closeModal());
    }
  }, [isSuccess, isError, dispatch]);

  if (isLoading) {
    return <FormSpin loading={isLoading} />;
  }

  const columns = [
    {
      title: t('common.From'),
      dataIndex: 'fr_user',
      sorter: (a, b) => a.fr_user - b.fr_user,
      render: (fr_user) => <ReferenceSupportListingField id={fr_user} />,
    },
    {
      title: t('common.To'),
      dataIndex: 'to_user',
      sorter: (a, b) => a.to_user - b.to_user,
      render: (to_user) => <ReferenceSupportListingField id={to_user} />,
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
      sorter: (a, b) => a.remark.length - b.remark.length,
    },
    {
      title: t('common.Date'),
      dataIndex: 'date',
      align: 'center',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      render: (date) => <DateListingField date={date} />,
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={list && list.list}
      loading={isLoading}
      pagination={{
        defaultPageSize: 20,
        total: list ? list.totalCount : 0,
        showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
      }}
      className="antd-report-table"
      bordered
    />
  );
};

const CreditHistoryFormModal = ({ open, onCancel, apiErrors, id, t }) => {
  const dispatch = useDispatch();
  const { data: record, isLoading: recordLoading } = useGetSupportsIDQuery({ id: id });

    useEffect(() => {
      if (record && record.username) {
          dispatch(openModal({ username: record.username }));
      }
      return () => {
          dispatch(closeModal());
      };
  }, [record]);

  return (
    record &&
    <Modal
      open={open}
      title={`${t("viewcredithistory.Credit History")} - ${record.username}`}
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
      <CreditHistoryForm id={id} apiErrors={apiErrors} t={t} />
    </Modal>
  );
};

const CreditHistory = ({ id, t }) => {
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
export default CreditHistory;