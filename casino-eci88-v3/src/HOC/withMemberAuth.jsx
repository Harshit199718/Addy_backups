import React, { useCallback, useMemo } from "react";
import {
  useBanksQuery,
  useCustomerBanksQuery,
  useStopAllProductsMutation,
  useWalletQuery,
} from "../api/hooks";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../app/slices/userSlice";
import { selectConfigData } from "../api/generalApi";

function withMemberAuth(WrappedComponent) {
  return (props) => {
    const { data: wallet } = useWalletQuery();
    const { data: customerBanks } = useCustomerBanksQuery();
    const { data: banks } = useBanksQuery(
      customerBanks?.length > 0 ? customerBanks[0].bank : "",
      { skip: !customerBanks }
    );

    const [stopAllProducts, { isLoading }] = useStopAllProductsMutation();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const {
      wallet_deposit = "",
      wallet_withdraw = "",
      wallet_profile = "",
      wallet_refresh = "",
      home_login_btn = "",
      home_register_btn = "",
      enable_chips,
      currency_symbol,
      country
    } = useSelector(selectConfigData);

    const handleClick = useCallback((event) => {
      const path = event.target.getAttribute("data-path");
      navigate(path);
    }, []);
    const updatedBankDetails = useMemo(() => {
      if (banks) {
        return {
          ...customerBanks[0],
          metaData: banks,
        };
      }
    }, [banks]);
    const defaultProps = useMemo(
      () => ({
        currentUser,
        currency_symbol,
        home_login_btn,
        home_register_btn,
        updatedBankDetails,
        wallet,
        enable_chips,
        wallet_deposit,
        wallet_withdraw,
        wallet_profile,
        wallet_refresh,
        country
      }),
      [
        currentUser,
        home_login_btn,
        home_register_btn,
        updatedBankDetails,
        wallet,
        enable_chips,
        wallet_deposit,
        wallet_withdraw,
        wallet_profile,
        wallet_refresh,
        country
      ]
    );
    return (
      <WrappedComponent
        {...defaultProps}
        {...props}
        handleClick={handleClick}
        stopAllProducts={stopAllProducts}
        isLoading={isLoading}
      />
    );
  };
}

export default withMemberAuth;
