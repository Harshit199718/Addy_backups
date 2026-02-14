import PermissionsAuth from "../components/permissionAuth"

export const holdWalletTransferType = (t) => {
    return (
        [
            { value: 'SWI', label: t('customoption.To Hold Wallet') },
            { value: 'SWO', label: t('customoption.Out from Hold Wallet') },
        ]
    )
}

export const bankType = (t) => {
    return (
        [
            { value: 'B', label: t('customoption.Bank') },
            { value: 'EW', label: t('customoption.E-Wallet') },
        ]
    )
}

export const envVarType = (t) => {
    return (
        [
            { value: 'str', label: t('customoption.String') },
            { value: 'int', label: t('customoption.Integer') },
            { value: 'dec', label: t('customoption.Decimal') },
            { value: 'bool', label: t('customoption.Boolean') }
        ]
    )
}

export const activeInactive = (t) => {
    return (
        [
            { value: '', label: t('customoption.All') },
            { value: true, label: t('customoption.Active') },
            { value: false, label: t('customoption.Inactive') },
        ]
    )
}

export const creditType = (t) => {
    return (
        [
            { value: 'CH', label: t('customoption.Chips') },
            { value: 'CA', label: t('customoption.Cash') },
        ]
    )
}

export const isDiscarded = (t) => {
    return (
        [
            { value: '', label: t('customoption.All') },
            { value: true, label: t('customoption.Discarded') },
            { value: false, label: t('customoption.Not Discarded') },
        ]
    )
}

export const transactionCreateType = (t) => {
    return (
        [
            { value: 'deposit', label: t('customoption.Deposit') },
            { value: 'withdrawal', label: t('customoption.Withdrawal') },
            { value: 'bonus', label: 'Bonus' },
            { value: 'droptransactiondeposit', label: t('customoption.Drop Transaction Deposit') },
            { value: 'droptransactiongames', label: t('customoption.Drop Transaction Games') },
        ]
    )
}

export const transactionState = (t) => {
    return (
        [
            { value: 'approved', label: t('customoption.Approved') },
            { value: 'pending', label: t('customoption.Pending') },
            { value: 'rejected', label: t('customoption.Rejected') },
        ]
    )
}

export const transactionStateListing = (t) => {
    return (
        [
            { value: 'approved', label: t('customoption.Approved') },
            { value: 'pending', label: t('customoption.Pending') },
            { value: 'rejected', label: t('customoption.Rejected') },
            { value: 'deleted', label: t('customoption.Deleted') },
            { value: 'error', label: t('customoption.Error') },
        ]
    )
}

export const depositType = (t) => { 
    return { value: "'CD', 'IB', 'MD', 'KD', 'PG', 'EW', 'AG', 'TEC'", label: t('customoption.1. Deposit') }
}
    
export const withdrawalType = (t) => {
    return { value: "'WD', 'MW'", label: t('customoption.2. Withdrawal') }
}

export const bonusType = (t) => {
    return { value: "'BT', 'BM', 'BC', 'BL', 'BCP'", label: t('customoption.3. Bonus') }
}

export const penaltyType = (t) => {
    return { value: "'PN', 'PNAG'", label: t('customoption.4. Penalty') }
}

export const rebateType = (t) => {
    return { value: "'RB', 'MRB'", label: t('customoption.5. Rebate') }
}

export const referralType = (t) => {
    return { value: "'RF', 'MRF'", label: t('customoption.6. Referral') }
}

export const gameLogType = (t) => {
    return { value: "'TO', 'TD'", label: t('customoption.7. To/Out Game Log') }
}

export const agentTransferCreditType = (t) => {
    return { value: "'TC'", label: t('customoption.8. Agent Transfer Credit') }
}

export const dropTransactionDepositType = (t) => {
    return { value: "'DTD'", label: t('customoption.9. Drop Transaction Deposit') }
}

export const dropTransactionGamesType = (t) => {
    return { value: "'DTG'", label: t('customoption.10. Drop Transaction Games') }
}

export const manualTransactionType = (t) => {
    const options = [
        PermissionsAuth.checkPermissions('undefined', 'add_deposit', { value: "MD", label: t("customoption.1. Manual Deposit") }),
        PermissionsAuth.checkPermissions('undefined', 'add_withdrawal', { value: "MW", label: t("customoption.2. Manual Withdrawal") }),
        PermissionsAuth.checkPermissions('undefined', 'add_bonus', { value: "BM", label: t("customoption.3. Manual Bonus") }),
        PermissionsAuth.checkPermissions('undefined', 'add_droptransactiondeposit', { value: "DTD", label: t('customoption.4. Drop Transaction Deposit') }),
        PermissionsAuth.checkPermissions('undefined', 'add_droptransactiongame', { value: "DTG", label: t('customoption.5. Drop Transaction Games') }),
    ].filter(Boolean);

    return options
} 

