import React from "react";
import styled, { keyframes } from "styled-components"
const Header = React.lazy(() => import("../Header/Header"));
import Sidebar from "../Sidebar/Sidebar";
import { checkBg } from "../../../utils/helper";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../../api/generalApi";
const Footer = React.lazy(() => import("../Footer/Footer"));

const moveUpDown = keyframes`
  0% {
    transform: translateY(0);
  }
  25% {
    transform: translateY(-100px);
  }
  50% {
    transform: translateY(0);
  }
  75% {
    transform: translateY(100px);
  }
  100% {
    transform: translateY(0);
  }
`;

const LayoutContainer = styled.div`
    width: 100%;
    /* max-width: 500px; */
    min-height: 100dvh;
    margin: auto;
    background: ${props=>{
        const {root_bg_type} = props.theme;
        return checkBg(props.theme[root_bg_type])
    }};
    background-size: cover;
    position: relative;

    &>img {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: 1;
    }

    .main-content {
        width: 100%;
        /* max-width: 500px; */
        max-height: calc(100dvh - 110px);
        margin: auto;
        z-index: 2;
        position: relative;
        overflow-y: auto;

        .floating-icon {
            position: absolute;
            top: 30%;
            right: 0;
            transform: translateY(-50%);
            z-index: 100;
            width: 80px;
            animation: ${moveUpDown} 10s linear infinite;
        }
    }

    @media screen and (min-width: 768px) {
        max-width: none;
    }
`

const StickyButton = styled.a`
    position: fixed;
    width: 25px;
    bottom: 250px;
    right: 0px;
    z-index: 1;

    &:last-child {
        bottom: 130px;
    }
    
    img {
        width: 100%;
    }
`

const Layout = ({children}) => {
    const {floating_icon, floating_icon_url, sticky_button1, sticky_button2, sticky_button1_url, sticky_button2_url} = useSelector(selectConfigData);
    console.log("🚀 ~ Layout ~ sticky_button1:", sticky_button1)
    return (
        <LayoutContainer>
            {/* <img src={root_bg} alt="" /> */}
                <Header />
                <Sidebar />
            <div className="main-content">
                {children}
                {
                    floating_icon &&
                    <a href={floating_icon_url} target="_blank"><img className="floating-icon" src={floating_icon} alt="" /></a>
                }
                {
                    sticky_button1 &&
                    <StickyButton href={sticky_button1_url} target="_blank"><img src={sticky_button1} /></StickyButton>
                }
                {
                    sticky_button2 &&
                    <StickyButton href={sticky_button2_url} target="_blank"><img src={sticky_button2} /></StickyButton>
                }
            </div>
                <Footer />
        </LayoutContainer>
    )
}

export default React.memo(Layout)