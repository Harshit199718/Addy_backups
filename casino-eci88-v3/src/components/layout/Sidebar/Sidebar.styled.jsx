import styled from "styled-components";
import { checkBg } from "../../../utils/helper";

export const SidebarContainer = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100dvh;
  pointer-events: ${(props) => (props.$open ? "visible" : "none")};

  .user-details {
    padding: 20px;
    font-weight: 700;

    .username {
      font-size: 28px;
      color: ${props=>props.theme.text_color};
    }
    .balance {
      color: ${props=>props.theme.text_color_secondary};
      font-size: 24px;
      text-transform: uppercase;
    }
  }
`;
export const SidebarWrapper = styled.div`
  width: 230px;
  height: 100%;
  overflow-y: auto;
  background: ${({theme: {menusidebar_bg_type, ...theme}})=>checkBg(theme[menusidebar_bg_type])};
  background-size: cover;
  color: ${props=>props.theme.text_color};
  transform: ${(props) =>
    props.$open ? "translateX(0)" : "translateX(-100%)"};
  transition: transform 0.5s;
  position: relative;
  z-index: 20;

  ${({theme, $open}) => theme.sidebar_position==="right"?({
    marginLeft: "auto",
    transform: $open ? "translateX(0)" : "translateX(100%)",
  }):({})}
`;
export const SidebarBg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$open ? "block" : "none")};
  width: 100%;
  height: 100%;
  z-index: 10;
  pointer-events: ${(props) => (props.$open ? "visible" : "none")};
`;
export const MenuItems = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

export const MenuItem = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 15px;
  background: ${props=>props.theme.sidebar_menu_item_bg};
  cursor: pointer;

  img {
    width: 30px;
  }

  h3 {
    font-size: 14px;
    font-weight: 600;
    line-height: 31px;
  }

  & > *:last-child {
    margin-left: auto;
  }

  & .dot {
    width: 7px;
    height: 7px;
    margin-right: 7px;
    border-radius: 50%;
    background: #78a943;
  }
`;


// Language Selector

export const LanguageMenuContainer = styled.div`
  max-height: ${({$isOpen}) => $isOpen?"1000px":"0"};
  overflow: hidden;
`;

export const LanguageTitle = styled.div`
  display: flex;
  flex-direction: column;

  span {
    font-size: 12px;
    line-height: 1;
  }
`