export const transactionType = (t) => {
    const options = [
        PermissionsAuth.checkPermissions('undefined', 'view_deposit', depositType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_withdrawal', withdrawalType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_bonus', bonusType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_penalty', penaltyType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_rebate', rebateType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_rebate', referralType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_transaction', gameLogType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_transfercredit', agentTransferCreditType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_droptransactiondeposit', dropTransactionDepositType(t)),
        PermissionsAuth.checkPermissions('undefined', 'view_droptransactiongame', dropTransactionGamesType(t)),
    ].filter(Boolean);
    return options
}

export const noticesType = (t) => {
    return (
        [
            { value: 'static', label: t('customoption.Static') },
            { value: 'popup', label: t('customoption.Popup') },
        ]
    )
}

export const socialsProvider = (t) => {
    return (
        [
            { value: 'mobile', label: t('customoption.Mobile') },
            { value: 'whatsapp', label: t('customoption.WhatsApp') },
            { value: 'telegram', label: t('customoption.Telegram') },
            { value: 'wechat', label: t('customoption.Wechat') },
            { value: 'line', label: t('customoption.Line') },
        ]
    )
}

export const cashtransferType = (t) => {
    return (
        [
            { value: 'ic', label: t('customoption.Intercompany') },
            { value: 'ci', label: t('customoption.Cash In') },
            { value: 'co', label: t('customoption.Cash Out') },
        ]
    )
}

export const promotionBonusType = (t) => {
    return (
        [
            { value: 'CA', label: t('customoption.Cash') },
            { value: 'CH', label: t('customoption.Chips') },
        ]
    )
}

export const promotionType = (t) => {
    return (
        [
            { value: 'CC', label: t('customoption.Click to Claim') },
            { value: 'DF', label: t('customoption.Default') },
            { value: 'RR', label: t('customoption.Redeem') },
            { value: 'CPC', label: t('customoption.Classic Promotion Claim') },
        ]
    )
}

export const turnoverRolloverType = (t) => {
    return (
        [
            { value: 'TO', label: t('customoption.Turnover') },
            { value: 'RO', label: t('customoption.Rollover') },
        ]
    )
}

export const promotionCategoryChoices = (t) => {
    return (
        [
            { value: "NM", label: t("customoption.New Member") },
            { value: "CA", label: t("customoption.Casino (Live Game)") },
            { value: "SB", label: t("customoption.Sportsbooks") },
            { value: "SL", label: t("customoption.Slots") },
            { value: "BO", label: t("customoption.Bonus") },
            { value: "OT", label: t("customoption.Others") },
        ]
    )
}

export const ctcTemplateChoices = (t) => {
    return (
        [
            { value: "freestyle", label: t("customoption.Free Style (Customize your own)") },
            { value: "yesterdayreward", label: t("customoption.Yesterday Reward") },
            { value: "weeklyrebate", label: t("customoption.Weekly Rebate") },
            { value: "redpacket", label: t("customoption.Red Packet (Amt * Quantity)") },
            { value: "coupon", label: t("customoption.Coupon") },
            { value: "referral", label: t("customoption.Referral") },
            { value: "newregister", label: t("customoption.New Register Member") },
            { value: "luckywheel", label: t("customoption.Lucky Wheel") },
        ]
    )
}

export const dayChoices = (t) => {
    return (
        [
            { value: '0', label: t('customoption.Monday') },
            { value: '1', label: t('customoption.Tuesday') },
            { value: '2', label: t('customoption.Wednesday') },
            { value: '3', label: t('customoption.Thursday') },
            { value: '4', label: t('customoption.Friday') },
            { value: '5', label: t('customoption.Saturday') },
            { value: '6', label: t('customoption.Sunday') },
        ]
    )
}

export const recurrenceFrequencyChoices = (t) => {
    return (
        [
            { value: 'daily', label: t('customoption.Daily') },
            { value: 'weekly', label: t('customoption.Weekly') },
            { value: 'monthly', label: t('customoption.Monthly') },
        ]
    )
}

export const promotionRewardType = (t) => {
    return (
        [
            { value: "RBD", label: t("customoption.Rebate by Deposit") },
            { value: "RBT", label: t("customoption.Rebate by Turnover") },
            { value: "RFD", label: t("customoption.Referral by Deposit") },
            { value: "RFT", label: t("customoption.Referral by Turnover") },
        ]
    )
}

