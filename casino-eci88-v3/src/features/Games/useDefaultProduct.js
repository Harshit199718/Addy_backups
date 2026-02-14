import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { useDirectProductsQuery, useGetProductsMutation } from "../../api/hooks";
import useHandleProduct from "./useHandleProduct";

function useDefaultProduct(t, handleProduct, setAllProducts, setActiveCategory, activeCategory) {
  const { default_product_load } = useSelector(selectConfigData);
  const [getProducts, {data: products, isLoading}] = useGetProductsMutation();
  const {data: directProducts} = useDirectProductsQuery();
  const [isDefault, setIsDefault] = useState(false);
  const [updatedProducts, setUpdatedProducts] = useState([])
  // Get Default Products
  const getAllProducts = (category, defaultProduct) => {
    if (category && !isNaN(parseInt(category))) {
      if (defaultProduct) {
        getProducts({category: "slots", id: parseInt(category), direct: true});
      } else {
        setUpdatedProducts(()=> [directProducts.find(product=> parseInt(category) === product.id)])
      }
      setIsDefault(true);
    } else if (category) {
      setActiveCategory(category)
      getProducts({category});
      setIsDefault(false);
    }
  }
  useEffect(() => {
    getAllProducts(default_product_load, true);
  }, [default_product_load]);

  // After Getting Products
  useEffect(() => {
    setUpdatedProducts(products)
  }, [products])
  

  // Handle Launch for Default Products
  useEffect(() => {
    if (updatedProducts && isDefault) {
      handleProduct(updatedProducts[0]);
    } else if (updatedProducts) {
      let updatedProductlist = []
      if(activeCategory === "hotgameslist"){
        updatedProductlist = updatedProducts.map(game=>({
          baseProduct: game?.product[0],
          id: game?.product[0]?.id,
          gameid: game.game_code,
          title: game.name,
          image: game.image,
          name: game.name,
          provider: t("HOT GAMES"),
          category: game.game_category,
          credit_type: game?.product[0]?.credit_type,
          ltype: game?.product[0]?.ltype,
        }))
      } else {
        updatedProductlist = updatedProducts.map(product=>({
          ...product,
          title: product.name,
          image: product.image_mobile,
        }))
      }

      setAllProducts(updatedProductlist);
    }
  }, [updatedProducts, isDefault]);
  return {getAllProducts, isLoading};
}

export default useDefaultProduct;
