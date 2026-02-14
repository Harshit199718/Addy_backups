import styled from "styled-components";
import { ProfileContainer } from "./Profile1.styled";

export const Profile3Container = styled(ProfileContainer)`
    .profile2_heading{
        color: #FFC107;
        border-bottom: 2px solid;
        padding-bottom: 10px;
        font-weight: 700;
        font-size: 18px;
    }
    table{
        color: ${props=>props.theme.text_color};

        td{
            font-size: 18px;
            padding: 10px 10px 0 0;
        }
        td:last-child{
            font-style: italic;
        }
    }
    .setting_info{
        color: ${props=>props.theme.text_color};
        font-size: 13px;
        font-weight: 700;
        line-height: 24px;
        padding: 6px 0 15px 0;
        border-bottom: 1px solid rgba(255,255,255,.3);
    }
`