import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetSiteTransactionsQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import PercentListingField from '../../../ListingField/PercentListingField';
import ReportSiteTransactionsDetails from './reportSiteTransactionsDetails';
import { useTranslation } from 'react-i18next';

const ReportSiteTransactions = ({ }) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const sheetname = [
        { name: 'sitetransactions', tableId: 'sitetransactions' },
        { name: 'sitestransactionsdetails', tableId: 'sitestransactionsdetails' },
      ]

    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const [filterType, setFilterType] = useState(''); // Default filter type is 'day'
    const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);

    useEffect(() => {
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
    } = useGetSiteTransactionsQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const filename = `${t("report.Site Transaction Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    const columns = [
        {
          title: t('report.Sites Transaction'),
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
              render: (total_deposit_amount) => <NumberListingField value={total_deposit_amount} />
            },
            {
              title: t('report.Total Withdrawal Amount'),
              dataIndex: 'total_withdrawal_amount',
              align: 'right',
              sorter: (a, b) => Number(a.total_withdrawal_amount) - Number(b.total_withdrawal_amount),
              render: (total_withdrawal_amount) => <NumberListingField value={total_withdrawal_amount} />
            },
            {
              title: t('report.Win Lose'),
              dataIndex: 'winlose',
              sorter: (a, b) => Number(a.winlose) - Number(b.winlose),
              align: 'right',
              render: (winlose) => <NumberListingField value={winlose} />
            },
            {
              title: t('report.Percentage'),
              dataIndex: 'percentage',
              sorter: (a, b) => Number(a.percentage) - Number(b.percentage),
              align: 'center',
              render: (percentage) => <PercentListingField value={percentage} />
            },
          ]
        }
    ];
      
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
                <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/> 
            </Col>
        </Row>
            <Table
                rowKey="id"
                id={'sitetransactions'}
                columns={columns}
                dataSource={list && list.list}
                loading={isFetching}
                pagination={
                  {
                    defaultPageSize: 5,
                    total: list ? list.totalCount : 0,
                    showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                  }
                }
                className='antd-report-table'
                bordered
                scroll={{
                    y: 'calc(100vh - 300px)',
                }}
            />
            <ReportSiteTransactionsDetails showToolbar={false} />
        </>
    );
}

export default ReportSiteTransactions;
