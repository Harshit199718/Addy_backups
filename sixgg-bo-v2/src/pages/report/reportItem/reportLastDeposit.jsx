import React, { useEffect, useState } from 'react';
import { Table, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetLastDepositQuery } from '../../../features/report/reportsApiSlices';
import DateTimeListingField from '../../../ListingField/DateTimeListingField'
import ReportToolBar from '../reportToolBar';
import { useTranslation } from 'react-i18next';
import { formattedDate, getTodayDate } from '../../../components/convertDate';

const ReportLastDeposit = ({}) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetFilters());
        dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }));
        dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }));
        setIsReady(true);
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
    } = useGetLastDepositQuery({
        filters
    },{
        skip: !isReady,
    });

    const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
    const columns = [
        {
            title: t('report.Sites'),
            dataIndex: 'site_name',
            sorter: (a, b) => {
                if (!a.site_name) return -1;
                if (!b.site_name) return 1;
                return a.site_name?.localeCompare(b.site_name);
            },
        },
        {
            title: t('report.Name'),
            dataIndex: 'name',
            sorter: (a, b) => {
                if (!a.name) return -1;
                if (!b.name) return 1;
                return a.name?.localeCompare(b.name);
            },
        },
        {
            title: t('report.Username'),
            dataIndex: 'username',
            sorter: (a, b) => {
                if (!a.username) return -1;
                if (!b.username) return 1;
                return a.username?.localeCompare(b.username);
            },
        },
        {
            title: t('report.Last Login'),
            dataIndex: 'last_login',
            sorter: (a, b) => {
                const dateA = new Date(a.last_login);
                const dateB = new Date(b.last_login);

                if (!isNaN(dateA) && !isNaN(dateB)) {
                    return dateA - dateB;
                }

                return 0;
            },
            align: 'center',
            render: (last_login) => (
                <DateTimeListingField dateTime={last_login} />
            ),
        },
        {
            title: t('report.Phone Number'),
            dataIndex: 'mobile',
            sorter: (a, b) => {
                if (!a.mobile) return -1;
                if (!b.mobile) return 1;
                return a.mobile?.localeCompare(b.mobile);
            },
        },
        {
            title: t('report.Last Deposit Date'),
            dataIndex: 'latest_deposit_date',
            sorter: (a, b) => {
                const dateA = new Date(a.latest_deposit_date);
                const dateB = new Date(b.latest_deposit_date);

                if (!isNaN(dateA) && !isNaN(dateB)) {
                    return dateA - dateB;
                }

                return 0;
            },
            align: 'center',
            render: (latest_deposit_date) => (
                <DateTimeListingField dateTime={latest_deposit_date} />
            ),
        },
        {
            title: t('report.Last Deposit Amount'),
            dataIndex: 'last_deposit_amount',
            sorter: (a, b) => Number(a.last_deposit_amount) - Number(b.last_deposit_amount),
            align: 'right',
            render: (last_deposit_amount) => (
                <NumberListingField value={last_deposit_amount} />
            ),
        },
        {
            title: t('report.Max Deposit Amount'),
            dataIndex: 'max_amount',
            sorter: (a, b) => Number(a.max_amount) - Number(b.max_amount),
            align: 'right',
            render: (max_amount) => (
                <NumberListingField value={max_amount} />
            ),
        },
        {
            title: t('report.Min Deposit Amount'),
            dataIndex: 'min_amount',
            sorter: (a, b) => Number(a.min_amount) - Number(b.min_amount),
            align: 'right',
            render: (min_amount) => (
                <NumberListingField value={min_amount} />
            ),
        },
    ];

    const sheetname = [
        { name: 'lastdeposit', tableId: 'lastdeposit' },
    ]

    const filename = `${t("report.Last Deposit Report")}`

    return (
        <>
        <Col xs={24} lg={24}>
            <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={list && list.list && listWithId} refetch={() => refetch()} />
        </Col>
            <Table
                rowKey="id"
                id='lastdeposit'
                columns={columns}
                dataSource={list && list.list && listWithId}
                loading={isFetching}
                pagination={{
                defaultPageSize: 20,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
            }}
                className='antd-report-table'
                bordered
                scroll={{
                    x: 1500,
                    y: 'calc(100vh - 400px)',
                }}
            />
        </>
    );
}

export default ReportLastDeposit;