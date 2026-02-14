import styled from "styled-components";

export const LiveChatContainer = styled.div`
    position: fixed;
    top: 50px;
    bottom: 60px;
    left: 0;
    width: 100%;
    display: ${({$visible})=> $visible?"block":"none"};
    background-image: url(${({theme})=> theme.livechat_image});
`