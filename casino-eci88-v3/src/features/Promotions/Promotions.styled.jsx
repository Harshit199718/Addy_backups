import styled from "styled-components"

export const PromotionsContainer = styled.div`
    /* styles */
`
export const PromoTitle = styled.h2`
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    margin: 10px 0;
    color: ${props=>props.theme.text_color};
    text-transform: uppercase;
    
`
export const Promos = styled.div`
    display: flex;
    gap: 10px;
    overflow-x: auto;
    
`
export const PromotionContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    
`
export const TimeContainer = styled.div`
    display: flex;
    align-items: center;
    column-gap: 1rem;
    color: ${props=>props.theme.text_color};

    &>div {
        display: flex;
    }
    .time {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: .8rem;
        line-height: 1.2;
    }
    
`