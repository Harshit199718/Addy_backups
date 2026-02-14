import styled from "styled-components"

export const DepositContainer = styled.div`
    display: flex;
    gap: 5px;

    &>* {
        flex: 1;
    }
`
export const Deposits = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    height: calc(100vh - 110px);
    overflow-y: auto;

    img {
        /* width: 96%; */
        height: auto;
        margin: auto;
    }

    @media screen and (max-width: 800px) {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    
`
export const DepositFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px;

    .deposit_heading {
        font-size: 22px;
        font-weight: 700;
        color: ${props=>props.theme.text_color};
        margin-bottom: 10px;
        text-transform: uppercase;
    }
    .amount-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin: 20px 0;
        
        .amount {
            width: calc(25% - 7.5px);
            height: 45px;
            display: flex;
            justify-content: center;
            align-items: center;
            border: 1.5px solid #e4ae60;
            background: ${({theme})=>theme.manual_deposit_style==="2"?"#DCAD23":"linear-gradient(to bottom, #744b1f 10%, #e4ae60 28%, #744b1f 90%)"};
            border-radius: 10px;
            font-size: 14px;
            font-weight: 700;
            color: ${props=>props.theme.text_color};
        }
    }
`
export const TransactionHeader = styled.div`
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    background: #000;
    color: ${props=>props.theme.text_color};;
    line-height: 60px;
    
`
export const TransactionFormContainer = styled.div`
    flex: 1.5;

    @media screen and (max-width: 800px) {
        display: none;
    }
`
export const WithdrawContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    .withdraw-buttons {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .text {
        text-align: right;
    }
`
export const WalletContainer = styled.div`
    border-radius: 10px;
    background-color: ${({theme}) => theme.withdraw_chip_bg?theme.withdraw_chip_bg:"rgb(32, 26, 28)"};
    color: ${props=>props.theme.text_color};
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 87px;
    margin: 0 auto;
    margin-bottom: 20px;
    gap: 20%;
    max-width: 500px;

    .wallet {
        margin: 10px 0;
        .type {
            font-size: 1rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        .value {
            font-size: 1rem;
            font-weight: 100;

            span{
                font-weight: 600;
            }
        }
    }

    .divider {
        height: 80%;
        width: 1px;
        background-color: #fff;
    }
`