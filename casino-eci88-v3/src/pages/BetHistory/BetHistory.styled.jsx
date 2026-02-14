import styled from "styled-components";

export const BetHistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export const BetContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const BetTab = styled.div`
    border-radius: 12px;
    padding: 8px 20px;
    border: 2px solid #fff;

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;

    .details {
        .bet-details, .time-details {
            font-size: 13px;
            line-height: 24px;
            color: #fff;

            span {
                color: ${props=> (props.$result>0)?"green":"red"};
            }
        }
        .time-details {
            color: rgb(170, 178, 189);
        }
    }
`

export const BetDescription = styled.div`
    padding: 10px;
    .ids_container {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        padding: 10px 0;
        margin-bottom: 10px;
        border-bottom: 1px solid #fff;
        
        .id {
            display: flex;
            align-items: center;
            gap: 5px;

            label {
                color: red;
            }
            .value {
                color: rgb(170, 178, 189);
            }
        }
    }

    .balance {
        font-size: 13px;
        line-height: 24px;
        color: rgb(170, 178, 189);

        span {
            color: #fff;
        }
    }
`