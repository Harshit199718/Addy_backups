import React, { useEffect, useState } from 'react';
import { Table, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { useGetPromotionAnalysisQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import ReportPromotionAnalysisTotalTransactionField from '../../../customField/ReportPromotionAnalysisTotalTransactionField';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import { useTranslation } from 'react-i18next';

const ReportPromotionAnalysis = ({ fromDate, toDate }) => {
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
    } = useGetPromotionAnalysisQuery({
        filters
    },{
        skip: !isReady,
        refetchOnFocus: true,
    });

    const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
    const columns = [
        {
            title: t('report.Sites'),
            dataIndex: 'site_name',
            align: 'left',
            sorter: (a, b) => {
                if (!a.site_name) return -1; 
                if (!b.site_name) return 1; 
                return a.site_name?.localeCompare(b.site_name);
            },
        },
        {
            title: t('report.Title'),
            dataIndex: 'promotion__title',
            sorter: (a, b) => {
                if (!a.title) return -1; 
                if (!b.title) return 1; 
                return a.title?.localeCompare(b.title);
            },
        },
        {
            title: t('report.Total User'),
            dataIndex: 'total_distinct_user_deposits',
            sorter: (a, b) => Number(a.total_distinct_user_deposits) - Number(b.total_distinct_user_deposits),
            align: 'right',
            render: (total_distinct_user_deposits) => (
                total_distinct_user_deposits
            ),
        },
        {
            title: t('report.Total Transaction'),
            dataIndex: 'total_cash_transaction',
            sorter: (a, b) => Number(a.total_cash_transaction) - Number(b.total_cash_transaction),
            align: 'right',
            render: (total_cash_transaction, row) => 
                <ReportPromotionAnalysisTotalTransactionField 
                    id={row.id} 
                    promotion_title={row.promotion__title} 
                    total_cash_transaction={total_cash_transaction} 
                    fromDate={fromDate} 
                    toDate={toDate}
                />
        },
        {
            title: t('report.Total Deposit'),
            dataIndex: 'total_deposit_cash',
            sorter: (a, b) => Number(a.total_deposit_cash) - Number(b.total_deposit_cash),
            align: 'right',
            render: (total_deposit_cash) => (
                <NumberListingField value={total_deposit_cash}/>
            ),
        },
        {
            title: t('report.Total Withdrawal'),
            dataIndex: 'total_withdrawal_cash',
            sorter: (a, b) => Number(a.total_withdrawal_cash) - Number(b.total_withdrawal_cash),
            align: 'right',
            render: (total_withdrawal_cash) => (
                <NumberListingField value={total_withdrawal_cash}/>
            ),
        },
        {
            title: t('report.Total Bonus'),
            dataIndex: 'total_bonus_cash',
            sorter: (a, b) => Number(a.total_bonus_cash) - Number(b.total_bonus_cash),
            align: 'right',
            render: (total_bonus_cash) => (
                <NumberListingField value={total_bonus_cash}/>
            ),
        },
        {
            title: t('report.Total Winloss'),
            align: 'right',
            render: (record) => {
                const totalWinloss = Number(record.total_deposit_cash) + Number(record.total_withdrawal_cash) - Number(record.total_bonus_cash)
                return <NumberListingField value={totalWinloss}/>
            },
            sorter: (a, b) => {
                const totalWinlossA = a.total_deposit_cash + a.total_withdrawal_cash - a.total_bonus_cash;
                const totalWinlossB = b.total_deposit_cash + b.total_withdrawal_cash - b.total_bonus_cash;
                return totalWinlossA - totalWinlossB;
              },
        },
    ];

    const filename = `${t("report.Promotion Analysis Report")}`
    const sheetname = [
        { name: 'promotionanaysis', tableId: 'promotionanaysis' },
    ]

    return (
    <>
        <Col xs={24} lg={24}>
            <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={list && list.list} refetch={() => refetch()} />
        </Col>
        <Table
            rowKey="id"
            id='promotionanaysisv2'
            columns={columns}
            dataSource={list && listWithId}
            loading={isFetching}
            pagination={{
            defaultPageSize: 20,
            total: list ? list.totalCount : 0,
            showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
        }}
            className='antd-report-table'
            bordered
            scroll={{
                x: 1500,
                y: 'calc(110vh - 500px)',
            }}
            summary={(pageData) => {
                let totalBonusCash = 0;
                let totalCashTransaction = 0; 
                let totalDepositCash = 0;
                let totalDistinctUserDeposits = 0;
                let totalWithdrawalCash = 0;
                let totalWinloss = 0;
                pageData.forEach(({ total_bonus_cash, total_cash_transaction, total_deposit_cash, total_distinct_user_deposits, total_withdrawal_cash }) => {
                    totalBonusCash += Number(total_bonus_cash);
                    totalCashTransaction += Number(total_cash_transaction);
                    totalDepositCash += Number(total_deposit_cash);
                    totalDistinctUserDeposits += Number(total_distinct_user_deposits);
                    totalWithdrawalCash += Number(total_withdrawal_cash);
                });

                totalWinloss = Number(totalDepositCash) + Number(totalWithdrawalCash) - Number(totalBonusCash)
 
                return (
                <>
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={2} align='center'>Total</Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            {totalDistinctUserDeposits}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            {totalCashTransaction}
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            <NumberListingField value={totalDepositCash} />
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            <NumberListingField value={totalWithdrawalCash} />
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            <NumberListingField value={totalBonusCash} />
                        </Table.Summary.Cell>
                        <Table.Summary.Cell align='right'>
                            <NumberListingField value={totalWinloss} />
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                </>
                );
            }}
        />
    </>
    )
}

export default ReportPromotionAnalysis;