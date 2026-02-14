import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BoxContainer, MessageContainer, RebateContainer, RewardBoxes } from "./Rebate.styled";
import { useClaimRebateMutation, useGetRebateQuery } from "../../api/hooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const Box = React.memo(function ({ boxOpened, canOpen }) {
  const { data: rebate } = useGetRebateQuery();
  const [claimRebate, { isSuccess, error: rebateError }] = useClaimRebateMutation();
  const { reward_close_box, reward_open_box, currency_symbol } = useSelector(selectConfigData);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const boxImage = useMemo(() => {
    return isOpen ? reward_open_box : reward_close_box;
  }, [isOpen]);

  useEffect(() => {
    if (isSuccess) {
      setIsOpen(true);
      canOpen();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (rebateError) {
      setError({
        message: t('Failed_to_claim_reward')
      });
    }
  }, [rebateError]);

  return (
    <BoxContainer
      onClick={() => {
        if (!boxOpened) {
          claimRebate({ id: rebate?.id });
        }
      }}
    >
      <img src={boxImage} alt="" />
      <Modal
        title="Daily Rebate"
        isOpen={isOpen}
        onClose={() =>
          setIsOpen(false)
        }
        success={{ message: `${t('Congratulations_reward_get')} ${currency_symbol} ${rebate?.others.bonus_amount}` }}
      />
      <Modal
        title="Daily Rebate"
        isOpen={error}
        onClose={() =>
          setError(null)
        }
        error={error}
      />
    </BoxContainer>
  );
});

function Rebate() {
  const { reward_close_box, reward_total_rebates, reward_rebates_bg, primary_color } = useSelector(selectConfigData);
  const { data: rebate } = useGetRebateQuery();
  const { t } = useTranslation();
  const [boxOpened, setBoxOpened] = useState(false);
  const navigate = useNavigate();

  const message = useMemo(() => {
    if (!rebate) return "";
    const todayDeposit = rebate?.today_deposit;
    const limit = rebate?.others?.message?.some(
      (message) => message.limit_per_user === "Pass"
    );
    if (todayDeposit) {
      return t("Return_tomorrow_claim_rewards")
    } else if (limit) {
      return (
        <>
        {t("Make_deposit_join_rewards_1")} 
        <span style={{color: "RED"}}>{t("deposit")} </span>
        {t("Make_deposit_join_rewards_2")} 
        <span style={{color: "RED"}}>{t("REWARDS_EVENT")} </span>
        </>
      )
    } else {
      return (        
      <>
      {t("Claimed_today_Make_deposit_join_rewards")}
      {t("Make_deposit_join_rewards_1")} 
      <span style={{color: "RED"}}>{t("deposit")} </span>
      {t("Make_deposit_join_rewards_2")} 
      <span style={{color: "RED"}}>{t("REWARDS_EVENT")} </span>
      </>
    )
    }
  }, [rebate]);

  const canOpen = useCallback(() => {
    setBoxOpened(true);
  }, []);
  return (
    <RebateContainer style={{ background: `url(${rebate?.others?.applicable ? reward_rebates_bg : null})` }}>
      {rebate?.others?.applicable ? (
        <>
        <p style={{ color: "white", fontSize: "24px", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", textAlign: "center" }}>
          {t('Choose_one_reward_box')}
        </p>
        <RewardBoxes>
          {Array.from({ length: reward_total_rebates }).map((_, index) => (
            <Box
              key={index}
              boxOpened={boxOpened}
              canOpen={canOpen}
              rebateId={rebate?.id}
            />
          ))}
        </RewardBoxes>
        </>
      ) : (
        <MessageContainer>
          <div className="logo">
            <img
              src={reward_close_box}
              alt=""
            />
          </div>
          <div className="message">
            {message}
          </div>
          <Button 
          $width="auto" 
          $backgroundImage={`linear-gradient(to left, ${primary_color}, hsl(38, 100%, 50%))`}
          onClick={() => navigate('/deposit')}
          >
            {t("deposit")}
          </Button>
        </MessageContainer>
        // <p className="message">{message}</p>
      )}
    </RebateContainer>
  );
}

export default Rebate;
