import React from 'react'
import { AuthImageContainer } from './Auth.styled'
import Image from '../../components/common/Image'
import { useSelector } from 'react-redux'
import { selectConfigData } from '../../api/generalApi'

function AuthImage() {
  const {login_image} = useSelector(selectConfigData);
  return (
    <AuthImageContainer>
        <Image src={login_image} alt="" skeletonHeight={312} />
    </AuthImageContainer>
  )
}

export default React.memo(AuthImage)