import { Icon } from '@iconify/react'
import React from 'react'
import { createPortal } from 'react-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background: rgba(0,0,0,.6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100;
    padding-top: 20px;
`
const ModalContent = styled.div`
    width: ${props=>props.$width?props.$width:"max-content"};
    height: ${props=>props.$height?props.$height:"auto"};
    min-width: ${props=>props.$minWidth?props.$minWidth:"40%"};
    max-width: ${props=>props.$maxWidth?props.$maxWidth:"60%"};
    border-radius: ${props=>props.$borderRadius?props.$borderRadius:"15px"};

    // border: ${props=>props.$border?props.$border:"2px solid #ffc107"};

    border: 2px solid ${({theme}) => theme.border_color ? theme.border_color : "#cd9f15"};
    box-shadow: 0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "#cd9f15"}, 
    0 0 12px ${({theme}) => theme.border_shadow_primary_color ? theme.border_shadow_primary_color : "#cd9f15"} inset; 

    background-color: ${props=>props.$background?props.$background:"#000"};
    max-height: 95%;
    overflow-y: auto;
    overflow-y: ${props=>props.$overflowY?props.$overflowY:"auto"};
    color: ${props=>props.theme.text_color};

    @media screen and (max-width: 500px) {
        min-width: 95%;
        max-width: 95%;
    }
`
const ModalHeader = styled.h3`
    display: flex;
    align-items: center;
    padding: ${props=>props.$padding?props.$padding:"14px 16px"};
    font-size: 18px;
    color: ${props=>props.theme.text_color};
    
    span {
        margin: auto;
    }

    .custom-modal-icon {
        font-size: 24px;
        cursor: pointer;
    }
`
const ModalFooter = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    gap: 10px;
`
const ModalBody = styled.div`
    padding: ${props=>props.$padding?props.$padding:"14px 16px 30px"};
    width: ${props=>props.$bodyWidth?props.$bodyWidth:"100%"};
    height: ${props=>props.$bodyHeight?props.$bodyHeight:"auto"};

    .error-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        text-align: center;
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        color: #747474;
    }
`
function Modal({title, isOpen, onClose, children, error, success, footer, footerOutside, ...props}) {
    const { t } = useTranslation();
    
  return isOpen?createPortal(
    <ModalContainer onClick={e=>{
        if (e.target === e.currentTarget) {
            e.stopPropagation();
            onClose && onClose();
        }
    }}>
        <ModalContent {...props}>
            {title && 
            <ModalHeader {...props}>
                <span>{title}</span>
                <Icon icon='material-symbols:close' className='custom-modal-icon' 
                    onClick={e=>{
                        e.stopPropagation();
                        onClose && onClose();
                    }}
                />
            </ModalHeader>
            }
            <ModalBody {...props}>
                {
                    error?.message?
                    <div className="error-container">
                        <Icon icon="codicon:error" color="#f27474" width={70} />
                        {t(error?.message) || "Something Went Wrong"}
                    </div>
                    :null
                }
                {
                    success?.message?
                    <div className="error-container">
                        <Icon icon="mdi:success-circle-outline" color="#4CAF50" width={70} />
                        {success?.message || "Success"}
                    </div>
                    :null
                }
                {children}
            </ModalBody>
            {
                !footerOutside &&
                <ModalFooter>
                    {footer}
                </ModalFooter>
            }
        </ModalContent>
        {
            footerOutside &&
            <ModalFooter>
                {footer}
            </ModalFooter>
        }
    </ModalContainer>,
    document.body
  ):null;
}

export default React.memo(Modal)