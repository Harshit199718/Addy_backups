import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux';
import { selectConfigData } from '../api/generalApi';
import Image from '../components/common/Image';

const PaymentBannerWrapper = styled.div`
    img {
        width: 100%;
        min-height: 61px;
    }
`
function PaymentBanner() {
  const { payment_banner } = useSelector(selectConfigData);
  return payment_banner?(
    <PaymentBannerWrapper>
        <Image src={payment_banner} alt="" skeletonHeight={58} />
    </PaymentBannerWrapper>
  ):null
}

export default React.memo(PaymentBanner)