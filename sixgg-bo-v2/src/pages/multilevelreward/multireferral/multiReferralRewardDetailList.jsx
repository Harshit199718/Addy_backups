import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from '../../../features/modalSlice';
import FormSpin from '../../../components/formSpin';
import DateListingField from '../../../ListingField/DateListingField'
import NumberListingField from '../../../ListingField/NumberListingField';
import CustomOptionField from '../../../ListingField/CustomOptionField';
import { creditType } from '../../../customField/customOption';
import { useGetRewardsListQuery } from '../../../features/rewards/rewardsApiSlices';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField'
import { paginationActions, sortingAction } from '../../../features/filtersSlice';
import PermissionsAuth from '../../../components/permissionAuth';

const MultiReferralRewardDetailForm = ({ record, t }) => {
  const dispatch = useDispatch();
  const pagination = useSelector((state) => state.filters.pagination);
  const filters = useSelector((state) => state.filters.filters);
  const { data: list, isLoading, isSuccess, isError } = useGetRewardsListQuery(
    {
      pagination, 
      filters: { ...filters, viewDate: record.from_date, ttype: "RF" }, // Add viewDate and ttype filters
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
      title: t('common.Player'),
      dataIndex: 'user',
      sorter: (a, b) => a.user - b.user,
      render: (user) => (<ReferencePlayerListingField filterProp={{id: [user]}} />),
    },
    {
      title: t('common.From Date'),
      dataIndex: 'from_date',
      sorter: (a, b) => a.from_date - b.from_date,
      render: (from_date) => <DateListingField date={from_date} />,
    },
    {
      title: t('common.To Date'),
      dataIndex: 'to_date',
      sorter: (a, b) => a.to_date - b.to_date,
      render: (to_date) => <DateListingField date={to_date} />,
    },
    {
      title: t('common.Direct Player Total Deposit'),
      dataIndex: 'direct_player_totaldeposit',
      sorter: (a, b) => Number(a.direct_player_totaldeposit) - Number(b.direct_player_totaldeposit),
      align: 'right',
      render: (direct_player_totaldeposit) => <NumberListingField value={direct_player_totaldeposit} />,
    },
    {
      title: t('common.Direct Player Total Withdrawal'),
      dataIndex: 'direct_player_totalwithdrawal',
      sorter: (a, b) => Number(a.direct_player_totalwithdrawal) - Number(b.direct_player_totalwithdrawal),
      align: 'right',
      render: (direct_player_totalwithdrawal) => <NumberListingField value={direct_player_totalwithdrawal} />,
    },
    {
      title: t('common.Net Amount'),
      dataIndex: 'calculated_amount',
      sorter: (a, b) => Number(a.calculated_amount) - Number(b.calculated_amount),
      align: 'right',
      render: (calculated_amount) => <NumberListingField value={calculated_amount} />,
    },
    {
      title: t('common.Reward Amount'),
      dataIndex: 'reward_amount',
      sorter: (a, b) => Number(a.reward_amount) - Number(b.reward_amount),
      align: 'right',
      render: (reward_amount) => <NumberListingField value={reward_amount} />,
    },
    {
      title: t('common.Type'),
      dataIndex: 'credit_type',
      sorter: (a, b) => a.credit_type.length - b.credit_type.length,
      render: (credit_type) => <CustomOptionField option={creditType(t)} mappingText={credit_type} />
    },
    {
      title: t('common.State'),
      dataIndex: 'state',
      sorter: (a, b) => a.state.length - b.state.length,
      render: (state) => t(`common.${state}`),
    },
  ];

  return (
    PermissionsAuth.checkPermissions('list', 'view_multilevelreward',
    <div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={list && list.list}
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
        className="antd-report-table"
        bordered
      />
    </div>
    )
  );
};

const MutliReferralRewardDetailFormModal = ({ open, onCancel, apiErrors, id, record, t }) => {

  return (
    record &&
    <Modal
      open={open}
      title={`${t("common.Referral Reward")} ${record.from_date} - ${record.to_date}`}
      cancelText={t("common.Close")}
      okButtonProps={{
        autoFocus: true,
      }}
      onCancel={onCancel}
      destroyOnClose
      style={{ top: 65 }}
      footer={null} // Remove the footer which includes the "OK" button
      width={1400}
    >
      <MultiReferralRewardDetailForm id={id} apiErrors={apiErrors} record={record} t={t} />
    </Modal>
  );
};

const MultiReferralRewardDetail = ({ record, t }) => {
    const dispatch = useDispatch(); 
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (record && record) {
          dispatch(openModal());
      }
      return () => {
          dispatch(closeModal());
      };
  }, [record]);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)} >
        {t("common.View Detail")}
      </Button>
      <MutliReferralRewardDetailFormModal
        open={open}
        onCancel={() => setOpen(false)}
        record={record}
        t={t}
      />
    </>
  );
};
export default MultiReferralRewardDetail;