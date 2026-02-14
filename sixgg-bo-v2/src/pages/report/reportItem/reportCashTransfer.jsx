import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetCashTransferSummaryQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import BankAccountListingField from '../../../ListingField/MerchantBankAccountListingField';
import { useTranslation } from 'react-i18next';

const ReportCashTransfer = ({ showToolbar=true, scroll }) => {
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
    } = useGetCashTransferSummaryQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const typesMap =  {
        "ic": t('report.Intercompany'),
        "co": t('report.Cash Out'),
        "ci": t('report.Cash In'),
    };

    const sheetname = [
        { name: 'cashtransfer', tableId: 'cashtransfer' },
    ]

    const columns = [
        {
            title: t('report.Cash Transfer'),
            children: [
                {
                    title: t('report.Type'),
                    align: 'left',
                    render: (record) => {
                        return (record.ttype ? typesMap[record.ttype] : "")
                    }
                },
                {
                    title: t('report.From Bank'),
                    align: 'left',
                    sorter: (a, b) => a.fr_bankacc_info?.length - b.fr_bankacc_info?.length,
                    render: (record) => {
                        const info = `${record.fr_bankacc_info}`;
                        const icon = `${record.fr_bankacc_icon}`;
                        if (record.fr_bankacc_info !== null && info && icon) {
                            return <BankAccountListingField info={info} icon={icon}/>;
                        } else {
                            return ""; 
                        }
                    }
                },
                {
                    title: t('report.To Bank'),
                    align: 'left',
                    sorter: (a, b) => a.to_bankacc_info?.length - b.to_bankacc_info?.length,
                    render: (record) => {
                        const info = `${record.to_bankacc_info}`
                        const icon = `${record.to_bankacc_icon}`
                        if (record.to_bankacc_info !== null && info && icon) {
                            return <BankAccountListingField info={info} icon={icon}/>;
                        } else {
                            return ""; 
                        }
                    }
                },
                {
                    title: t('report.Bank Remark'),
                    dataIndex: 'to_bankacc_remark',
                    align: 'center',
                    sorter: (a, b) => a.to_bankacc_remark?.length - b.to_bankacc_remark?.length,
                },
                {
                    title: t('report.Remark'),
                    dataIndex: 'remark',
                    align: 'center',
                    sorter: (a, b) => a.remark?.length - b.remark?.length,
            
                },
                {
                    title: t('report.Amount'),
                    dataIndex: 'amount',
                    sorter: (a, b) => Number(a.amount) - Number(b.amount),
                    align: 'right',
                    render: (amount) => (
                        <NumberListingField value={amount}/>
                    ),
                },
            ]
        }
    ];

    const filename = `${t("report.Cash Transport Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`
    
    return (
        <>
            {showToolbar && <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} refetch={() => refetch()}/>} 
            <Table
                rowKey="id"
                id={'cashtransfer'}
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
                    y: scroll && 'calc(100vh - 500px)',
                }}
            />
        </>
    );
}

export default ReportCashTransfer;