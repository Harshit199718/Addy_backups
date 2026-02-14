import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 80vh;
  position: relative;

  .sidebar-toggler {
    display: none;
    position: absolute;
    bottom: 10px;
    left: 10px;
    padding: 10px;
    border-radius: 50%;
    background: ${({theme}) => theme.primary_color};
    color: #fff;
    z-index: 30;
    cursor: pointer;

    @media screen and (max-width: 1025px) {
      display: flex;
    }
  }

  * {
    box-sizing: border-box;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }
  *::-webkit-scrollbar {
    display: block;
    width: 2px;
    height: 2px;
    border-radius: 10px;
  }
  *::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
