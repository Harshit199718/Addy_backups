import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import './report.css';
import { useGetDailyTotalSalesSummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import NumberListingField from '../../../ListingField/NumberListingField';
import { useTranslation } from 'react-i18next';

const ReportDailyTotalSalesSummary = ({ showToolbar=true }) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);

    const typesMap = {
        total_deposit: t('report.Total Deposit'),
        total_withdrawal: t('report.Total Withdrawal'),
        total_forfeit: t('report.Total Forfeit'),
        total_foc: t('report.Total Bonus'),
        total_agent_deposit: t('report.Total Agent Deposit'),
        total_agent_penalty: t('report.Total Agent Penalty'),
        total_agent_foc: t('report.Total Agent FOC'),
    };

    useEffect(() => {
        const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetFilters());
        dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }));
        dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }));
        dispatch(filtersActions({ value: 1, type: 'input', event: 'simple' }));
        setIsReady(true);
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isFetching,
        refetch
    } = useGetDailyTotalSalesSummaryQuery({
        filters
    },{
        skip: !isReady,
        refetchOnFocus: true,
    });
    
    const formattedData = list?.list &&
    Object.keys(list?.list[0])
      .filter((key) => key in typesMap) // Filter keys that are in typesMap
      .map((key, DailyTotalSalesSummary) => ({
        key: DailyTotalSalesSummary, // Add a unique key based on index
        type: typesMap[key],
        value: list?.list[0][key],
      }));
    
    const columns = [
        {
            title: t('report.Total Sales'),
            key: 'type',
            colSpan: 2,
            render: (record) => {
                return record.type;
            },
        },
        {
            key: 'value',
            colSpan: 0,
            align: 'right',
            render: (record) => {
                return <NumberListingField value={Number(record.value)} />;
            },
        },
    ];
    const sheetname = [
        { name: 'totalsales', tableId: 'totalsales' },
    ]

    const filename = `${t("report.Total Sales Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            { showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/> }
            <Table 
                id={'totalsales'}
                columns={columns}
                dataSource={formattedData}
                loading={isFetching}
                pagination={
                    showToolbar &&
                    {
                    defaultPageSize: 20,
                    showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                }
                }
                className='antd-report-table'
                bordered
            />
        </>
    );
};

export default ReportDailyTotalSalesSummary;
