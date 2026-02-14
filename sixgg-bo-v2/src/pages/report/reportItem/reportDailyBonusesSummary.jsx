import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetBonusSummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportDailyBonusesSummary = ({ showToolbar=true }) => {
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
    } = useGetBonusSummaryQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
            title: t('report.Bonuses Summary'),
            children: [
                {
                    title: t('report.Type'),
                    dataIndex: 'ttype_display',
                    render: (ttype_display) => t(`report.${ttype_display}`),
                },
                {
                    title: t('report.Transaction'),
                    dataIndex: 'total_transaction',
                    sorter: (a, b) => Number(a.total_transaction) - Number(b.total_transaction),
                    align: 'right',
                },
                {
                    title: t('report.Amount'),
                    dataIndex: 'total_amount',
                    sorter: (a, b) => Number(a.total_amount) - Number(b.total_amount),
                    align: 'right',
                    render: (total_amount) => (
                        <NumberListingField value={total_amount}/>
                    ),
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'bonussummary', tableId: 'bonussummary' },
    ]

    const filename = `${t("report.Bonus Summary Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id={'bonussummary'}
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

export default ReportDailyBonusesSummary;