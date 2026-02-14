import styled from "styled-components";

export const MainContentContainer = styled.div`
    width: calc(100% - 15rem);

    @media screen and (max-width: 1025px) {
        width: 100%;
    }
`

export const Content = styled.div`
    height: 100%;
    overflow-y: auto;
    background-color: #eef0f8;
`