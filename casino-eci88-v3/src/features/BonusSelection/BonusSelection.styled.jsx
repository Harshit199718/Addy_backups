import styled from 'styled-components'

export const BonusSelectionContainer = styled.div`
    margin-top: 20px;

    .warning {
        display: flex;
        align-items: center;
        gap: 5px;
        color: ${props=>props.theme.text_color_secondary};
        margin-top: 10px;

        .message {
            font-size: 13px;
            font-weight: 100;
        }
    }
`
export const BonusSelectionLabel = styled.h3`
    font-size: 18px;
    font-weight: 700;
    color: ${props=>props.theme.text_color};

    span {
        color: ${props=>props.theme.text_color_secondary};
    }
`
export const BonusSelectionList = styled.div`
    border: 1px solid #fff;
    border: 1px solid ${({theme}) => theme.border_color ? theme.border_color : "#fff"};
    padding: 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`