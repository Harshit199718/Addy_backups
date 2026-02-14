import styled from "styled-components";
import { WhiteBox } from "../../components/common/WhiteBox";
import { Box } from "../../components/common/Box";

export const MyProfileContainer = styled(WhiteBox)`
    margin: 10px;
    height: 97%;
    display: flex;
    flex-direction: column;
`

export const UserRole = styled(Box)`
    padding: 14px;
    justify-content: flex-start;
    gap: 10px;
    font-size: 1.8em;
    color: ${({theme}) => theme.primary_color};
    border-bottom: 1px solid rgba(72, 94, 144, 0.16);
    text-transform: capitalize;
`

export const Profile = styled.div`
    border-bottom: 1px solid rgba(72, 94, 144, 0.16);
    padding: 14px;

    .title {
        font-size: 1.7em;
        font-weight: 400;
        color: ${({theme}) => theme.primary_color};
    }
    .detail {
        flex-basis: 33%;
        padding: 10px 0;
        label {
            display: block;
            font-size: 1em;
            line-height: 24px;
        }
        span {
            font-size: 1.3em;
        }
    }
`

export const ProfileFooter = styled.footer`
    padding: 14px;
    margin-top: auto;

    button {
        border-radius: 5px;
        padding: 8px 16px;
        font-size: 1.1em;
        color: #fff;
        border: none;
    }
    button.cancel {
        background-color: #ffa800;
    }
    button.save {
        background-color: ${({theme}) => theme.secondary_color};
    }
`

