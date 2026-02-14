import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetSiteTransactionsDetailsQuery } from '../../../features/report/reportsApiSlices';
import PercentListingField from '../../../ListingField/PercentListingField';
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';

const ReportSiteTransactionsDetails = ({ fromDate, toDate, showToolbar=false }) => {
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
    }, [dispatch, fromDate, toDate]);

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
        refetch,
    } = useGetSiteTransactionsDetailsQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const columns = [
        {
          title: t('report.Date'),
          dataIndex: 'transaction_date',
          sorter: (a, b) => {
            const dateA = new Date(a.transaction_date);
            const dateB = new Date(b.transaction_date);
      
            if (!isNaN(dateA) && !isNaN(dateB)) {
              return dateA - dateB;
            }
      
            return 0;
          },
        },
        {
          title: t('report.Deposit'),
          dataIndex: 'total_deposit_amount',
          sorter: (a, b) => Number(a.total_deposit_amount) - Number(b.total_deposit_amount),
          align: 'right',
          render: (total_deposit_amount) => <NumberListingField value={total_deposit_amount} />
        },
        {
          title: t('report.Withdrawal'),
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
    ];
      

    const sheetname = [
        { name: 'sitestransactionsdetails', tableId: 'sitestransactionsdetails' },
    ]

    const filename = `${t("report.Site Transaction Details Report")}`

    return (
        <>
            { showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/> }
            <Table
                rowKey="id"
                id={'sitestransactionsdetails'}
                columns={columns}
                dataSource={list && list.list}
                loading={isFetching}
                // pagination={
                //     {
                //         defaultPageSize: 10,
                //         total: list ? list.totalCount : 0,
                //         showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                //     }
                // }
                className='antd-report-table'
                bordered
                // scroll={{
                //     y: 'calc(100vh - 200px)',
                // }}
                style={{ 
                    marginTop: '2px',
                    height: "375px"
                 }}
                 summary={(pageData) => {
                    let totalDeposit = 0;
                    let totalWithdrawal = 0;
                    let totalWinLose = 0;
                    let totalPercentage = 0; // Initialize totalPercentage to 0 initially

                    if (pageData.length > 0) { // Check if there is data in pageData
                        pageData.forEach(({ total_deposit_amount, total_withdrawal_amount }) => {
                            totalDeposit += Number(total_deposit_amount);
                            totalWithdrawal += Number(total_withdrawal_amount);
                            totalWinLose += Number(total_deposit_amount) + Number(total_withdrawal_amount);
                        });
                        totalPercentage = (totalWinLose / totalDeposit) * 100;
                    }
        
                    return (
                    <>
                        <Table.Summary.Row>
                            <Table.Summary.Cell colSpan={1} align='center'>{t("report.Total")}</Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalDeposit} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalWithdrawal} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='right'>
                                <NumberListingField value={totalWinLose} />
                            </Table.Summary.Cell>
                            <Table.Summary.Cell align='center'>
                                {isNaN(totalPercentage) ? "-" : <PercentListingField value={totalPercentage} />}
                            </Table.Summary.Cell>
                        </Table.Summary.Row>
                    </>
                    );
                }}
                 
            />
        </>
    );
}

export default ReportSiteTransactionsDetails;
