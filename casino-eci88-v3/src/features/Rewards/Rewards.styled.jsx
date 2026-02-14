import styled from "styled-components";

export const RewardsContainer = styled.div`
  display: flex;
  gap: 6px;

  & > * {
    flex: 1;
    width: calc(20% - 7.2px);
  }
`;

export const Reward = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  // border: 1px solid #ffc107;

  border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "#ffc107"};
  box-shadow: 0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "#ffc107"}, 
  0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "#ffc107"} inset; 

  border-radius: 10px;
  background-color: #232323;

  .mailbox {
    position: relative;
    display: inline-block;

    .notification-badge {
      position: absolute;
      top: 0;
      right: 0;
      background-color: red;
      color: white;
      border-radius: 50%;
      width: 15px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const RewardText = styled.p`
  font-size: 12px;
  color: ${props=>props.theme.text_color};
  font-weight: 700;
  text-transform: uppercase;
`;

// DailyCheckin
export const DailyCheckinContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .claim-btn-img {
    max-width: 15px;
    margin-right: 5px;
    filter: invert(100%);
  }
`;

export const DaysContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2px;
  flex-wrap: wrap;
  max-width: 600px;
  padding: 14% 5% 0;
  position: relative;
  margin-bottom: 25px;
`;

export const DaysBGContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 104%;
`;
export const DaysBG = styled.div`
  background: url(${require("../../assets/images/checkin-bg.png")});
  background-size: 100% auto;
  width: 100%;
  height: 25%;
`;

export const DaysBGMiddle = styled.div`
  background: url(${require("../../assets/images/checkin-bg.png")});
  background-size: 100% auto;
  background-position: 0 85%;
  width: 100%;
  height: 25%;
`;
export const DaysBGBottom = styled.div`
  background: url(${require("../../assets/images/checkin-bg.png")});
  background-size: 100% auto;
  background-position: 0 260%;
  width: 100%;
  height: 25%;
`;

export const Day = styled.div`
  width: calc((100% / 7) - 2px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .day-image {
    width: 100%;
    height: auto;
    filter: grayscale(${(props) => (props.$isClaimed ? "100" : "0")}%);
  }
  .text {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    font-size: 1.5em;
    font-weight: 700;
    color: #000;
    filter: grayscale(${(props) => (props.$isClaimed ? "100" : "0")}%);
  }
  .text-checked {
    font-size: .8em;
    top: 30%;
  }
`;
