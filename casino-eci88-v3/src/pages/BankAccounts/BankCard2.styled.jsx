import styled from "styled-components";

export const BankCardContainer2 = styled.div`
    label {
        font-size: 15px;
        line-height: 24px;
        color: #fff;
        text-transform: uppercase;
        display: block;
        margin-bottom: 5px;
    }
`

export const BankDetails = styled.div`
    background-color: rgb(37, 41, 46);
    color: #fff;
    border-radius: 5px;
    padding: 15px 10px;
    display: flex;
    flex-direction: column;

    .account {
        border-bottom: 1px solid #434343;
        padding-bottom: 10px;
        .name {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 13px;
        }
        .number {
            font-size: 25px;
            font-weight: 100;
            letter-spacing: 5px;
        }
    }
    .bank-name {
        font-size: 16px;
        font-weight: 400;
        text-transform: uppercase;
        color: #fff;
        padding-top: 10px;
    }
`