import styled from "styled-components";

// Lucky Wheel
export const LuckyWheelWrapper = styled.div`
  .tokens {
    font-size: 16px;
    color: ${props=>props.theme.text_color};
    text-align: center;

    span {
      font-weight: 600;
    }
  }
`;
export const LuckyWheelContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 90vw;
  max-width: 600px;
  margin: 15% auto;
  ${({ $isWinner }) =>
    $isWinner
      ? {
          background: `url(${require("../../../assets/images/wheel/firework.gif")}),
        url(${require("../../../assets/images/wheel/firework.gif")}),
        url(${require("../../../assets/images/wheel/firework.gif")}),
        url(${require("../../../assets/images/wheel/firework.gif")})`,
          backgroundPosition: "left top, right top, left bottom, right bottom",
          backgroundRepeat: "no-repeat",
          backgroundSize: "30%",
        }
      : null}
`;

export const LuckyWheelLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: url(${require("../../../assets/images/wheel/spin-board.png")});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;

  & > img {
    width: 20%;
  }
  .float-box {
    position: absolute;
    top: 12%;
    right: 12%;
  }
  .float-santa {
    position: absolute;
    bottom: 12%;
    left: 12%;
  }
`;

export const SpinBtn = styled.div`
  position: absolute;
  width: 16%;
  height: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &,
  .text {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .text {
    position: absolute;
    width: 100%;
    height: 100%;
    font-size: 1em;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
  }
`;

export const WheelContainer = styled.div`
  width: 62%;
  height: 0;
  padding-bottom: 62%;
  position: relative;
  transform: rotate(-45deg);

  & > div {
    position: static;
    width: 100%;
    height: 100%;
    max-width: none;
    max-height: none;
  }
`;