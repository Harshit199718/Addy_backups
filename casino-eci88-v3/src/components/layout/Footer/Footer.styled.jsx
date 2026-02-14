import styled from 'styled-components'
import { checkBg } from '../../../utils/helper'

export const FooterContainer = styled.footer`
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: ${({theme: {footer_bg_type, ...theme}})=>checkBg(theme[footer_bg_type])};
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: 45;
`
export const FooterItem = styled.div`
    flex: 1;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2px;
    position: relative;

    img {
        height: 30px;
        width: auto;
        margin: auto;
    }

    .item-text {
        font-size: 12px;
        font-weight: 100;
        text-transform: uppercase;
        color: #898989;
        white-space: nowrap;
    }
    .item-text-img {
        height: 25px;
    }
    transform: ${({$active})=>$active?"translateY(-5px)":"none"};
    /* background: ${({$active}) => $active?"rgb(205, 24, 24)":"none"}; */

    .unread-count {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        background-color: red;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
    }
`