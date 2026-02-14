import React, { useEffect, useState } from "react";
import {
  Profile2Container,
  Referral,
  UserDetails,
} from "./Profile2.styled";
import { useTranslation } from "react-i18next";
import { LayoutCard } from "../../components/common/LayoutCard/LayoutCard.styled";
import withWallet from "../../HOC/withWallet";
import withProfile from "../../HOC/withProfile";
import Image from "../../components/common/Image";
import BankCard2 from "../BankAccounts/BankCard2";
import BankAccounts from "../BankAccounts/BankAccounts";
import { Auth2Title } from "../Auth/Auth.styled";
import Profile2Tabs from "./Profile2Tabs";
import { addThousandSeparator } from "../../components/common/NumberConvertion";
import RankingConverter from "../../features/General/RankingConverter";
import Input from "../../components/common/Input";
import { useUpdateAutoTransferMutation } from "../../api/hooks";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import Modal from "../../components/common/Modal";

function Profile2({
  wallet,
  logout,
  progress,
  currency_symbol,
  minDeposit,
  tabs,
  enable_chips,
  country,
  isLoading,
}) {
  const { t } = useTranslation();
  const [updateAutoTransfer, {isLoading: isUpdating, isSuccess}] = useUpdateAutoTransferMutation();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsUpdated(true)
    }
  }, [isSuccess])
  return (
    <>
      <Profile2Container>
        <Profile2Tabs />
      </Profile2Container>
      <Auth2Title>{t("Account_Information")}</Auth2Title>
      <Profile2Container>
        <LayoutCard>
          <UserDetails>
            <tbody>
              <tr>
                <td colSpan={1}>{t("Username")}</td>
                <td colSpan={1}>:</td>
                <td colSpan={1}>{wallet?.user?.username}</td>
              </tr>
              <tr>
                <td colSpan={1}>{t("Rank")}</td>
                <td colSpan={1}>:</td>
                <td colSpan={1} className="rank">
                  {RankingConverter(wallet && wallet?.rank)}
                  <Image
                    src={require("../../assets/icons/trophy-icon.png")}
                    width="15px"
                    skeletonWidth={15}
                    skeletonHeight={15}
                  />
                </td>
              </tr>
              <tr>
                <td colSpan={1}>Auto Transfer</td>
                <td colSpan={1}>
                  <ToggleSwitch
                    label=""
                    defaultChecked={wallet?.auto_transfer_credit_to_game}
                    onChange={(checked) => updateAutoTransfer({id: wallet?.user?.id, username: wallet?.user?.username, auto_transfer_credit_to_game: checked})}
                    disabled={isUpdating}
                  />
                </td>
              </tr>
            </tbody>
          </UserDetails>
        </LayoutCard>
        <BankAccounts removeAdd />
      </Profile2Container>
      <Auth2Title>{t("Referral")}</Auth2Title>
      <Profile2Container>
        <Referral>
            {t("Referral_Code")}:
          <a
            href={wallet?.referral_link}
            className="link"
          >
            {wallet?.referral_link}
          </a>
        </Referral>
      </Profile2Container>
      <Modal
        title={"Auto Transfer"}
        isOpen={isUpdated}
        onClose={() => setIsUpdated(false)}
        success={{ message: `${t("Auto Transfer updated successfully")}` }}
      />
    </>
  );
}

export default withProfile(withWallet(Profile2));
