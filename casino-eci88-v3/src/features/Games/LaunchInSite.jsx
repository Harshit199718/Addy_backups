import React, { useEffect } from 'react'
import { LaunchInSiteContainer } from './Games.styled'
import { Icon } from '@iconify/react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStopProductMutation } from '../../api/hooks';
import Loading from '../../components/common/Loading';

function LaunchInSite() {
  const {src, id} = useParams();
  const [stopProduct, {isLoading, isSuccess}] = useStopProductMutation();
  const navigate = useNavigate();

  const handleStopProduct = () => {
    stopProduct(id);
  }

  useEffect(() => {
    if (isSuccess) {
      navigate("/")
    }
  }, [isSuccess])
  
  return (
    <LaunchInSiteContainer>
      <Loading isLoading={isLoading} />
      <Icon className="back-icon" icon="uil:angle-left" onClick={handleStopProduct} />
      <iframe src={decodeURIComponent(src)} frameborder="0"></iframe>
    </LaunchInSiteContainer>
  )
}

export default LaunchInSite