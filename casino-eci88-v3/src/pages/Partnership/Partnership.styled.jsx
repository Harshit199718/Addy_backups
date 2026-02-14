import styled from "styled-components";

export const PartnershipContainer = styled.div`
    overflow: auto;
    height: 100%;
    background: rgba(0, 0, 0, .7);
    text-align: center;
}
`

export const PartnershipItem = styled.div`
    display: inline-block;
    width: 150px;
    text-align: -webkit-center;
    margin: 25px 30px;
    
    .a {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        padding: 200px;
    }

    @media (max-width: 1000px) {
        width: 100px;
        margin: 15px 20px;
    }
}
`