export const productsLive = (t) => {
    return (
        [
            { value: '', label: t('customoption.All') },
            { value: true, label: t('customoption.Is Live') },
            { value: false, label: t('customoption.Not Live') }
        ]
    )
}

export const productsCategory = (t) => {
    return (
        [
            { value: 'card', label: t('customoption.Card') },
            { value: 'casino', label: t('customoption.Casino') },
            { value: 'cockfight', label: t('customoption.CockFight') },
            { value: 'esports', label: t('customoption.eSports') },
            { value: 'fishing', label: t('customoption.Fishing') },
            { value: 'lotto', label: t('customoption.Lotto') },
            { value: 'poker', label: t('customoption.Poker') },
            { value: 'slots', label: t('customoption.Slots') },
            { value: 'sportsbook', label: t('customoption.Sportsbook') }
        ]
    )
}

export const productsLaunchType = (t) => {
    return (
        [
            { value: 'app', label: t('customoption.App') },
            { value: 'h5', label: t('customoption.H5') },
        ]
    )
}

export const productCreditType = (t) => {
    return (
        [
            { value: 'CH', label: t('customoption.Chips') },
            { value: 'CA', label: t('customoption.Cash') },
            { value: 'CC', label: t('customoption.Cash & Chips') },
        ]
    )
}

export const productURLType = (t) => {
    return (
        [
            { value: 'DEFAULT', label: t('customoption.DEFAULT') },
            { value: 'EZTECH88', label: t('customoption.EZTECH88') },
            { value: 'DIRECT', label: t('customoption.DIRECT (Product Category)') },
        ]
    )
}

export const luckyWheelSlotsPriceType = (t) => {
    return (
        [
            { value: "BG", label: t("customoption.Big") },
            { value: "NM", label: t("customoption.Normal") },
            { value: "SM", label: t("customoption.Small") },
        ]
    )
}

export const luckyWheelSlotsBonusType = (t) => {
    return (
        [
            { value: "PZ", label: t("customoption.Prize") },
            { value: "CA", label: t("customoption.Cash") },
            { value: "CH", label: t("customoption.Chips") },
        ]
    )
}

export const unclaimType = (t) => {
    return (
        [
            { value: false, label: t('customoption.Unclaim') },
            { value: true, label: t('customoption.Claimed') },
        ]
    )
}

export const luckyWheelHistoryBonusType = (t) => {
    return (
        [
            { value: "CA", label: t("customoption.Cash") },
            { value: "CH", label: t("customoption.Chips") },
        ]
    )
}

export const supportType = (t) => {
    return (
        [
            { value: "PG", label: t('customoption.Payment Gateway') },
            { value: "EW", label: t('customoption.E-Wallet') },
            { value: "AG", label: t('customoption.Agent') },
            { value: "N", label: t('customoption.Support') },
        ]
    )
}

export const messageTemplateType = (t) => {
    return (
        [
            { value: 'MS', label: t('customoption.Message') },
            { value: 'WA', label: t('customoption.WhatsApp') },
        ]
    )
}

export const rankingOption = (t) => {
    return (
        [
            { value: 'bronze', label: t('customoption.Bronze') },
            { value: 'silver', label: t('customoption.Silver') },
            { value: 'gold', label: t('customoption.Gold') },
            { value: 'platinum', label: t('customoption.Platinum') },
        ]
    )
}

// Skin Config 
export const skinConfigWelcomeBGType = (t) => {
    return (
        [
            { value: "wallet_welcome_bg", label: t("customoption.Background Image") },
            { value: "wallet_welcome_bg_color", label: t("customoption.Background Color") },
        ]
    )
}

export const skinConfigContainerBGType = (t) => {
    return (
        [
            { value: "wallet_container_bg", label: t("customoption.Background Image") },
            { value: "wallet_container_bg_color", label: t("customoption.Background Color") },
        ]
    )
}

export const skinConfigLiveTableType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Deposit & Withdrawal)") },
            { value: "2", label: t("customoption.Style 2 (Top 10 Deposit)") },
        ]
    )
}

export const skinConfigJackpotType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (With Border)") },
            { value: "2", label: t("customoption.Style 2 (Image Border)") },
            { value: "3", label: t("customoption.Style 3 (Logo on Left)") },
        ]
    )
}

export const skinConfigDepositType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Horizontal Tab)") },
            { value: "2", label: t("customoption.Style 2 (Vertical Tab)") },
            { value: "3", label: t("customoption.Style 3 (Top Down)") },
        ]
    )
}

