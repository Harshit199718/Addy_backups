import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '@iconify/react';

const StyledToast = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  padding: 10px 20px;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  ${props => props.type === 'success' ? css`
    background-color: #4CAF50;  // Green for success
  ` : css`
    background-color: #F44336;  // Red for error
  `}
`;

function Toast({ message, type, duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <StyledToast type={type}>
      <Icon icon={type === 'success' ? 'mdi:check-circle-outline' : 'mdi:alert-circle-outline'} style={{ fontSize: '24px', marginRight: '10px' }} />
      {message}
    </StyledToast>
  );
}

export default Toast;
