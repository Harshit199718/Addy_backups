import React, { useEffect } from "react";
import { useStartProductMutation } from "../../api/hooks";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../../app/slices/userSlice";
import { useSelector } from "react-redux";

function useAppProduct(setIsLoading) {
    const [startProduct, {isLoading, data: gameData, error}] = useStartProductMutation();
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading]);
    
  const startAppProduct = (product) => {
    if (!currentUser) {
      navigate(`/signin`);
      return;
    }
    const { id, credit_type, android_dl_link, ios_dl_link, amount, auto_transfer } = product;
    startProduct({ id, credit_type, android_dl_link, ios_dl_link, ltype: "app", amount, auto_transfer, errorTitle: product.name });
  };
  return {startAppProduct, gameData, appError: error};
}

export default useAppProduct;
