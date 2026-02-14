import styled from "styled-components";

export const DepositSelectorContainer = styled.div`
    margin-bottom: 10px;
    label {
        font-size: ${({$labelSize})=> $labelSize?$labelSize:"14px"};
        line-height: 24px;
        padding: 0 5px;
        color: ${props=>props.theme.text_color};
    }
    .items_container {
        display: flex;
        gap: 5px;
        flex-wrap: wrap;
    }
`

export const DepositItem = styled.div`
    width: calc(25% - 3.75px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 5px;
    border-radius: 5px;
    box-shadow: 0 3px 5px rgba(0,0,0,.2);
    font-weight: 400;
    font-size: 14px;
    text-transform: uppercase;
    text-align: center;
    color: ${({theme}) => theme.text_color};
    background-color: ${({theme, $active}) => $active?theme.secondary_color:theme.tertiary_color};

    .box {
        width: 25px;
        height: 8px;
        background-color: ${({$active}) => $active?"#fff":"#000"};
    }
`