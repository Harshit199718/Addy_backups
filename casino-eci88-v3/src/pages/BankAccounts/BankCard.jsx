import React from "react";
import { BankCardContainer } from "./BankCard.styled";
import { useTranslation } from "react-i18next";
import Image from "../../components/common/Image";

function BankCard({cuBank, filteredBank}) {
    const {t} = useTranslation();
  return (
    <BankCardContainer>
      <div className="bank-details">
        <Image
          src={cuBank.icon}
          alt="bank"
          width="5rem"
          height="4rem"
          skeletonWidth="4rem"
          skeletonHeight="4rem"
        />
        <div className="bank-detail">
          <h3 className="name">
            {t("Bank")}: {filteredBank ? filteredBank[0]?.name : ""}
          </h3>
          <h3 className="number">
            {t("Account")}: {cuBank.number}
          </h3>
        </div>
      </div>
      <div className="account-holder-details">
        {t("Account")} {t("Holder")}: {cuBank.name}
      </div>
    </BankCardContainer>
  );
}

export default BankCard;
