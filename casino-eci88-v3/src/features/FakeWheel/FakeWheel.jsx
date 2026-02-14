import React, { useEffect, useMemo, useRef, useState } from "react";
import { FakeWheelContainer, SpinButton, WheelImg } from "./FakeWheel.styled";
import Image from "../../components/common/Image";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import "../../pages/Promo/suneditor.min.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function FakeWheel() {
  const { t } = useTranslation()
  const {
    luckywheel_registration_banner,
    luckywheel_registration_wheel,
    luckywheel_registration_wheel_spin,
    luckywheel_registration_wheel_win,
    luckywheel_registration_wheel_win_popup,
  } = useSelector(selectConfigData);
  const [wheelImage, setwheelImage] = useState("StaticImage")
  const navigate = useNavigate();
  useEffect(() => {
    if (wheelImage==="SpinImage") {
        setTimeout(() => {
            setwheelImage("WinImage")
        }, 5000);
    } else if (wheelImage==="WinImage") {
        navigate("/rewards")
    }
  }, [wheelImage])
  const StaticImage = useMemo(() => {
      return <WheelImg src={luckywheel_registration_wheel} $width="100%" />
  }, [luckywheel_registration_wheel])
  const SpinImage = useMemo(() => {
      return <WheelImg src={luckywheel_registration_wheel_spin} $width="100%" />
  }, [luckywheel_registration_wheel_spin])
  const WinImage = useMemo(() => {
      return <WheelImg src={luckywheel_registration_wheel_win} $width="100%" />
  }, [luckywheel_registration_wheel_win])
  const StopImage = useMemo(() => {
      return <WheelImg src={luckywheel_registration_wheel_win_popup} $width="100%" />
  }, [luckywheel_registration_wheel_win_popup])
  const wheelImages = {
    StaticImage,
    SpinImage,
    WinImage,
    StopImage
  }

  const bottomRef = useRef(null);
  const handleSpinClick = () => {
    setwheelImage("SpinImage");
    // Scroll to the bottom of the page
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <FakeWheelContainer>
        <div
            className="sun-editor-editable luckywheel_registration_banner"
            dangerouslySetInnerHTML={{ __html: luckywheel_registration_banner }}
        />
        <SpinButton onClick={() => handleSpinClick()}>{t("SPIN THE WHEEL")}</SpinButton>
        <div ref={bottomRef} />
        {wheelImages[wheelImage]}
    </FakeWheelContainer>
  );
}

export default FakeWheel;