export const skinConfigSublineType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Horizontal Button)") },
            { value: "2", label: t("customoption.Style 2 (Vertical Listing)") },
        ]
    )
}

export const skinConfigClickToClaimType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Boxes Style)") },
            { value: "2", label: t("customoption.Style 2 (Classic Promotion Style)") },
        ]
    )
}

export const skinConfigManualDepositType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Classic)") },
            { value: "2", label: t("customoption.Style 2 (Bordered Bank Acc)") },
        ]
    )
}

export const skinConfigPGProviderChoices = (t) => {
    return (
        [
            { value: "easypay", label: t("customoption.Easypay") },
            { value: "easypay_manual_deposit", label: t("customoption.Easypay Manual") },
            { value: "surepay", label: t("customoption.Surepay") },
            { value: "sun2pay", label: t("customoption.Sun2pay") },
            { value: "dgpay", label: t("customoption.DGPay") },
            { value: "gspay", label: t("customoption.GSPay") },
            { value: "quickpay", label: t("customoption.Quickpay") },
            { value: "telcopay", label: t("customoption.Telcopay") },
        ]
    )
}

export const skinConfigEwalletProviderChoices = (t) => {
    return (
        [
            { value: "surepay-ewallet", label: t("customoption.Surepay Ewallet") },
            { value: "dgpay-ewallet", label: t("customoption.DGPay Ewallet") },
            { value: "quickpay-ewallet", label: t("customoption.Quickpay Ewallet") },
        ]     
    )
}

export const skinConfigQuickpayPGChoices = (t) => {
    return (
        [
            { value: "907", label: t("customoption.(VN) Online Banking") },
            { value: "908", label: t("customoption.(VN) Online Transfer") },
        ]
    )
}

export const skinConfigQuickpayEWChoices = (t) => {
    return (
        [
            { value: "909", label: t("customoption.(VN) QRPay") },
            { value: "921", label: t("customoption.(VN) ZaloPay") },
            { value: "923", label: t("customoption.(VN) MomoPay") },
            { value: "926", label: t("customoption.(VN) ViettelPay") },
        ]
    )
}

export const skinConfigDGPayPGChoices = (t) => {
    return (
        [
            { value: "MAYB", label: t("customoption.(MY) Maybank") },
            { value: "CIMB", label: t("customoption.(MY) CIMB Bank") },
            { value: "PBBB", label: t("customoption.(MY) Public Bank") },
            { value: "RHBB", label: t("customoption.(MY) RHB Bank") },
            { value: "HOLB", label: t("customoption.(MY) Hong Leong Bank") },
            { value: "AFIN", label: t("customoption.(MY) Affin Isalamic Bank") },
            { value: "SINA", label: t("customoption.(MY) Bank Simpanan Nasional") },
        ]
    )
}

export const skinConfigDGpayEWChoices = (t) => {
    return (
        [
            { value: "10", label: t("customoption.(ID) Dana") },
            { value: "11", label: t("customoption.(ID) OVO") },
            { value: "12", label: t("customoption.(ID) ShopeePay") },
            { value: "30", label: t("customoption.(ID) Qris") },
        ]
    )
}

export const skinConfigWithdrawalType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (Horizontal Tab)") },
            { value: "2", label: t("customoption.Style 2 (Vertical Tab)") },
        ]
    )
}

export const skinConfigPromoType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 (More Detail & Join Now)") },
            { value: "2", label: t("customoption.Style 2 (More Detail Only)") },
        ]
    )
}

export const skinConfigProfileTabRouteType = (t) => {
    return (
        [
            { value: "home", label: t("customoption.Home") },
            { value: "profile", label: t("customoption.Profile") },
            { value: "promotions", label: t("customoption.Promotions") },
            { value: "app-accounts", label: t("customoption.Game Accounts") },
            { value: "bank-accounts", label: t("customoption.Bank Accounts") },
            { value: "deposit", label: t("customoption.Deposit") },
            { value: "withdraw", label: t("customoption.Withdrawl") },
            { value: "history", label: t("customoption.Order History") },
            { value: "bet-history", label: t("customoption.Bet History") },
            { value: "change-password", label: t("customoption.Change Password") },
            { value: "contactus", label: t("customoption.Contact Us") },
            { value: "downline", label: t("customoption.Referral System") },
            { value: "vip-ranking", label: t("customoption.VIP Ranking") },
        ]
    )
}

