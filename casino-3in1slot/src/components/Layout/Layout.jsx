// src/components/Layout.js
import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f0f0f0;
    box-sizing: border-box;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const LayoutWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (orientation: portrait) {
    transform: rotate(90deg);
    transform-origin: center;
    width: 100vh;
    height: 100vw;
  }

  @media (orientation: landscape) {
    width: 100vw;
    height: 100vh;
  }
`;

const LayoutContent = styled.div`
  width: 100%;
  height: 100%;
`;

const Layout = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <LayoutWrapper>
        <LayoutContent>
          {children}
        </LayoutContent>
      </LayoutWrapper>
    </>
  );
};

export default Layout;
