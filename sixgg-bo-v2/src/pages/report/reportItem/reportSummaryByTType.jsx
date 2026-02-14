import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetSummaryByTTypeQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportSummaryByTType = ({ showToolbar=true }) => {
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
    } = useGetSummaryByTTypeQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
            title: t('report.Summary By Transfer Type'),
            children: [
                {
                    title: t('report.Transfer Type'),
                    dataIndex: 'name',
                    render: (name) => t(`report.${name}`),
                },
                {
                    title: t('report.Total Transaction'),
                    dataIndex: 'total_transaction',
                    sorter: (a, b) => Number(a.total_transaction) - Number(b.total_transaction),
                    align: 'right',
                },
                {
                    title: t('report.Total Amount'),
                    dataIndex: 'total_amount',
                    sorter: (a, b) => Number(a.total_amount) - Number(b.total_amount),
                    align: 'right',
                    render: (total_amount) => <NumberListingField value={total_amount}/>
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'summarybyttype', tableId: 'summarybyttype' },
    ]

    const filename = `${t("report.Summary By Transfer Type Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id={"summarybyttype"}
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
                scroll={{
                    y: 'calc(115vh - 560px)',
                }}
                summary={(pageData) => {
                    let totalInOut = 0;
                    let totalTD = 0;
                    let totalTO = 0;
                
                    if (pageData.length > 0) {
                        pageData.forEach(({ code, total_amount }) => {
                            if (code === "TD") {
                                totalTD = total_amount;
                            } else if (code === "TO") {
                                totalTO = total_amount;
                            }
                        });
                
                        totalInOut = totalTD + totalTO;
                    }
            
                    return (
                        <>
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={1} align='left'>{t("report.Total In Out Games")}</Table.Summary.Cell>
                                <Table.Summary.Cell align='right'>
                                    -
                                </Table.Summary.Cell>
                                <Table.Summary.Cell align='right'>
                                    <NumberListingField value={totalInOut} />
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        </>
                    );
                }}
            />
        </>
    );
}

export default ReportSummaryByTType;