import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilters } from '../../features/filtersSlice';
import { setReportSelectedTab } from "../../features/generalSlice"
import { Col, Tabs } from 'antd';
import ReportDailySummaryByDate from './reportItem/reportDailySummaryByDate';
import PermissionsAuth from '../../components/permissionAuth';
import { DashboardTab } from './reportDashboard/dashboardTab';
import { RiskManagementTab } from './reportRiskManagement/riskManagementTab';
import { TransactionReportTab } from './reportTransaction/transactionReportTab';
import { DepositTab } from './reportDeposit/depositTab';
import { OthersReportTab } from './reportOthers/othersReportTab';
import { useTranslation } from 'react-i18next';

const ReportList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeKey = useSelector(state => state.general.reportSelectedTab);

  useEffect(() => {
    dispatch(resetFilters())
  }, []);

  return (
      <Col xs={24} sm={24}>
        <Tabs
          tabPosition={'left'} 
          onChange={(key) => dispatch(setReportSelectedTab({key: key}))}
          style={{
            height: 700,
            scrollBehavior: 'smooth',
          }}
          items={[
            PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
            {
              label: t(`report.Dashboard Report`),
              key: 'dashboard',
              children: activeKey === 'dashboard' && <DashboardReport t={t} />
            },
            PermissionsAuth.checkPermissions('menu', 'view_daily_summary_by_date_report', true) &&
            {
              label: t(`report.Daily Summary Report`),
              key: 'dailysummary',
              children: activeKey === 'dailysummary' && <ReportDailySummaryByDate t={t} />
            },
            (
              PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_password', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_ip_address', true)
            ) && 
            {
              label: t(`report.Risk Management Report`),
              key: 'riskmanagement',
              children: activeKey === 'riskmanagement' && <RiskManagement t={t} />
            },
            PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
            {
              label: t(`report.Transaction Report`),
              key: 'transactionreport',
              children: activeKey === 'transactionreport' && <TransactionReport t={t} />
            },
            (
              PermissionsAuth.checkPermissions('menu', 'view_no_deposit_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_last_deposit_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_deposit_rank_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_registration_versus_deposit_report', true)
            ) &&
            {
              label: t(`report.Deposit Report`),
              key: 'depositreport',
              children: activeKey === 'depositreport' && <DepositReport t={t} />
            },
            (
              PermissionsAuth.checkPermissions('menu', 'view_marketing_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_promotion_analysis_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_retention_report', true) ||
              PermissionsAuth.checkPermissions('menu', 'view_promotion_analysis_report', true)
            ) &&
            {
              label: t(`report.Others Report`),
              key: 'othersreport',
              children: activeKey === 'othersreport' && <OthersReport t={t} />
            },
          ]}
        />
      </Col>
  )
}

export default ReportList;

export const DashboardReport = () => {
  return (
      <Tabs
        tabPosition="top"
        items={DashboardTab()}
      />
  )
}

export const RiskManagement = () => {
  return (
      <Tabs
      tabPosition="top"
      items={RiskManagementTab()}
      />
  )
}

export const TransactionReport = () => {
  return (
      <Tabs
      tabPosition="top"
      items={TransactionReportTab()}
      />
  )
}

export const DepositReport = () => {
  return (
      <Tabs
      tabPosition="top"
      items={DepositTab()}
      />
  )
}

export const OthersReport = () => {
  return (
      <Tabs
      tabPosition="top"
      items={OthersReportTab()}
      />
  )
}