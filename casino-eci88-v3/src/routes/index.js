import React from "react";
import Activate from "../pages/Auth/Activate";

const SignIn = React.lazy(() => import("../pages/Auth/SignIn"));
const Signup = React.lazy(() => import("../pages/Auth/Signup"));
const VerifyTac = React.lazy(() => import("../pages/Auth/VerifyTac"));
const ForgetPassword = React.lazy(() => import("../pages/Auth/ForgetPassword"));

const BankAccounts = React.lazy(() =>
  import("../pages/BankAccounts/BankAccounts")
);
const Deposit = React.lazy(() => import("../pages/Transactions/Deposit"));
const DepositForm = React.lazy(() =>
  import("../pages/Transactions/DepositForm")
);
const History = React.lazy(() => import("../pages/History"));
const Home = React.lazy(() => import("../pages/Home/Home"));
const Profile = React.lazy(() => import("../pages/Profile/Profile"));
const Promo = React.lazy(() => import("../pages/Promo/Promo"));
const Withdraw = React.lazy(() => import("../pages/Transactions/Withdraw"));
// const Auth = React.lazy(() => import("../pages/Auth/Auth"));

const routes = {
  auth: [
    // {
    //   path: "/auth/:type",
    //   component: Auth,
    // },
    {
      path: "/signin",
      component: SignIn,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/verify-tac/:id",
      component: VerifyTac,
    },
    {
      path: "/activate/:id",
      component: Activate,
    },
    {
      path: "/forget-password",
      component: ForgetPassword,
    }
  ],
  protected: [
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
      path: "/promotions",
      component: Promo,
    },
  ],
  public: [
    {
      path: "/",
      component: Home,
    },
  ],
};

export default routes;
