import styled from "styled-components"

export const ProfileContainer = styled.div`
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .wallet-and-routes {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;

        @media screen and (max-width: 1000px) {
            flex-direction: column;
        }
    }
`

export const UserWallet = styled.div`
    display: flex;
    width: 100%;
    max-width: 500px;

    .user-img {
        flex: 1;
        width: 100px;
        align-self: center;
    }

    .user-details {
        flex: 2;
        padding: 0 10px;
        .username {
            font-size: 14px;
            font-weight: 700;
            color: ${props=>props.theme.text_color_secondary};
            margin-bottom: 10px;
        }
        .balance {
            font-size: 14px;
            font-weight: 100;
            color: ${props=>props.theme.text_color};
        }
    }
    .rank_container {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 5px;

        img {
            width: 30px;
        }

        .rank {
            font-size: 12px;
            font-weight: 700;
            color: ${props=>props.theme.text_color_secondary};
        }
    }

`
export const Routes = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-collapse: collapse;
    flex: 1;

    &>div {
        width: 33.33%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // border: 2px solid #e6960c;
        border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "#e6960c"};
        padding: 20px 0;
        cursor: pointer;

        .route-name {
            font-size: 14px;
            font-weight: 100;
            color: #898989;
        }
    }
`
export const Wallet = styled.div`
    // border: 2px solid #e6960c;
    // box-shadow: 0 0 12px rgba(230,150,12,.8), inset 0 0 12px rgba(230,150,12,.8);
    border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "#e6960c"};
    box-shadow: 0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "rgba(230,150,12,.8)"}, 
    0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "rgba(230,150,12,.8)"} inset; 

    border-radius: 15px;
    padding: 16px;
    margin-bottom: 30px;
    flex: 1;

    label {
        font-size: 14px;
        font-weight: 400;
        color: ${props=>props.theme.text_color};;
        margin-bottom: 5px;
        display: block;
    }
`

export const BonusWinoverContainer = styled.div`
    width: 100%;
    padding: ${({$padding}) => $padding?$padding:"0"};
    text-align: ${({$textAlign}) => $textAlign?$textAlign:"left"};
    label {
        font-size: 14px;
        font-weight: 400;
        color: ${props=>props.theme.text_color};;
        margin-bottom: 5px;
        display: block;
    }
`
export const ProgressContainer = styled.div`
    margin-bottom: 20px;
    .balance {
        font-size: 20px;
        font-weight: 400;
        margin-bottom: 8px;
        .key {
            color: ${props=>props.theme.text_color};
            margin-right: 5px;
        }
        .value {
            color: ${props=>props.theme.text_color_secondary};
        }
    }
    .progressbar {
        width: 100%;
        height: 16px;
        border-radius: 4px;
        background: #4d4d4d;
        overflow: hidden;
        position: relative;

        &::before, &::after {
            content: "";
            background: ${props=>props.theme.secondary_color};            
            width: ${props=> props.$progress?props.$progress:"0"};
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
        }
        &::after {
            content: ${props=> props.$progress?"'" + props.$progress + "'":""};
            text-align: center;
            color: ${props=>props.theme.text_color};;
            background: none;
            font-size: 12px;
            line-height: 16px;
            width: 100%;
        }
    }
`