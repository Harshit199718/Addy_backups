import styled from "styled-components";

export const MailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

export const Mail = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    padding: 7px;
    border: 2.5px solid #ffc107;

    .title {
        font-size: 14px;
        color: #747474;
        span {
            font-weight: 600;
            color: ${({theme})=>theme.text_color};
            text-transform: uppercase;
        }
    }
    `
export const Message = styled.p`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    
    span {
        font-size: 14px;
        font-weight: 600;
        color: ${({theme})=>theme.text_color_secondary};
    }
`