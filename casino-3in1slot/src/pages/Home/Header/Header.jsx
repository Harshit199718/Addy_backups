import React from "react";
import {
  ButtonWrapper,
  HeaderContainer,
  HeaderMiddle,
  HeaderSection,
  UserBlock,
  UserDetails,
} from "./Header.styled";
import { Icon } from "@iconify/react/dist/iconify.js";
import userImg from "../../../assets/images/user.png";
import coinImg from "../../../assets/images/coin.png";
import logout from "../../../assets/images/logout.png";
import Logo from "./Logo";
function Header() {
  return (
    <HeaderContainer>
      <HeaderSection className="header-left">
        <img
          className="checkin-image"
          src="http://localhost:3000/static/media/daily-check-in.8f8ab1b35c3731b7dacc.gif"
          alt=""
        />
        <UserBlock>
          <Icon className="refresh-btn" icon="ic:round-refresh" color="#fff" />
          <UserDetails>
            <img src={userImg} alt="" />
            <p className="user-balance">
              <span className="username">testuser2</span>
              Balance: 266000.00
            </p>
            <img src={coinImg} alt="" />
          </UserDetails>
        </UserBlock>
      </HeaderSection>
      <HeaderMiddle>
        <Logo />
      </HeaderMiddle>
      <HeaderSection className="header-right">
        <marquee behavior="" direction="rtl">
          SELAMAT DATANG DI GUNTUR888 AGEN JUDI ONLINE TERPERCAYA DI SELURUH
          INDONESIA ! GUNTUR888 AKAN MELAYANI ANDA SELAMA 24JAM . UNTUK
          KECEPATAN,KENYAMANAN DAN KEAMANAN RIORITAS KAMI UNTUK ANDA . Mari
          bergabung sekarang juga di agen judi online!!!!!
        </marquee>
        <ButtonWrapper>
          <img className="button-img" src={logout} alt="" />
        </ButtonWrapper>
        <ButtonWrapper>
          <Icon className="button-img" icon="material-symbols:fullscreen" />
        </ButtonWrapper>
      </HeaderSection>
    </HeaderContainer>
  );
}

export default Header;