export const skinConfigRewardChoices = (t) => {
    return (
        [
            { value: "level", label: t("customoption.Ranking") },
            { value: "checkin", label: t("customoption.Checkin") },
            { value: "spin", label: t("customoption.Lucky Wheel") },
            { value: "redeem", label: t("customoption.Rewards") },
            { value: "message", label: t("customoption.Mailbox") },
            { value: "mission", label: t("customoption.Mission") },
        ]
    )
}

export const skinConfigLuckyWheelType = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Christmas") },
            { value: "2", label: t("customoption.Style 2 - New Year") },
        ]
    )
}

export const skinConfigFooterMenuRouteChoices = (t) => {
    return (
        [
            { value: "home", label: t("customoption.Home") },
            { value: "promotions", label: t("customoption.Promotions") },
            { value: "deposit", label: t("customoption.Deposit") },
            { value: "history", label: t("customoption.History") },
            { value: "contactus", label: t("customoption.Contact Us") },
            { value: "profile", label: t("customoption.Profile") },
            { value: "subline", label: t("customoption.Subline") },
            { value: "rewards", label: t("customoption.Rewards") },
        ]
    )
}

export const skinConfigSideMenuRouteChoices = (t) => {
    return (
        [
            { value: "home", label: t("customoption.Home") },
            { value: "profile", label: t("customoption.Profile") },
            { value: "promotions", label: t("customoption.Promotions") },
            { value: "app-accounts", label: t("customoption.Game Accounts") },
            { value: "bank-accounts", label: t("customoption.Bank Accounts") },
            { value: "deposit", label: t("customoption.Deposit") },
            { value: "withdraw", label: t("customoption.Withdrawl") },
            { value: "history", label: t("customoption.Order History") },
            { value: "bet-history", label: t("customoption.Bet History") },
            { value: "change-password", label: t("customoption.Change Password") },
            { value: "contactus", label: t("customoption.Contact Us") },
            { value: "downline", label: t("customoption.Referral System") },
            { value: "vip-ranking", label: t("customoption.VIP Ranking") },
        ]
    )
}

export const skinConfigSideMenuTogglePosition = (t) => {
    return (
        [
            { value: "left", label: t("customoption.Left") },
            { value: "right", label: t("customoption.Right") },
        ]
    )
}

export const skinConfigSideMenuBackgroundType = (t) => {
    return (
        [
            { value: "menusidebar_bg", label: t("customoption.Image") },
            { value: "menusidebar_bg_color", label: t("customoption.Text") },
        ]
    )
}

export const skinConfigCountryChoices = (t) => {
    return (
        [
            { value: "MY", label: t("customoption.Malaysia") },
            { value: "SG", label: t("customoption.Singapore") },
            { value: "TH", label: t("customoption.Thailand") },
            { value: "ID", label: t("customoption.Indonesia") },
            { value: "AUS", label: t("customoption.Australia") },
            { value: "VN", label: t("customoption.Vietnam") },
        ]
    )
}

export const skinConfigLanguageChoices = (t) => {
    return (
        [
            { value: "en", label: t("customoption.SG English") },
            { value: "my", label: t("customoption.Bahasa Malaysia") },
            { value: "th", label: t("customoption.Thai") },
            { value: "zh", label: t("customoption.Chinese") },
            { value: "id", label: t("customoption.Indonesia Malay") },
            { value: "en-au", label: t("customoption.Aus English") },
            { value: "vn", label: t("customoption.Vietnamese") },
        ]
    )
}

export const skinConfigLanguagePositionChoices = (t) => {
    return (
        [
            { value: "sidebar", label: t("customoption.Sidebar") },
            { value: "header", label: t("customoption.Header") },
        ]
    )
}

export const skinConfigMemberAuthStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Button center") },
            { value: "2", label: t("customoption.Style 2 - Button on left") },
            { value: "3", label: t("customoption.Style 3 - Indonesia") },
            { value: "4", label: t("customoption.Style 4 - Australia") },
            { value: "5", label: t("customoption.Style 5 - Button on left No Wording (Thailand)") },
        ]
    )
}

export const skinConfigBannerStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Flat Swiping") },
            { value: "2", label: t("customoption.Style 2 - 3D Square Image") },
        ]
    )
}

export const skinConfigReferralRowsChoices = (t) => {
    return (
        [
            { value: "1", label: t("customoption.1 x 4") },
            { value: "2", label: t("customoption.2 x 2") },
        ]
    )
}

