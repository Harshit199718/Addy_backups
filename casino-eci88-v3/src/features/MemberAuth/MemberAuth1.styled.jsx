import styled from 'styled-components'
import { checkBg } from '../../utils/helper'

export const MemberAuthWrapper = styled.div`
  width: 100%;
  `
export const MemberAuthContainer = styled.div`
  width: 100%;
  border-radius: 1rem;
  overflow: hidden;
  padding: 8px;
  border: 2px solid ${({theme}) => theme.border_color};
  /* box-shadow: rgba(230, 150, 12, 0.8) 0px 0px 12px, rgba(230, 150, 12, 0.8) 0px 0px 12px inset; */
  box-shadow: 0 0 12px ${({theme}) => theme.border_shadow_primary_color}, 0 0 12px ${({theme}) => theme.border_shadow_primary_color} inset; 

  display: flex;
  justify-content: space-between;
  align-self: flex-start;
  flex-wrap: wrap;
  background: ${({theme: {wallet_container_bg_type, ...theme}})=>checkBg(theme[wallet_container_bg_type])};

  .welcome_container {
    width: 100%;
    border-radius: 1rem;
    background: ${({theme: {wallet_welcome_bg_type, ...theme}})=>checkBg(theme[wallet_welcome_bg_type])};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
    margin-bottom: 10px;
    .welcome-message {
      color: #898989;
      font-size: 1rem;
    }
    .rank_container {
      display: flex;
      align-items: center;
      gap: 2px;
      font-size: .8rem;
      color: #898989;

      img {
        width: 30px;
      }
    }
  }
`
export const AuthBalance = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  .balance {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 1rem;
    border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "rgb(230, 150, 12)"};
    .balance-type {
      color: ${props=>props.theme.text_color};
      font-size: 20px;
      font-weight: 700;
    }

    .balance-value {
      color: ${props=>props.theme.text_color_secondary};
      font-size: 20px;
      font-weight: 700;
      text-align: center;
      @media (max-width: 400px) {
        font-size: 16px;
      }
    }

    .balance-type-token {
      color: ${props=>props.theme.text_color};
      font-size: 16px;
      font-weight: 700;
    }

    .balance-value-token {
      color: ${props=>props.theme.text_color_secondary};
      font-size: 16px;
      font-weight: 700;
    }
  }
`
export const AuthButtons = styled.div`
  flex: 1.5;
  .buttons {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    margin-left: auto;
    gap: 4px;


    &>div {
      /* width: 100%; */
      max-width: 200px;
      /* height: auto; */
      height: 33%;
      cursor: pointer;
    }
  }
`
export const NoAuth = styled.div`
  display: flex;
  width: 100%;
  gap: 2px;

  &>div {
    flex: 1;
    max-width: 50%;
  }
`