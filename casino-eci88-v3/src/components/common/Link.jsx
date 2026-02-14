import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const LinkWrapper = styled.h3`
    font-size: ${props=> props.$fontSize?props.$fontSize:"inherit"};
    font-weight: ${props=> props.$fontWeight?props.$fontWeight:"inherit"};
    margin: ${props=> props.$margin?props.$margin:"0"};
    color: ${props=>props.theme.text_color};
    cursor: pointer;
`

function Link({children, to, ...props}) {
    const navigate = useNavigate();
  return (
    <LinkWrapper {...props} onClick={() => to && navigate(to)}>{children}</LinkWrapper>
  )
}

export default Link