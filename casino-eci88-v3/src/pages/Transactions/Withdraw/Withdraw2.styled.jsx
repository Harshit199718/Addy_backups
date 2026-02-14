import styled from "styled-components";
import { WithdrawContainer } from "../Transactions.styled";

export const WithdrawContainer2 = styled(WithdrawContainer)`
    height: calc(100dvh - 110px);
    background-color: rgb(80, 80, 73);

    .refresh-msg {
        font-size: 13px;
        line-height: 24px;
        color: #fff;
        text-align: center;
        font-weight: 900;
    }
`