import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import { useMerchantEwalletsQuery } from "../../../api/hooks";
import { DepositOption, DepositSelector } from "./Deposit3.styled";
import { useTranslation } from "react-i18next";

function DepositSelector3({ selected, setSelected }) {
  const { available_paymentgateway_providers, available_ewallets, ...configs } =
    useSelector(selectConfigData);
  const { data: accounts } = useMerchantEwalletsQuery(selected?.id, {
    skip: !selected?.id?.includes("ewallet"),
  });
  const [ selectedSurepayEW, setSelectedSurepayEW ] = useState({})
  const { t } = useTranslation();

  return (
    <>
      <DepositSelector>
        <DepositOption
          $active={selected?.id === "manual"}
          onClick={() => {
            setSelected({ id: "manual" });
          }}
        >
          <img src={configs[`deposit_manual_deposit`]} alt="" />
          {t("Manual_Transfer")}
        </DepositOption>
        {available_paymentgateway_providers?.split(",")?.map((provider) => (
          <DepositOption
            key={provider}
            $active={selected?.id === provider}
            onClick={() => {
              setSelected({ id: provider });
            }}
          >
            <img key={provider} src={configs[`deposit_${provider}`]} alt="" />
            {t(provider?.toUpperCase())}
          </DepositOption>
        ))}
        {available_ewallets?.split(",")?.map((provider) => (
          <DepositOption
            key={provider}
            $active={selected?.id === provider}
            onClick={() => {
              setSelected({ id: provider });
            }}
          >
            <img 
              key={provider} 
              src={configs[`deposit_${(provider.split("-")[0]==="surepay"?"":(provider.split("-")[0]+"_"))}ewallet`]}
              alt="" 
            />
            {t(provider?.toUpperCase())}
          </DepositOption>
        ))}
      </DepositSelector>
      {/* For Surepay Only  */}
      {selected?.id?.includes("ewallet") ? (
        accounts?.length > 0 ? 
          <DepositSelector>
            {accounts?.map((account) => {
              const accountName = account?.name?.split("_");
              return (
                <DepositOption
                key={account?.id}
                $active={selectedSurepayEW?.id === account?.id}
                  onClick={() => {
                    setSelectedSurepayEW(account);
                    setSelected({ id: selected?.id, accountId: account?.id })
                  }}
                >
                  <img key={account} src={account?.icon} alt="" />
                  {accountName[0]} {accountName[1]}
                </DepositOption>
              );
            })}
          </DepositSelector>
          : null
      ) : null}
    </>
  );
}

export default DepositSelector3;
