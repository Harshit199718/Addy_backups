import styled from "styled-components";
import { AuthBalance, AuthButtons, MemberAuthContainer, MemberAuthWrapper, NoAuth } from "./MemberAuth1.styled";

export const MemberAuthWrapper2 = styled(MemberAuthWrapper)``;

export const MemberAuthContainer2 = styled(MemberAuthContainer)`
    padding: 0;
`;

export const AuthBalance2 = styled(AuthBalance)`
    flex: 1;
    /* padding: 8px; */
    border-right: 2px solid #E6960C;

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

export const AuthButtons2 = styled(AuthButtons)`
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
            &>div {
                // width: 60%;
                height: auto;
            }
            img {
                width: 100%;
            }
            .button-name {
                font-size: 13px;
                font-weight: 600;
                color: #fff;
            }
        }
    }
`

export const NoAuth2 = styled(NoAuth)`
    flex-direction: column;
    flex: 1;
    padding: 8px;
    border-right: 2px solid #E6960C;

    &>div {
        max-width: 100%;
    }
`;