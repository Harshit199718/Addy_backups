import styled from 'styled-components'

const LayoutSpacing = styled.div`
    padding: ${props => props.$padding ? props.$padding : "5px 5px"};
`

export default LayoutSpacing