export const skinConfigSignUpStyle = (t) => {
    return (
        [
            { value: "V1", label: t("customoption.Version 1 - 3 Step (TAC)") },
            { value: "V2", label: t("customoption.Version 2 - 2 Step (TAC)") },
            { value: "V3", label: t("customoption.Version 3 - 1 Step (No TAC)") },
            { value: "V4", label: t("customoption.Version 4 - 2 Step (TAC & Captcha)") },
            { value: "V5", label: t("customoption.Version 5 - 1 Step (No TAC & Bank)") },
        ]
    )
}

export const skinConfigSignInStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Malaysia") },
            { value: "2", label: t("customoption.Style 2 - Indonesia") },
            { value: "3", label: t("customoption.Style 3") },
            { value: "4", label: t("customoption.Style 4") },
        ]
    )
}

export const skinConfigChangePasswordStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1") },
            { value: "2", label: t("customoption.Style 2") },
        ]
    )
}

export const skinConfigHistoryStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Modern") },
            { value: "2", label: t("customoption.Style 2 - Indonesia") },
            { value: "3", label: t("customoption.Style 3 - Classic") },
        ]
    )
}

export const skinConfigProfileStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1 - Malaysia") },
            { value: "2", label: t("customoption.Style 2 - Indonesia") },
            { value: "3", label: t("customoption.Style 3 - Australia") },
        ]
    )
}

export const skinConfigBankAccountStyle = (t) => {
    return (
        [
            { value: "1", label: t("customoption.Style 1") },
            { value: "2", label: t("customoption.Style 2") },
        ]
    )
}

export const skinConfigRootBackgroundType = (t) => {
    return (
        [
            { value: "root_bg", label: t("customoption.Image") },
            { value: "root_bg_color", label: t("customoption.Color") },
        ]
    )
}

export const skinConfigHeaderBackgroundType = (t) => {
    return (
        [
            { value: "header_bg", label: t("customoption.Image") },
            { value: "header_bg_color", label: t("customoption.Color") },
        ]
    )
}

export const skinConfigFooterBackgroundType = (t) => {
    return (
        [
            { value: "footer_bg", label: t("customoption.Image") },
            { value: "footer_bg_color", label: t("customoption.Color") },
        ]
    )
}

export const skinConfigClearSelectedProductModule = (t) => {
    return (
        [
            { value: "D", label: t("customoption.Deposit") },
            { value: "W", label: t("customoption.Withdrawal") },
            { value: "DW", label: t("customoption.Deposit & Withdrawal") },
        ]
    )
}

export const subAgentPrimaryContact = (t) => {
    return (
        [
            { value: '1', label: t('customoption.contact 1') },
            { value: '2', label: t('customoption.contact 2') },
            { value: '3', label: t('customoption.contact 3') },
        ]
    )
}

export const filterBonusesType = (t) => {
    return (
        [
            { value: 'RF', label: t('customoption.Referral') },
            { value: 'RB', label: t('customoption.Rebate') },
        ]
    )
}

export const filterMultiBonusesType = (t) => {
    return (
        [
            { value:"MRB", label: t("customoption.Multilevel Rebate") },
            { value:"MRF", label: t("customoption.Multilevel Referral") },
        ]
    )
}

export const filterChipsRebateType = (t) => {
    return (
        [
            { value: 'RF', label: t('customoption.Referral Chips') },
            { value: 'RB', label: t('customoption.Rebate Chips') },
        ]
    )
}

export const filterMultiChipsRebateType = (t) => {
    return (
        [
            { value:"MRB", label: t("customoption.Multilevel Rebate Chips") },
            { value:"MRF", label: t("customoption.Multilevel Referral Chips") },
        ]
    )
}

export const chipsRebateTtype = (t) => {
    return (
        [
            { value: "DR", label: t("customoption.Debit (Deduct Credit)") },
            { value: "CR", label: t("customoption.Credit (Add Credit)") },
            { value: "RB", label: t("customoption.Rebate Chips") },
            { value: "RF", label: t("customoption.Referral Chips") },
            { value: "MRB", label: t("customoption.Multilevel Rebate Chips") },
            { value: "TIN", label: t("customoption.Chips to Wallet") },
            { value: "TOUT", label: t("customoption.Chips to Game") },
            { value: "FOC", label: t("customoption.FOC Chips") },
        ]
    )
}

export const multiChipsRebateTtype = (t) => {
    return (
        [
            { value: "DR", label: t("customoption.Debit (Deduct Credit)") },
            { value: "CR", label: t("customoption.Credit (Add Credit)") },
            { value: "RB", label: t("customoption.Rebate Chips") },
            { value: "RF", label: t("customoption.Referral Chips") },
            { value: "MRB", label: t("customoption.Multilevel Rebate Chips") },
            { value: "MRF", label: t("customoption.Multilevel Referral Chips") },
            { value: "TIN", label: t("customoption.Chips to Wallet") },
            { value: "TOUT", label: t("customoption.Chips to Game") },
            { value: "FOC", label: t("customoption.FOC Chips") },
        ]
    )
}

