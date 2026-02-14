import styled from "styled-components";

export const HomeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Column = styled.div`
  // Desktop View
  &:nth-child(1),
  &:nth-child(3) {
    width: 420px;
  }

  &:nth-child(2) {
    width: calc(100% - 840px);
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
      width: 100%;
    }
  }
`;
