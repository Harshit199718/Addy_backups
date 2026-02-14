import styled from 'styled-components';
import { checkBg } from '../../../utils/helper';

export const HeaderContainer = styled.header`
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 15px;
      background: ${({theme: {header_bg_type, ...theme}})=>checkBg(theme[header_bg_type])};
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
      height: 50px;
      z-index: 45;
`
export const HeaderLeft = styled.div`
  flex-basis: 10%;
  color: ${props => props.theme.text_color_secondary || ""};
  order: ${({theme}) => theme.sidebar_toggle_position==="right"?2:0};
  text-align: ${({theme}) => theme.sidebar_toggle_position==="right"?"right":"left"};
  display: flex;
  align-items: center;

  .sidebar-toggler {
    cursor: pointer;
  }
`
export const HeaderMiddle = styled.div`
  flex-basis: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 1;

  &>div:has(.logo) {
    margin: 0 auto;
  }

  .column {
    width: 33.33%;
  }

  .column .not-logo{
    text-align: center;
    text-align: -webkit-center;
    font-size: 13px;
    color: ${props => props.theme.text_color || ""};
    cursor: pointer;

    img {
      height: 25px;
    }

    span {
      font-weight: bold;
      line-height: 13px;
    }
  }

  .subline {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 13px;
    color: ${props => props.theme.text_color || ""};
    cursor: pointer;

    img {
      height: 25px;
    }

    span {
      font-weight: bold;
      line-height: 13px;
    }
  }
`
export const HeaderRight = styled.div`
  flex-basis: 10%;
  display: flex;
  justify-content: flex-end;
  opacity: ${({theme}) => theme.sidebar_toggle_position==="right"?0:1};
  pointer-events: ${({theme}) => theme.sidebar_toggle_position==="right"?"none":"visible"};
  order: ${({theme}) => theme.sidebar_toggle_position==="right"?0:2};

  .flag {
    height: 25px;
    cursor: pointer;
  }
`