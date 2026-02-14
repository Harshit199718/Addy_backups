import React, { useEffect, useRef } from 'react'
import { useStartEasyProductMutation, useStartProductMutation } from '../../api/hooks';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';
import { useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../app/slices/userSlice';

function useH5Product(baseProduct, setIsLoading) {
    const [startProduct, {isLoading, data: startData, error: startError}] = useStartProductMutation();
    const [startEasyProduct, {isLoading: startLoading, data: startEasyData, error: startEasyError}] = useStartEasyProductMutation();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
      setIsLoading(isLoading);
    }, [isLoading]);

    useEffect(() => {
      setIsLoading(startLoading);
    }, [startLoading]);

    useEffect(() => {
      if (startData) {
        const url = startData?.url?.url || startData?.url
        handleLaunch(startData.gameid, url);
      }
    }, [startData])

    useEffect(() => {
      if (startEasyData) {
        const url = startEasyData?.url?.url || startEasyData?.url
        handleLaunch(startEasyData.gameid, url);
      }
    }, [startEasyData])
    
    // Handle launch for insite or new window
    const handleLaunch = (gameid, url) => {
      if (baseProduct?.is_launch_in_site) {
        url=encodeURIComponent(url);
        navigate(`/games/${gameid}/${url}`);
      } else {
        // windowRef.current.location = url
      }
    }
    
    // Start H5 Product
    const startH5Product = (product) => {
      if (!currentUser) {
        navigate(`/signin`);
        return;
      }
      const {baseProduct} = product;

      if (baseProduct) {
        startEasyProduct({...product, name: "easytogo", errorTitle: product.name})
      } else {
        startProduct({...product, errorTitle: product.name});
      }
    }

  return {startH5Product, h5Error: (startError || startEasyError)}
}

export default useH5Product