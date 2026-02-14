import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { Box } from './Box'
import { Icon } from '@iconify/react/dist/iconify.js'

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
`

const ModalContent = styled.div`
  width: max-content;
  border-radius: 10px;
  background-color: #fff;
  min-width: 40%;
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
`
const ModalHeader = styled.div`
  width: 100%;
  padding: 10px 20px;
  font-size: 1.6em;
  border-bottom: 1px solid #ddd;
`

const ModalBody = styled.div`
  width: 100%;
  padding: 10px 20px;
`

function Modal({title, isOpen, onClose, children}) {
  return isOpen?createPortal(
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <Box $justifyContent="space-between" $spacingX="0" $spacingY="0">
            {title}
            <Icon icon="material-symbols:close" onClick={onClose} />
          </Box>
        </ModalHeader>
        <ModalBody>
          {children}
        </ModalBody>
      </ModalContent>
    </ModalContainer>,
    document.body
  ):null
}

export default Modal