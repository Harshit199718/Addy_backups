import React from 'react'
import { LayoutContainer } from './LiveChatLayout.styled'
import Sidebar from './Sidebar/Sidebar'
import MainContent from './MainContent/MainContent'
import { Icon } from '@iconify/react/dist/iconify.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectSidebarOpen, setSidebarOpen } from '../../app/slices/generalSlice'

function LiveChatLayout({children}) {
  const dispatch = useDispatch();
  const sidebarOpen = useSelector(selectSidebarOpen);
  return (
    <LayoutContainer>
        <div className="sidebar-toggler" onClick={() => dispatch(setSidebarOpen(!sidebarOpen))}>
          <Icon icon="fa6-solid:bars-staggered" fontSize={24} />
        </div>
        <Sidebar />
        <MainContent>{children}</MainContent>
    </LayoutContainer>
  )
}

export default LiveChatLayout