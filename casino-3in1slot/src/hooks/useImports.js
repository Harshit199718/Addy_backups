import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../api/generalApi";

function useImports() {
  const {
    deposit_style,
    withdraw_style,
    login_style,
    change_password_style,
    signup_version,
    member_auth_style,
    luckywheel_style,
    profile_style,
    enable_ctc,
    history_tabs_style,
    manual_deposit_style,
    jackpot_style,
    promo_style,
    bank_accounts_style,
    subline_style,
    ctc_style
  } = useSelector(selectConfigData);

  // History Import
  const History = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/History/History${history_tabs_style}.jsx`).catch(
        (error) => {
          return import("../pages/History/History1.jsx");
        }
      )
    );
  }, [history_tabs_style]);

  // Deposit Import
  const Deposit = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Transactions/Deposit/Deposit${deposit_style}.jsx`).catch(
        (error) => {
          return import("../pages/Transactions/Deposit/Deposit1.jsx");
        }
      )
    );
  }, [deposit_style]);

  // Withdraw Import
  const Withdraw = useMemo(() => {
    return React.lazy(() =>
      import(
        `../pages/Transactions/Withdraw/Withdraw${withdraw_style}.jsx`
      ).catch((error) => {
        return import("../pages/Transactions/Withdraw/Withdraw1.jsx");
      })
    );
  }, [withdraw_style]);

  // Profile Import
  const Profile = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Profile/Profile${profile_style}.jsx`).catch(() => {
        return import("../pages/Profile/Profile1.jsx");
      })
    );
  }, [profile_style]);

  // Promotion Import with style or CTC
  const Promo = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Promo/${enable_ctc ? `CTC${ctc_style}` : "Promo"}.jsx`).catch(() => {
        return import("../pages/Promo/Promo.jsx");
      })
    );
  }, [enable_ctc]);

  // Auth Components Import
  const SignIn = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Auth/SignIn/SignIn${login_style}.jsx`).catch((error) => {
        return import("../pages/Auth/SignIn/SignIn1.jsx");
      })
    );
  }, [login_style]);
  const SignUp = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Auth/SignUp/SignUp${signup_version}.jsx`).catch(
        () => {
          return import("../pages/Auth/SignUp/SignUpV1.jsx");
        }
      )
    );
  }, [signup_version]);
  const ChangePassword = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Auth/ChangePassword/ChangePassword${change_password_style}.jsx`).catch(
        () => {
          return import("../pages/Auth/ChangePassword/ChangePassword.jsx");
        }
      )
    );
  }, [change_password_style]);

  const MemberAuth = useMemo(() => {
    return React.lazy(() =>
      import(`../features/MemberAuth/MemberAuth${member_auth_style}.jsx`).catch(
        () => {
          return import("../features/MemberAuth/MemberAuth1.jsx");
        }
      )
    );
  }, [member_auth_style]);
    
  // Jackpot
  const Jackpot = useMemo(() => {
    return React.lazy(() =>
      import(`../features/Jackpot/Jackpot${jackpot_style}.jsx`).catch(
        () => {
          return import("../features/Jackpot/Jackpot1.jsx");
        }
      )
    );
  }, [jackpot_style]);

  const LuckyWheel = useMemo(() => {
    return React.lazy(() =>
      import(
        `../features/Rewards/LuckyWheel/LuckyWheel${luckywheel_style}.jsx`
      ).catch(() => {
        return import("../features/Rewards/LuckyWheel/LuckyWheel1.jsx");
      })
    );
  }, [luckywheel_style]);

  // Bank List
  const { BankList, Upload } = useMemo(() => {
    return {
      BankList: React.lazy(() =>
        import(
          `../features/BankList/BankList${manual_deposit_style}.jsx`
        ).catch(() => {
          return import("../features/BankList/BankList.jsx");
        })
      ),
      Upload: React.lazy(() =>
        import(
          `../components/common/Upload/Upload${manual_deposit_style}.jsx`
        ).catch(() => {
          return import("../components/common/Upload/Upload.jsx");
        })
      ),
    };
  }, [manual_deposit_style]);

  // Promotion
  const PromoDescription = useMemo(() => {
    return React.lazy(() =>
      import(
        `../pages/Promo/PromoDescription${promo_style}.jsx`
      ).catch(() => {
        return import("../pages/Promo/PromoDescription.jsx");
      })
    );
  }, [promo_style]);

  // Bank Account
  const BankCard = useMemo(() => {
    return React.lazy(() =>
      import(
        `../pages/BankAccounts/BankCard${bank_accounts_style}.jsx`
      ).catch(() => {
        return import("../pages/BankAccounts/BankCard.jsx");
      })
    );
  }, [bank_accounts_style]);

  const Subline = useMemo(() => {
    return React.lazy(() =>
      import(`../pages/Subline/Subline${subline_style}.jsx`).catch(() => {
        return import(`../pages/Subline/Subline1.jsx`);
      })
    );
  }, [subline_style]);

  return {
    History,
    Deposit,
    Withdraw,
    SignIn,
    SignUp,
    ChangePassword,
    MemberAuth,
    Jackpot,
    LuckyWheel,
    Profile,
    Promo,
    BankList,
    Upload,
    PromoDescription,
    BankCard,
    Subline
  };
}

export default useImports;
