import React, { useEffect, useState } from 'react';
import { Table, Row, Input, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetReportRegistrationDepositQuery  } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { useTranslation } from 'react-i18next';
import { reportOrderByLatestDepositDate } from '../../../customField/customOption';
import SelectOption from '../../../customToolbar/SelectOption';

const ReportRegistrationVersusDeposit = ({}) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(false);
    const { Search } = Input;
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };
    const [showDepositor, setShowDepositor] = useState(true); 

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
    } = useGetReportRegistrationDepositQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const encounteredIds = {};
    const filteredList = list && list.list ? list.list.filter(item => {
        if (encounteredIds[item.player_id]) {
            return false;
        }
        encounteredIds[item.id] = true;
        const matchesSearchText = Object.values(item).some(value => value && value.toString().includes(searchText));
        const matchesDepositorFilter = showDepositor ? item.latest_deposit_date : true; 
        return matchesSearchText && matchesDepositorFilter;
    }) : [];

    const columns = [
        {
            title: t('report.Registration Versus Deposit'),
            children: [
                {
                    title: t('report.Sites'),
                    dataIndex: 'site_name',
                    key: 'site_name',
                    align: 'center',
                    sorter: (a, b) => {
                        if (!a.site_name) return -1; 
                        if (!b.site_name) return 1; 
                        return a.site_name?.localeCompare(b.site_name);
                    },
                },
                {
                    title: t('report.Player'),
                    dataIndex: 'username',
                    key: 'username',
                    sorter: (a, b) => {
                        if (!a.username) return -1; 
                        if (!b.username) return 1; 
                        return a.username?.localeCompare(b.username);
                    },
                },
                {
                    title: t('report.Player Name'),
                    dataIndex: 'name',
                    key: 'name',
                    sorter: (a, b) => {
                        if (!a.name) return -1; 
                        if (!b.name) return 1; 
                        return a.name?.localeCompare(b.name);
                    },
                },
                {
                    title: t('report.Referrer Code'),
                    dataIndex: 'referrer_code',
                    key: 'referrer_code',
                },
                {
                    title: t('report.Mobile'),
                    dataIndex: 'mobile',
                    key: 'mobile',
                    sorter: (a, b) => {
                        if (!a.mobile) return -1; 
                        if (!b.mobile) return 1; 
                        return a.mobile?.localeCompare(b.mobile);
                    },
                },
                {
                    title: t('report.Min Deposit'),
                    dataIndex: 'min_amount',
                    align: 'right',
                    sorter: (a, b) => Number(a.min_amount) - Number(b.min_amount),
                    render: (min_amount) => (
                        <NumberListingField value={min_amount}/>
                    ),
                },
                {
                    title: t('report.Max Deposit'),
                    dataIndex: 'max_amount',
                    align: 'right',
                    sorter: (a, b) => Number(a.max_amount) - Number(b.max_amount),
                    render: (max_amount) => (
                        <NumberListingField value={max_amount}/>
                    ),
                },
                {
                    title: t('report.Last Deposit Amount'),
                    dataIndex: 'last_deposit_amount',
                    align: 'right',
                    sorter: (a, b) => Number(a.last_deposit_amount) - Number(b.last_deposit_amount),
                    render: (last_deposit_amount) => (
                        <NumberListingField value={last_deposit_amount}/>
                    ),
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
                    title: t('report.Registration Date'),
                    dataIndex: 'registration_date',
                    sorter: (a, b) => {
                        const dateA = new Date(a.registration_date);
                        const dateB = new Date(b.registration_date);

                        if (!isNaN(dateA) && !isNaN(dateB)) {
                            return dateA - dateB;
                        }

                        return 0;
                    },
                    align: 'center',
                    render: (registration_date) => (
                        <DateTimeListingField dateTime={registration_date} />
                    ),
                },
                {
                    title: t('report.Stage'),
                    dataIndex: 'registration_stage',
                    align: 'center',
                    sorter: (a, b) => {
                        if (!a.registration_stage) return -1; 
                        if (!b.registration_stage) return 1; 
                        return a.registration_stage?.localeCompare(b.registration_stage);
                    },
                    render: (registration_stage) => ( registration_stage ? registration_stage : '-' ),
                },
                {
                    title: t('report.Registration Type'),
                    dataIndex: 'register_type_display',
                    align: 'center',
                    sorter: (a, b) => {
                        if (!a.register_type_display) return -1; 
                        if (!b.register_type_display) return 1; 
                        return a.register_type_display?.localeCompare(b.register_type_display);
                    },
                    render: (register_type_display) => ( register_type_display ? register_type_display : '-' ),
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'registrationvsdeposit', tableId: 'registrationvsdeposit' },
    ]

    const filename = `${t("report.Registration Versus Deposit Report")}`

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={5} xl={6} xxl={6}>
                    <Search
                        placeholder={t("common.Search")}
                        value= {searchText}
                        onChange={handleSearch}
                        style={{ width: "100%", marginBottom:3 }}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={5} xl={6} xxl={6}>
                    <SelectOption
                        onChange={(value) => setShowDepositor(value)}
                        value={showDepositor}
                        style={{ width: '100%', marginBottom: 3 }}
                        isLoading={isLoading}
                        options={reportOrderByLatestDepositDate(t)}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={19} xl={18} xxl={12}>
                    <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={filteredList} refetch={() => refetch()}/> 
                </Col>
            </Row>
            <Table
                rowKey="id"
                id='registrationvsdeposit'
                columns={columns}
                dataSource={filteredList}
                loading={isFetching}
                scroll={{
                    x: 1500,
                    y: 'calc(100vh - 600px)',
                }}
                pagination={{
                defaultPageSize: 10,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                }}
                className='antd-report-table'
                bordered
            />
        </>
    );
}

export default ReportRegistrationVersusDeposit;