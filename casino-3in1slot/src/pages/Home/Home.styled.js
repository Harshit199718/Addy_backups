import styled from "styled-components";
import bg from "../../assets/images/background.gif"

export const HomeLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    overflow: hidden;
`

export const HeaderWrapper = styled.header`
  flex: 0 0 auto;
  text-align: center;
  border-top: 4px solid #f2cf52;
  height: 10.4%;
  position: relative;

  .checkin-image {
    // position: absolute;
    // top: 0;
    // left: 1%;
    // width: 15vmin;
  }
`;

export const HomeContent = styled.main`
  overflow-y: auto;
  height: 75.6%;
  background-image: url(${bg});
  background-repeat: no-repeat;
  background-size: cover;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const GameFilters = styled.div`
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1vw;

  button.filter {
    padding: .5em 1em;
    border-radius: .5em;
    background: rgb(59 130 246);
    text-transform: uppercase;
    font-size: 1.2vmax;
    border: none;
    outline: none;
    color: #fff;
  }
`

export const GamesContainer = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 20px;
  overflow-x: auto;
  
  img {
    width: 16vmax;
    height: auto;

    &:first-child {
      margin-left: 5vw;
    }
    &:last-child {
      margin-right: 5vw;
    }
  }
`

export const FooterWrapper = styled.footer`
  background: linear-gradient(#053f8e, #093d8d, #08327c, #082666, #062064, #042d7d, #063e98, #0c61b3);
  text-align: center;
  height: 14%;
  flex: 1 0 auto;
`;