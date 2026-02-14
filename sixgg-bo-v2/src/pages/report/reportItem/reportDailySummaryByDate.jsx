import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetDailySummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportDailySummaryByDate = ({ scroll }) => {
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
    } = useGetDailySummaryQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
    const columns = [
        {
          title: t('report.Sites'),
          dataIndex: 'name',
          sorter: (a, b) => {
            if (!a.name) return -1;
            if (!b.name) return 1;
            return a.name?.localeCompare(b.name);
          },
          align: 'center',
        },
        {
          title: t('report.Date'),
          dataIndex: 'date',
          sorter: (a, b) => a.date.localeCompare(b.date),
          align: 'center'
        },
        {
          title: t('report.Active Depositor'),
          dataIndex: 'total_active',
          align: 'right',
          sorter: (a, b) => Number(a.total_active) - Number(b.total_active),
        },
        {
          title: t('report.Resit In'),
          dataIndex: 'resit_in',
          align: 'right',
          sorter: (a, b) => Number(a.resit_in) - Number(b.resit_in),
        },
        {
          title: t('report.Resit Out'),
          dataIndex: 'resit_out',
          align: 'right',
          sorter: (a, b) => Number(a.resit_out) - Number(b.resit_out),
        },
        {
          title: t('report.Total Deposit'),
          dataIndex: 'total_deposit',
          align: 'right',
          sorter: (a, b) => Number(a.total_deposit) - Number(b.total_deposit),
          render: (total_deposit) => (
            <NumberListingField value={total_deposit} />
          ),
        },
        {
          title: t('report.Total Withdrawal'),
          dataIndex: 'total_withdrawal',
          sorter: (a, b) => Number(a.total_withdrawal) - Number(b.total_withdrawal),
          align: 'right',
          render: (total_withdrawal) => (
            <NumberListingField value={total_withdrawal} />
          ),
        },
        {
          title: t('report.Total Forfeit'),
          dataIndex: 'total_forfeit',
          sorter: (a, b) => Number(a.total_forfeit) - Number(b.total_forfeit),
          align: 'right',
          render: (total_forfeit) => (
            <NumberListingField value={total_forfeit} />
          ),
        },
        {
          title: t('report.Total Bonus'),
          dataIndex: 'total_foc',
          sorter: (a, b) => Number(a.total_foc) - Number(b.total_foc),
          align: 'right',
          render: (total_foc) => (
            <NumberListingField value={total_foc} />
          ),
        },
    ];
      

    const sheetname = [
        { name: 'dailysummary', tableId: 'dailysummary' },
    ]

    const filename = `${t("report.Daily Summary Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
        <>
            <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={list && list.list && listWithId} refetch={() => refetch()}/> 
            <Table
                rowKey="id"
                id='dailysummary'
                columns={columns}
                dataSource={list && list.list && listWithId}
                loading={isFetching}
                pagination={{
                defaultPageSize: 20,
                total: list ? list.totalCount : 0,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
              }}
                className='antd-report-table'
                bordered
                scroll={{
                    y: 'calc(120vh - 560px)',
                }}
                summary={(pageData) => {
                    let totalActive = 0;
                    let totalResitIn = 0; 
                    let totalResitOut = 0;
                    let totalDeposit = 0;
                    let totalWithdrawal = 0;
                    let totalForfeit = 0;
                    let totalBonus = 0;
                    pageData.forEach(({ total_active, resit_in, resit_out, total_deposit, total_withdrawal, total_forfeit, total_foc }) => {
                        totalActive += Number(total_active);
                        totalResitIn += Number(resit_in);
                        totalResitOut += Number(resit_out);
                        totalDeposit += Number(total_deposit);
                        totalWithdrawal += Number(total_withdrawal);
                        totalForfeit += Number(total_forfeit);
                        totalBonus += Number(total_foc);
                    });
        
                    return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={2} align='center'>Total</Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                               {totalActive} 
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                {totalResitIn}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                {totalResitOut}
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalDeposit} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalWithdrawal} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalForfeit} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalBonus} />
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
            />
        </>
    );
}

export default ReportDailySummaryByDate;