import styled from 'styled-components'

export const BankListContainer = styled.div`

    label {
        font-size: ${({$labelSize})=> $labelSize?$labelSize:"14px"};
        line-height: 24px;
        padding: 0 5px;
        color: ${props=>props.theme.text_color};
    }
    .banks {
        padding: 1rem;
        border: 1px solid #e4ae60;
        border: 1px solid ${({theme}) => theme.border_color ? theme.border_color : "#e4ae60"};
        border-radius: 10px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
    }
    .banks-info {
        margin-top: 30px;
        padding: 1rem;
        border: 1px solid #ced4da;
        border: 1px solid ${({theme}) => theme.border_color ? theme.border_color : "#ced4da"};
        border-radius: 10px;
        font-size: 12px;
        font-weight: bold;
        color: white !important;
      }
      
    .banks-info table {
    width: 100%;
    }
`
export const Bank = styled.div`
    filter: ${props=> props.$selected?"grayscale(0)":"grayscale(100%)"};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    max-width: 30.5%;
    img {
        max-width: 100%;
        height: 60px;
    }
    .name {
        font-size: 12px;
        font-weight: ${props=> props.$selected?"700":"100"};
        text-align: center;
        color: ${props=>props.theme.text_color_secondary}!important;
        text-transform: uppercase;
    }
`