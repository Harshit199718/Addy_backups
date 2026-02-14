import Dashboard from '../pages/dashboard/dashboard';
import MerchantBankAccountList from '../pages/merchantbankaccounts/merchantBankAccountList';
import BankList from '../pages/bank/bankList';
import EnvVarList from '../pages/envVar/envVarList';
import PlayerList from '../pages/player/PlayerList';
import TransactionList from '../pages/transaction/transactionList';
import NewsFeedList from '../pages/newsfeed/newsfeedList'
import NoticesList from '../pages/notices/noticesList'
import CashTransferList from '../pages/cashtransfer/cashTransferList';
import SocialsList from '../pages/socials/socialsList'
import PromotionGroupList from '../pages/promotiongroup/promotionGroupList'
import PromotionList from '../pages/promotion/promotionList';
import ProductsList from '../pages/products/productsList'
import SitesList from '../pages/sites/sitesList';
import MessageLogsList from '../pages/messagelogs/messageLogsList';
import CurrenciesList from '../pages/currencies/currenciesList';
import TopWinningList from '../pages/topwinning/topWinningList';
import LuckyWheelSlotsList from '../pages/luckywheelslots/luckyWheelSlotsList';
import UnclaimsList from '../pages/unclaims/unclaimsList';
import DailyCheckIn from '../pages/dailycheckin/dailyCheckIn';
import LuckyWheelHistoryList from '../pages/luckywheelhistory/luckyWheelHistoryList';
import SupportList from '../pages/support/supportList';
import SkinConfig from '../pages/skinconfig/skinConfig';
import MessageTemplateList from '../pages/messagetemplate/messageTemplateList';
import UserGroupList from '../pages/usergroup/userGroupList';
import ReportList from '../pages/report/reportList';
import RankingList from '../pages/ranking/rankingList';
import KioskAccessList from '../pages/kioskaccess/kioskAccessList';
import ProductMessageList from '../pages/productmessage/productMessageList';
import FeaturesList from '../pages/features/featuresList';
import GameListList from '../pages/gamelist/gameListList';
import GameAccountSearchList from '../pages/gameaccountsearch/gameAccountSearchList';
import RegistrationsList from '../pages/registrations/registrationsList';
import MailboxList from '../pages/mailbox/mailboxList';
import ProductStartedList from '../pages/products(started)/productStartedList';
import AffiliatesList from '../pages/affiliates/affiliatesList';
import PartnershipsList from '../pages/partnerships/partnershipsList';
import Livechat from '../pages/livechat/livechat';
import ReferralRewardList from '../pages/singlelevelreward/referral/referralList'
import RebateRewardList from '../pages/singlelevelreward/rebate/rebateList'
import ChipsRebateList from '../pages/singlelevelreward/chipsrebate/chipsRebateList';
import BonusesList from '../pages/singlelevelreward/bonuses/bonusesList';
import MultiReferralRewardList from '../pages/multilevelreward/multireferral/multiReferralList';
import MultiRebateList from '../pages/multilevelreward/multirebate/multiRebateList';
import MultiChipsRebateList from '../pages/multilevelreward/multichipsrebate/multiChipsRebateList';
import MultiBonusesList from '../pages/multilevelreward/multibonuses/multiBonusesList';
import CouponBatchsList from '../pages/couponbatchs/couponBatchsList';
import CouponsList from '../pages/coupons/couponsList';
import CouponsTagsList from '../pages/coupontags/couponsTagsList';
import NamecheapConfig from '../pages/namecheap/namecheapConfig';
import CloudflareConfig from '../pages/cloudflare/cloudflareConfig';
import PWAConfig from '../pages/pwaconfig/pwaConfig';
import MissionsList from '../pages/missions/missionsList';
import ReportBalanceSummaryTable from '../pages/report/reportItem/reportBalanceSummaryTable';

const routes = [
    { path: "/", component: Dashboard },
    { path: "player", component: PlayerList },
    { path: "transactions", component: TransactionList },
    { path: "cashtransfer", component: CashTransferList },
    { path: "banks", component: BankList },
    { path: "merchantbankaccounts", component: MerchantBankAccountList },
    { path: "environmentvariables", component: EnvVarList },
    { path: "newsfeed", component: NewsFeedList },
    { path: "notices", component: NoticesList },
    { path: "socials", component: SocialsList },
    { path: "promotiongroup", component: PromotionGroupList },
    { path: "promotion", component: PromotionList },
    { path: "products", component: ProductsList },
    { path: "messagelogs", component: MessageLogsList },
    { path: "currencies", component: CurrenciesList },
    { path: "sites", component: SitesList },
    { path: "topwinning", component: TopWinningList },
    { path: "luckywheelslots", component: LuckyWheelSlotsList },
    { path: "unclaims", component: UnclaimsList },
    { path: "dailycheckin", component: DailyCheckIn },
    { path: "skinconfig", component: SkinConfig },
    { path: "luckywheelhistory", component: LuckyWheelHistoryList },
    { path: "support", component: SupportList },
    { path: "messagetemplate", component: MessageTemplateList },
    { path: "usergroups", component: UserGroupList },
    { path: "report", component: ReportList },
    { path: "ranking", component: RankingList },
    { path: "kioskaccess", component: KioskAccessList },
    { path: "productmessage", component: ProductMessageList },
    { path: "features", component: FeaturesList },    
    { path: "gamelist", component: GameListList },
    { path: "gameaccountsearch", component: GameAccountSearchList },
    { path: "registrations", component: RegistrationsList },
    { path: "mailbox", component: MailboxList },
    { path: "gameaccountsstarted", component: ProductStartedList },
    { path: "affiliates", component: AffiliatesList },
    { path: "referral", component: ReferralRewardList },
    { path: "rebate", component: RebateRewardList },
    { path: "bonuses", component: BonusesList },
    { path: "chipsrebate", component: ChipsRebateList },
    { path: "partnerships", component: PartnershipsList },
    { path: "livechat/:username?/:site?", component: Livechat },
    { path: "multireferral", component: MultiReferralRewardList },
    { path: "multirebate", component: MultiRebateList },
    { path: "multichipsrebate", component: MultiChipsRebateList },
    { path: "multibonuses", component: MultiBonusesList },
    { path: "couponbatches", component: CouponBatchsList },
    { path: "coupons", component: CouponsList },
    { path: "coupontags", component: CouponsTagsList },
    { path: "namecheapconfig", component: NamecheapConfig },
    { path: "cloudflareconfig", component: CloudflareConfig },
    { path: "pwaconfig", component: PWAConfig },
    { path: "missions", component: MissionsList },
    { path: "balancesummary", component: ReportBalanceSummaryTable },
  ];
  
export default routes;