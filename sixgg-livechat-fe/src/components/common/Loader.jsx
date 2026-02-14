import { Icon } from '@iconify/react/dist/iconify.js';
import React from 'react'
import styled, { keyframes } from 'styled-components';
import { Box } from './Box';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled(Box)`
    width: 100%;
    padding: 0;
    .loader {
        animation: ${rotateAnimation} 2s linear infinite;
    }
`

function Loader() {
    return (
        <LoaderContainer>
            <div className="loader">
                <Icon icon="tabler:loader-2" fontSize={20} />
            </div>
        </LoaderContainer>
    )
}

export default Loader