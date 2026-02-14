import styled from "styled-components";

export const BankCardContainer = styled.div`
    border-radius: 10px;
    border: 2px solid #e6960c;
    padding: 10px;
    background-color: ${props=>props.theme.tertiary_color};
    display: flex;
    flex-direction: column;
    gap: 10px;

    .bank-details {
        display: flex;
        align-items: center;
        gap: 5px;

        img {
            width: 5rem;
            height: 4rem;
        }

        .bank-detail {
            display: flex;
            flex-direction: column;
            .name {
                font-size: 1.25rem;
                font-weight: 700;
                color: #898989;
                text-transform: uppercase;
            }
            .number {
                font-size: 1rem;
                font-weight: 100;
                color: #898989;
            }
        }
    }
    .account-holder-details {
        background: rgba(255, 255, 255, 0.1);
        padding: 5px;
        font-size: 1rem;
        color: #898989;
    }
`