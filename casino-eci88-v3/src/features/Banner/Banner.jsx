import React from 'react'
import { BannerContent, BannerWrapper } from './Banner.styled'
import Image from '../../components/common/Image'
import General from '../General/General'

function Banner({image, showReferralinBanner}) {
  return (
    <BannerWrapper>
      <BannerContent>
        <Image src={image} alt="" skeletonHeight={190} class="banner-img" />
        {showReferralinBanner && <General showReferralinBanner={showReferralinBanner}/>}
      </BannerContent>
    </BannerWrapper>
  )
}

export default React.memo(Banner)