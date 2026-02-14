import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import './report.css';
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetBalanceSummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportBalanceSummaryTable = ({ showToolbar = true }) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetFilters());
        dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }));
        dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }));
        setIsReady(true);
    }, [dispatch]);

    const { 
        data: list, 
        isLoading, 
        isFetching, 
        refetch 
    } = useGetBalanceSummaryQuery({
        filters
    }, {
        refetchOnFocus: true,
        skip: !isReady,
    });

    const generateColumns = (data) => {
        if (!data || !data.length) return [];
    
        const dynamicColumns = Object.keys(data[0]).map(key => ({
            title: key.replace(/_/g, ' '),  // Replace underscores with spaces
            dataIndex: key,
            sorter: (a, b) => Number(a[key]) - Number(b[key]),
            align: 'right'
        }));
    
        return [
            {
                title: 'Sites',
                dataIndex: 'sites',
            },
            {
                title: 'Operators',
                render: (record) => record.full_name !== '' ? record.username : record.full_name
            },
            ...dynamicColumns.filter(column => column.dataIndex !== 'sites' && column.dataIndex !== 'operators')
        ];
    };
    
    const columns = generateColumns(list?.list);
    

    const sheetname = [{ name: 'balancesummary', tableId: 'balancesummary' }];
    const filename = 'Balance Summary Report';

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={refetch} />}
            <Table
                rowKey="id"
                id="balancesummary"
                columns={columns}
                dataSource={list?.list}
                loading={isFetching}
                pagination={
                    showToolbar && {
                        defaultPageSize: 20,
                        total: list ? list.totalCount : 0,
                        showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')} ${t('paginationspecialchar.of')} ${total} ${t('paginationspecialchar.items')}`
                    }
                }
                className="antd-report-table"
                bordered
            />
        </>
    );
};

export default ReportBalanceSummaryTable;
