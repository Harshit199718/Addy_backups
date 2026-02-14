import React, { useEffect, useMemo } from 'react'
import Gamelist from './Gamelist'
import { useGetProductsMutation } from '../../api/hooks';
import { HotGamesContainer } from './Games.styled';
import ProviderTitle from './ProviderTitle';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function HotGames({ handleProduct }) {
  const { t } = useTranslation();
  const { feature_game_title } = useSelector(selectConfigData);
  const [getProducts, {data: products}] = useGetProductsMutation();
  const allProducts = useMemo(() => {
    if (!products) return [];
    return products.map(product=>({
        ...product,
        title: product.name,
        image: product.image_mobile,
      }));
  }, [products])
  useEffect(() => {
    getProducts({featured: true});
  }, [])

  return (
    <>
      {
        allProducts?.length?
        <HotGamesContainer>
            <ProviderTitle provider={t(feature_game_title)} />
            <Gamelist gamelist={allProducts} isHotGames handleLaunch={handleProduct} />
        </HotGamesContainer>
        :null
      }
    </>
  )
}

export default HotGames