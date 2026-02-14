import React, { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Icon } from '@iconify/react'

const colors = [
  "#ffcc00",
  "#ffcc33",
  "#ffcc66",
  "#ffcc99",
  "#ffcccc",
  "#ccccff",
  "#eeeeee",
  "#dddddd",
  "#cccccc",
  "#ffffff",
];

// Define the keyframes for the animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Create a single styled span that accepts color and animationDelay as props
const StyledSpan = styled.span`
  ${({ $color, $animationDelay }) => css`
    animation: ${fadeIn} 1s ${$animationDelay}s both;
    color: ${$color};
  `}
  margin-right: 10px;
`;

const ProviderTitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const BackButton = styled.div`
  postion: fixed;
  top: 10px;
  left: 10px;
`

const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 10px 0;
  text-align: center;
  flex-grow: 1;
`

const Underline = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;

  span {
    flex-basis: 30%;
    height: 2px;
    background-color: #ffee6b;
  }
`;
const ProviderTitle = ({ provider, showBackButton=false, onBack=()=>{}, activeCategory}) => {
  return (
    <>

      <ProviderTitleContainer>
        {showBackButton && 
        <BackButton>
          {activeCategory != "hotgameslist" &&
            <Icon icon="tabler:arrow-back-up" width="1.5rem" height="1.5rem"  style={{ color: "white" }} 
            onClick={() => onBack(activeCategory)}/>
          }
        </BackButton>
        }
        <Title>
        {provider?.split("").map((char, index) => (
          <StyledSpan
            key={index}
            $color={colors[index % colors.length]}
            $animationDelay={index * 0.1}
          >
            {char}
          </StyledSpan>
        ))}
        </Title>
      </ProviderTitleContainer>
      <Underline>
        <span />
        <span />
      </Underline>
    </>
  );
};

export default ProviderTitle;
