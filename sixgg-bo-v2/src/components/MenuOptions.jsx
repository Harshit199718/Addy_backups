import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Badge } from "antd";
import { mainDashboard } from "../pages/dashboard/mainDashboard";
import { mainPlayer } from "../pages/player/mainPlayer";
import { mainTransaction } from "../pages/transaction/mainTransaction";
import { mainCashTransfer } from "../pages/cashtransfer/mainCashTransfer";
import { mainMerchantBankAccounts } from "../pages/merchantbankaccounts/mainMerchantBankAccounts";
import { mainBanks } from "../pages/bank/mainBanks";
import { mainEnvVar } from "../pages/envVar/mainEnvVar";
import { mainNewsFeed } from "../pages/newsfeed/mainNewsFeed";
import { mainNotices } from "../pages/notices/mainNotices";
import { mainSocials } from "../pages/socials/mainSocials";
import { mainPromotionGroup } from "../pages/promotiongroup/mainPromotionGroup";
import { mainPromotion } from "../pages/promotion/mainPromotion";
import { mainProducts } from "../pages/products/mainProducts";
import { mainSites } from "../pages/sites/mainSites";
import { mainMessageLogs } from "../pages/messagelogs/mainMessageLogs";
import { mainCurrencies } from "../pages/currencies/mainCurrencies";
import { mainTopWinning } from "../pages/topwinning/mainTopWinning";
import SelectSite from "../customToolbar/SelectSites";
import OperatorWallet from "../pages/general/OperatorWallet";
import { mainLuckyWheelSlots } from "../pages/luckywheelslots/mainLuckyWheelSlots";
import { mainUnclaims } from "../pages/unclaims/mainUnclaims";
import { mainDailyCheckIn } from "../pages/dailycheckin/mainDailyCheckIn";
import { mainSkinConfig } from "../pages/skinconfig/mainSkinConfig";
import { mainLuckyWheelHistory } from "../pages/luckywheelhistory/mainLuckyWheelHistory";
import { mainSupport } from "../pages/support/mainSupport";
import { mainMessageTemplate } from "../pages/messagetemplate/mainMessageTemplate";
import { mainUserGroup } from "../pages/usergroup/mainUserGroup";
import { mainReport } from "../pages/report/mainReport";
import { mainRanking } from "../pages/ranking/mainRanking";
import { mainKioskAccess } from "../pages/kioskaccess/mainKioskAccess";
import { mainProductMessage } from "../pages/productmessage/mainProductMessage"
import { mainGameList } from "../pages/gamelist/mainGameList";
import { mainGameAccountSearch } from "../pages/gameaccountsearch/mainGameAccountSearch"
import { mainFeatures } from "../pages/features/mainFeatures";
import { mainRegistrations } from "../pages/registrations/mainRegistrations";
import { mainMailbox } from "../pages/mailbox/mainMailbox";
import { mainProductStarted } from "../pages/products(started)/mainProductStarted";
import { mainAffiliates } from "../pages/affiliates/mainAffiliates";
import PermissionsAuth from "./permissionAuth";
import { mainPartnerships } from "../pages/partnerships/mainPartnerships";
import { mainLivechat } from "../pages/livechat/mainLivechat";
import { mainReferral } from "../pages/singlelevelreward/referral/mainReferral"
import { mainRebate } from "../pages/singlelevelreward/rebate/mainRebate"
import { mainBonuses } from "../pages/singlelevelreward/bonuses/mainBonuses"
import { mainChipsRebate } from "../pages/singlelevelreward/chipsrebate/mainChipsRebate"
import { mainMultiReferral } from "../pages/multilevelreward/multireferral/mainMultiReferral";
import { mainMultiRebate } from "../pages/multilevelreward/multirebate/mainMultiRebate";
import { mainMultiChipsRebate } from "../pages/multilevelreward/multichipsrebate/mainMultiChipsRebate";
import { mainMultiBonuses } from "../pages/multilevelreward/multibonuses/mainBonuses";
import { mainCouponBatchs } from "../pages/couponbatchs/mainCouponBatchs";
import { mainCoupons } from "../pages/coupons/mainCoupons";
import { mainCouponTags } from "../pages/coupontags/mainCoupons";
import { mainNameCheap } from "../pages/namecheap/mainNamecheapConfig";
import { mainCloudflare } from "../pages/cloudflare/mainCloudflareConfig";
import { mainPWAConfig } from "../pages/pwaconfig/mainPwaConfig";
import { mainMissions } from "../pages/missions/mainMissions";

