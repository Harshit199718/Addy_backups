import styled from "styled-components";

export const Profile2Container = styled.div`
    padding: 10px 20px;
    margin: 0 auto;
    max-width: 500px;
`

export const UserDetails = styled.table`
    padding: 10px;
    margin: auto 10px;
    color: #fff;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;

    tr {
        display: flex;
        align-items: center;
        gap: 10px;
        text-align: center;
        font-size: 13px;
        padding: 8px;
        td:first-child {
            width: 40%;
            font-weight: 700;
            text-align: right;
        }
        td:last-child {
            font-weight: 100;
            width: 50%;
            text-align: left;
        }
        td.rank {
            color: rgb(240, 40, 40);
            div {
                display: inline-block;
            }
        }
    }
`

export const Referral = styled.div`
    font-size: 14px;
    line-height: 24px;
    color: #fff;
    text-transform: uppercase;
    
    .link {
        border: 2px dashed rgb(255, 203, 97);
        background-color: rgb(80, 80, 73);
        display: block;
        font-size: 24px;
        font-weight: 100;
        line-height: 24px;
        color: rgb(240, 40, 40);
        padding: 10px;
        text-align: center;
        text-transform: lowercase;
        overflow-wrap: break-word;
    }
`

export const Profile2TabsContainer = styled.div`
    display: flex;
    padding: 4px;
    background-color: ${({theme}) => theme.primary_color};

    ${({$withdrawStyles}) => $withdrawStyles?$withdrawStyles:({})}
`

export const Profile2Tab = styled.h2`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 7px;
    font-size: 12px;
    font-weight: 100;
    text-transform: uppercase;
    color: ${({theme}) => theme.text_color};
    background-color: ${({$active}) => $active?$active:""};

    img {
        filter: brightness(0) invert(1);
    }
`