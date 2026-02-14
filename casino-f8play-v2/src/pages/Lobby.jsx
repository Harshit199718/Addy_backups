import React, { useEffect, useState } from "react";
import GameCategories from "../components/GameList2/GameCategories";
import GameList from "../components/GameList2/GameList";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer/Footer";
import authService from "../services/auth.service";
import userService from "../services/user.service";
import "../components/GameList2/GameList.css";

function Lobby({ isLoggedIn, setIsLoggedIn, currentUser, appRef, isFullScreen, setIsFullScreen, configData, toggleLiveChat, unreadMessages}) {
  const [walletInfo, setWalletInfo] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [selecedCategory, setSelecedCategory] = useState(configData && configData.default_selected_category);
  const [ezSelect, setEzSelect] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tokens, setTokens] = useState(0);

  const getCurrentUser = async () => {
    const user = await authService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  const StopProduct = async (id) => {
    // setIsLoading(true);
    try {
      await userService
      .stopProduct(id);
      await getWalletInfo();
      // await getGameStartedList();
    } catch (err) {
      console.log(err);
    }
    // setIsLoading(false);
  };
  const getWalletInfo = async () => {
    try {
      const getWallet = await userService.getBalance();
      if (getWallet) {
        setWalletInfo(getWallet.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCurrentUser();
    getWalletInfo();
  }, []);
  return (
    <div className="lobby-page_container">
      <Header 
      isLoggedIn={isLoggedIn} 
      setIsLoggedIn={setIsLoggedIn} 
      appRef={appRef} 
      isFullScreen={isFullScreen} 
      setIsFullScreen={setIsFullScreen} 
      StopProduct={StopProduct} 
      isLoading={isLoading} setIsLoading={setIsLoading} 
      walletInfo={walletInfo} 
      getWalletInfo={getWalletInfo} 
      tokens={tokens}
      setTokens={setTokens}
      configData={configData}
      />
      <div
        id="lobby-page"
        className={`flex`}
        style={{
          backgroundImage: `url(${configData && configData.lobby_background_image})`, 
          backgroundSize: "cover",
          position:"relative"
        }}
      >
        {/* <GameCategories
          setSelecedCategory={setSelecedCategory}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
        /> */}
        <GameList
          selecedCategory={selecedCategory}
          showCategories={showCategories}
          setShowCategories={setShowCategories}
          walletInfo={walletInfo}
          getWalletInfo={getWalletInfo}
          currentUser={currentUser}
          ezSelect={ezSelect} 
          setEzSelect={setEzSelect}
          setSelecedCategory={setSelecedCategory}
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
        />
      </div>
      <Footer 
        ezSelect={ezSelect} 
        setEzSelect={setEzSelect}
        setSelecedCategory={setSelecedCategory}
        selecedCategory={selecedCategory}
        isLoggedIn={isLoggedIn}
        tokens={tokens}
        setTokens={setTokens}
        getWalletInfo={getWalletInfo}
        walletInfo={walletInfo}
        configData={configData}
        toggleLiveChat={toggleLiveChat}
        unreadMessages={unreadMessages}
      />
    </div>
  );
}

export default Lobby;
