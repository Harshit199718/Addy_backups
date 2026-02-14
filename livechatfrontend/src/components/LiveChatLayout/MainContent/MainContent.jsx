import React from 'react'
import Header from '../Header/Header'
import { Content, MainContentContainer } from './MainContent.styled'

function MainContent({children}) {
  return (
    <MainContentContainer>
        <Content>
            {children}
        </Content>
    </MainContentContainer>
  )
}

export default MainContent