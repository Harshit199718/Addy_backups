import React, { useEffect, useRef, useState } from 'react'
import { GameProgress, GamesContainer } from './Games.styled';
import Image from '../../components/common/Image';
import LazyInView from '../../components/common/LazyInView';
import ProviderTitle from './ProviderTitle';
import useDefaultProduct from './useDefaultProduct';
import useHandleProduct from './useHandleProduct';
import useTabs from './useTabs';
import { selectConfigData } from '../../api/generalApi';
import { useSelector } from 'react-redux';
import Gamelist from './Gamelist';
import HotGames from './HotGames';
import { useTranslation } from 'react-i18next';
const Tabs = React.lazy(() => import('../../components/common/Tabs'));

function Games() {
    // To get Categories Tabs
    const { t } = useTranslation();
    const tabs = useTabs();
    const [activeCategory, setActiveCategory] = useState("");
    
    // Handle start or stop products
    const {allProducts, handleProduct, setAllProducts, setBaseProduct, isLoading, gameData: mainGamesData} = useHandleProduct();

    // Load default products from skinconfig
    const {getAllProducts, isLoading: defaultProductsLoading} = useDefaultProduct(t, handleProduct, setAllProducts, setActiveCategory, activeCategory);

    const {vertical_tab} = useSelector(selectConfigData);
    
    const handleTabChange = (tab) => {
      setBaseProduct(null);
      setActiveCategory(tab)
      getAllProducts(tab);
    }

  return (
    <div>
      <LazyInView>
        <HotGames handleProduct={handleProduct} />
        <Tabs
          defaultActive={activeCategory}
          tabs={tabs}
          onChange={handleTabChange}
          vertical={vertical_tab}
          sx={{maxHeight: "1500px"}}
          tabsBorder={!vertical_tab}
        >
          {
            allProducts && allProducts.length && allProducts[0].provider?
            <ProviderTitle provider={allProducts[0].provider} showBackButton={true} onBack={handleTabChange} activeCategory={activeCategory}/>
            :null
          }
          <Gamelist gamelist={allProducts} handleLaunch={handleProduct} mainGamesData={mainGamesData} mainGameLoading={isLoading || defaultProductsLoading} activeCategory={activeCategory} />
        </Tabs>
      </LazyInView>
    </div>
  )
}

export default Games