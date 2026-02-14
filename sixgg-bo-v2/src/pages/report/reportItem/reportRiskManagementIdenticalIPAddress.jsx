import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formattedDate, getTodayDate } from '../../../components/convertDate';
import './report.css'
import { useGetReportRiskManagementIdenticalIPAddressQuery } from '../../../features/report/reportsApiSlices';
import ReportToolBar from '../reportToolBar';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField';
import IPGeolocation from '../../../components/IPGeolocation';
import { filtersTabActions, resetTabFilters } from '../../../features/filtersTabSlice';
import { useTranslation } from 'react-i18next';
 
const ReportIdenticalIPAddress = ({ showToolbar=true, sameIPAddressData }) => {
    const { t } = useTranslation();
    const filters = useSelector((state) => state.filtersTab.filters);
    const dispatch = useDispatch()
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const { startDate, endDate } = getTodayDate();
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);
        dispatch(resetTabFilters())
        if(sameIPAddressData === null){
            dispatch(filtersTabActions({ value: fromDate, type: 'input', event: 'fromDate' }))
            dispatch(filtersTabActions({ value: toDate, type: 'input', event: 'toDate' }))
            setIsReady(true)
        }
        else{
            setIsReady(false)
        }
    }, []); // initial sort

    const { 
        data: list,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
        refetch
    } = useGetReportRiskManagementIdenticalIPAddressQuery({
        filters
    },{
        refetchOnFocus: true,
        skip: !isReady,
    });

    const listWithId = list ? list.list.map((item, index) => ({ ...item, id: index + 1 })) : [];
    const columns = [
        {
            title: t('report.Identical IP Address'),
            children: [
                {
                    title: t('common.Sites'),
                    dataIndex: 'site_name',
                },
                {
                    title: t('common.Player'),
                    dataIndex: 'user_id',
                    key: 'user_id',
                    align: 'left',
                    render: (user_id) => (
                        <ReferencePlayerListingField filterProp={{id: [user_id]}} />
                      ),
                },
                {
                    title: t('common.Password'),
                    dataIndex: 'password',
                    align: 'left',
                },
                // {
                //     title: 'Is Active',
                //     dataIndex: 'is_active',
                //     align: 'center',
                //     sorter: (a, b) => a.is_active - b.is_active,
                //     render: (is_active) =>  <BooleanField boolean={is_active} />,
                // },
                showToolbar === false ? {
                    title: t('report.Matched IP'),
                    dataIndex: 'matched_ip_addresses_datetime',
                    align: 'center',
                } : null,
                {
                    title: t('report.IP Address 1'),
                    dataIndex: 'ipaddress_1',
                    align: 'center',
                    render: (ipaddress_1) => <IPGeolocation ipaddress={ipaddress_1} />
                },
                {
                    title: t('report.IP Address 2'),
                    dataIndex: 'ipaddress_2',
                    align: 'center',
                    render: (ipaddress_2) => <IPGeolocation ipaddress={ipaddress_2} />
                },
                {
                    title: t('report.IP Address 3'),
                    dataIndex: 'ipaddress_3',
                    align: 'center',
                    render: (ipaddress_3) => <IPGeolocation ipaddress={ipaddress_3} />
                },
                {
                    title: t('report.IP Address 4'),
                    dataIndex: 'ipaddress_4',
                    align: 'center',
                    render: (ipaddress_4) => <IPGeolocation ipaddress={ipaddress_4} />
                },
                {
                    title: t('report.IP Address 5'),
                    dataIndex: 'ipaddress_5',
                    align: 'center',
                    render: (ipaddress_5) => <IPGeolocation ipaddress={ipaddress_5} />
                }
            ].filter(Boolean),
        }
    ];

    const sheetname = [
        { name: 'identicalipaddress', tableId: 'identicalipaddress' },
    ]

    const filename = `${t("report.Identical IP Address Report")}`

    return (
        <>
            {showToolbar && 
            <ReportToolBar 
                isLoading={isLoading} 
                sheetname={sheetname} 
                filename={filename} 
                exportData={sameIPAddressData ? sameIPAddressData : list && list.list && listWithId} 
                refetch={() => refetch()} 
                toolbarOption='notoolbar'
            />
            } 
            <Table
                rowKey="id"
                id='identicalipaddress'
                columns={columns}
                dataSource={sameIPAddressData ? sameIPAddressData : list && list.list && listWithId}
                loading={isFetching}
                pagination={
                    showToolbar && {
                    defaultPageSize: 20,
                    showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.item')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
                }
                }
                className='antd-report-table'
                bordered
                scroll={{
                    y: 'calc(100vh - 480px)',
                }}
            />
        </>
    );
}

export default ReportIdenticalIPAddress;