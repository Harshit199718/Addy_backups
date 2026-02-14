import styled from "styled-components";
import { Box } from "./Box";

export const Button = styled(Box)`
    width: ${({$width})=>$width?$width:"max-content"};
    border: ${({$border}) => $border?$border:"none"};
    background: ${({$background}) => $background?$background:"#475f7b"};
    color: ${({$color}) => $color?$color:"#fff"};
    font-size: ${({$fontSize}) => $fontSize?$fontSize:"1.2em"};
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
`