export const couponIsClaimed = (t) => {
    return (
        [
            { value: '', label: t('customoption.All') },
            { value: true, label: t('customoption.Is Claimed') },
            { value: false, label: t('customoption.Unclaim') }
        ]
    )
}

export const exportModule = (t) => {
    return (
        [
            { value: 'affiliates', label: t('customoption.Agent Module') },
            { value: 'bethistory', label: t('customoption.Bet History Module') },
            { value: 'banks', label: t('customoption.Banks Module') },
            { value: 'bonuses', label: t('customoption.Bonuses Module') },
            { value: 'cash', label: t('customoption.Cash Transfer Module') },
            { value: 'chipsrebate', label: t('customoption.Chips Rebate Module') },
            { value: 'couponbatchs', label: t('customoption.Coupon Batches Module') },
            { value: 'coupontags', label: t('customoption.Coupon Tags Module') },
            { value: 'coupons', label: t('customoption.Coupons Module') },
            { value: 'currencies', label: t('customoption.Currencies Module') },
            { value: 'customerbankaccounts', label: t('customoption.Customer Bank Accounts Module') },
            { value: 'dailycheckin', label: t('customoption.Daily Checkin Module') },
            { value: 'environmentvariables', label: t('customoption.Environment Variables Module') },
            { value: 'gameaccounts', label: t('customoption.Game Accounts Module') },
            { value: 'gamelist', label: t('customoption.Game List Module') },
            { value: 'kioskaccess', label: t('customoption.Kiosk Access Module') },
            { value: 'luckywheelhistory', label: t('customoption.Lucky Wheel History Module') },
            { value: 'luckywheelslots', label: t('customoption.Lucky Wheel Slots Module') },
            { value: 'mail', label: t('customoption.Mail Module') },
            { value: 'mailbox', label: t('customoption.Mailbox Module') },
            { value: 'merchantbankaccounts', label: t('customoption.Merchant Bank Module') },
            { value: 'messagelogs', label: t('customoption.Message Logs Module') },
            { value: 'messagetemplate', label: t('customoption.Message Template Module') },
            { value: 'multilevelrewards', label: t('customoption.Multi Level Rewards Module') },
            { value: 'newsfeeds', label: t('customoption.News feed Module') },
            { value: 'notices', label: t('customoption.Notices Module') },
            { value: 'partnerships', label: t('customoption.Partnership Module') },
            { value: 'permissions', label: t('customoption.Permissions Module') },
            { value: 'players', label: t('customoption.Players Module') },
            { value: 'productmessage', label: t('customoption.Product Message Module') },
            { value: 'products', label: t('customoption.Products Module') },
            { value: 'promotions', label: t('customoption.Promotions Module') },
            { value: 'promotiongroup', label: t('customoption.Promotion Group Module') },
            { value: 'ranks', label: t('customoption.Ranks Module') },
            { value: 'rankrates', label: t('customoption.Rank Rates Module') },
            { value: 'registrations', label: t('customoption.Registration Module') },
            { value: 'rewards', label: t('customoption.Rewards Module') },
            { value: 'sites', label: t('customoption.Sites Module') },
            { value: 'skinconfig', label: t('customoption.Skin Config Module') },
            { value: 'socials', label: t('customoption.Socials Module') },
            { value: 'supports', label: t('customoption.Supports Module') },
            { value: 'topwinning', label: t('customoption.Top Winning Module') },
            { value: 'deposits', label: t('customoption.Deposits Module') },
            { value: 'droptransactiondeposits', label: t('customoption.Drop Transaction Deposits Module') },
            { value: 'droptransactiongames', label: t('customoption.Drop Transaction Games Module') },
            { value: 'withdrawals', label: t('customoption.Withdrawals Module') },
            { value: 'jqk/transactions', label: t('customoption.JQK Transaction Module') },
            { value: 'unclaim', label: t('customoption.Unclaim Module') },
            { value: 'usergroups', label: t('customoption.User Group Module') },
            { value: 'users', label: t('customoption.Users Module') },
            { value: 'wallets', label: t('customoption.Wallets Module') }
        ]
    )
}

export const exportModuleSorting = (t) => {
    return (
        [
            { value: 'ASC', label: t('customoption.Ascend') },
            { value: 'DESC', label: t('customoption.Descend') },
        ]
    )
}

