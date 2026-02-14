import PermissionsAuth from "../../../components/permissionAuth"
import ReportNoDeposit from "../reportItem/reportNoDeposit"
import ReportDepositRanking from "../reportItem/reportDepositRanking"
import ReportLastDeposit from "../reportItem/reportLastDeposit"
import ReportRegistrationVersusDeposit from "../reportItem/reportRegistrationVersusDeposit"
import { useTranslation } from "react-i18next"

export const DepositTab = () => {
    const { t } = useTranslation();

    return [
        PermissionsAuth.checkPermissions('menu', 'view_no_deposit_report', true) &&
        {
            label: t(`report.No Deposit`), 
            key: 'nodeposit',
            children: <ReportNoDeposit />
        },
        PermissionsAuth.checkPermissions('menu', 'view_last_deposit_report', true) &&
        {
            label: t(`report.Last Deposit`),
            key: 'lastdeposit',
            children: <ReportLastDeposit />
        },
        PermissionsAuth.checkPermissions('menu', 'view_deposit_rank_report', true) &&
        {
            label: t(`report.Deposit Ranking`),
            key: 'depositranking',
            children: <ReportDepositRanking />
        },
        PermissionsAuth.checkPermissions('menu', 'view_registration_versus_deposit_report', true) &&
        {
            label: t(`report.Registration Versus Deposit`),
            key: 'registrationVSdeposit',
            children: <ReportRegistrationVersusDeposit />
        },
    ]
  }