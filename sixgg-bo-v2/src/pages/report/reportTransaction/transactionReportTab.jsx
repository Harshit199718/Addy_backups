import PermissionsAuth from "../../../components/permissionAuth"
import ReportTransactions from "../reportItem/reportTransactions"
import ReportDepositWithdrawal from "../reportItem/reportDepositWithdrawal"
import ReportSiteTransactions from "../reportItem/reportSiteTransactions"
import { useTranslation } from "react-i18next"

export const TransactionReportTab = () => {
    const { t } = useTranslation();

    return [
        PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
        {
            label: t(`report.Transaction`),
            key: 'transactions',
            children: <ReportTransactions />
        },
        PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
        {
            label: t(`report.Sites Transaction`),
            key: 'sitetransaction',
            children: <ReportSiteTransactions />
        },
        PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
        {
            label: t( `report.Deposit & Withdrawal`),
            key: 'depositwithdrawal',
            children: <ReportDepositWithdrawal />
        },
    ]
  }