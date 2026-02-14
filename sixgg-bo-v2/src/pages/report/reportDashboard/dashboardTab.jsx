import { useTranslation } from "react-i18next"
import PermissionsAuth from "../../../components/permissionAuth"
import ReportCashTransfer from "../reportItem/reportCashTransfer"
import ReportDailyBonusesSummary from "../reportItem/reportDailyBonusesSummary"
import ReportDailyChipsSummary from "../reportItem/reportDailyChipsSummary"
import ReportDailyEWSummary from "../reportItem/reportDailyEWSummary"
import ReportDailyNewIDDepositSummary from "../reportItem/reportDailyNewIDDepositSummary"
import ReportDailyPGSummary from "../reportItem/reportDailyPGSummary"
import ReportDailyTotalMember from "../reportItem/reportDailyTotalMember"
import ReportDailyTotalSalesSummary from "../reportItem/reportDailyTotalSalesSummary"
import ReportDailyTurnoverSummary from "../reportItem/reportDailyTurnoverSummary"
import ReportMerchantBankAccountByDate from "../reportItem/reportMerchantBankAccountByDate"
import ReportOperatorWallet from "../reportItem/reportOperatorWallet"
import ReportSummaryByTType from "../reportItem/reportSummaryByTType"

export const DashboardTab = () => {
    const { t } = useTranslation();
    
    return [
        PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
        {
            label: t('report.Daily Total Sales'),
            key: 'dashboardDailyTotalSales',
            children: <ReportDailyTotalSalesSummary />
        },
        {
            label: t('report.Daily Total Member'),
            key: 'dashboardDailyTotalMember',
            children: <ReportDailyTotalMember />
        },
        {
            label: t('report.Daily Total Chips'),
            key: 'dashboardDailyTotalChips',
            children: <ReportDailyChipsSummary />
        },
        {
            label: t('report.Payment Gateway'),
            key: 'dashboardPaymentGetway',
            children: <ReportDailyPGSummary />
        },
        {
            label: t('report.E-Wallet Gateway'),
            key: 'dashboardEWalletGateway',
            children: <ReportDailyEWSummary />
        },
        {
            label: t('report.New ID Summary'),
            key: 'dashboardNewIDSummary',
            children: <ReportDailyNewIDDepositSummary />
        },
        {
            label: t('report.Bonuses Summary'),
            key: 'dashboardBonusesSummary',
            children: <ReportDailyBonusesSummary />
        },
        {
            label: t('report.Operator Wallet'),
            key: 'dashboardOperatorWallet',
            children: <ReportOperatorWallet />
        },
        {
            label: t('report.Total Turnover/Rollover'),
            key: 'dashboardTotalTurnoverAndRollover',
            children: <ReportDailyTurnoverSummary />
        },
        {
            label: t('report.Bank Meter'),
            key: 'dashboardBankMeter',
            children: <ReportMerchantBankAccountByDate scroll/>
        },
        {
            label: t('report.Cash Transfer'),
            key: 'dashboardCashTransfer',
            children: <ReportCashTransfer scroll/>
        },
        {
            label: t('report.Summary By Transfer Type'),
            key: 'dashboardSummaryByTType',
            children: <ReportSummaryByTType />
        },
    ];    
  }