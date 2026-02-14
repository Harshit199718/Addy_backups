import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the loading spinner animation
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

// Styled component for the loading spinner
const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #000;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
`;

// Styled component for the loading text
const LoadingText = styled.div`
  margin-left: 10px;
  font-size: 16px;
  color: #000;
`;

// Styled component for the container
const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingMore = () => {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>Loading more chats...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingMore;
