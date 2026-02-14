import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  padding-top: 1vmin;
  background: #1b0c28;
  height: 100%;
`;

export const HeaderSection = styled.div`
  width: 39%;
  height: 100%;
  background: linear-gradient(
    #1155ab,
    #124ba0,
    #104190,
    #0f408f,
    #0d3178,
    #071e56,
    #091e60,
    #0a2b69,
    #093578,
    #06377b,
    #08448e,
    #205278
  );
  border-top: 3px solid #3991d0;
  border-bottom: 2px solid #3991d0;
  box-shadow: 0px -3px 2px #2773c0;

  &.header-left {
    border-top-right-radius: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkin-image {
      width: 20%;
      margin-left: 2%;
      margin-top: -2%;
      align-self: flex-start;
    }
  }
  &.header-right {
    border-top-left-radius: 40px;
    display: flex;
    align-items: center;
    gap: 1vw;
    padding-right: 1%;

    marquee {
      width: 75%;
      margin-left: 5%;
      margin-right: auto;
      font-size: 1.5vmax;
      color: #fff;
    }

    .button-img {
      width: auto;
      height: 3.5vmin;
      color: #fff;
    }
  }
`;

export const ButtonWrapper = styled.div`
  background: linear-gradient(
    #0fa9e9,
    #0576c3,
    #104190,
    #093079,
    #04144c,
    #041047,
    #0b2f7b
  );
  border-radius: 6px;
  border: 0.2vmax solid #000;
  padding: 1%;
`;

export const UserBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0.9;

  .refresh-btn {
    font-size: 2vmax;
    cursor: pointer;
  }
`;

export const UserDetails = styled.div`
  flex: 1 0 60%;
  height: 5vmin;
  border-radius: 9999px;
  background: linear-gradient(
    #061c41,
    #061d45,
    #041e45,
    #041e45,
    #041e45,
    #031d42,
    #011b3c
  );
  margin-right: 10%;
  display: flex;
  align-items: center;

  img {
    width: 15%;
  }
  .user-balance {
    flex: 1;
    font-size: 1.4vmax;
    color: #fff;
    align-self: stretch;
    display: flex;
    align-items: center;
    position: relative;
    letter-spacing: 0.1vmin;

    .username {
      position: absolute;
      top: 21%;
      transform: translateY(-100%);
      font-size: 0.8em;
      background: linear-gradient(
        #061c41,
        #061d45,
        #041e45,
        #041e45,
        #041e45,
        #031d42,
        #011b3c
      );
      padding: 1.5% 3%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }
  }
`;

export const HeaderMiddle = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150%; /* Full viewport height */
  position: absolute;
  top: 0;
`;

export const GradientBorder = styled.div`
  position: relative;
  width: 25vmax; /* Adjust width as needed */
  height: 17vmin; /* Adjust height as needed */
  padding: 10px;
  background: linear-gradient(
    #ffd02d,
    #fbe243,
    #faf7cc,
    #fff3cd,
    #e6c77a,
    #e4c47b,
    #e4b864,
    #d99a23,
    #e49b23,
    #f1b511,
    #fdb618,
    #ffb419,
    #d67e11,
    #d97a14,
    #d77b14,
    #d07c19
  );
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InnerGradient = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    #041143,
    #031435,
    #011631,
    #060d20,
    #050611,
    #010304,
    #020204,
    #030104,
    #050004
  );
  clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenterImage = styled.img`
  max-width: 80%; /* Ensure the image fits well */
  max-height: 80%; /* Ensure the image fits well */
`;
