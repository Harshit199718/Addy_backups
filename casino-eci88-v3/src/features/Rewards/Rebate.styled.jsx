import styled from "styled-components";

export const RebateContainer = styled.div`
    justify-content: center;
    align-items: center;

    p.message {
        font-size: 13px;
        line-height: 24px;
        color: #747474;
    }
`

export const RewardBoxes = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
`

export const BoxContainer = styled.div`
    width: 31%;

    img {
        width: 100%;
        height: auto;
    }
`

export const MessageContainer = styled.div`
    text-align: center;
    
    .logo img {
        height: 200px
    }

    .message {
        font-size: 24px;
        font-weight: 600;
    }

`