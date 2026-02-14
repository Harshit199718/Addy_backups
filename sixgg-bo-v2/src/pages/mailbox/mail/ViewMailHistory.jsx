import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Table, List } from 'antd';
import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '../../../features/modalSlice';
import FormSpin from '../../../components/formSpin';
import { useGetMailListQuery } from '../../../features/mailbox/mailApiSlices';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField';
import { BooleanField } from '../../../ListingField/BooleanField';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import RecallMail from './RecallMail';

const MailHistoryForm = ({ id, t }) => {
  const { data: list, isLoading, isSuccess, isError, refetch } = useGetMailListQuery(
    {
      pagination: {
        startPageRow: 1,
        endPageRow: 10000000
      },
      filters: {
        mail_template_id: id,
      }
    },
    {
      refetchOnFocus: true,
    }
  );

  if (isLoading) {
    return <FormSpin loading={isLoading} />;
  }

  const columns = [
    {
      title: t('mailbox.Receiver'),
      dataIndex: 'receiver',
      sorter: (a, b) => a.receiver - b.receiver,
      render: (receiver) => <ReferencePlayerListingField filterProp={{ id: [receiver] }} />,
    },
    {
      title: t('mailbox.Is Read?'),
      dataIndex: 'is_read',
      align: 'center',
      columnKey: 'is_read',
      sorter: (a, b) => a.is_read - b.is_read,
      render: (is_read) => (
        <BooleanField boolean={is_read} />
      ),
    }, 
    {
      title: t('mailbox.Recalled?'),
      dataIndex: 'recalled',
      align: 'center',
      columnKey: 'recalled',
      sorter: (a, b) => a.recalled - b.recalled,
      render: (recalled) => (
        <BooleanField boolean={recalled} />
      ),
    }, 
    {
      title: t('mailbox.Send Date'),
      dataIndex: 'created_at',
      sorter: (a, b) =>  a.created_at.localeCompare(b.created_at),
      align: 'center',
      render: (created_at) => <DateTimeListingField dateTime={created_at} />,
    },

    {
      title: t('common.Action'),
      render: (record) => !record.recalled && <RecallMail record={record} t={t} />
    }
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={list && list.list}
      loading={isLoading}
      pagination={{
        defaultPageSize: 10,
        total: list ? list.totalCount : 0,
        showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
      }}
      className="antd-report-table"
      bordered
    />
  );
};

const MailHistoryFormModal = ({ open, onCancel, apiErrors, record, t }) => {
  return (
    record &&
    <Modal
      open={open}
      title={`${t("mailbox.Mail History")} - ${record.title}`}
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
      <MailHistoryForm id={record.id} apiErrors={apiErrors} t={t} />
    </Modal>
  );
};

const ViewMailHistory = ({ record, t }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
      if (open) {
        dispatch(openModal());
      } else {
        dispatch(closeModal());
      }
    }, [open, dispatch]);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} >
        {t("mailbox.View Mail")}
      </Button>
      <MailHistoryFormModal
        open={open}
        onCancel={() => setOpen(false)}
        record={record && record}
        t={t}
      />
    </>
  );
};
export default ViewMailHistory;