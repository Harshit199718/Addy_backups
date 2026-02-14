import styled from "styled-components";
import { AuthBalance, AuthButtons, MemberAuthContainer, MemberAuthWrapper, NoAuth } from "./MemberAuth1.styled";

export const MemberAuthWrapper3 = styled(MemberAuthWrapper)`
`;

export const MemberAuthContainer3 = styled(MemberAuthContainer)`
    border: none;
    box-shadow: none;
    border-radius: 0;
    width: 105%;
    transform: translateX(-2.5%);
    padding: 0;
    margin: auto;
    background: rgb(45, 45, 45);
`;

export const AuthBalance3 = styled(AuthBalance)`
    flex: 1;

    .balance {
        border: 0;
        border-radius: 0;
        &:first-child {
            padding: 8px 8px 4px;
        }
        &:nth-child(2) {
            border-top: 2px solid #E6960C;
            padding: 4px 8px 8px;
        }
    }
`;

export const AuthButtons3 = styled(AuthButtons)`
    flex: 1.8;
    padding: 8px;
    .buttons {
        flex-direction: row;
        justify-content: space-between;
        width: 100%;

        .button {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex: 1;
            border-right: 2px solid ${({theme})=> theme.border_color_secondary};
            height: 100%;

            &:last-child {
                border-right: none;
            }
            .button-name, .username {
                font-size: 13px;
                font-weight: 600;
                color: #fff;
            }
            .user-balance {
                font-size: 15px;
                font-weight: 100;
                color: red;
            }
        }
    }
`

export const NoAuth3 = styled(NoAuth)`
    flex: 1;
    padding: 8px;
    border-right: 2px solid #E6960C;

    &>div {
        max-width: 100%;
    }
`;