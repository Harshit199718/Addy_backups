import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetReportOperatorWalletQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportOperatorWallet = ({ showToolbar=true }) => {
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
    } = useGetReportOperatorWalletQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
            title: t('report.Operator Wallet'),
            children: [
                {
                    title: t('common.Sites'),
                    dataIndex: 'sites',
                },
                {
                    title: t('report.Operators'),
                    render: (record) => {
                        return record.full_name !== '' ? record.username : record.full_name
                    }
                },
                {
                    title: t('report.Opening Balance'),
                    dataIndex: 'today_opening_balance',
                    sorter: (a, b) => Number(a.today_opening_balance) - Number(b.today_opening_balance),
                    align: 'right',
                    render: (today_opening_balance) => (
                        <NumberListingField value={today_opening_balance}/>
                    ),
                },
                {
                    title: t('report.Closing Balance'),
                    dataIndex: 'today_closing_balance',
                    sorter: (a, b) => Number(a.today_closing_balance) - Number(b.today_closing_balance),
                    align: 'right',
                    render: (today_closing_balance) => (
                        <NumberListingField value={today_closing_balance}/>
                    ),
                },
                {
                    title: t('report.Credit Transfer'),
                    dataIndex: 'today_transfer_credit',
                    sorter: (a, b) => Number(a.today_transfer_credit) - Number(b.today_transfer_credit),
                    align: 'right',
                    render: (today_transfer_credit) => (
                        <NumberListingField value={today_transfer_credit}/>
                    ),
                },
                {
                    title: t('report.Bonus (-)'),
                    dataIndex: 'today_foc',
                    sorter: (a, b) => Number(a.today_foc) - Number(b.today_foc),
                    align: 'right',
                    render: (today_foc) => (
                        <NumberListingField value={today_foc}/>
                    ),
                },
                {
                    title: t('report.Forfeit (+)'),
                    dataIndex: 'today_forfeit',
                    sorter: (a, b) => Number(a.today_forfeit) - Number(b.today_forfeit),
                    align: 'right',
                    render: (today_forfeit) => (
                        <NumberListingField value={today_forfeit}/>
                    ),
                },
                {
                    title: t('report.Sales'),
                    dataIndex: 'total',
                    sorter: (a, b) => Number(a.total) - Number(b.total),
                    align: 'right',
                    render: (total) => (
                        <NumberListingField value={total}/>
                    ),
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'operatorwallet', tableId: 'operatorwallet' },
    ]

    const filename = t(`report.Operator Wallet Report`)

    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id='operatorwallet'
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
                summary={(pageData) => {
                    let totalOpeningBalance = 0;
                    let totalClosingBalance = 0; 
                    let totalTransferCredit = 0;
                    let totalBonus = 0;
                    let totalForfeit = 0;
                    let totalSales =0;
                    pageData.forEach(({ today_opening_balance, today_closing_balance, today_transfer_credit, today_foc, today_forfeit, total }) => {
                        totalOpeningBalance += Number(today_opening_balance);
                        totalClosingBalance += Number(today_closing_balance);
                        totalTransferCredit += Number(today_transfer_credit);
                        totalBonus += Number(today_foc);
                        totalForfeit += Number(today_forfeit);
                        totalSales += Number(total)
                    });
        
                    return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} align='center'>Total</Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalOpeningBalance} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalClosingBalance} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalTransferCredit} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalBonus} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalForfeit} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalSales} />
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
            />
        </>
    );
}

export default ReportOperatorWallet;