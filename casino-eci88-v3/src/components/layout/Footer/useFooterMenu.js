import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { selectConfigData } from '../../../api/generalApi'
import { checkIsText } from '../../../utils/helper';

function useFooterMenu() {
    const configData = useSelector(selectConfigData);
    const menus = ["home","promo","deposit","history","contact_us"]
    const routes = {home: "/", promo: "/promotions", deposit: "/deposit", history: "/history", contact_us: "/contactus"}
    const items = useMemo(() => {
      if (configData) {
        return menus?.map(menu=>{
          const route = configData[`menu_${menu}_route`];
          return ({
            image: configData[`menu_${menu}`],
            path: ((route && route!=="home"))?(route):routes[menu],
            text: configData[configData[`menu_${menu}_text_type`]],
            isText: checkIsText(configData[configData[`menu_${menu}_text_type`]])
        })})
      }
      return [];
    }, [configData])
    
  return items
}

export default useFooterMenu