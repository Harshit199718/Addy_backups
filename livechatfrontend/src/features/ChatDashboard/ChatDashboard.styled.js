import styled from "styled-components";
import { Box } from "../../components/common/Box";

export const ChatDashboardContainer = styled(Box)`
    gap: 10px;
`
export const ChatDetails = styled(Box)`
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.05);
`
export const Detail = styled.div`
    flex: 1;
    border-right: 1px solid rgba(72, 94, 144, 0.16);

    .count {
        font-size: 2.8em;
        font-weight: 500;
        color: #6993ff;
        margin-bottom: 10px;
        text-align: center;
    }

    .progress {
        font-size: 1.5em;
        text-align: center;
        margin: 0;
    }

    &:last-child {
        border-right: none;
    }
`