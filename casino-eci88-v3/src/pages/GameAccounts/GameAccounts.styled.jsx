import styled from "styled-components";

export const GameAccountsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`
export const GameAccount = styled.div`
    display: flex;
    flex-shrink: 0;
    width: 100%;
    max-width: 400px;
    border-bottom: 1px solid #fff;
    &>div:last-child {
        flex: 3;
    }
`

export const UserGameDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 10px;

    h3.username {
        font-size: 16px;
        font-weight: 600;
        color: #747474;
    }
    .input-container {
        width: 50%;
        border-radius: 6px;
        display: flex;
        background-color: #000;
        padding: 4px 11px;
        input {
            width: 90%;
            font-size: 14px;
            color: ${props=>props.theme.text_color};;
            background: none;
            border: none;
            outline: none;
        }
    }
    .amount-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: auto;

        .tag {
            border-radius: 4px;
            padding: 1px 4px;
            font-size: 12px;
            color: ${props=>props.theme.text_color};;
            text-transform: uppercase;
            background-color: ${props=>props.theme.secondary_color};;
        }
        .amount {
            color: ${props=>props.theme.text_color};;
            font-size: 16px;
            font-weight: 600;
        }
    }
`