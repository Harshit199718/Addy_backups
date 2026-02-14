import { Color } from "./MainTab/color"
import { Deposit } from "./MainPages/deposit"
import { Home } from "./MainPages/home"
import { Marquee } from "./MainPages/MainHome/marquee"
import { Pages } from "./MainTab/pages"
import { Wallet } from "./MainPages/MainHome/wallet"
import { Banner } from "./MainPages/MainHome/banner"
import { Referral } from "./MainPages/MainHome/referral"
import { LiveTable } from "./MainPages/MainHome/liveTable"
import { ProductCategory } from "./MainPages/MainProduct/productCategory"
import { Jackpot } from "./MainPages/MainHome/jackpot"
import { Footer } from "./MainPages/MainHome/footer"
import { Withdraw } from "./MainPages/withdraw"
import { Promotion } from "./MainPages/promotion"
import { ClickToClaim } from "./MainPages/clicktoclaim"
import { Profile } from "./MainPages/profile"
import { Reward } from "./MainPages/reward"
import { Component } from "./MainPages/MainReward/component"
import { Rebate } from "./MainPages/MainReward/rebate"
import { LuckyWheel } from "./MainPages/MainReward/luckywheel"
import { FooterMenu } from "./MainTab/footermenu"
import { SideMenu } from "./MainTab/sidemenu"
import { Product } from "./MainPages/product"
import { RTPSlot } from "./MainPages/MainProduct/rtpSlots"
import { General } from "./MainTab/general"
import { Region } from "./MainGeneral/region"
import { ProductSetting } from "./MainPages/MainProduct/productSetting"
import { Subline } from "./MainPages/subline"
import { TopWinning } from "./MainPages/topWinning"
import { Others } from "./MainGeneral/others"
import { SignInOut } from "./MainPages/signinOut"
import { LiveChat } from "./MainPages/MainOthers/liveChat"
import { History } from "./MainPages/MainOthers/history"
import { OthersPage } from "./MainPages/othersPage"
import { BankAccount } from "./MainPages/MainOthers/bankaccount"
import { Layout } from "./MainGeneral/layout"
import { VIPRanking } from "./MainPages/MainOthers/vipranking"
import DesktopMobileLayout from "./MainTab/Layout/DesktopMobileLayout"
import { Partnership } from "./MainPages/partnerships"
import { DepositConfig } from "./MainPages/MainDeposit/depositconfig"
import { DepositQuickpay } from "./MainPages/MainDeposit/quickpay"
import { DepositDGPay } from "./MainPages/MainDeposit/dgpay"
import { DepositSurepay } from "./MainPages/MainDeposit/surepay"
import { Notification } from "./MainPages/MainOthers/notification"
import { Leaderboard } from "./MainPages/MainHome/leaderboard"

export const mainTab = (apiErrors, initialValues, watchValue, t) => {
    return [
        {
            label: t(`skinconfig.Pages`),
            key: 'mainTabPages',
            // forcerender: true,
            children: <Pages apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Color`),
            key: 'mainTabColor',
            // forcerender: true,
            children: <Color apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Footer Menu`),
            key: 'mainTabFooterMenu',
            // forcerender: true,
            children: <FooterMenu apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Side Menu`),
            key: 'mainTabSideMenu',
            // forcerender: true,
            children: <SideMenu apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.General`),
            key: 'mainTabGeneral',
            // forcerender: true,
            children: <General apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Site Layout`),
            key: 'mainTabDesktopMobileLayout',
            // forcerender: true,
            children: <DesktopMobileLayout apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainPages = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Home`),
            key: 'mainHome',
            // forcerender: true,
            children: <Home apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Product`),
            key: 'mainProduct',
            // forcerender: true,
            children: <Product apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Deposit`),
            key: 'mainDeposit',
            // forcerender: true,
            children: <Deposit apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Withdraw`),
            key: 'mainWithdraw',
            // forcerender: true,
            children: <Withdraw apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Promotion`),
            key: 'mainPromotion',
            // forcerender: true,
            children: <Promotion apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Click To Claim`),
            key: 'mainClickToClaim',
            // forcerender: true,
            children: <ClickToClaim apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Profile`),
            key: 'mainProfileTab',
            // forcerender: true,
            children: <Profile apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        ...import.meta.env.VITE_MODULES_EXCLUDED_JQK ? [
            {
                label: t(`skinconfig.Reward`),
                key: 'mainReward',
                // forcerender: true,
                children: <Reward apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
            },
            {
                label: t(`skinconfig.Subline`),
                key: 'mainSubline',
                // forcerender: true,
                children: <Subline apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
            },
        ]: [],
        {
            label: t(`skinconfig.Partnership`),
            key: 'mainPartnership',
            // forcerender: true,
            children: <Partnership apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Authentication`),
            key: 'mainSignInOut',
            // forcerender: true,
            children: <SignInOut apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Others`),
            key: 'mainOthers',
            // forcerender: true,
            children: <OthersPage apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}


