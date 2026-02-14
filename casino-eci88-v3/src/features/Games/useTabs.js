import React, { useCallback, useMemo } from 'react'
import { GameWrapper } from './Games.styled';
import Image from '../../components/common/Image';
import { useDirectProductsQuery } from '../../api/hooks';
import { selectConfigData } from '../../api/generalApi';
import { useSelector } from 'react-redux';

function useTabs() {
    // Direct Products for tabs
    const {data: directProducts} = useDirectProductsQuery();
    const configData = useSelector(selectConfigData);

    // find product name to show in tabs
    const findProductName = useCallback((category) => {
        const parsedInt = parseInt(category, 10); // Ensure base 10 is used for parsing
        // Directly return the matched product name or the transformed category name
        return directProducts?.find(product => !isNaN(parsedInt) && parsedInt === product.id)
          ? directProducts.find(product => parsedInt === product.id).name
          : category?.toUpperCase();
      }, [directProducts]);

    // For Cattegories
    const tabs = useMemo(() => {
        if (configData) {
          return Array.from({length: 10}).map((_, index)=> {
            const {category_image_width, category_image_height, category_tab_width, category_tab_height} = configData;
            const category_ind=index+1
            const width = category_tab_width?`${category_tab_width}px`:""
            const height = category_tab_height?`${category_tab_height}px`:"";
            const imageWidth = category_image_width?`${category_image_width}px`:""
            const imageHeight = category_image_height?`${category_image_height}px`:"";
            return {
              key: configData[`category_tab_${category_ind}_type`],
              label: <GameWrapper $imageWidth={imageWidth} $imageHeight={imageHeight}>
                      <Image
                        src={configData[`category_tab_${category_ind}_icon`]}
                        alt=""
                        width={width || "60px"} 
                        height={height || "60px"}
                        skeletonHeight={height || 60}
                        circle
                      />
                      {
                        configData?.vertical_tab || configData?.category_text &&
                        <h2 className="game-category">{findProductName(configData[`category_tab_${category_ind}_type`])}</h2>
                      }
                    </GameWrapper>
            }
          }).filter((_, i) => configData[`category_tab_${i + 1}_active`])
        }
      }, [configData, directProducts]);
  return tabs;
}

export default useTabs