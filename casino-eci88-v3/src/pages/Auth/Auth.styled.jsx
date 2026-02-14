import styled from "styled-components";
import AuthForm from "./AuthForm";

export const AuthWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-height: calc(100dvh - 110px);
  & > * {
    flex: 1;
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    min-height: auto;
  }
`;
export const AuthImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000;
  img {
    width: 100%;
    height: auto;

    @media screen and (max-width: 1000px) {
      max-height: calc(40vh - 50px);
    }
  }
`;
export const AuthFormContainer = styled.div`
  padding: 10px 20px;

  .auth-heading {
    color: ${(props) => props.theme.text_color_secondary};
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 10px;
  }

  .request-otp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    border-radius: 5px;
    background: ${({ theme }) =>
      theme.signup_version === "V4" ? "#37474f" : "none"};
    padding: ${({ theme }) => (theme.signup_version === "V4" ? "10px" : "0")};

    .note {
      width: 100%;
      font-size: 12px;
      color: #fff;
    }
    label {
      input,
      .error {
        margin: 0;
      }
    }

    .request-otp-btn {
      button {
        margin: 0;
      }
      p {
        color: ${(props) => props.theme.text_color};
        font-size: 14px;
        text-align: center;
      }
    }
  }
`;

export const AuthFormLinks = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const BankDetailsHeader = styled.div`
  color: ${({ theme }) => theme.text_color};
  text-align: center;
  margin-bottom: 10px;
  .title {
    font-size: 40px;
    font-weight: 700;
  }

  .sub-title {
    font-size: 15px;
    font-weight: 700;
    line-height: 24px;
  }
`;

export const BankDetailsWarning = styled.div`
  background: #fff3cd;
  font-size: 15px;
  font-weight: 700;
  line-height: 24px;
  color: #747474;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

// Auth 2

export const Auth2Title = styled.h2`
    padding: 10px;
    background: rgb(255, 0, 0);
    color: #fff;
    font-size: 13px;
    line-height: 24px;
    text-align: center;
    text-transform: uppercase;
    margin: 10px 0;
`;

export const AuthForm2Container = styled.div`
  background-color: rgb(80, 80, 73);
  min-height: 500px;
  padding: 25px 0;

  .amount-needed {
    font-size: 13px;
    line-height: 24px;
    color: #fff;
    span {
        font-size: 24px;
        display: block;
    }
  }
`;

export const AuthForm2 = styled(AuthForm)`
  padding: 25px 15px 20px;
`