export const mainHome = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Marquee (News Feed)`),
            key: 'mainHomeMarque',
            // forcerender: true,
            children: <Marquee apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Member Auth`),
            key: 'mainHomeWallet',
            // forcerender: true,
            children: <Wallet apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Banner`),
            key: 'mainHomeBanner',
            // forcerender: true,
            children: <Banner apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Referral`),
            key: 'mainHomeReferral',
            // forcerender: true,
            children: <Referral apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Live Table`),
            key: 'mainHomeLiveTable',
            // forcerender: true,
            children: <LiveTable apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Leaderboard`),
            key: 'mainHomeLeaderboard',
            // forcerender: true,
            children: <Leaderboard apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Jackpot`),
            key: 'mainHomeJackpot',
            // forcerender: true,
            children: <Jackpot apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Footer`),
            key: 'mainHomeFooter',
            // forcerender: true,
            children: <Footer apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainProduct = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Category`),
            key: 'mainProductCategory',
            // forcerender: true,
            children: <ProductCategory apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.RTP Rate (Slot)`),
            key: 'mainProductRTP',
            // forcerender: true,
            children: <RTPSlot apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Settings`),
            key: 'mainProductSettings',
            // forcerender: true,
            children: <ProductSetting apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainDeposit = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Deposit Config`),
            key: 'mainDepositConfig',
            // forcerender: true,
            children: <DepositConfig apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Surepay`),
            key: 'mainDepositSurepay',
            // forcerender: true,
            children: <DepositSurepay apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Quickpay`),
            key: 'mainDepositQuickpay',
            // forcerender: true,
            children: <DepositQuickpay apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.DGPay`),
            key: 'mainDepositDGPay',
            // forcerender: true,
            children: <DepositDGPay apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainReward = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Component`),
            key: 'mainRewardComponent',
            // forcerender: true,
            children: <Component apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Rewards (Yesterday Deposit)`),
            key: 'mainRewardRewards',
            // forcerender: true,
            children: <Rebate apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.LuckyWheel`),
            key: 'mainRewardLuckyWheel',
            // forcerender: true,
            children: <LuckyWheel apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainGeneral = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Region`),
            key: 'mainGeneralRegion',
            // forcerender: true,
            children: <Region apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Layout`),
            key: 'mainGeneralLayout',
            // forcerender: true,
            children: <Layout apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Others`),
            key: 'mainGeneralOthers',
            // forcerender: true,
            children: <Others apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}

export const mainOthersPage = ({ apiErrors, initialValues, watchValue, t }) => {
    return [
        {
            label: t(`skinconfig.Live Chat`),
            key: 'mainOthersPageLiveChat',
            // forcerender: true,
            children: <LiveChat apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        ...import.meta.env.VITE_MODULES_EXCLUDED_JQK ? [
            {
                label: t(`skinconfig.History`),
                key: 'mainOthersPageHistory',
                // forcerender: true,
                children: <History apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
            },
            {
                label: t(`skinconfig.Top Winning`),
                key: 'mainOthersPageTopWinning',
                // forcerender: true,
                children: <TopWinning apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
            },
            {
                label: t(`skinconfig.Bank Account`),
                key: 'mainOthersPageBankAccount',
                // forcerender: true,
                children: <BankAccount apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
            },
        ]: [],
        {
            label: t(`skinconfig.VIP Ranking`),
            key: 'mainOthersPageVIPRanking',
            // forcerender: true,
            children: <VIPRanking apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
        {
            label: t(`skinconfig.Notification`),
            key: 'mainOthersPageNotification',
            // forcerender: true,
            children: <Notification apiErrors={apiErrors} initialValues={initialValues} watchValue={watchValue} t={t} />
        },
    ]
}