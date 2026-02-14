import { Icon } from '@iconify/react'
import React from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const LoadingContainer = styled.div`
    width: 100%;
    height: 100dvh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    z-index: 500;
    
    ${(props => props.$imageLoading?({
      backgroundImage: `url(${props.theme.loading_image})`,
      backgroundSize: "60px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }):({}))}

    ${(props => !props.$fullscreen?({
      width: "100%",
      height: "100%",
      position: "static",
      backgroundColor: "transparent"
    }):({}))}
    
    &>span {
        font-size: 22px;
        font-weight: 500;
        color: #ddd;
    }
`
const Loading = React.memo(function Loading({message, isLoading, fullscreen=true, imageLoading}) {
  const { t } = useTranslation();

  return fullscreen?(isLoading? createPortal(
    <LoadingContainer $fullscreen={fullscreen} $imageLoading={imageLoading}>
        <Icon icon="eos-icons:bubble-loading" fontSize={imageLoading?"100px":"50px"} color='#ddd' />
        <span>{message || t("is_loading")}</span>
    </LoadingContainer>,
    document.body
  ):null):(
    isLoading?
    <LoadingContainer $fullscreen={fullscreen} $imageLoading={imageLoading}>
        <Icon icon="eos-icons:bubble-loading" fontSize={imageLoading?"100px":"50px"} color='#ddd' />
        <span>{message || t("is_loading")}</span>
    </LoadingContainer>
    :null
  )
})

export default Loading