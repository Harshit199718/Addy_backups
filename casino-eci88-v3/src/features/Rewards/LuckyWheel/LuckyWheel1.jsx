import React from "react";
import { Wheel } from "react-custom-roulette";
import Loading from "../../../components/common/Loading";
import {
  LuckyWheelContainer,
  LuckyWheelLayout,
  LuckyWheelWrapper,
  SpinBtn,
  WheelContainer,
} from "./LuckyWheel1.styled";
import Image from "../../../components/common/Image";
import Modal from "../../../components/common/Modal";
import withSpin from "../../../HOC/withSpin";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../../../components/common/Button";
import "../../../pages/Promo/suneditor.min.css";

function LuckyWheel1({
  slots,
  isLoading,
  isSpinning,
  wallet,
  spinResult,
  handleSpin,
  onStopSpinning,
  afterSpin,
  mustSpin,
  onClose,
  autoApproveCredit,
  checkin
}) {
  const { t } = useTranslation();
  
  return (
    <LuckyWheelWrapper>
      <Loading isLoading={isLoading} fullscreen={false} />
      {!isLoading && slots?.length ? (
        <>
          <p className="tokens">
            <span>Tokens: </span>
            {wallet?.checkin_token_available || 0} / {checkin?.lucky_wheel_spin_token_required}
          </p>
          <LuckyWheelContainer $isWinner={afterSpin?.prizeWon}>
            <LuckyWheelLayout>
              <SpinBtn onClick={handleSpin}>
                <Image
                  width="100%"
                  height="100%"
                  src={require("../../../assets/images/wheel/spin-btn.gif")}
                  alt=""
                />
                <p className="text">{isSpinning ? "Spinning" : "Spin"}</p>
              </SpinBtn>
              <img
                src={require("../../../assets/images/wheel/float-santa.png")}
                alt=""
                className="float-santa"
              />
              <img
                src={require("../../../assets/images/wheel/float-box.png")}
                alt=""
                className="float-box"
              />
            </LuckyWheelLayout>
            <WheelContainer>
              <Wheel
                mustStartSpinning={mustSpin}
                prizeNumber={
                  spinResult?.prizeNumber ? spinResult.prizeNumber : 0
                }
                data={slots}
                backgroundColors={["#3e3e3e", "#df3428"]}
                textColors={["#ffffff"]}
                disableInitialAnimation={true}
                onStopSpinning={onStopSpinning}
                pointerProps={{
                  style: {
                    display: "none",
                  },
                }}
              />
            </WheelContainer>
          </LuckyWheelContainer>
        </>
      ) : null}
      <Modal
        title="Lucky Wheel"
        isOpen={afterSpin?.prizeWon}
        onClose={onClose}
        success={!afterSpin?.show_tnc && { message: autoApproveCredit ? `${t("LuckyWheel_Won_Prize")} ${afterSpin?.amount}` : `${t("LuckyWheel_Direct_Reward_Page")}` }}
        >
        {afterSpin?.show_tnc && (
          <>
            <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: spinResult?.terms}} />
            <div style={{ textAlign: "center" }}>
              {autoApproveCredit ? 
              `${t("LuckyWheel_Won_Prize")} ${afterSpin?.amount}` 
              : 
              `${t("LuckyWheel_Direct_Reward_Page")}`}
            </div>
          </>
        )}
        <div style={{ textAlign: "center" }}>
        {!autoApproveCredit && 
        <Button $width="auto" onClick={() => navigate('/rewards')}>
          {t("LuckyWheel_Go_To_Reward_Page")}
        </Button>}
        </div>
      </Modal>
    </LuckyWheelWrapper>
  );
}

export default withSpin(LuckyWheel1);
