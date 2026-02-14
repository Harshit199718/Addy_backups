import Button from "../../components/common/Button";
import {
  ProfileContainer,
  Routes,
  UserWallet,
  Wallet,
} from "./Profile1.styled";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading";
import OptimizedImage from "../../components/common/OptimizedImage";
import { useTranslation } from "react-i18next";
import ProfileTab from "./ProfileTab";
import withProfile from "../../HOC/withProfile";
import withWallet from "../../HOC/withWallet";
import BonusWinover from "./BonusWinover";
import { addThousandSeparator } from "../../components/common/NumberConvertion";
import RankingConverter from "../../features/General/RankingConverter";
import { useUpdateAutoTransferMutation } from "../../api/hooks";
import Input from "../../components/common/Input";
import { useEffect, useState } from "react";
import ToggleSwitch from "../../components/common/ToggleSwitch";
import Modal from "../../components/common/Modal";

function Profile({
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
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [updateAutoTransfer, {isLoading: isUpdating, isSuccess}] = useUpdateAutoTransferMutation();
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      setIsUpdated(true)
    }
  }, [isSuccess])
  
  return (
    <ProfileContainer>
      <UserWallet>
        <OptimizedImage
          src={require("../../assets/icons/test_avatar.png")}
          alt=""
          className="user-img"
          width="100px"
        />
        <div className="user-details">
          <h3 className="username">{wallet?.user?.username}</h3>
          <h3 className="balance">
            {t("Wallet")} {t("Balance")}: {currency_symbol} {addThousandSeparator(wallet?.balance, country)}
          </h3>
          <h3 className="balance">
            {t("token")}: {wallet?.checkin_token_available || 0}
          </h3>
          <Button
            $width="auto"
            $fontSize="12px"
            $fontWeight="700"
            $padding="8px 16px"
            onClick={() => logout()}
          >
            {t("Logout")}
          </Button>
        </div>
        <div className="rank_container">
          <OptimizedImage
            src={require("../../assets/icons/trophy-icon.png")}
            alt=""
            width="30px"
          />
          <h3 className="rank">{RankingConverter(wallet && wallet?.rank)}</h3>
        </div>
      </UserWallet>
      <div className="wallet-and-routes">
        <Wallet>
          <BonusWinover />
          <label>
            {t("Min")} {t("deposit")}: {currency_symbol} {addThousandSeparator(minDeposit?.min_deposit?.toFixed(2), country, 0)}
          </label>
          <label>
            {t("Min")} {t("withdrawal")}: {currency_symbol} {addThousandSeparator(minDeposit?.min_turnover?.toFixed(2), country, 0)}
          </label>
          <ToggleSwitch 
            label={t("Auto Transfer Credit to Game")}
            defaultChecked={wallet?.auto_transfer_credit_to_game}
            onChange={(checked) => updateAutoTransfer({id: wallet?.user?.id, username: wallet?.user?.username, auto_transfer_credit_to_game: checked})}
            disabled={isUpdating}
          />
          <Button onClick={() => navigate("/deposit")}>
            {t("deposit")} {t("Now")}
          </Button>
        </Wallet>
        <Routes>
          {tabs?.map((tab, index) => (
            <ProfileTab key={`tab.route${index}`} {...tab} />
          ))}
        </Routes>
      </div>
      <Loading isLoading={isLoading} />
      <Modal
        title={"Auto Transfer"}
        isOpen={isUpdated}
        onClose={() => setIsUpdated(false)}
        success={{ message: `${t("Auto Transfer updated successfully")}` }}
      />
    </ProfileContainer>
  );
}

export default withProfile(withWallet(Profile));
