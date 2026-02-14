import styled from "styled-components";

export const DepositSelector = styled.div`
  display: flex;
  row-gap: 5px;
  column-gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
  font-size: 16px;

  @media screen and (max-width: 560px) {
    font-size: 10px;
    gap: 5px;
  }
`;

export const DepositOption = styled.div`
  flex: 1 1 calc(33.333% - 6.66px);
  max-width: calc(33.333% - 6.66px);
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  font-size: 1.5em;
  font-weight: 400;
  color: #fff;
  background: ${({theme}) => theme.primary_color};
  border-radius: 6px;
  border: 2px solid ${({ $active, theme }) => ($active ? (theme.border_color ? theme.border_color : "#fb0") : "#fff")};
  text-align: center;
  img {
    width: 50px;
    height: 50px;
  }
  
  @media screen and (max-width: 560px) {
    gap: 5px;
    img {
      width: 40px;
      height: 40px;
    }
  }
`;


export const DepositForm3Container = styled.div`
  // padding: 10px 20px;
  // background: #232323;
  // border-radius: 6px;

  .deposit-heading {
    font-size: 22px;
    font-weight: 700;
    color: ${props=>props.theme.text_color};
    margin-bottom: 10px;
    text-align: center;
  }

  #coupons-input {
    input {
        border-radius: 6px;
        padding: 10px 10px;
        font-size: 12px;
    }
  }
`;

export const AmountButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const AmountButton = styled.button`
  width: calc(25% - 7.5px);
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1.5px solid ${({theme}) => theme.border_color ? theme.border_color : "#e4ae60"};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 700;
  background: ${({theme}) => theme.inputs_bg ? theme.inputs_bg : "#333"};
  color: ${({theme}) => theme.text_color ? theme.text_color : "#fff"};
`;
