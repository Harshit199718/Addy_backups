import React from "react";
import { BankCardContainer2, BankDetails } from "./BankCard2.styled";
import { useTranslation } from "react-i18next";
import Image from "../../components/common/Image";
import { LayoutCard } from "../../components/common/LayoutCard/LayoutCard.styled";

function BankCard2({cuBank, filteredBank}) {
    const {t} = useTranslation();
  return (
    <LayoutCard>
      <BankCardContainer2>
        <label htmlFor="">Bank Accounts</label>
        <BankDetails>
          <div className="account">
            <h3 className="name">{cuBank?.name} <Image src={cuBank?.icon} width="auto" height="25px" /></h3>
            <h2 className="number">{cuBank?.number}</h2>
          </div>
          <h3 className="bank-name">{filteredBank ? filteredBank[0]?.name : ""}</h3>
        </BankDetails>
      </BankCardContainer2>
    </LayoutCard>
  );
}

export default BankCard2;
