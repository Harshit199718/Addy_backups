import React from 'react'
import { LayoutContainer } from './LiveChatLayout.styled'
import Sidebar from './Sidebar/Sidebar'
import MainContent from './MainContent/MainContent'

function LiveChatLayout({children}) {
  return (
    <LayoutContainer>
        <Sidebar />
        <MainContent>{children}</MainContent>
    </LayoutContainer>
  )
}

export default LiveChatLayout