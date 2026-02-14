import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  useGetGameListMutation,
  useGetStartedGamesQuery,
  useStopProductMutation,
  useWalletQuery,
} from "../../api/hooks";
import useH5Product from "./useH5Product";
import useAppProduct from "./useAppProduct";
import { otherProducts } from "./game.utils";

function useHandleProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const { data: wallet } = useWalletQuery();
  //   Get Started games
  const { data: startedGames } = useGetStartedGamesQuery(wallet?.user?.id, {
    skip: !wallet?.user?.id,
  });

  //   Stop Product api
  const [stopProduct, {error: stopError}] = useStopProductMutation();

  //   Start Product api
  const [baseProduct, setBaseProduct] = useState(null);
  const {startH5Product, h5Error} = useH5Product(baseProduct, setIsLoading);

  // Start product for Ltype=app
  const {startAppProduct, gameData, appError} = useAppProduct(setIsLoading);

  //   API for getting Gamelist for specific product
  const [getGameList, { data: gameList, isLoading: gameListLoading, isSuccess, error: gameListError }] = useGetGameListMutation();

  const [allProducts, setAllProducts] = useState([]);

  // To set Products to show in UI After Getting Gamelist
  useEffect(() => {
    setIsLoading(gameListLoading);
  }, [gameListLoading])
  
  useEffect(() => {
    if (gameList) {
        setIsLoading(false);
      const updatedGamelist = gameList.map((game) => ({
        baseProduct,
        id: baseProduct?.id,
        gameid: game.c_h5_code,
        title: game.title,
        image: game.c_image,
        name: game.c_name,
        provider: game.c_prod_name,
        category: game.c_category,
        credit_type: game.credit_type,
        ltype: baseProduct?.ltype,
      }));
      setAllProducts(updatedGamelist);
    }
  }, [gameList, baseProduct]);

  // Convert started games tto object for fast access
  const startedGamesObject = useMemo(() => {
    const _startedGames={};
    startedGames?.forEach(game=>{
        _startedGames[game.gameid]=true;
    })
    return _startedGames
  }, [startedGames])

  // Convert started games tto object for fast access
  const startedProductObject = useMemo(() => {
    const _startedGames={};
    startedGames?.forEach(game=>{
        _startedGames[game.product_id]=true;
    })
    return _startedGames
  }, [startedGames])

  // Function to Check If Product is Started
  const isStarted = async (id, gameid) => {
    if (!startedGames) return true;
    let started=false;
    for (const game of startedGames) {
        if (parseInt(game.product_id)===parseInt(id)) {
          started=id;
          break
        }
      }
    if (started) {
      await stopProduct(started);
        setIsLoading(false);
    }
    return !(gameid in startedGamesObject);
  };

  // Handle Product(Gamelist, H5 product, App product)
  const handleProduct = async (product) => {
    const { ltype = baseProduct?.ltype, is_gamelist, name, id, gameid, category } = product;
    if (ltype === "h5" && is_gamelist) {
        setIsLoading(true);
        getGameList({name: otherProducts[name] || name, errorTitle: product.name, category});
        setBaseProduct(product)
    } else if (ltype === "h5") {
      // const shouldStart = await isStarted(id, gameid);
      // if (!shouldStart) return;
      startH5Product(product);
    } else {
      // Launch Game
      startAppProduct(product);
      setIsLoading(false);
    }
  };

  return { allProducts, setAllProducts, handleProduct, startedGamesObject, startedProductObject, baseProduct, setBaseProduct, gameData, isLoading, error: (stopError || h5Error || appError || gameListError) };
}

export default useHandleProduct;
