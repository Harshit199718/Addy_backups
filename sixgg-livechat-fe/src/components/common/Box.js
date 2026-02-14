import styled from "styled-components";

export const Box = styled.div`
    display: flex;
    flex-direction: ${({$direction}) => $direction?$direction:"row"};
    justify-content: ${({$justifyContent}) => $justifyContent?$justifyContent:"center"};
    align-items: ${({$alignItems}) => $alignItems?$alignItems:"center"};
    flex-wrap: ${({$flexWrap}) => $flexWrap?$flexWrap:"nowrap"};
    padding: ${({$spacing}) => $spacing?$spacing:"10px 20px"};
    padding-left: ${({$spacingX}) => $spacingX?$spacingX:"20px"};
    padding-right: ${({$spacingX}) => $spacingX?$spacingX:"20px"};
    padding-top: ${({$spacingY}) => $spacingY?$spacingY:"10px"};
    padding-bottom: ${({$spacingY}) => $spacingY?$spacingY:"10px"};
    gap: ${({$gap}) => $gap?$gap:"0"};
`