export const reportOrderByOptions = (t) => {
    return (
        [
            { value: 'new member', label: t('customoption.New Member') },
            { value: 'avg member', label: t('customoption.Average Member') },
            { value: 'deposit', label: t('customoption.Total Deposit') },
            { value: 'withdrawal', label: t('customoption.Total Withdrawal') },
            { value: 'net', label: t('customoption.Total Net (ASC)') },
            { value: 'net desc', label: t('customoption.Total Net (DESC)') }
        ]
    )
}

export const reportOrderByLatestDepositDate = (t) => {
    return (
        [
            { value: true, label: t('customoption.Show Depositor') },
            { value: false, label: t('customoption.Hide Depositor') },
        ]
    )
}

export const playerAdjustmentOptions = (t) => {
    return (
        [
            // { value: 'min_deposit_amt', label: '1. Min Deposit Amount' },
            { value: 'min_withdrawal_amount', label: t('customoption.Min Withdrawal Amount') },
            // { value: 'max_deposit_amt', label: '3. Max Deposit Amount' },
            // { value: 'max_withdrawal_amt', label: '4. Max Withdrawal Amount' },
            { value: 'max_daily_withdrawals', label: t('customoption.Max Daily Withdrawals Amount') },
        ]
    )
}

export const languageOptions = [
    { value: 'en', label: "English" },
    { value: 'zh', label: "中文" },
    { value: 'vn', label: "Tiếng Việt" },
    { value: 'th', label: "แบบไทย" }
]

export const dayType = (t) => {
    const options = [
        { value: '1', label: t('customoption.1. 1 Days') },
        { value: '3', label: t('customoption.2. 3 Days') },
        { value: '7', label: t('customoption.3. 7 Days') },
        { value: '14', label: t('customoption.4. 14 Days') },
        { value: '30', label: t('customoption.5. 30 Days') },
        { value: '3650', label: t('customoption.6. >30 Days') },
    ].filter(Boolean);

    return options
}
export const missionCategory = (t) => {
    return(
        [
            // { value: 'checkin', label: t("customoption.Daily Check In") },
            { value: 'deposit', label: t("customoption.Transaction - Deposit") },
            { value: 'withdrawal', label: t("customoption.Transaction - Withdrawal") },
            // { value: 'bonus', label: t("customoption.Transaction - Bonus") },
            { value: 'turnover', label: t("customoption.Gamelog - Turnover") }
        ]
    )
}

export const missionTemplateChoices = (t) => {
    return (
        [
            { value: "freestyle", label: t("customoption.Free Style (Customize your own)") },
            { value: "depositcount", label: t("customoption.Deposit Count (Free Token)") },
            { value: "depositamount", label: t("customoption.Deposit Amount (Free Token)") },
            { value: "firstdeposit", label: t("customoption.First Deposit (Free Token)") },
            // { value: "depositcountandmindeposit", label: t("customoption.Deposit Count & Min Deposit (Free Token)") },
            { value: "depositcountanddepositamount", label: t("customoption.Deposit Count & Deposit Amount (Free Token)") },
            { value: "withdrawalcount", label: t("customoption.Withdrawal Count (Free Token)") },
            { value: "withdrawalamount", label: t("customoption.Withdrawal Amount (Free Token)") },
            { value: "firstwithdrawal", label: t("customoption.First Withdrawal (Free Token)") },
            // { value: "withdrawalcountandminwithdrawal", label: t("customoption.Withdrawal Count & Min Withdrawal (Free Token)") },
            { value: "withdrawalcountandwithdrawalamount", label: t("customoption.Withdrawal Count & Withdrawal Amount (Free Token)") },
            { value: "turnoverbyproductcategory", label: t("customoption.Turnover by Product Category (Free Token)") },
            { value: "turnoverbyproduct", label: t("customoption.Turnover by Selected Product (Free Token)") },
            // { value: "consecutivecheckin", label: t("customoption.Consecutive Checkin (Free Token)") },
            // { value: "consecutivecheckinwithdeposit", label: t("customoption.Consecutive Checkin with Deposit Amount (Free Coupon)") },
            // { value: "consecutivecheckinwithdepositcount", label: t("customoption.Consecutive Checkin with Deposit Count (Free Coupon)") },
        ]
    )
}

export const missionOfferType = (t) => {
    return (
        [
            { value: "token", label: t("customoption.Token") },
            // { value: "coupon", label: t("customoption.Coupon") },
            // { value: "bonus", label: t("customoption.Bonus") },
        ]
    )
}