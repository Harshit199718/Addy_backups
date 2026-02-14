import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
import Loading from "../../../components/common/Loading";
import {
  LuckyWheelContainer2,
  LuckyWheelLayout2,
  LuckyWheelWrapper2,
  SpinBtn2,
  TokenContainer,
  WheelContainer2,
} from "./LuckyWheel2.styled";
import Image from "../../../components/common/Image";
import Modal from "../../../components/common/Modal";
import withSpin from "../../../HOC/withSpin";
import Button from "../../../components/common/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { selectConfigData } from "../../../api/generalApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../../../pages/Promo/suneditor.min.css";

function LuckyWheel2({
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
  const [informationOpen, setInformationOpen] = useState(false);
  const { luckywheel_information_images } = useSelector(selectConfigData);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <LuckyWheelWrapper2>
      <Loading isLoading={isLoading} fullscreen={false} />
      {!isLoading && slots?.length ? (
        <>
          <LuckyWheelContainer2 $isWinner={afterSpin?.prizeWon}>
            <LuckyWheelLayout2 />
            <SpinBtn2>
                <Image
                    width="100%"
                    height="100%"
                    src={require("../../../assets/images/wheel/spin-btn2.png")}
                    alt=""
                />
            </SpinBtn2>
            <WheelContainer2>
              <Wheel
                outerBorderWidth={1}
                outerBorderColor="#FFCA4A"
                radiusLineWidth={1}
                radiusLineColor="#FFCA4A"
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
                  src: require("../../../assets/images/wheel/pointer-img.png"),
                  style: {
                    width: "7%",
                    transform: "rotate(45deg)",
                    top: "14%",
                    right: "12%"
                  }
                }}
              />
            </WheelContainer2>
            <TokenContainer>
                <p className="tokens_container">{wallet?.checkin_token_available || 0} / {checkin?.lucky_wheel_spin_token_required} <br />Play</p>
                <Button $width="auto" $margin="0" onClick={handleSpin}>Spin</Button>
            </TokenContainer>
            <Icon style={{ position: 'absolute', bottom: 0, right: 30 }} icon="mdi:information-outline" width={30} onClick={() => setInformationOpen(true)}/>
          </LuckyWheelContainer2>
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
          </Button>
        }
        </div>
      </Modal>
      <Modal
        title="Lucky Wheel Rules"
        isOpen={informationOpen}
        onClose={() => setInformationOpen(false)}
      >
        <Image src={luckywheel_information_images} />
      </Modal>
    </LuckyWheelWrapper2>
  );
}

export default withSpin(LuckyWheel2);
