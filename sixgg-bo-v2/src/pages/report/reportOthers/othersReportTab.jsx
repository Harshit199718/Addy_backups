import { useTranslation } from "react-i18next"
import PermissionsAuth from "../../../components/permissionAuth"
import ReportMarketing from "../reportItem/reportMarketing"
import ReportPromotionAnalysis from "../reportItem/reportPromotionAnalysis"
import ReportRetention from "../reportItem/reportRetention"
import ReportTopReferrer from "../reportItem/reportTopReferrer"

export const OthersReportTab = () => {
  const { t } = useTranslation();
    return [
        // PermissionsAuth.checkPermissions('menu', 'view_marketing_report', true) &&
        // {
        //   label: t(`report.Marketing Report`),
        //   key: 'marketingreport',
        //   children: <ReportMarketing />
        // },
        PermissionsAuth.checkPermissions('menu', 'view_promotion_analysis_report', true) &&
        {
          label: t(`report.Promotion Analysis Report`),
          key: 'promotionanalysis',
          children: <ReportPromotionAnalysis />
        },
        PermissionsAuth.checkPermissions('menu', 'view_retention_report', true) &&
        {
          label: t(`report.Retention Report`),
          key: 'retentionreport',
          children: <ReportRetention />
        },
        PermissionsAuth.checkPermissions('menu', 'view_promotion_analysis_report', true) &&
        {
          label: t(`report.Top Referrer Report`),
          key: 'topreferrer',
          children: <ReportTopReferrer />
        },
    ]
  }