import styled from "styled-components";

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 0 15px;

  & > div {
    width: calc(25% - 7.5px);

    .buttons_container {
      display: flex;
      align-items: center;
      gap: 10px;

      .title {
        flex: 3;
        font-size: 15px;
        font-weight: 600;
        color: #fff;
        text-align: left;
      }
      & > div {
        flex: 1;
        max-width: 50%;
      }
    }

    @media screen and (max-width: 1366px) {
      width: calc(33.33% - 6.66px);
    }
    @media screen and (max-width: 1024px) {
      width: calc(50% - 5px);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }

  .promotion-description-lg {
    display: block;
  }
  .promotion-description-sm {
    display: none;
  }
  @media screen and (max-width: 770px) {
    .promotion-description-lg {
      display: none;
    }
    .promotion-description-sm {
      display: block;
    }
  }
`;

export const CTCContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CTCGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .promo-group-title {
    max-width: 600px;
    margin: auto;
  }
  .promos {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 5px;
  }
  .cpcpromos {
    width: 100%;
    margin-top: 5px;
  }
`;

export const GroupPromo = styled.div`
  width: 33%;
  max-width: 120px;
  position: relative;
  filter: brightness(${(props) => (!props.$isActive ? "40" : "100")}%);

  @media screen and (max-width: 400px) {
    max-width: 110px;
  }

  .promo-details {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 15px;

    .title {
      text-align: center;
      font-weight: 700;
      font-size: ${({ theme: { ctc_title_desktop_size } }) => `${ctc_title_desktop_size}px`};
      color: ${({ theme: { ctc_title_color } }) => ctc_title_color};
      font-family: ${({ theme: { ctc_title_font_style } }) =>
        ctc_title_font_style};
      margin-bottom: 15px;
      @media screen and (max-width: 1024px) {
        font-size: ${({ theme: { ctc_title_mobile_size } }) => `${ctc_title_mobile_size}px`};
        margin-bottom: 5px;
      }
    }
    .amount {
      text-align: center;
      font-weight: 700;
      font-size: ${({ theme: { ctc_reward_desktop_size } }) => `${ctc_reward_desktop_size}px`};
      color: ${({ theme: { ctc_reward_color } }) => ctc_reward_color};
      font-family: ${({ theme: { ctc_reward_font_style } }) =>
        ctc_reward_font_style};
      }
      @media screen and (max-width: 1024px) {
        font-size: ${({ theme: { ctc_reward_mobile_size } }) => `${ctc_reward_mobile_size}px`};
      }
  }
`;

export const ConditionsRequirement = styled.div`
  h2.conditions-meet-heading {
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 24px;
    .key {
      color: yellow;
    }
    .value {
      color: ${({ $isMeet }) => ($isMeet ? "lightgreen" : "red")};
    }
  }
  .conditions-meet {
    font-size: 15px;
    line-height: 24px;
    color: #fff;
  }
`;

export const PromotionDescContainer = styled.div`
  .promotion-info {
    border: 1px solid #0c0c0c;
    border-radius: 0 0 5px 5px;
    position: relative;
    padding: 35px;
    background-color: #050505;
    margin: 10px 0;
  }
  .promotion-info .promotion-info-title {
    font-size: 28px;
    text-align: center;
    margin: 10px 0;
    color: #fff;
  }

  .promotion-info .close-button {
    color: #050505;
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    border-radius: 50%;
    margin: 7px;
    padding: 8px;
    font-size: 30px;
    line-height: 0.5;
    background-color: ${({theme}) => theme.secondary_color};
    color: ${({theme}) => theme.text_color};
  }
  .sun-editor-editable h1 {
    color: #fff;
    font-family: "Source Sans Pro", sans-serif;
    margin: 0;
    font-size: 2em;
    line-height: 30px;
  }
  .sun-editor-editable p {
    color: #898989;
    margin: 0;
  }
`;
