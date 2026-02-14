import styled from "styled-components";

const Button = styled.button`
    width: ${props=>props.$width?props.$width:"100%"};
    height: ${props=>props.$height?props.$height:"auto"};
    padding: ${props=>props.$padding?props.$padding:"14px 20px"};
    margin: ${props=>props.$margin?props.$margin:"5px 0"};
    text-align: center;
    background-color: ${props=>props.$background?props.$background:props.theme.secondary_color};
    background-image: ${props=>props.$backgroundImage};
    color: ${props=>props.theme.text_color};
    text-transform: ${props=>props.$transform?props.$transform:"uppercase"};
    font-size: ${props=>props.$fontSize?props.$fontSize:"14px"};
    font-weight: ${props=>props.$fontWeight?props.$fontWeight:"700"};
    font-family: "Source Sans Pro", sans-serif;
    box-shadow: 0 5px 14px 0 rgba(0, 0, 0, 0.1);
    border: none;
    border-radius: ${props=> props.$borderRadius?props.$borderRadius:"4px"};
    cursor: pointer;

    &:disabled {
        background-color: #ACACAC;
        cursor: default;
    }
    &:hover {
        background-color: ${props=>props.$hoverBackground?props.$hoverBackground:props.theme.secondary_color};
    }
`

export default Button