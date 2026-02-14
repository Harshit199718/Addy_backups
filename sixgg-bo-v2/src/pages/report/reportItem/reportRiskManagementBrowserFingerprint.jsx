import React from 'react';
import { Table } from 'antd';
import './report.css'
import ReportToolBar from '../reportToolBar';
import DateTimeListingField from '../../../ListingField/DateTimeListingField';
import ReferencePlayerListingField from '../../../ListingField/ReferencePlayerListingField';
import { BooleanField } from '../../../ListingField/BooleanField';
import { useTranslation } from 'react-i18next';

const ReportIdenticalBrowserFingerprint = ({ showToolbar=true, sameBrowserFingerprint }) => {
    const { t } = useTranslation();
    const columns = [
        {
            title: t('common.Risk Management'),
            children: [
                {
                    title: t('common.Sites'),
                    dataIndex: 'site_name',
                    sorter: (a, b) => {
                        if (!a.site_name) return -1; 
                        if (!b.site_name) return 1; 
                        return a.site_name?.localeCompare(b.site_name);
                      },
                },
                {
                    title: t('common.Player'),
                    dataIndex: 'id',
                    key: 'id',
                    align: 'left',
                    render: (id) => (
                        <ReferencePlayerListingField filterProp={{id: [id]}} />
                      ),
                },
                {
                    title: t('common.Password'),
                    dataIndex: 'password',
                    align: 'left',
                },
                {
                    title: t('common.Browser Fingerprint'),
                    dataIndex: 'browser_fingerprint',
                    align: 'left',
                },
                {
                    title: t('common.Mobile'),
                    dataIndex: 'mobile',
                    align: 'left',
                    sorter: (a, b) => {
                        if (!a.mobile) return -1; 
                        if (!b.mobile) return 1; 
                        return a.mobile?.localeCompare(b.mobile);
                      },
                    render: (mobile) => ( mobile ? mobile : '-' ),
                },
                {
                    title: t('common.Date Joined'),
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
                },
                {
                    title: t('common.Last Login'),
                    dataIndex: 'last_login',
                    align: 'center',
                    sorter: (a, b) => {
                        const dateA = new Date(a.last_login);
                        const dateB = new Date(b.last_login);
                  
                        if (!isNaN(dateA) && !isNaN(dateB)) {
                          return dateA - dateB;
                        }
                  
                        return 0;
                      },
                    render: (last_login) => (
                        <DateTimeListingField dateTime={last_login} />
                    ),
                },
                {
                    title: t('common.Is Active'),
                    dataIndex: 'is_active',
                    align: 'center',
                    sorter: (a, b) => a.is_active - b.is_active,
                    render: (is_active) => <BooleanField boolean={is_active} />,
                },
            ]
        }
    ];

    const sheetname = [
        { name: 'identicalbrowserfingerprint', tableId: 'identicalbrowserfingerprint' },
    ]

    const filename = `${t("report.Identical Browser Fingerprint Report")}`

    return (
        <>
            {showToolbar && 
            <ReportToolBar 
                isLoading={isLoading} 
                sheetname={sheetname} 
                filename={filename} 
                exportData={sameBrowserFingerprint} 
                refetch={() => refetch()} 
                toolbarOption="notoolbar"
            /> 
            }
            <Table
                rowKey="id"
                id='identicalbrowserfingerprint'
                columns={columns}
                dataSource={sameBrowserFingerprint}
                pagination={
                    showToolbar && {
                    defaultPageSize: 20,
                    showTotal: (total, range) => `${t('paginationspecialchar.no')} ${range[0]}-${range[1]} ${t('paginationspecialchar.项')}  ${t('paginationspecialchar.of')} ${total} ${t(`paginationspecialchar.items`)}`,
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

export default ReportIdenticalBrowserFingerprint;