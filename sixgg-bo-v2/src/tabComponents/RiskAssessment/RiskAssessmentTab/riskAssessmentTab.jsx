import { Tabs } from "antd"
import PermissionsAuth from "../../../components/permissionAuth"
import ReportIdenticalPassword from "../../../pages/report/reportItem/reportRiskManagementIdenticalPassword"
import ReportIdenticalIPAddress from "../../../pages/report/reportItem/reportRiskManagementIdenticalIPAddress"
import { useGetPlayerCheckRiskQuery } from "../../../features/player/playerApiSlices"
import { useTranslation } from "react-i18next"
import ReportIdenticalBrowserFingerprint from "../../../pages/report/reportItem/reportRiskManagementBrowserFingerprint"

export const RiskAssessmentTab = (playerName, playerID) => {
    const { t } = useTranslation();
    const { 
        data: reportList,
        isLoading, 
        isSuccess, 
        isError, 
        error,
        isFetching,
        refetch
    } = useGetPlayerCheckRiskQuery({
        filters: {
            player: playerName
        },
        id: playerID
    },{
        refetchOnFocus: true,
        pollingInterval: 10000,
        skipPollingIfUnfocused: true,
    });

    const samePasswordData = reportList?.map(item => item.same_password)?.flat() ?? [];
    const sameIPAddressData = reportList?.map(item => item.same_ipaddress)?.flat() ?? [];
    const sameBrowserFingerprint = reportList?.map(item => item.same_browser_fingerprint)?.flat() ?? [];

    return [
        PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_ip_address', true) &&
        {
            label: t(`report.Identical IP Address`),
            key: 'PlayerReportIdenticalIPAddress',
            children: <ReportIdenticalIPAddress showToolbar={false} sameIPAddressData={sameIPAddressData} />
        },
        PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_password', true) &&
        {
            label: t(`report.Identical Password`),
            key: 'PlayerReportIdenticalPassword',
            children: <ReportIdenticalPassword showToolbar={false} samePasswordData={samePasswordData} />
        },
        PermissionsAuth.checkPermissions('menu', 'view_risk_management_same_ip_address', true) &&
        {
            label: t(`report.Identical Browser Fingerprint`),
            key: 'PlayerReportIdenticalBrowserFingerprint',
            children: <ReportIdenticalBrowserFingerprint showToolbar={false} sameBrowserFingerprint={sameBrowserFingerprint} />
        },
    ]
}

export const RiskAssessment = ({playerName, playerID}) => {
    return (
        <Tabs
            tabPosition="top"
            items={RiskAssessmentTab(playerName, playerID)}
        />
    )
  }