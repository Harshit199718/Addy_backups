import styled from "styled-components";
import { AuthBalance, AuthButtons, MemberAuthContainer, MemberAuthWrapper, NoAuth } from "./MemberAuth1.styled";

export const MemberAuthWrapper4 = styled(MemberAuthWrapper)``;

export const MemberAuthContainer4 = styled(MemberAuthContainer)`
    padding: 0;
    flex-wrap: wrap;
    
    &>div:last-child {
        border-top: 2px solid #E6960C;
    }
`;

export const AuthBalance4 = styled(AuthBalance)`
    flex: 1.6;
    padding: 10px;

    .wallet-details {
        color: #fff;
        .balance-label {
            font-size: 18px;
            line-height: 23px;
            font-weight: 700;
            color: #fff;
            font-family: "Source Sans Pro", sans-serif;
        }
        .balance-value {
            font-size: 24px;
            line-height: 30px;
            font-weight: 700;
            color: gold;
        }
        .transaction-value {
            font-size: 13px;
            line-height: 24px;
            font-style: italic;
        }
    }
`;

export const AuthButtons4 = styled(AuthButtons)`
    flex: 1;
    .buttons {
        width: 100%;
    }
`

export const NoAuth4 = styled(NoAuth)``;