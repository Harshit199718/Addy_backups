import React, { useEffect, useState } from 'react';
import { Table, Row, Input, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import NumberListingField from '../../../ListingField/NumberListingField';
import './report.css'
import { filtersActions, resetFilters } from '../../../features/filtersSlice';
import { useGetReportMarketingQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import { BooleanField } from '../../../ListingField/BooleanField';
import { useTranslation } from 'react-i18next';

const ReportRetention = ({}) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filters.filters);
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(false);
    const { Search } = Input;
    const [searchText, setSearchText] = useState('');
    const handleSearch = (e) => {
        setSearchText(e.target.value);
    };

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
    } = useGetReportMarketingQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const encounteredIds = {};
    const filteredList = list && list.list ? list.list.filter(item => {
        if (encounteredIds[item.id]) {
            return false;
        }
        encounteredIds[item.id] = true;
        return Object.values(item).some(value => value && value.toString().includes(searchText));
    }) : [];

    const columns = [
        {
            title: t('report.Retention Report'),
            children: [
                {
                    title: t('report.Users'),
                    key: 'users',
                    align: 'center',
                    children: [
                        {
                            title: t('report.Sites'),
                            dataIndex: 'site_name',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.site_name) return -1; 
                                if (!b.site_name) return 1; 
                                return a.site_name?.localeCompare(b.site_name);
                            },
                        },
                        {
                            title: t('report.Username'),
                            dataIndex: 'username',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.username) return -1; 
                                if (!b.username) return 1; 
                                return a.username?.localeCompare(b.username);
                            },
                        },
                        {
                            title: t('report.Date Joined'),
                            dataIndex: 'date_joined',
                            align: 'center',
                            sorter: (a, b) => {
                                const dateA = new Date(a.date_joined);
                                const dateB = new Date(b.date_joined);
                          
                                if (!isNaN(dateA) && !isNaN(dateB)) {
                                    return dateA - dateB;
                                }
                          
                                return 0;
                            },
                            render: (date_joined) => (
                                <DateTimeListingField dateTime={date_joined} />
                            ),
                        }
                    ]
                },
                {
                    title: t('report.Player Details'),
                    key: 'playerdetails',
                    align: 'center',
                    children: [
                        {
                            title: t('report.New Joiner'),
                            dataIndex: 'is_new_joiner',
                            align: 'center',
                            sorter: (a, b) => a.is_new_joiner - b.is_new_joiner,
                            render: (is_new_joiner) => <BooleanField boolean={is_new_joiner} />,
                        },
                        {
                            title: t('report.Mobile'),
                            dataIndex: 'mobile',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.mobile) return -1; 
                                if (!b.mobile) return 1; 
                                return a.mobile?.localeCompare(b.mobile);
                            },
                        },
                        {
                            title: t('report.Rank'),
                            dataIndex: 'rank',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.rank) return -1; 
                                if (!b.rank) return 1; 
                                return a.rank?.localeCompare(b.rank)
                            },
                            render: (rank) => t(`referencefield.${rank}`)
                        },
                        {
                            title: t('report.Registration Status'),
                            dataIndex: 'registration_status',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.registration_status) return -1; 
                                if (!b.registration_status) return 1; 
                                return a.registration_status?.localeCompare(b.registration_status);
                            },
                            render: (registration_status) => t(`report.${registration_status}`)
                        },
                        {
                            title: t('report.Wallet Balance'),
                            dataIndex: 'wallet_balance',
                            align: 'right',
                            sorter: (a, b) => Number(a.wallet_balance) - Number(b.wallet_balance),
                            render: (wallet_balance) => (
                                <NumberListingField value={wallet_balance}/>
                            ),
                        },
                        {
                            title: t('report.Chip Balance'),
                            dataIndex: 'chips_balance',
                            align: 'right',
                            sorter: (a, b) => Number(a.chips_balance) - Number(b.chips_balance),
                            render: (chips_balance) => (
                                <NumberListingField value={chips_balance}/>
                            ),
                        },
                        {
                            title: t('report.Referrer'),
                            dataIndex: 'referrer',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.referrer) return -1; 
                                if (!b.referrer) return 1; 
                                return a.referrer?.localeCompare(b.referrer);
                            },
                            render: (referrer) => (referrer ? referrer : '-'),
                        },
                        {
                            title: t('report.Referrer Code'),
                            dataIndex: 'referrer_code',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.referrer_code) return -1;
                                if (!b.referrer_code) return 1;
                                return a.referrer_code?.localeCompare(b.referrer_code);
                            },
                            render: (referrer_code) => (referrer_code ? referrer_code : '-'),
                        },
                        {
                            title: t('report.Referral Code'),
                            dataIndex: 'referral_code',
                            align: 'center',
                            sorter: (a, b) => {
                                if (!a.referral_code) return -1; 
                                if (!b.referral_code) return 1; 
                                return a.referral_code?.localeCompare(b.referral_code);
                            },
                            render: (referral_code) => (referral_code ? referral_code : '-'),
                        },
                        {
                            title: t('report.Last Login'),
                            dataIndex: 'last_login_date',
                            sorter: (a, b) => {
                                const dateA = new Date(a.last_login_date);
                                const dateB = new Date(b.last_login_date);
                          
                                if (!isNaN(dateA) && !isNaN(dateB)) {
                                    return dateA - dateB;
                                }
                          
                                return 0;
                            },
                            align: 'center',
                            render: (last_login_date) => (
                                <DateTimeListingField dateTime={last_login_date} />
                            ),
                        },
                        {
                            title: t('report.Last Deposit Date'),
                            dataIndex: 'last_deposit_date',
                            sorter: (a, b) => {
                                // Convert string dates to Date objects for comparison
                                const dateA = new Date(a.last_deposit_date);
                                const dateB = new Date(b.last_deposit_date);
                          
                                if (!isNaN(dateA) && !isNaN(dateB)) {
                                    return dateA - dateB;
                                }
                          
                                return 0;
                            },
                            align: 'center',
                            render: (last_deposit_date) => (
                                <DateTimeListingField dateTime={last_deposit_date} />
                            ),
                        },
                        {
                            title: t('report.Last Withdrawal Date'),
                            dataIndex: 'last_withdrawal_date',
                            sorter: (a, b) => {
                                // Convert string dates to Date objects for comparison
                                const dateA = new Date(a.last_withdrawal_date);
                                const dateB = new Date(b.last_withdrawal_date);
                          
                                if (!isNaN(dateA) && !isNaN(dateB)) {
                                    return dateA - dateB;
                                }
                          
                                return 0;
                            },
                            align: 'center',
                            render: (last_withdrawal_date) => (
                                <DateTimeListingField dateTime={last_withdrawal_date} />
                            ),
                        },
                    ]            
                },
                {
                    title: t('report.Bet Details'),
                    key: 'betdetails',
                    align: 'center',
                    children: [
                        {
                            title: t('report.Total Deposit'),
                            dataIndex: 'total_deposit',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_deposit) - Number(b.total_deposit),
                            render: (total_deposit) => (
                                <NumberListingField value={total_deposit}/>
                            ),
                        },
                        {
                            title: t('report.Total Deposit Count'),
                            dataIndex: 'total_deposit_count',
                            sorter: (a, b) => Number(a.total_deposit_count) - Number(b.total_deposit_count),
                            align: 'right',
                        },
                        {
                            title: t('report.Total Withdrawal'),
                            dataIndex: 'total_withdrawal',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_withdrawal) - Number(b.total_withdrawal),
                            render: (total_withdrawal) => (
                                <NumberListingField value={total_withdrawal}/>
                            ),
                        },
                        {
                            title: t('report.Total Withdrawal Count'),
                            dataIndex: 'total_withdrawal_count',
                            sorter: (a, b) => Number(a.total_withdrawal_count) - Number(b.total_withdrawal_count),
                            align: 'right',
                        },
                        {
                            title: t('report.Total Forfeit'),
                            dataIndex: 'total_forfeit',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_forfeit) - Number(b.total_forfeit),
                            render: (total_forfeit) => (
                                <NumberListingField value={total_forfeit}/>
                            ),
                        },
                        {
                            title: t('report.Total FOC'),
                            dataIndex: 'total_foc',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_foc) - Number(b.total_foc),
                            render: (total_foc) => (
                                <NumberListingField value={total_foc}/>
                            ),
                        },
                        {
                            title: t('report.Total Rebate Received Cash'),
                            dataIndex: 'total_rebate_received_cash',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_rebate_received_cash) - Number(b.total_rebate_received_cash),
                            render: (total_rebate_received_cash) => (
                                <NumberListingField value={total_rebate_received_cash}/>
                            ),
                        },
                        {
                            title: t('report.Total Referral Commission Received Cash'),
                            dataIndex: 'total_referral_commission_received_cash',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_referral_commission_received_cash) - Number(b.total_referral_commission_received_cash),
                            render: (total_referral_commission_received_cash) => (
                                <NumberListingField value={total_referral_commission_received_cash}/>
                            ),
                        },
                        {
                            title: t('report.Total Chips In'),
                            dataIndex: 'total_chips_in',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_chips_in) - Number(b.total_chips_in),
                            render: (total_chips_in) => (
                                <NumberListingField value={total_chips_in}/>
                            ),
                        },
                        {
                            title: t('report.Total Chips Out'),
                            dataIndex: 'total_chips_out',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_chips_out) - Number(b.total_chips_out),
                            render: (total_chips_out) => (
                                <NumberListingField value={total_chips_out}/>
                            ),
                        },
                        {
                            title: t('report.Total Chips Forfeit'),
                            dataIndex: 'total_chips_forfeit',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_chips_forfeit) - Number(b.total_chips_forfeit),
                            render: (total_chips_forfeit) => (
                                <NumberListingField value={total_chips_forfeit}/>
                            ),
                        },
                        {
                            title: t('report.Total Rebate Received Chip'),
                            dataIndex: 'total_rebate_received_chip',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_rebate_received_chip) - Number(b.total_rebate_received_chip),
                            render: (total_rebate_received_chip) => (
                                <NumberListingField value={total_rebate_received_chip}/>
                            ),
                        },
                        {
                            title: t('report.Total Referral Commission Received Chip'),
                            dataIndex: 'total_referral_commission_received_chip',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_referral_commission_received_chip) - Number(b.total_referral_commission_received_chip),
                            render: (total_referral_commission_received_chip) => (
                                <NumberListingField value={total_referral_commission_received_chip}/>
                            ),
                        },
                        {
                            title: t('report.Total Turnover'),
                            dataIndex: 'total_turnover',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_turnover) - Number(b.total_turnover),
                            render: (total_turnover) => (
                                <NumberListingField value={total_turnover}/>
                            ),
                        },
                        {
                            title: t('report.Total Valid Bet'),
                            dataIndex: 'total_valid_bet',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_valid_bet) - Number(b.total_valid_bet),
                            render: (total_valid_bet) => (
                                <NumberListingField value={total_valid_bet}/>
                            ),
                        },
                        {
                            title: t('report.Total Payout'),
                            dataIndex: 'total_payout',
                            align: 'right',
                            sorter: (a, b) => Number(a.total_payout) - Number(b.total_payout),
                            render: (total_payout) => (
                                <NumberListingField value={total_payout}/>
                            ),
                        },
                        {
                            title: t('report.Win Loss Cash'),
                            dataIndex: 'win_loss_cash',
                            align: 'right',
                            sorter: (a, b) => Number(a.win_loss_cash) - Number(b.win_loss_cash),
                            render: (win_loss_cash) => (
                                <NumberListingField value={win_loss_cash}/>
                            ),
                        },
                        {
                            title: t('report.Win Loss Chip'),
                            dataIndex: 'win_loss_chip',
                            align: 'right',
                            sorter: (a, b) => Number(a.win_loss_chip) - Number(b.win_loss_chip),
                            render: (win_loss_chip) => (
                                <NumberListingField value={win_loss_chip}/>
                            ),
                        },
                        {
                            title: t('report.First Deposit Amount'),
                            dataIndex: 'first_deposit_amount',
                            align: 'right',
                            sorter: (a, b) => Number(a.first_deposit_amount) - Number(b.first_deposit_amount),
                            render: (first_deposit_amount) => (
                                <NumberListingField value={first_deposit_amount}/>
                            ),
                        },
                        {
                            title: t('report.Second Deposit Amount'),
                            dataIndex: 'second_deposit_amount',
                            align: 'right',
                            sorter: (a, b) => Number(a.second_deposit_amount) - Number(b.second_deposit_amount),
                            render: (second_deposit_amount) => (
                                <NumberListingField value={second_deposit_amount}/>
                            ),
                        },
                        {
                            title: t('report.Third Deposit Amount'),
                            dataIndex: 'third_deposit_amount',
                            align: 'right',
                            sorter: (a, b) => Number(a.third_deposit_amount) - Number(b.third_deposit_amount),
                            render: (third_deposit_amount) => (
                                <NumberListingField value={third_deposit_amount}/>
                            ),
                        },
                    ]
                },                
                {
                    title: t('report.Status'),
                    key: 'status',
                    align: 'center',
                    children: [
                        {
                            title: t('report.Is Active'),
                            dataIndex: 'is_active',
                            align: 'center',
                            sorter: (a, b) => a.is_active - b.is_active,
                            render: (is_active) => <BooleanField boolean={is_active} />,
                        },
                        {
                            title: t('report.Is Depositor'),
                            dataIndex: 'is_depositor',
                            align: 'center',
                            sorter: (a, b) => a.is_depositor - b.is_depositor,
                            render: (is_depositor) => <BooleanField boolean={is_depositor} />,
                        },
                        {
                            title: t('report.Is Withdrawal'),
                            dataIndex: 'is_withdrawal',
                            align: 'center',
                            sorter: (a, b) => a.is_withdrawal - b.is_withdrawal,
                            render: (is_withdrawal) => <BooleanField boolean={is_withdrawal} />,
                        },
                        {
                            title: t('report.Is Turnovertor'),
                            dataIndex: 'is_turnovertor',
                            align: 'center',
                            sorter: (a, b) => a.is_turnovertor - b.is_turnovertor,
                            render: (is_turnovertor) => <BooleanField boolean={is_turnovertor} />,
                        },
                        {
                            title: t('report.Is Player'),
                            dataIndex: 'is_player',
                            align: 'center',
                            sorter: (a, b) => a.is_player - b.is_player,
                            render: (is_player) => <BooleanField boolean={is_player} />,
                        },
                    ]
                },
                {
                    title: t('report.Rebate Details'),
                    key: 'rebatedetails',
                    align: 'center',
                    children: [
                        {
                            title: t('report.Received Bonus'),
                            dataIndex: 'received_bonus',
                            align: 'center',
                            sorter: (a, b) => a.received_bonus - b.received_bonus,
                            render: (received_bonus) => <BooleanField boolean={received_bonus} />,
                        },
                        {
                            title: t('report.Received Rebate Cash'),
                            dataIndex: 'received_rebate_cash',
                            align: 'center',
                            sorter: (a, b) => a.received_rebate_cash - b.received_rebate_cash,
                            render: (received_rebate_cash) => <BooleanField boolean={received_rebate_cash} />,
                        },
                        {
                            title: t('report.Received Referral Commission Cash'),
                            dataIndex: 'received_referral_commission_cash',
                            align: 'center',
                            sorter: (a, b) => a.received_referral_commission_cash - b.received_referral_commission_cash,
                            render: (received_referral_commission_cash) => <BooleanField boolean={received_referral_commission_cash} />,
                        },
                        {
                            title: t('report.Received Rebate Chip'),
                            dataIndex: 'received_rebate_chip',
                            align: 'center',
                            sorter: (a, b) => a.received_rebate_chip - b.received_rebate_chip,
                            render: (received_rebate_chip) => <BooleanField boolean={received_rebate_chip} />,
                        },
                        {
                            title: t('report.Received Referral Commission Chip'),
                            dataIndex: 'received_referral_commission_chip',
                            align: 'center',
                            sorter: (a, b) => a.received_referral_commission_chip - b.received_referral_commission_chip,
                            render: (received_referral_commission_chip) => <BooleanField boolean={received_referral_commission_chip} />,
                        },
                    ]
                },
                {
                    title: t('report.Penalty'),
                    key: 'penalty',
                    align: 'center',
                    children: [
                        {
                            title: t('report.Have Penalty'),
                            dataIndex: 'have_penalty',
                            align: 'center',
                            sorter: (a, b) => a.have_penalty - b.have_penalty,
                            render: (have_penalty) => <BooleanField boolean={have_penalty} />,
                        },
                    ]
                },                
            ]
        }
    ];

    const sheetname = [
        { name: 'retention', tableId: 'retention' },
    ]

    const filename = `${t("report.Retention Report")}`

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
                <Col xs={24} sm={24} md={24} lg={19} xl={18} xxl={18}>
                    <ReportToolBar isLoading={isLoading} sheetname={sheetname} filename={filename} exportData={filteredList} refetch={() => refetch()}/> 
                </Col>
            </Row>
            <Table
                rowKey="id"
                id='retention'
                columns={columns}
                dataSource={filteredList}
                loading={isFetching}
                scroll={{
                    x: 5000,
                    y: 'calc(100vh - 580px)',
                }}
                pagination={{
                defaultPageSize: 10,
                total: list ? list.totalCount : 0,
                showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
            }}
                className='antd-report-table'
                bordered
            />
        </>
    );
}

export default ReportRetention;