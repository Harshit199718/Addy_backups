import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetDailyTurnoverQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportDailyTurnoverSummary = ({ showToolbar=true }) => {
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
    } = useGetDailyTurnoverQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });
    
    const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
    const columns = [
        {
            title: t('report.Total Turnover/Rollover'),
            children: [
                {
                    title: t('report.Name'),
                    dataIndex: 'name',
                },
                {
                    title: t('report.Total Turnover'),
                    dataIndex: 'total_turnover',
                    align: 'right',
                    sorter: (a, b) => Number(a.total_turnover) - Number(b.total_turnover),
                    render: (total_turnover) => <NumberListingField value={total_turnover}/>
                },
                {
                    title: t('report.Total Valid Bet'),
                    dataIndex: 'total_valid_bet',
                    sorter: (a, b) => Number(a.total_valid_bet) - Number(b.total_valid_bet),
                    align: 'right',
                    render: (total_valid_bet) => <NumberListingField value={total_valid_bet}/>
                },
                {
                    title: t('report.Total Payout'),
                    dataIndex: 'total_payout',
                    sorter: (a, b) => Number(a.total_payout) - Number(b.total_payout),
                    align: 'right',
                    render: (total_payout) => <NumberListingField value={total_payout}/>
                },
                {
                    title: t('report.Total Winlose'),
                    dataIndex: 'total_winlose',
                    sorter: (a, b) => Number(a.total_winlose) - Number(b.total_winlose),
                    align: 'right',
                    render: (total_winlose) => <NumberListingField value={total_winlose}/>
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'totalturnover', tableId: 'totalturnover' },
    ]

    const filename = `${t("report.Total Turnover Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id={'totalturnover'}
                columns={columns}
                dataSource={list && list.list && listWithId}
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
                summary={(pageData) => {
                    let totalTurnover = 0;
                    let totalValidBet = 0; 
                    let totalPayout = 0;
                    let totalWinlose = 0;
                    pageData.forEach(({ total_turnover, total_valid_bet, total_payout, total_winlose }) => {
                        totalTurnover += Number(total_turnover);
                        totalValidBet += Number(total_valid_bet);
                        totalPayout += Number(total_payout);
                        totalWinlose += Number(total_winlose);
                    });
        
                    return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell align='center'>Total</Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalTurnover} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalValidBet} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalPayout} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalWinlose} />
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
            />
        </>
    );
}

export default ReportDailyTurnoverSummary;