import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { filtersActions, resetFilters } from '../../features/filtersSlice';
import { Row, Col, Typography } from 'antd';
import ReportMerchantBankAccountByDate from '../report/reportItem/reportMerchantBankAccountByDate';
import ReportDailyTotalSalesSummary from '../report/reportItem/reportDailyTotalSalesSummary';
import ReportDailyTotalMember from '../report/reportItem/reportDailyTotalMember';
import ReportDailyPGSummary from '../report/reportItem/reportDailyPGSummary';
import ReportDailyEWSummary from '../report/reportItem/reportDailyEWSummary';
import ReportDailyNewIDDepositSummary from '../report/reportItem/reportDailyNewIDDepositSummary';
import ReportDailyBonusesSummary from '../report/reportItem/reportDailyBonusesSummary';
import ReportOperatorWallet from '../report/reportItem/reportOperatorWallet';
import ReportDailyTurnoverSummary from '../report/reportItem/reportDailyTurnoverSummary';
import ReportCashTransfer from '../report/reportItem/reportCashTransfer';
import ReportToolBar from '../report/reportToolBar';
import { formattedDate, getTodayDate } from '../../components/convertDate';
import PermissionsAuth from '../../components/permissionAuth';
import { useTranslation } from 'react-i18next';
import ReportSummaryByTType from '../report/reportItem/reportSummaryByTType';

const { Title } = Typography;

const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters.filters);
  const sheetname = [
    { name: 'totalsales', tableId: 'totalsales' },
    { name: 'totalmember', tableId: 'totalmember' },
    { name: 'pgsummary', tableId: 'pgsummary' },
    { name: 'ewsummary', tableId: 'ewsummary' },
    { name: 'operatorwallet', tableId: 'operatorwallet' },
    { name: 'bankmeter', tableId: 'bankmeter' },
    { name: 'newidsummary', tableId: 'newidsummary' },
    { name: 'bonussummary', tableId: 'bonussummary' },
    { name: 'cashtransfer', tableId: 'cashtransfer' },
    { name: 'summarybyttype', tableId: 'summarybyttype'}
  ]

    useEffect(() => {
      const { startDate, endDate } = getTodayDate();
      const fromDate = formattedDate(startDate);
      const toDate = formattedDate(endDate);
      dispatch(resetFilters());
      dispatch(filtersActions({ value: fromDate, type: 'input', event: 'fromDate' }));
      dispatch(filtersActions({ value: toDate, type: 'input', event: 'toDate' }));
    }, []); // initial sort

    const filename = `${t('report.Account Report')} ${filters?.fromDate && filters?.fromDate} - ${filters?.toDate && filters?.toDate}`

    return (
      PermissionsAuth.checkPermissions('list', 'view_dashboard',
      <>
      <Col xs={24} sm={24}>
        <ReportToolBar refetch={false} sheetname={sheetname} filename={filename} />
      </Col>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} >
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={12}>
              <ReportDailyTotalSalesSummary showToolbar={false} t={t} />
            </Col>
            <Col xs={24} sm={12}>
              <ReportDailyTotalMember showToolbar={false} t={t} />
            </Col>
            {/* <Col xs={24} sm={8}>
              <ReportDailyChipsSummary showToolbar={false} />
            </Col> */}
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={12}>
              <ReportDailyPGSummary showToolbar={false} t={t} />
            </Col>
            <Col xs={24} sm={12}>
              <ReportDailyEWSummary showToolbar={false} t={t} />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
            <Col xs={24} sm={12}>
              <ReportDailyNewIDDepositSummary showToolbar={false} t={t} />
            </Col>
            <Col xs={24} sm={12}>
              <ReportDailyBonusesSummary showToolbar={false} t={t} />
            </Col>
          </Row>
          <Row style={{ marginBottom: "16px" }}>
            <ReportOperatorWallet showToolbar={false} t={t} />
          </Row>
          {/* <Row style={{ marginBottom: "16px" }}>
            <ReportDailyTurnoverSummary showToolbar={false} t={t} />
          </Row> */}
          <Row style={{ marginBottom: "16px" }}>
            <ReportSummaryByTType showToolbar={false} t={t} />
          </Row>
        </Col>
        <Col xs={24} sm={12} >
        {import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
          <Row style={{ marginBottom: "16px" }}>
            <ReportMerchantBankAccountByDate showToolbar={false} t={t} />
          </Row>
        }
        <Col xs={24} sm={24} >
          <Row style={{ marginBottom: "16px" }}>
            <ReportCashTransfer showToolbar={false} t={t} />
          </Row>
        </Col >
        </Col>
      </Row>
    </>
      )
    );
  }
  
export default Dashboard;
  