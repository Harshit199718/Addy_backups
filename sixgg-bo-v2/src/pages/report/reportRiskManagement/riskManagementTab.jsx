import PermissionsAuth from "../../../components/permissionAuth"
import ReportIdenticalPassword from "../reportItem/reportRiskManagementIdenticalPassword"
import ReportIdenticalIPAddress from "../reportItem/reportRiskManagementIdenticalIPAddress"
import { useTranslation } from "react-i18next"

export const RiskManagementTab = () => {
    const { t } = useTranslation();

    return [
        PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_password', true) &&
        {
            label: t(`report.Identical Password`),
            key: 'riskManagementIdenticalPassword',
            children: <ReportIdenticalPassword samePasswordData={null}/>
        },
        PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_ip_address', true) &&
        {
            label: t(`report.Identical IP Address`),
            key: 'riskManagementIdenticalIPAddress',
            children: <ReportIdenticalIPAddress sameIPAddressData={null}/>
        },
    ]
  }