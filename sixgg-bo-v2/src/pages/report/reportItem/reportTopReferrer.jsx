import React, { useEffect, useState } from 'react';
import { Table, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetTopReferrerQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import SelectOption from '../../../customToolbar/SelectOption';
import { reportOrderByOptions } from '../../../customField/customOption';
import { useTranslation } from 'react-i18next';

const ReportTopReferrer = ({}) => {
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
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
    } = useGetTopReferrerQuery({
        filters
    },{
        skip: !isReady,
    });

    // const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
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
            title: t('report.Name'),
            dataIndex: 'username',
            sorter: (a, b) => {
                if (!a.username) return -1; 
                if (!b.username) return 1; 
                return a.username?.localeCompare(b.username);
            },
        },
        {
            title: t('report.New Member'),
            dataIndex: 'newjoin_count',
            sorter: (a, b) => Number(a.last_deposit_amount) - Number(b.last_deposit_amount),
            render: (newjoin_count) => (newjoin_count !== null ? newjoin_count : 0),
            align: 'center'
        },
        {
            title: t('report.Average Daily Member'),
            dataIndex: 'avg_daily_member',
            sorter: (a, b) => Number(a.avg_daily_member) - Number(b.avg_daily_member),
            align: 'center'
        },
        {
            title: t('report.Total Deposit'),
            dataIndex: 'total_deposit',
            sorter: (a, b) => Number(a.total_deposit) - Number(b.total_deposit),
            align: 'right',
            render: (total_deposit) => <NumberListingField value={total_deposit}/>
        },
        {
            title: t('report.Total Withdrawal'),
            dataIndex: 'total_withdrawal',
            sorter: (a, b) => Number(a.total_withdrawal) - Number(b.total_withdrawal),
            align: 'right',
            render: (total_withdrawal) => <NumberListingField value={total_withdrawal}/>
        },
        {
            title: t('report.Total Net'),
            dataIndex: 'total_net',
            sorter: (a, b) => Number(a.total_net) - Number(b.total_net),
            align: 'right',
            render: (total_net) => <NumberListingField value={total_net}/>
        },
    ];

    const sheetname = [
        { name: 'topreferrer', tableId: 'topreferrer' },
    ]
    const filename = `${t("report.Top Referrer Report")}`

    return (
        <>
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={5} xl={6} xxl={6}>
                <SelectOption
                    onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'orderby' }))}
                    isLoading={isLoading}
                    placeholder={t("report.Please Select Sort")}
                    options={reportOrderByOptions(t)}
                    width={'100%'}
                />
            </Col>
            <Col xs={24} sm={24} md={24} lg={19} xl={18} xxl={18}>
                <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={list && list.list} refetch={() => refetch()} />
            </Col>
        </Row>
            <Table
                rowKey="id"
                id='topreferrer'
                columns={columns}
                dataSource={list && list.list}
                loading={isFetching}
                pagination={{
                defaultPageSize: 20,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                }}
                className='antd-report-table'
                bordered
                scroll={{
                    x: 1500,
                    y: 'calc(115vh - 560px)',
                }}
            />
        </>
    );
}

export default ReportTopReferrer;