import styled from "styled-components";
import { Box } from "../../components/common/Box";

// Deparments Styles
export const DepartmentsContainer = styled(Box)`
    justify-content: flex-start;
    gap: 10px;

    h2.header {
        
    }
`
export const Department = styled(Box)`
    background-color: ${({theme}) => theme.secondary_color};
    color: #fff;
    border-radius: 10px;
`
// Deparments Styles Ends