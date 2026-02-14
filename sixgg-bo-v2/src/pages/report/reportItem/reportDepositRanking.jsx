import React, { useEffect, useState } from 'react';
import { Table, Row, Input, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css';
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetReportDepositRankQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import SelectOption from '../../../customToolbar/SelectOption';
import { useTranslation } from 'react-i18next';

const ReportDepositRanking = ({}) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch();
    const [isReady, setIsReady] = useState(false);
    const { Search } = Input;
    const [searchText, setSearchText] = useState('');
    const [selectedRanks, setSelectedRanks] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

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
        refetch
    } = useGetReportDepositRankQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    useEffect(() => {
        if (list && list.list) {
            const encounteredIds = {};
            const filteredList = list.list.filter(item => {
                if (encounteredIds[item.id]) {
                    return false;
                }
                encounteredIds[item.player_id] = true;
                return Object.values(item).some(value => value && value.toString().includes(searchText));
            }).filter(item => {
                if (selectedRanks.length > 0) {
                    return selectedRanks.includes(item.deposit_rank);
                }
                return true;
            });
            setFilteredData(filteredList);
        }
    }, [list, searchText, selectedRanks]);

    const columns = [
        {
            title: t('report.Deposit Ranking Report'),
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
                    align: 'center',
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
                    align: 'center',
                    sorter: (a, b) => {
                        if (!a.name) return -1; 
                        if (!b.name) return 1; 
                        return a.name?.localeCompare(b.name);
                    },
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
                    align: 'center',
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
                    title: t('report.Deposit Rank'),
                    dataIndex: 'deposit_rank',
                    key: 'deposit_rank',
                    align: 'center',
                    sorter: (a, b) => a.deposit_rank.localeCompare(b.deposit_rank)
                },
            ]
        }
    ];

    const uniqueRanks = list && list.list ? [...new Set(list.list.map(item => item.deposit_rank))] : [];
    const rankOptions = uniqueRanks.map(rank => ({
        value: rank,
        label: rank
    }));

    const filename = `${t("report.Deposit Ranking Report")} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`;
    const sheetname = [
        { name: 'depositranking', tableId: 'depositranking' },
    ];

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={6}>
                    <Search
                        placeholder={t("common.Search")}
                        value={searchText}
                        onChange={handleSearch}
                        style={{ width: "100%", marginBottom: 3 }}
                    />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={6}>
                    <SelectOption
                        onChange={(value) => setSelectedRanks(value)}
                        mode="multiple"
                        loading={isLoading} 
                        placeholder={t("common.Rank")}
                        options={rankOptions}
                        width={"100%"}
                    />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12}>
                    <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={filteredData} refetch={() => refetch()} /> 
                </Col>
            </Row>
            <Table
                rowKey="id"
                id='depositranking'
                columns={columns}
                dataSource={filteredData}
                loading={isFetching}
                scroll={{
                    x: 1500,
                    y: 'calc(110vh - 560px)',
                }}
                pagination={{
                    defaultPageSize: 20,
                    showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                }}
                className='antd-report-table'
                bordered
            />
        </>
    );
}

export default ReportDepositRanking;
