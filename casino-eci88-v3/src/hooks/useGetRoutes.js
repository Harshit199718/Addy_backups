import React from 'react'
import useImports from './useImports'
import Activate from "../pages/Auth/Activate";
import LaunchInSite from '../features/Games/LaunchInSite';
import Downline from '../pages/Downline/Downline';
import ContactUs from '../pages/ContactUs/ContactUs';
import GameAccounts from '../pages/GameAccounts/GameAccounts';
// import ChangePassword from '../pages/Auth/ChangePassword';
import VIPRanking from '../pages/VIPRanking';
import BetHistory from '../pages/BetHistory/BetHistory';
import ReferralSystem from '../pages/ReferralSystem/ReferralSystem';
import Reward from '../pages/Reward/Reward';
import Partnership from '../pages/Partnership/Partnership';
import GooglePlay from '../pages/GooglePlay/GooglePlay';
import Mission from '../pages/Mission/Mission';
import Leaderboard from '../pages/Leaderboard';

// const SignIn = React.lazy(() => import("../pages/Auth/SignIn/SignIn1"));
// const Signup = React.lazy(() => import("../pages/Auth/SignUp/SignUp1"));
const VerifyTac = React.lazy(() => import("../pages/Auth/VerifyTac"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword/ForgetPassword"));

const BankAccounts = React.lazy(() =>
  import("../pages/BankAccounts/BankAccounts")
);
// const Deposit = React.lazy(() => import("../pages/Transactions/Deposit"));
const DepositForm = React.lazy(() =>
  import("../pages/Transactions/DepositForm")
);
// const History = React.lazy(() => import("../pages/History"));
const Home = React.lazy(() => import("../pages/Home/Home"));
// const Profile = React.lazy(() => import("../pages/Profile/Profile1"));
// const Promo = React.lazy(() => import("../pages/Promo/Promo"));
// const Withdraw = React.lazy(() => import("../pages/Transactions/Withdraw/Withdraw1"));

function useGetRoutes() {
  const {Deposit, Withdraw, SignIn, SignUp, Profile, Promo, History, ChangePassword, Subline} = useImports()
  return {
    auth: [
      {
        path: "/signin",
        component: SignIn,
      },
      {
        path: "/signup/:referrer?",
        component: SignUp,
      },
      {
        path: "/verify-tac/:id/:mobile?",
        component: VerifyTac,
      },
      {
        path: "/activate/:id/:step?",
        component: Activate,
      },
      {
        path: "/forget-password",
        component: ForgetPassword,
      }
    ],
    protected: [
      {
        path: "/change-password",
        component: ChangePassword,
      },
      {
        path: "/games/:id/:src",
        component: LaunchInSite,
      },
      {
        path: "/deposit",
        component: Deposit,
      },
      {
        path: "/withdraw",
        component: Withdraw,
      },
      {
        path: "/deposit/:id",
        component: DepositForm,
      },
      {
        path: "/deposit/online-transfer/:id",
        component: DepositForm,
      },
      {
        path: "/deposit/ewallet/:id",
        component: Deposit,
      },
      {
        path: "/deposit/ewallet/:id/:accountId/:accountName?",
        component: DepositForm,
      },
      {
        path: "/bank-accounts",
        component: BankAccounts,
      },
      {
        path: "/history",
        component: History,
      },
      {
        path: "/profile",
        component: Profile,
      },
      {
        path: "/downline",
        component: Downline,
      },
      {
        path: "/app-accounts",
        component: GameAccounts,
      },
      {
        path: "/vip-ranking",
        component: VIPRanking,
      },
      {
        path: "/bet-history",
        component: BetHistory,
      },
      {
        path: "/referral-system",
        component: ReferralSystem,
      },
      {
        path: "/rewards",
        component: Reward,
      },
      {
        path: "/missions",
        component: Mission,
      },
    ],
    public: [
      {
        path: "/",
        component: Home,
      },
      {
        path: "/google-play",
        component: GooglePlay,
      },
      {
        path: "/promotions/:id?",
        component: Promo,
      },
      {
        path: "/contactus",
        component: ContactUs,
      },
      {
        path: "/subline",
        component: Subline,
      },
      {
        path: "/partnership",
        component: Partnership,
      },
      {
        path: "/leaderboard",
        component: Leaderboard,
      },
    ],
  }
}

export default useGetRoutes