export const HeaderMenuOption = (livechatUnreadCount, t) => {
    const mediaMatch = window.matchMedia('(min-width: 768px)');

    const operatorWalletCSS = {
        position: mediaMatch.matches ? 'fixed' : null,
        right: mediaMatch.matches ? 100 : null,
    }

    const menuPermission = [
        {
            label: <SelectSite event="sites"/>,
        },
        PermissionsAuth.checkPermissions('menu', 'view_dashboard', true) &&
        {
            label: <Link to={mainDashboard.url}>{t(`menuoption.${mainDashboard.label}`)}</Link>,
            key: mainDashboard.key,
            icon: mainDashboard.icon,
        },
        PermissionsAuth.checkPermissions('menu', 'view_transaction', true) &&
        {
            label: <Link to={mainTransaction.url}>{t(`menuoption.${mainTransaction.label}`)}</Link>,
            key: mainTransaction.key,
            icon: mainTransaction.icon,
        },
        PermissionsAuth.checkPermissions('menu', 'view_cash', true) &&
        {
            label: <Link to={mainCashTransfer.url}>{t(`menuoption.${mainCashTransfer.label}`)}</Link>,
            key: mainCashTransfer.key,
            icon: mainCashTransfer.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_player', true) ||
            PermissionsAuth.checkPermissions('menu', 'view_registration', true)
        ) && {
            label: t("menuoption.player"),
            key: "playersettings",
            icon: mainPlayer.icon,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_player', true) &&
                {
                    label: <Link to={mainPlayer.url}>{t(`menuoption.${mainPlayer.label}`)}</Link>,
                    key: mainPlayer.key,
                    icon: mainPlayer.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_registration', true) &&
                {
                    label: <Link to={mainRegistrations.url}>{t(`menuoption.${mainRegistrations.label}`)}</Link>,
                    key: mainRegistrations.key,
                    icon: mainRegistrations.icon,
                },
            ]
        },
        PermissionsAuth.checkPermissions('menu', '_report', true) &&
        {
            label: <Link to={mainReport.url}>{t(`menuoption.${mainReport.label}`)}</Link>,
            key: mainReport.key,
            icon: mainReport.icon,
        },
        import.meta.env.VITE_APP_CONTACTUS_OPTION === "customlivechat" && import.meta.env.VITE_LIVECHAT_ENABLED &&
        {
            label: <Link style={{position: "relative"}} to={mainLivechat.url}>
                {t(`menuoption.${mainLivechat.label}`)}
                <Badge
                style={{ position: "absolute", top: -25, right: -25 }}
                count={livechatUnreadCount}
                overflowCount={10}
                />
            </Link>,
            key: mainLivechat.key,
            icon: mainLivechat.icon,
            style: { marginRight: "auto" }
        },
    ]
    return menuPermission
}

