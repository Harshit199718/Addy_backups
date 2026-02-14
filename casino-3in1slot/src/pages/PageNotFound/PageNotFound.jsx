import React from 'react'
import Button from '../../components/common/Button'
import Link from '../../components/common/Link'
import { PageNotFoundContainer } from './PageNotFound.styled'

function PageNotFound() {
  return (
    <PageNotFoundContainer>
      <h2>404 Not Found</h2>
      <p>page you are looking for is not available</p>
      <Button $width="max-content"><Link to="/">Go to Home</Link></Button>
    </PageNotFoundContainer>
  )
}

export default PageNotFound