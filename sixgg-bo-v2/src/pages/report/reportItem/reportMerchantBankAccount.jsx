import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useSelector } from 'react-redux';
import { BooleanField } from '../../../ListingField/BooleanField';
import { useGetMerchantBankMeterQuery } from '../../../features/merchantbankaccounts/merchantBankAccountsApiSlices';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import BankAccountListingField from '../../../ListingField/MerchantBankAccountListingField';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'

const ReportMerchantBankAccount = ({ t }) => {
    const refetchBankMeter = useSelector(state => state.general.refetchBankMeter)
    const { startDate, endDate } = getTodayDate();
    const fromDate = formattedDate(startDate);
    const toDate = formattedDate(endDate);
    const sites = useSelector((state) => state.filters.sites);

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        refetch
    } = useGetMerchantBankMeterQuery({
        filters: {
            fromDate: fromDate,
            toDate: toDate,
            sites: sites
        }
    },{
        refetchOnFocus: true,
    });

    useEffect(() => {
        if(refetchBankMeter){
            refetch();
        }
    }, [refetchBankMeter]);

    const columns = [
        {
            title: t('common.Sites'),
            dataIndex: 'sites',
        },
        {
            title: t('bank.Bank'),
            sorter: (a, b) => a.bank_name.length - b.bank_name.length,
            render: (record) => {
                const apiUrl = import.meta.env.VITE_APP_API_URL;
                const apiMediaURL = apiUrl.slice(0, -4) + 'media/';
                const info = `${record.bank_name}  -  ${record.merchant_name} (${record.acc_number})`
                const icon = `${apiMediaURL}${record.icon}`
                return <BankAccountListingField info={info} icon={icon}/>
            }
        },
        {
            title: t('report.Opening Balance'),
            dataIndex: 'today_opening_balance',
            sorter: (a, b) => Number(a.today_closing_balance) - Number(b.today_closing_balance),
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
            title: t('report.Cash Transfer'),
            dataIndex: 'today_cashtransfer',
            sorter: (a, b) => Number(a.today_cashtransfer) - Number(b.today_cashtransfer),
            align: 'right',
            render: (today_cashtransfer) => (
                <NumberListingField value={today_cashtransfer}/>
            ),
        },
        {
            title: t('report.Total'),
            dataIndex: 'total',
            sorter: (a, b) => Number(a.total) - Number(b.total),
            align: 'right',
            render: (total) => (
                <NumberListingField value={total}/>
            ),
        },
        {
            title: t('report.Unclaims'),
            dataIndex: 'today_unclaims',
            sorter: (a, b) => Number(a.today_closing_balance) - Number(b.today_closing_balance),
            align: 'right',
            render: (today_unclaims) => (
                <NumberListingField value={today_unclaims}/>
            ),
        },
        {
            title: t('report.Active / Inactive'),
            dataIndex: 'bank_status',
            align: 'center',
            render: (bank_status) => (
                <BooleanField boolean={bank_status} />
            ),
        },
    ];

    return (
        <>
        <Table
            rowKey="id"
            id='merchantbankaccount'
            columns={columns}
            dataSource={list && list.list}
            loading={isLoading}
            pagination={{
            defaultPageSize: 20,
            total: list ? list.totalCount : 0,
            showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
        }}
            className='antd-report-table'
            bordered
            summary={(pageData) => {
                let totalOpeningBalance = 0;
                let totalClosingBalance = 0;
                let totalCashTransfer = 0;
                let subTotal = 0;
                let totalUnclaims = 0;
                pageData.forEach(({ today_opening_balance, today_closing_balance, today_cashtransfer, total, today_unclaims }) => {
                    totalOpeningBalance += Number(today_opening_balance);
                    totalClosingBalance += Number(today_closing_balance);
                    totalCashTransfer += Number(today_cashtransfer);
                    subTotal += Number(total);
                    totalUnclaims += Number(today_unclaims);
                });
                return (
                <>
                    <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={2} align='center'>{t("report.Total")}</Table.Summary.Cell>
                    <Table.Summary.Cell align='right'>
                        <NumberListingField value={totalOpeningBalance} />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align='right'>
                        <NumberListingField value={totalClosingBalance} />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align='right'>
                        <NumberListingField value={totalCashTransfer} />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align='right'>
                        <NumberListingField value={subTotal} />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align='right'>
                        <NumberListingField value={totalUnclaims} />
                    </Table.Summary.Cell>
                    <Table.Summary.Cell align='right' />
                    </Table.Summary.Row>
                </>
                );
            }}
        />
        </>
    )
}

export default ReportMerchantBankAccount;