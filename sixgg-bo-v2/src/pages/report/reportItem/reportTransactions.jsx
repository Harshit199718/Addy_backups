import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetReportTransactionsQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportTransactions = ({}) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const [filterType, setFilterType] = useState(''); // Default filter type is 'day'

    useEffect(() => {
        const { startDate, endDate, filteredDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetFilters());
        dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }));
        dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }));
        setIsReady(true);
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
        refetch
    } = useGetReportTransactionsQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
          title: t('report.Transaction Report'),
          children: [
            {
              title: t('report.Sites'),
              dataIndex: 'site_name',
              sorter: (a, b) => {
                if (!a.site_name) return -1;
                if (!b.site_name) return 1;
                return a.site_name?.localeCompare(b.site_name);
              },
            },
            {
              title: t('report.Total Deposit Amount'),
              dataIndex: 'total_deposit_amount',
              sorter: (a, b) => Number(a.total_deposit_amount) - Number(b.total_deposit_amount),
              align: 'right',
              render: (total_deposit_amount) => (
                <NumberListingField value={total_deposit_amount}/>
              ),
            },
            {
              title: t('report.Total Deposit Count'),
              dataIndex: 'total_deposit_count',
              align: 'right',
              sorter: (a, b) => Number(a.total_deposit_count) - Number(b.total_deposit_count),
            },
            {
              title: t('report.Total Withdrawal Amount'),
              dataIndex: 'total_withdrawal_amount',
              sorter: (a, b) => Number(a.total_withdrawal_amount) - Number(b.total_withdrawal_amount),
              align: 'right',
              render: (total_withdrawal_amount) => (
                <NumberListingField value={total_withdrawal_amount}/>
              ),
            },
            {
              title: t('report.Total Withdrawal Count'),
              dataIndex: 'total_withdrawal_count',
              align: 'right',
              sorter: (a, b) => Number(a.total_withdrawal_count) - Number(b.total_withdrawal_count),
            },
            {
              title: t('report.Transaction Date'),
              dataIndex: 'transaction_date',
              sorter: (a, b) => a.transaction_date.localeCompare(b.transaction_date),
              align: 'center',
            },
          ]
        }
      ];
      
    const filename = `${t("report.Transaction Report")}`
    const sheetname = [
        { name: 'transaction', tableId: 'transaction' },
    ]

    return (
        <>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={8} xl={5} xxl={4}>
              <Radio.Group defaultValue={1} buttonStyle="solid">
                  <Radio.Button value={1} onClick={() => dispatch(filtersActions({ value: "day", type: 'input', event: 'display' }))} type={filterType === 'day' ? 'primary' : 'default'}>{t("report.Day")}</Radio.Button>
                  <Radio.Button value={2} onClick={() => dispatch(filtersActions({ value: "month", type: 'input', event: 'display' }))} type={filterType === 'month' ? 'primary' : 'default'}>{t("report.Month")}</Radio.Button>
                  <Radio.Button value={3} onClick={() => dispatch(filtersActions({ value: "year", type: 'input', event: 'display' }))} type={filterType === 'year' ? 'primary' : 'default'}>{t("report.Year")}</Radio.Button>
              </Radio.Group>
            </Col>
            <Col xs={24} sm={24} md={24} lg={16} xl={19} xxl={20}>
              <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={list && list.list} refetch={() => refetch()}/> 
            </Col>
          </Row>
          <Table
            rowKey="id"
            id='transaction'
            columns={columns}
            dataSource={list && list.list}
            loading={isFetching}
            pagination={
              {
                defaultPageSize: 20,
                total: list ? list.totalCount : 0,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
              }
            }
            className='antd-report-table'
            bordered
            scroll={{
                y: 'calc(110vh - 560px)',
            }}
          />
        </>
    );
}

export default ReportTransactions;
