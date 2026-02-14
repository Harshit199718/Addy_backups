import styled from "styled-components";
import { Status } from "./History1.styled";

export const TransactionData = styled.div`
    font-size: 13px;    
    line-height: 24px;

    @media screen and (min-width: 768px) {
        font-size: 26px;    
        line-height: 48px;
    }
    .data-display {
        font-size: 1em;
        font-weight: 100;
        color: ${({$color})=>$color?$color:"#fff"};
    }
    .amount-display {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1em;
        font-weight: 100;
        color: #fff;
        span {
            color: gray;
        }
    }
`

export const Status3 = styled(Status)`
    display: flex;
    flex-direction: row;
    align-items: center;
    .status {
        width: 13px;
        height: 13px;
        padding: 0;
        margin: 0 8px 0 0;
        border-radius: 50%;
    }
`