export const SiderMenuOption = (t) => {
    const menuPermission = [
        (
            PermissionsAuth.checkPermissions('menu', 'view_rebate', true) 
        ) && {
            label: t("menuoption.singlerewards"),
            key: 'singlelevelrewards',
            icon: <Icon icon="carbon:task-star" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                {
                    label: <Link to={mainReferral.url}>{t(`menuoption.${mainReferral.label}`)}</Link>,
                    key: mainReferral.key,
                    icon: mainReferral.icon,
                },
                {
                    label: <Link to={mainRebate.url}>{t(`menuoption.${mainRebate.label}`)}</Link>,
                    key: mainRebate.key,
                    icon: mainRebate.icon,
                },
                {
                    label: <Link to={mainBonuses.url}>{t(`menuoption.${mainBonuses.label}`)}</Link>,
                    key: mainBonuses.key,
                    icon: mainBonuses.icon,
                },
                import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainChipsRebate.url}>{t(`menuoption.${mainChipsRebate.label}`)}</Link>,
                    key: mainChipsRebate.key,
                    icon: mainChipsRebate.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_multilevelreward', true) &&
            import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label:  t("menuoption.multirewards"),
            key: 'multilevelrewards',
            icon: <Icon icon="carbon:task-star" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                {
                    label: <Link to={mainMultiReferral.url}>{t(`menuoption.${mainMultiReferral.label}`)}</Link>,
                    key: mainMultiReferral.key,
                    icon: mainMultiReferral.icon,
                },
                {
                    label: <Link to={mainMultiRebate.url}>{t(`menuoption.${mainMultiRebate.label}`)}</Link>,
                    key: mainMultiRebate.key,
                    icon: mainMultiRebate.icon,
                },
                {
                    label: <Link to={mainMultiBonuses.url}>{t(`menuoption.${mainMultiBonuses.label}`)}</Link>,
                    key: mainMultiBonuses.key,
                    icon: mainMultiBonuses.icon,
                },
                {
                    label: <Link to={mainMultiChipsRebate.url}>{t(`menuoption.${mainMultiChipsRebate.label}`)}</Link>,
                    key: mainMultiChipsRebate.key,
                    icon: mainMultiChipsRebate.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_messagelog', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_messagetemplate', true)
        ) && {
            label: t("menuoption.message"),
            key: 'messagesetting',
            icon: mainMessageLogs.icon,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_messagelog', true) &&
                {
                    label: <Link to={mainMessageLogs.url}>{t(`menuoption.${mainMessageLogs.label}`)}</Link>,
                    key: mainMessageLogs.key,
                    icon: mainMessageLogs.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_messagetemplate', true) &&
                {
                    label: <Link to={mainMessageTemplate.url}>{t(`menuoption.${mainMessageTemplate.label}`)}</Link>,
                    key: mainMessageTemplate.key,
                    icon: mainMessageTemplate.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_bank', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_merchantbankaccount', true)
        ) && {
            label: t("menuoption.banksettings"),
            key: 'banksetting',
            icon: <Icon icon="fluent:building-bank-link-48-filled" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_bank', true) &&
                {
                    label: <Link to={mainBanks.url}>{t(`menuoption.${mainBanks.label}`)}</Link>,
                    key: mainBanks.key,
                    icon: mainBanks.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_merchantbankaccount', true) &&
                {
                    label: <Link to={mainMerchantBankAccounts.url}>{t(`menuoption.${mainMerchantBankAccounts.label}`)}</Link>,
                    key: mainMerchantBankAccounts.key,
                    icon: mainMerchantBankAccounts.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_user', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_affiliate', true) ||
            PermissionsAuth.checkPermissions('menu', 'view_group', true) 
        ) && {
            label: t("menuoption.managementsetting"),
            key: 'managementsetting',
            icon: <Icon icon="ic:outline-manage-accounts" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_user', true) &&
                {
                    label: <Link to={mainSupport.url}>{t(`menuoption.${mainSupport.label}`)}</Link>,
                    key: mainSupport.key,
                    icon: mainSupport.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_affiliate', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainAffiliates.url}>{t(`menuoption.${mainAffiliates.label}`)}</Link>,
                    key: mainAffiliates.key,
                    icon: mainAffiliates.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_permission', true) &&
                {
                    label: <Link to={mainUserGroup.url}>{t(`menuoption.${mainUserGroup.label}`)}</Link>,
                    key: mainUserGroup.key,
                    icon: mainUserGroup.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_promotion', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_promotiongroup', true)
        ) && {
            label: t("menuoption.promotion"),
            key: 'promotionsetting',
            icon: <Icon icon="fluent:building-bank-link-48-filled" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_promotion', true) &&
                {
                    label: <Link to={mainPromotion.url}>{t(`menuoption.${mainPromotion.label}`)}</Link>,
                    key: mainPromotion.key,
                    icon: mainPromotion.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_promotiongroup', true) &&
                {
                    label: <Link to={mainPromotionGroup.url}>{t(`menuoption.${mainPromotionGroup.label}`)}</Link>,
                    key: mainPromotionGroup.key,
                    icon: mainPromotionGroup.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_kioskaccess', true)
        ) && {
            label: <Link to={mainKioskAccess.url}>{t(`menuoption.${mainKioskAccess.label}`)}</Link>,
            key: mainKioskAccess.key,
            icon: mainKioskAccess.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_product', true)
        ) && {
            label: <Link to={mainProducts.url}>{t(`menuoption.${mainProducts.label}`)}</Link>,
            key: mainProducts.key,
            icon: mainProducts.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_partnership', true) ||
            PermissionsAuth.checkPermissions('menu', 'view_newsfeed', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_notice', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_social', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_topwinning', true)
        ) && {
            label: t("menuoption.announcement"),
            key: 'announcementsettings',
            icon: <Icon icon="mingcute:announcement-line" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_partnership', true) &&
                {
                    label: <Link to={mainPartnerships.url}>{t(`menuoption.${mainPartnerships.label}`)}</Link>,
                    key: mainPartnerships.key,
                    icon: mainPartnerships.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_newsfeed', true) &&
                {
                    label: <Link to={mainNewsFeed.url}>{t(`menuoption.${mainNewsFeed.label}`)}</Link>,
                    key: mainNewsFeed.key,
                    icon: mainNewsFeed.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_notice', true) &&
                {
                    label: <Link to={mainNotices.url}>{t(`menuoption.${mainNotices.label}`)}</Link>,
                    key: mainNotices.key,
                    icon: mainNotices.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_social', true) &&
                {
                    label: <Link to={mainSocials.url}>{t(`menuoption.${mainSocials.label}`)}</Link>,
                    key: mainSocials.key,
                    icon: mainSocials.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_topwinning', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainTopWinning.url}>{t(`menuoption.${mainTopWinning.label}`)}</Link>,
                    key: mainTopWinning.key,
                    icon: mainTopWinning.icon,
            },
            ],
        },
        (
            (
                PermissionsAuth.checkPermissions('menu', 'view_couponbatch', true) ||
                PermissionsAuth.checkPermissions('menu', 'view_coupontag', true) || 
                PermissionsAuth.checkPermissions('menu', 'view_coupon', true)
            ) && import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label: t("menuoption.coupons"),
            key: 'couponbatchssetting',
            icon: <Icon icon="mdi:coupon" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_couponbatch', true) &&
                {
                    label: <Link to={mainCouponBatchs.url}>{t(`menuoption.${mainCouponBatchs.label}`)}</Link>,
                    key: mainCouponBatchs.key,
                    icon: mainCouponBatchs.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_coupontag', true) &&
                {
                    label: <Link to={mainCouponTags.url}>{t(`menuoption.${mainCouponTags.label}`)}</Link>,
                    key: mainCouponTags.key,
                    icon: mainCouponTags.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_coupon', true) &&
                {
                    label: <Link to={mainCoupons.url}>{t(`menuoption.${mainCoupons.label}`)}</Link>,
                    key: mainCoupons.key,
                    icon: mainCoupons.icon,
                },
            ],
        },
        (
            (
                PermissionsAuth.checkPermissions('menu', 'view_dailycheckin', true) || 
                PermissionsAuth.checkPermissions('menu', 'view_luckywheelslots', true) || 
                PermissionsAuth.checkPermissions('menu', 'view_luckywheelhistory', true) ||
                PermissionsAuth.checkPermissions('menu', 'view_mission', true) 
            ) && import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label: t("menuoption.missions"),
            key: 'checkinsettings',
            icon: <Icon icon="el:check" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_dailycheckin', true) &&
                {
                    label: <Link to={mainDailyCheckIn.url}>{t(`menuoption.${mainDailyCheckIn.label}`)}</Link>,
                    key: mainDailyCheckIn.key,
                    icon: mainDailyCheckIn.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_luckywheelslots', true) &&
                {
                    label: <Link to={mainLuckyWheelSlots.url}>{t(`menuoption.${mainLuckyWheelSlots.label}`)}</Link>,
                    key: mainLuckyWheelSlots.key,
                    icon: mainLuckyWheelSlots.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_luckywheelhistory', true) &&
                {
                    label: <Link to={mainLuckyWheelHistory.url}>{t(`menuoption.${mainLuckyWheelHistory.label}`)}</Link>,
                    key: mainLuckyWheelHistory.key,
                    icon: mainLuckyWheelHistory.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_mission', true) &&
                {
                    label: <Link to={mainMissions.url}>{t(`menuoption.${mainMissions.label}`)}</Link>,
                    key: mainMissions.key,
                    icon: mainMissions.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_unclaim', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK 
        ) && {
            label: <Link to={mainUnclaims.url}>{t(`menuoption.${mainUnclaims.label}`)}</Link>,
            key: mainUnclaims.key,
            icon: mainUnclaims.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_skinconfig', true)
        ) && {
            label: <Link to={mainSkinConfig.url}>{t(`menuoption.${mainSkinConfig.label}`)}</Link>,
            key: mainSkinConfig.key,
            icon: mainSkinConfig.icon,
        },
        (
            import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label: t("menuoption.features"),
            key: 'featuresettings',
            icon: mainFeatures.icon,
            children: [
                {
                    label: <Link to={mainFeatures.url}>{t(`menuoption.${mainFeatures.label}`)}</Link>,
                    key: mainFeatures.key,
                    icon: mainFeatures.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_productmessage', true) &&
                {
                    label: <Link to={mainProductMessage.url}>{t(`menuoption.${mainProductMessage.label}`)}</Link>,
                    key: mainProductMessage.key,
                    icon: mainProductMessage.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_productmessage', true) &&
                {
                    label: <Link to={mainProductStarted.url}>{t(`menuoption.${mainProductStarted.label}`)}</Link>,
                    key: mainProductStarted.key,
                    icon: mainProductStarted.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_gameaccount', true) &&
                {
                    label: <Link to={mainGameAccountSearch.url}>{t(`menuoption.${mainGameAccountSearch.label}`)}</Link>,
                    key: mainGameAccountSearch.key,
                    icon: mainGameAccountSearch.icon,
                },
            ],
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_gamelist', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label: <Link to={mainGameList.url}>{t(`menuoption.${mainGameList.label}`)}</Link>,
            key: mainGameList.key,
            icon: mainGameList.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_mail', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK
        ) && {
            label: <Link to={mainMailbox.url}>{t(`menuoption.${mainMailbox.label}`)}</Link>,
            key: mainMailbox.key,
            icon: mainMailbox.icon,
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_namecheapconfig', true)
        ) && {
            label: t("menuoption.domain"),
            key: 'domainsettings',
            icon: <Icon icon="material-symbols:domain-verification-rounded" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_cloudflareconfig', true) &&
                {
                    label: <Link to={mainCloudflare.url}>{t(`menuoption.${mainCloudflare.label}`)}</Link>,
                    key: mainCloudflare.key,
                    icon: mainCloudflare.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_namecheapconfig', true) &&
                {
                    label: <Link to={mainNameCheap.url}>{t(`menuoption.${mainNameCheap.label}`)}</Link>,
                    key: mainNameCheap.key,
                    icon: mainNameCheap.icon,
                },
            ]
        },
        (
            PermissionsAuth.checkPermissions('menu', 'view_site', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_currency', true) || 
            PermissionsAuth.checkPermissions('menu', 'view_environvar', true)|| 
            PermissionsAuth.checkPermissions('menu', 'view_rank', true)
        ) && {
            label: t("menuoption.adminsetting"),
            key: 'adminsetting',
            icon: <Icon icon="grommet-icons:user-admin" width="1.2rem" height="1.2rem"  style={{color: "white"}} />,
            children: [
                PermissionsAuth.checkPermissions('menu', 'view_site', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainSites.url}>{t(`menuoption.${mainSites.label}`)}</Link>,
                    key: mainSites.key,
                    icon: mainSites.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_currency', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainCurrencies.url}>{t(`menuoption.${mainCurrencies.label}`)}</Link>,
                    key: mainCurrencies.key,
                    icon: mainCurrencies.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_environvar', true) &&
                {
                    label: <Link to={mainEnvVar.url}>{t(`menuoption.${mainEnvVar.label}`)}</Link>,
                    key: mainEnvVar.key,
                    icon: mainEnvVar.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_rank', true) && import.meta.env.VITE_MODULES_EXCLUDED_JQK &&
                {
                    label: <Link to={mainRanking.url}>{t(`menuoption.${mainRanking.label}`)}</Link>,
                    key: mainRanking.key,
                    icon: mainRanking.icon,
                },
                PermissionsAuth.checkPermissions('menu', 'view_pwaconfig', true) && 
                {
                    label: <Link to={mainPWAConfig.url}>{t(`menuoption.${mainPWAConfig.label}`)}</Link>,
                    key: mainPWAConfig.key,
                    icon: mainPWAConfig.icon,
                },
            ]
        },
    ]
    return menuPermission
}