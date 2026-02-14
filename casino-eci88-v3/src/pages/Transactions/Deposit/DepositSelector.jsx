import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
import {
  DepositItem,
  DepositSelectorContainer,
} from "./DepositSelector.styled";
import { useMerchantEwalletsQuery } from "../../../api/hooks";

function DepositSelector({ selected, setSelected }) {
  const { available_paymentgateway_providers, available_ewallets } =
    useSelector(selectConfigData);
  const { data: accounts } = useMerchantEwalletsQuery(selected?.id, {
    skip: !selected?.id?.includes("ewallet"),
  });

  return (
    <>
      <DepositSelectorContainer>
        <label htmlFor="">Payment Method</label>
        <div className="items_container">
          <DepositItem
            $active={selected?.id === "manual"}
            onClick={() => {
              setSelected({id: "manual"});
            }}
          >
            <div className="box" />
            Manual
          </DepositItem>
          {available_paymentgateway_providers?.split(",")?.map((provider) => (
            <DepositItem
              key={provider}
              $active={selected?.id === provider}
              onClick={() => {
                setSelected({id: provider});
              }}
            >
              <div className="box" />
              {provider}
            </DepositItem>
          ))}
          {available_ewallets?.split(",")?.map((provider) => (
            <DepositItem
              key={provider}
              $active={selected?.id === provider}
              onClick={() => {
                setSelected({id: provider});
              }}
            >
              <div className="box" />
              {provider.split("-")[0]} Ewallet
            </DepositItem>
          ))}
        </div>
      </DepositSelectorContainer>
      {selected?.id?.includes("ewallet") ? (
        <DepositSelectorContainer>
          <label htmlFor="">Ewallet Method</label>
          <div className="items_container">
            {accounts?.map((account) => {
              const accountName = account?.name?.split("_")
              return (
                <DepositItem
                  key={account?.id}
                  $active={selected?.accountId === account?.id}
                  onClick={() => {
                    setSelected({
                      id: selected?.id,
                      accountId: account?.id,
                      accountName: account?.name,
                    });
                  }}
                >
                  <div className="box" />
                  {accountName[0]} {accountName[1]}
                </DepositItem>
              );
            })}
          </div>
        </DepositSelectorContainer>
      ) : null}
    </>
  );
}

export default DepositSelector;
