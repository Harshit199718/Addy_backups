import styled from "styled-components"

export const ChatInput = styled.input`
    border-radius: 10px;
    height: 100%;
    background-color: #fff;
    border: 1px solid ${({theme}) => theme.primary_color};
    outline: none;
    padding: 10px;
    font-size: 1.8em;
`