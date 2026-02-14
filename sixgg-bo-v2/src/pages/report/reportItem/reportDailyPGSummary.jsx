import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetPaymentGatewaySummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportDailyPGSummary = ({ showToolbar=true }) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetFilters())
        dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }))
        dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }))
        setIsReady(true)
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
        refetch
    } = useGetPaymentGatewaySummaryQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
            title: t('report.Payment Gateway'),
            children: [
                {
                    title: t('report.Payment Gateway'),
                    dataIndex: 'paymentgateway',
                },
                {
                    title: t('report.Deposit Transaction'),
                    dataIndex: 'total_deposit_transaction',
                    sorter: (a, b) => Number(a.total_deposit_transaction) - Number(b.total_deposit_transaction),
                    align: 'right',
                },
                {
                    title: t('report.Deposit Amount'),
                    dataIndex: 'total_deposit_amount',
                    sorter: (a, b) => Number(a.total_deposit_amount) - Number(b.total_deposit_amount),
                    align: 'right',
                    render: (total_deposit_amount) => (
                        <NumberListingField value={total_deposit_amount}/>
                    ),
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'pgsummary', tableId: 'pgsummary' },
    ]

    const filename = `${t("report.Payment Gateway Summary Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id={"pgsummary"}
                columns={columns}
                dataSource={list && list.list}
                loading={isFetching}
                pagination={
                    showToolbar && {
                        defaultPageSize: 20,
                        total: list ? list.totalCount : 0,
                        showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                    }
                }
                className='antd-report-table'
                bordered
            />
        </>
    );
}

export default ReportDailyPGSummary;