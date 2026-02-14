import styled from "styled-components";

export const FooterContainer = styled.div`
    display: flex;
    height: 100%;
`;

export const MenuContainer = styled.nav`
    width: 55%;
    height: 100%;
    display: flex;
    align-items: stretch;
    background: linear-gradient(#053f8e, #093d8d, #08327c, #082666, #062064, #042d7d, #063e98, #0c61b3);
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        border-top-right-radius: inherit;
        transform: translateX(-10%) skewX(45deg);
        border-top-right-radius: 1vmax;
        border: 2px solid #fff;
    }
`;

export const MenuItemContainer = styled.div`
    height: 100%;
    position: relative;
    z-index: 10;
    width: 30%;
    
    &:nth-child(1) {
        padding: 1vmax 2vmax;
    }
    &:nth-child(2) {
        border-left: 3px solid #20246b;
        border-right: 3px solid #20246b;
    }
    &:nth-child(3) {
        width: 40%;
    }
    &:nth-child(2), &:nth-child(3) {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: .5vmax;

        img {
            width: 3vmax;
            height: auto;
        }
        span {
            font-size: 1vmax;
            text-transform: uppercase;
            color: #99B1EB;
            letter-spacing: 1px;
        }
    }
    &:nth-child(3) {
        justify-content: start;
        padding-left: 1.5vmax;
    }

    .menu-btn {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.5vmax;
        text-transform: uppercase;
        font-weight: 900;

        span {
            background-clip: text;
            color: transparent;
            background-image: linear-gradient(#f0ffff, #f2feff, #bffafa, #a2f5f1, #9ff2ef, #9fedf8);
            text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
        }
    }
`

export const CategoriesAndSupport = styled.div`
    width: 50%;
    height: 100%;
    display: flex;

    .support {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: end;

        img {
            width: auto;
            height: 140%;

            &:first-child {
                height: 100%;
            }
        }
    }
    .games-categories {
        width: 60%;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .categories {
            display: flex;
            align-items: center;
            border-radius: 4px;
            overflow: hidden;
            background: rgb(18, 75, 160);
            padding: 2px;
            gap: .5vmax;

            button.category {
                border: none;
                outline: none;
                background: none;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: .2vmax;
                text-transform: uppercase;
                color: #a0b7f3;
    
                img {
                    width: 2vmax;
                    height: 2vmax;
                }
    
                &.active {
                    background: rgb(31, 113, 201);
                }
            }
        }
    }
`