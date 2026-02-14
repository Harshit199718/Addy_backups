import { Modal, Table } from "antd"
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import "leaflet/dist/leaflet.css"
import { useLazyGetDepositListQuery } from "../features/transaction/deposit/depositApiSlices"
import ReferencePlayerListingField from "../ListingField/ReferencePlayerListingField"
import NumberListingField from "../ListingField/NumberListingField"
import BankAccountListingField from "../ListingField/MerchantBankAccountListingField"
import DateListingField from "../ListingField/DateListingField"
import { closeModal, openModal } from "../features/modalSlice";
import ImageListingField from "../ListingField/ImageListingField";
import { Icon } from "@iconify/react/dist/iconify.js";
import ReportToolBar from "../pages/report/reportToolBar";
import { useTranslation } from "react-i18next";

const ReportPromotionAnalysisTotalTransactionField = ({ id, promotion_title, total_cash_transaction, fromDate, toDate}) => {
  const { t } = useTranslation();
  const filters = useSelector((state) => state.filters.filters);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [getDepositData, { isFetching, data }, isError] = useLazyGetDepositListQuery()
  useEffect(() => {
    if (open && open) {
      dispatch(openModal());
      getDepositData({
        id: id,
        data: data,
        pagination: {
          startPageRow: 0,
          endPageRow: 500,
        },
        filters: {
          promotion: id,
          fromDate: fromDate,
          toDate: toDate,
          state: 'approved',
        },
      });
    } else if (isError) {
        dispatch(closeModal());
      }
  }, [open, getDepositData, open]);

  const sheetname = [
    { name: 'depositpromotion', tableId: 'depositpromotion' },
  ]
  const filename = `${promotion_title} - ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

  const columns = [
    {
      title: t('common.Tx ID'),
      dataIndex: 'txid',
      sorter: (a, b) => {
        if (!a.txid) return -1; 
        if (!b.txid) return 1; 
        return a.txid?.localeCompare(b.txid);
      },
    },
    {
      title: t('common.Player'),
      dataIndex: 'player',
      key: 'player',
      fixed: 'left',
      render: (player) => (
        <ReferencePlayerListingField filterProp={{id: [player]}} />
      ),
    },
    {
      title: t('common.Bal Before'),
      dataIndex: 'bal_bf',
      align: 'right',
      sorter: (a, b) => Number(a.bal_bf) - Number(b.bal_bf),
      render: (bal_bf) => <NumberListingField value={bal_bf} />,
    },
    {
      title: t('common.Amount'),
      dataIndex: 'amount',
      align: 'right',
      sorter: (a, b) => Number(a.amount) - Number(b.amount),
      render: (amount) => <NumberListingField value={amount} />,
    },
    {
      title: t('common.Bal After'),
      dataIndex: 'bal_af',
      align: 'right',
      sorter: (a, b) => Number(a.bal_af) - Number(b.bal_af),
      render: (bal_af) => <NumberListingField value={bal_af} />,
    },
    {
      title: t('common.Transfer Type'),
      dataIndex: 'ttype_display',
      align: 'center',
      sorter: (a, b) => {
        if (!a.ttype_display) return -1; 
        if (!b.txttype_displayid) return 1; 
        return a.ttype_display?.localeCompare(b.ttype_display);
      }
    },
    {
      title: t('common.Merchant Bank Account'),
      align: 'left',
      sorter: (a, b) => {
        if (!a.merchantbankaccount_info) return -1; 
        if (!b.merchantbankaccount_info) return 1; 
        return a.merchantbankaccount_info?.localeCompare(b.merchantbankaccount_info);
      },
      render: (record) => {
        const info = `${record.merchantbankaccount_info}`
        const icon = `${record.merchantbankaccount_icon}`
        if (record.merchantbankaccount_info !== null && info && icon) {
            return <BankAccountListingField info={info} icon={icon}/>;
        } else {
            return ""; 
        }
      }
    },
    {
      title: t('common.Proof'),
      dataIndex: 'proof',
      render: (proof) => <ImageListingField image={proof} />
    },
    {
      title: t('common.Updated At'),
      dataIndex: 'updated_at',
      align: 'center',
      sorter: (a, b) => {
        const dateA = new Date(a.updated_at);
        const dateB = new Date(b.updated_at);
  
        if (!isNaN(dateA) && !isNaN(dateB)) {
          return dateA - dateB;
        }
  
        return 0;
      },
      render: (updated_at) => <DateListingField date={updated_at} />,
    },
    {
      title: t('common.Approved By'),
      dataIndex: 'approver_name',
      align: 'center',
    },
  ];
  
  return (
      <>
      {
        total_cash_transaction ?
        <span
          onClick={() => setOpen(true)}
          style={{
              display: 'inline-flex',
              alignItems: 'center',
              whiteSpace: 'nowrap', // Prevent text wrapping
              cursor: 'pointer'
          }}
          >
          <Icon icon="ph:list-magnifying-glass" width="1.2rem" height="1.2rem" style={{ marginRight: '0.5rem' }} /> 
          {total_cash_transaction} 
        </span>
        :
        <span></span>
      }
      <Modal
        open={open}
        title={`Deposit for promotion - ${promotion_title}`}
        footer={[]}
        onCancel={() => {
            setOpen(false)
        }}
        destroyOnClose
        id={id && id}
        width={1500}
      >
        <ReportToolBar refetch={false} sheetname={sheetname} filename={filename} toolbarOption="exportonly" />
        <Table
          rowKey="id"
          id="depositpromotion"
          columns={columns}
          dataSource={data?.list || []}
          loading={isFetching}
          scroll={{
            x: 1000,
            y: 'calc(110vh - 500px)',
          }}
          pagination={{
              defaultPageSize: 20,
              showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
            }}
          className="antd-report-table"
          bordered
        />
      </Modal>
    </>
  )
}

export default ReportPromotionAnalysisTotalTransactionField;