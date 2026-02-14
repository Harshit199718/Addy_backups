import styled from "styled-components";
import { LuckyWheelContainer, LuckyWheelLayout, LuckyWheelWrapper, SpinBtn, WheelContainer } from "./LuckyWheel1.styled";

// Lucky Wheel
export const LuckyWheelWrapper2 = styled(LuckyWheelWrapper)``;
export const LuckyWheelContainer2 = styled(LuckyWheelContainer)`
  flex-direction: column;
`;

export const LuckyWheelLayout2 = styled(LuckyWheelLayout)`
  z-index: 0;
  background-image: url(${require("../../../assets/images/wheel/luckywheel_bg.jpg")});
`;

export const SpinBtn2 = styled(SpinBtn)`
  z-index: 10;
  width: 10%;
  height: auto;
  top: 45%;
  transform: translate(-50%, -70%);
`;

export const WheelContainer2 = styled(WheelContainer)`
  width: 73%;
  height: 0;
  padding-bottom: 73%;
`;

export const TokenContainer = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
  z-index: 20;
  margin-top: 20px;

  .tokens_container {
    font-size: 13px;
    font-weight: 400;
    text-align: center;
    border: 1px solid yellow;
    border-radius: 4px;
    color: #fff;
    background: #444;
    padding: 0px 20px;
    display: flex;
    align-items: center;
  }
`