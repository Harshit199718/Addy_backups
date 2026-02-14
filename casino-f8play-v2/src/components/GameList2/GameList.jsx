import React, { useEffect, useState } from "react";
import userService from "../../services/user.service";
import "./GameList.css";
import Loading from "../common/Loading/Loading";
import { useNavigate } from "react-router-dom";
import CustomModal from "../common/CustomModal/CustomModal";
import { Icon } from "@iconify/react";
import ButtonWrapper from "../common/ButtonWrapper/ButtonWrapper";
import GameCategories from "./GameCategories";
import ImageWithLoader from "../common/ImageWithLoader";

const otherProducts = {
  "Joker": "joker",
  "Habanero": "habanero",
  "Playtech": "playtech",
  "JDB": "jdb",
  "SPADE GAMING": "spadegaming",
  "Jili": "jili",
  "LIVE22": "live22",
  "Pragmatic": "pragmatic",
  "VPOWER": "vpower",
  "XE88": "XE88",
  "Asia Gaming": "ag",
  "BETSOFT": "betsoft",
  "CQ9": "cq9",
  "DREAMTECH": "dreamtech",
  "KMG": "kmg",
  // "QTECH": "qtech",
  "NextSpin": "nextspin",
  "Evo888h5" : "evo888h5",
  "XE88": "xe88",
  "Candy888": "candy888"
};

const popupProducts = {
  "Allbet": "Allbet",
  "Sexy Baccarat": "SexyBaccarat",
  "Joker": "joker",
  "3WIN8": "3win8",
  "XE88": "xe88",
  "Soccer": "soccer",
};

const categories = [
  // {
  //   id: 1,
  //   key: "news",
  //   name: "news",
  //   image: require("../../assets/images/news.png"),
  // },
  {
    id: 2,
    key: "",
    name: "All",
    image: require("../../assets/images/all.png"),
  },
  {
    id: 3,
    key: "casino",
    name: "Live",
    image: require("../../assets/images/casino.png"),
  },
  {
    id: 4,
    key: "slots",
    name: "slots",
    image: require("../../assets/images/slot.png"),
  },
  {
    id: 5,
    key: "sportsbook",
    name: "sportsbook",
    image: require("../../assets/images/sportbook.png"),
  },
];
function GameList({ showCategories, setShowCategories, walletInfo, getWalletInfo, currentUser, ezSelect, setEzSelect, selecedCategory, setSelecedCategory, isLoading, setIsLoading }) {
  const [gamelist, setGamelist] = useState([]);
  const [soccerGame, setSoccerGame] = useState(null);
  const [provider, setProvider] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [androidGameUrl, setAndroidGameUrl] = useState("");
  const [ios32GameUrl, setios32GameUrl] = useState("");
  const [ios64GameUrl, setios64GameUrl] = useState("");
  const [startedGameList, setStartedGameList] = useState([]);
  const [selectedGame, setSelectedGame] = useState();
  const [selectedCredit, setSelectedCredit] = useState("CA");
  const [gameError, setGameError] = useState(null);
  const [playModal, setPlayModal] = useState(false);
  // const [ezSelect, setEzSelect] = useState(null);
  const [playText, setPlayText] = useState("Play Now");
  const [text, setText] = useState("");
  const [gameData, setGameData] = useState();
  const [selectedProvider, setSelectedProvider] = useState("");
  const [showBackBtn, setShowBackBtn] = useState(false);
  const [showSlotCategoriesSelection, setShowSlotCategoriesSelection] = useState('h5');
  const [isInAppGames, setIsInAppGames] = useState(false);
  const [fetchingGameId, setFetchingGameId] = useState(false)
  
  useEffect(()=>{
    const fetchGetSoccer = async() => {
      try{
        const soccer = await userService.getProductsDirectGameListByName("sportsbook", "Soccer");
        setSoccerGame(soccer?.data[0])
      } catch (error) {
        console.log("🚀 ~ fetchGetSoccer ~ error:", error)
      }
    }
    fetchGetSoccer()
  },[])

  var userAgent = navigator.userAgent.toLowerCase();

  const navigate = useNavigate();

  const changeGameId = async (gameId) => {
    try {
      setFetchingGameId(true)
      const result = await userService.changeGameId(gameId);
      setGameData(prevGameData=>({
        ...prevGameData,
        username: result.data.login,
        password: result.data.password,
        started_id: result.data.id,
      }))
      setFetchingGameId(false)
    } catch (error) {
      alert(error.response.data.non_field_errors)
      setFetchingGameId(false)
    }
  }

  const getProducts = async () => {
    setIsLoading(true)
    try{
      const response = await userService.getProducts(selecedCategory);
    if (response && response.data) {
      const groupedArray = [];
      for (let i = 0; i < response.data.length; i += 2) {
        const pair = [response.data[i], response.data[i + 1]];
        groupedArray.push(pair);
      }
      setGamelist(groupedArray);
      setIsInAppGames(false)
    }
    } catch (err){
      console.log(err)
    }
    setTimeout(() =>{
      setIsLoading(false)
    },1000)
    
  };
  useEffect(() => {
    StopProduct()
    const fetchProductCategories = async () => {
      try {
        if (selecedCategory === "pragmatic") {
          const game = {
            name: "Pragmatic",
            category: "slots",
            ltype: "h5",
            thumbnail: require("../../assets/images/easytech.png"),
          };
          setSelectedGame(game);
          setSelectedProvider("Pragmatic");
          setEzSelect(game);
          handleProduct(game);
          // setTimeout(() => {
          //   getEasytechProductlist(500, game);
          // }, 500);
        } else if (selecedCategory === "evo888h5") {
          const game = {
            name: "Evo888h5",
            category: "slots",
            ltype: "h5",
            thumbnail: require("../../assets/images/evo888h5.png"),
          };
          setSelectedGame(game);
          setSelectedProvider("Evo888h5");
          setEzSelect(game);
          handleProduct(game);
          // setTimeout(() => {
          //   getEasytechProductlist(500, game);
          // }, 500);
        } else if (selecedCategory === "biggaming") {
          setIsLoading(true)
          const product = await userService.getProductsDirectGameListByName("casino", "Big Gaming");
          setSelectedGame(product.data[0]);
          setSelectedProvider("biggaming");
          handleProduct(product.data[0]);
          setProvider("")
          getProducts();
        } else if (selecedCategory === "soccer") {
          setIsLoading(true)
          const product = await userService.getProductsDirectGameListByName("sportsbook", "Soccer");
          setSelectedGame(product.data[0]);
          setSelectedProvider("soccer");
          handleProduct(product.data[0]);
          setProvider("")
          // getProducts();
        } else {
          setProvider("")
          getProducts();
        }
      } catch (e) {

      }
    }
    fetchProductCategories()

  }, [selecedCategory]);


  const getEasytechProductlist = async (page, _game) => {
    setIsLoading(true);
    // setFetching(true);
    // if (page === 0) {
    //   setIsLoading(true);
    // }
    let game = selectedGame;
    if (_game) {
      game = _game;
    }
    try {
      let products = await userService.getOtherProducts(
        0,
        524,
        otherProducts[game.name]
      );
      let data = products.data;
      if (
        game.category === "slots" && game.name in otherProducts
      ) {
        const groupedArray = [];
        for (let i = 0; i < data.length; i += 2) {
          const first = {
            gameid: String(data[i]?.c_h5_code),
            id: game.id,
            credit_type: data[i]?.credit_type,
            name: data[i]?.c_name,
            provider: data[i]?.c_prod_name,
            image_mobile: data[i]?.c_image,
            title: data[i]?.c_name,
          };
          const second = {
            gameid: String(data[i + 1]?.c_h5_code),
            id: game.id,
            credit_type: data[i + 1]?.credit_type,
            name: data[i + 1]?.c_name,
            provider: data[i + 1]?.c_prod_name,
            image_mobile: data[i + 1]?.c_image,
            title: data[i + 1]?.c_name,
          };
          const pair = [first, second];
          groupedArray.push(pair);
        }
        setShowBackBtn(true)
        setGamelist(groupedArray);
        setIsInAppGames(true)
        setIsLoading(false)
      }
      setProvider(data[0].c_prod_name);
      if (data.length !== 0) {
        if (!(game.name in otherProducts)) {
          // setSelectedProvider(data[0].provider);
        } else {
          setSelectedGame({
            ...game,
            credit_type: data[0].credit_type,
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  };

  const getGameStartedList = async (game_name) => {
    try {
      const userInfo = await userService.getBalance();
      const result = await userService.getStartedGames(userInfo.data.user.id);
      const new_game = result.data.filter((item) => item.login == game_name)
      if (new_game && new_game.length) {
        setGameData(prevGameData=>({
          ...prevGameData,
          started_id: new_game[0].id
        }))
      }
      setStartedGameList(result.data);

      if (result.data.length === 0) {
        localStorage.setItem("startedGame", null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleProduct = async (game,isFeatured) => {
    const localUser = localStorage.getItem("user");
    if (!localUser) {
      return navigate("/signin");
    }
    if (
      game.name in otherProducts
    ) {
      if (startedGameList.map((item) => item.product_id).includes(game.id)) {
        return await StopProduct(game.id);
      }
      handleGameLaunch(null, game);
    } else {
      if (startedGameList.map((item) => item.gameid).includes(game.gameid)) {
        return await StopProduct(game.id);
      }
      setPlayText("Play Now");
      if (ezSelect && !isFeatured) {
        setPlayModal(false);
        initiateProduct("h5", game.gameid, game.category, isFeatured);
      } else {
        handleGameLaunch(null, game);

        // if (game.ltype == "h5") {
        //   handleGameLaunch(null, game);
        // } else {
        //   setPlayModal(true);
        // }
      }
    }
    setSelectedGame(game);
    // setSelectedCredit("CA");
    // if (game.credit_type === "CC") {
    //   if (walletInfo.balance > 0) {
    //     setSelectedCredit("CA");
    //   } else if (walletInfo.chips_balance > 0) {
    //     setSelectedCredit("CH");
    //   }
    // } else if (game.credit_type === "CA") {
    //   setSelectedCredit("CA");
    // } else if (game.credit_type === "CH") {
    //   setSelectedCredit("CH");
    // }
  };

  const handleGameLaunch = async (event, game) => {
    const newGame = game || selectedGame
    if (
      (newGame.category === "slots" && newGame.name in otherProducts)
    ) {
      getEasytechProductlist(500, newGame);
      // if (game.name === "Easytech88") {
      //   getEasytechProductlist(500, newGame);
      // } else {
      //   getEasytechProductlist(500, newGame);
      // }
      setTimeout(() => {
        setEzSelect(newGame);
      }, 500);
    } else {
      const { ltype, id, category } = newGame;
      initiateProduct(ltype, id, category, false, game);
    }
    setPlayModal(false);
  };

  const initiateProduct = async (ltype, id, category, isFeatured, game) => {
    let selectedGameLocal = game || selectedGame 
    if (startedGameList.map((item) => item.product_id).includes(id)) {
      await StopProduct(id);
    }
    setIsLoading(true);
    let win;
    let resSrc;

    try {
      if (ltype === "h5") {
        if(selectedGameLocal.name in popupProducts) {
          win = window.open("about:blank");
        }
        let res;
        if (ezSelect && !isFeatured) {
          if (ezSelect.name === "Pragmatic" || ezSelect.name === "Evo888h5") {
            const product = await userService.getProductsDirectGameListByName("slots", ezSelect.name);
            const productData = product.data[0]
            res = await userService.startEasytogoProduct(
              productData.id,
              id,
              selectedCredit
            );
          } else if (
            ezSelect.name in otherProducts
          ) {
            res = await userService.startEasytogoProduct(
              ezSelect.id,
              id,
              selectedCredit
            );
          }
        } else {
          res = await userService.startProduct(id, selectedCredit);
        }
        if(selectedGameLocal.name in popupProducts) {
          // Redirect new windows
          if (res && res.data.url.url) {
            win.location = res.data.url.url;
          } else {
            win.location = res.data.url;
          }
        }
        else {
          // Stay in our site
          res && res.data.url.url ? resSrc = res.data.url.url : resSrc = res.data.url;
          if (resSrc) {
            navigate('/games', { state: { gameSrc: resSrc, gameId: id } });
          }
        }

        setSelectedGame(id);
        await getWalletInfo();
      }
      let username=""
      if (ltype === "app") {
        const res = await userService.startProduct(id, selectedCredit);
        username=res.data.username
        setSelectedGame(id);
        if (selectedGameLocal.module != "easytogo123") {
          setGameData({ ...res.data, customUrl:{
            android:selectedGameLocal.android_dl_link,
            ios:selectedGameLocal.ios_dl_link
          } });
        } else {
          setGameData({...res.data});
        }
        if (res.data.name === "Pussy888") {
          setAndroidGameUrl(
            `pussy888://pussy888.com/?user=${res.data.username}&password=${res.data.password}`
          );
          setios32GameUrl(
            `pussy888://pussy888.com/?user=${res.data.username}&password=${res.data.password}`
          );
          setios64GameUrl(
            `pussy888://pussy888.com/?user=${res.data.username}&password=${res.data.password}`
          );
        } else if (res.data.name === "918kiss") {
          setAndroidGameUrl(
            `lobbykiss://lobbykiss?account=${res.data.username}&password=${res.data.password}`
          );
          setios32GameUrl(
            `lobbykiss://lobbykiss?account=${res.data.username}&password=${res.data.password}`
          );
          setios64GameUrl(
            `lobbykiss://lobbykiss?account=${res.data.username}&password=${res.data.password}`
          );
        } else if (res.data.name === "Mega888") {
          setAndroidGameUrl(
            `lobbymegarelease://?account=${res.data.username}&password=${res.data.password}`
          );
          setios32GameUrl(
            `lobbymegarelease://?account=${res.data.username}&password=${res.data.password}`
          );
          setios64GameUrl(
            `lobbymegarelease://?account=${res.data.username}&password=${res.data.password}`
          );
        } else if (res.data.name === "EVO888") {
          setAndroidGameUrl(
            `evo888android://lobbyevoandroid?account=${res.data.username}&password=${res.data.password}`
          );
          setios32GameUrl(
            `evo888android://lobbyevoandroid?account=${res.data.username}&password=${res.data.password}`
          );
          setios64GameUrl(
            `evo888android://lobbyevoandroid?account=${res.data.username}&password=${res.data.password}`
          );
        } else if (res.data.name === "Candy888") {
          setAndroidGameUrl(
            `candy888android://lobbycandyandroid?account=${res.data.username}&password=${res.data.password}`
          );
        }
        setOpen(true);
        setGameError(null);
        await getWalletInfo();
      }
      await getGameStartedList(username);
      username=""
    } catch (err) {
      if(resSrc){
        navigate("/");
      }
      if(win){
        win.close()
      }
      console.log(err);
      if (err.response && err.response.data && err.response.data.detail) {
        setGameError({ msg: err.response.data.detail });
      } else{
        setGameError({ msg: err.message });

      }
    }
    setIsLoading(false);
  };

  const StopProduct = async (id) => {
    setIsLoading(true);
    try {
      await userService.stopProduct(id);
      setSelectedGame(null)
      await getWalletInfo();
      await getGameStartedList();
      setGameError(null);
    } catch (err) {
      console.log(err);
      setGameError({ msg: err.message });
    }
    setIsLoading(false);
  };

  const copy = async (copyText) => {
    if (copyText !== "") {
      await navigator.clipboard.writeText(copyText);
      setText(copyText);
    }
  };
  
  return (
    <div
      className={`game-list h-full overflow-x-auto`}
      style={{ width: "100%" }}
    >
      {/* <GameCategories setEzSelect={setEzSelect} selecedCategory={selecedCategory} setSelecedCategory={setSelecedCategory} /> */}
      {/* <h3
        className="provider-title text-white text-bold text-uppercase text-center mb-2"
        style={{
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          backgroundImage:
            "linear-gradient( #f0ffff, #f2feff, #bffafa, #a2f5f1, #9ff2ef, #9fedf8 )",
          textShadow: "2px 2px 4px rgba(255, 255, 255, 0.5)",
          // marginTop: "5.5vmax"
        }}
      >
        {provider}
      </h3> */}
      { showBackBtn && ezSelect && selecedCategory === "slots" ?
      <div
      className="w-full px-1 py-3 d-flex align-items-center text-white"
      style={{
        background: "transparent",
        paddingLeft: "10%",
        zIndex: "100",
      }}
      onClick={() =>{ getProducts()
      setShowBackBtn(false)
      setEzSelect('')
      }}
    >
      <div className="bg-[#08317C] p-2 w-fit flex justify-center items-center">
        <Icon icon="uil:angle-left" style={{ fontSize: "30px" }} />
      </div>
    </div> : 
        null
      }
      { !ezSelect && selecedCategory === "slots" &&
        <div className="p-4 rounded-lg shadow-lg">
          <div className="flex space-x-4">
              <button
                className={`filter-button px-4 py-2 rounded-lg ${
                  showSlotCategoriesSelection === 'h5' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setShowSlotCategoriesSelection('h5')}
              >
                WEB
              </button>
              <button
                className={`filter-button px-4 py-2 rounded-lg ${
                  showSlotCategoriesSelection === 'app' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setShowSlotCategoriesSelection('app')}
              >
                APP
              </button>
              <button
                className={`filter-button px-4 py-2 rounded-lg ${
                  showSlotCategoriesSelection === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => setShowSlotCategoriesSelection('all')}
              >
                ALL
              </button>
          </div>
        </div>
      }
      <div
        id="gamelist_container"
        className={` w-100 gap-x-4 max-h-screen overflow-x-auto flex h-4/5`}
        style={{ width: "100%", paddingLeft: "7%", height:"66%" }}
      > 
        {!isInAppGames && soccerGame &&
        <div
          className={`flex gap-y-4 py-4 gap-x-4 game-list-images h-full ${isInAppGames ? "flex-col" : ""}`}
          // style={{ width: "18vw" }}
        >
          <ImageWithLoader game={soccerGame} selectedGame={selectedGame} StopProduct={StopProduct} handleProduct={handleProduct} isInAppGames={isInAppGames}
              style={{ maxWidth: "none" }}
              src={soccerGame?.image_mobile}
              alt=""
              // onClick={() => startGameHandler(game[1])}
              onClick={() => {
              if (soccerGame.id || soccerGame.gameid) {
                if (selectedGame === soccerGame.id) {
                  StopProduct(soccerGame.id);
                } else if (ezSelect && selectedGame === soccerGame.gameid) {
                  StopProduct(soccerGame.gameid);
                } else {
                  handleProduct(soccerGame);
                }
              }
            }}
          />
        </div>
        }
     
        {isLoading ? (
          <Loading />
        ) : (
          gamelist
          .map((game) => {
            // filter out apps game
            if(!ezSelect && selecedCategory === "slots") {
              game = game?.map(gamedetail => {
                // EUROCUP
                if (gamedetail?.ltype === showSlotCategoriesSelection) {
                  return gamedetail;
                } else if (showSlotCategoriesSelection === 'all') {
                  return gamedetail;
                } else {
                  return null;
                }
              }).filter(Boolean);
            }
            return (
            <div
              className={`flex gap-y-4 py-4 gap-x-4 game-list-images h-full ${isInAppGames ? "flex-col" : ""}`}
              // style={{ width: "18vw" }}
            >
            {game[0] &&
            <ImageWithLoader game={game[0]} selectedGame={selectedGame} StopProduct={StopProduct} handleProduct={handleProduct} isInAppGames={isInAppGames}
                style={{ maxWidth: "none" }}
                src={game[0]?.image_mobile}
                alt=""
                // onClick={() => startGameHandler(game[0])}
                onClick={() => {
                if (game[0].id || game[0].gameid) {
                  if (selectedGame === game[0].id) {
                    StopProduct(game[0].id);
                  } else if (ezSelect && selectedGame === game[0].gameid) {
                    StopProduct(game[0].gameid);
                  } else {
                    handleProduct(game[0]);
                  }
                }
              }}
              />
              }
              {
                game[1]?
                <ImageWithLoader game={game[1]} selectedGame={selectedGame} StopProduct={StopProduct} handleProduct={handleProduct} isInAppGames={isInAppGames}
                  style={{ maxWidth: "none" }}
                  src={game[1]?.image_mobile}
                  alt=""
                  // onClick={() => startGameHandler(game[1])}
                  onClick={() => {
                if (game[1].id || game[1].gameid) {
                  if (selectedGame === game[1].id) {
                    StopProduct(game[1].id);
                  } else if (ezSelect && selectedGame === game[1].gameid) {
                    StopProduct(game[1].gameid);
                  } else {
                    handleProduct(game[1]);
                  }
                }
              }}
                />
                :null
              }
            </div>
          )})
        )}
      </div>
      {/* <button
        className="directory-btn absolute top-1/2 border-0 rounded-t-xl px-8 py-2 text-white whitespace-nowrap uppercase"
        style={{
          boxShadow: "-2px 0px 2px #03D9FA, 2px 0px 2px #03D9FA",
          fontSize: "1.6em",
          background: "linear-gradient(to right, #0A609D, #06458B, #09387F)",
          transformOrigin: "0% 100%",
          transform: "rotate(90deg) translateX(-50%)"
        }}
        onClick={() => setShowCategories(!showCategories)}
      >
        Game Directory
      </button> */}

      {/* Popups */}

      {isOpen && (
          <CustomModal open={true} onClose={() => setOpen(false)}
          containerStyle={{height:"auto"}}
          >
            <div className="download-app-info max-h-[80vh] show-scrollbar"
            style={{ overflowY: "auto" }}
            >
              {/* <div className="text-center text-white">
                {"Balance"} {"In_Game"}:{" "}
                {gameData.credit ? gameData.credit : 0.0}
              </div> */}
              <div className="flex items-center popup_img justify-center">
                <img src={require(`../../assets/images/app_logo/${gameData.name}.png`)} alt="" />
              </div>
              <div className="accountInfo-wrap px-12">
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center text-12 text-uppercase text-white">
                    {"Username"}
                  </div>
                  <div className="clipboard-wrap flex justify-between bg-silver text-white">
                    <div className="text-[#083d84]">{gameData.username}</div>
                    <div className="text-[#083d84]" onClick={() => copy(gameData.username)}>
                      {text === gameData.username ? (
                        <Icon
                          icon="material-symbols:check"
                          width={20}
                          color="green"
                        />
                      ) : (
                        <Icon icon="bxs:copy" width={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between my-5">
                  <div className="flex flex-col justify-center text-12 text-uppercase text-white">
                    {"Password"}
                  </div>
                  <div className="clipboard-wrap flex justify-between bg-silver text-white">
                    <div className="text-[#083d84]">{gameData.password}</div>
                    <div className="text-[#083d84]" onClick={() => copy(gameData.password)}>
                      {text === gameData.password ? (
                        <Icon
                          icon="material-symbols:check"
                          width={20}
                          color="green"
                        />
                      ) : (
                        <Icon icon="bxs:copy" width={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex flex-col justify-center text-12 text-uppercase text-white">
                    {"Balance"}
                  </div>
                  <div className="clipboard-wrap flex justify-between bg-silver text-white">
                    <div className="text-[#083d84]">{gameData.credit}</div>
                    <div className="text-[#083d84]" onClick={() => copy(gameData.credit)}>
                      {text === gameData.credit ? (
                        <Icon
                          icon="material-symbols:check"
                          width={20}
                          color="green"
                        />
                      ) : (
                        <Icon icon="bxs:copy" width={20} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between w-full text-white mt-5 mb-3 download_btns">
                  {gameData.customUrl?
                    <a
                      href={`${gameData.customUrl.android}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"Android"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="uil:android" width={20} />
                        </div>
                      </div>
                    </a>
                  :gameData.url.android.length > 0 &&
                  gameData.url.android[0].includes("https://") ? (
                    <a
                      href={`${gameData.url.android}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"Android"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="uil:android" width={20} />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <a
                      href={`https://${gameData.url.android}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"Android"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="uil:android" width={20} />
                        </div>
                      </div>
                    </a>
                  )}

                  {gameData.customUrl?
                    <a
                      href={`${gameData.customUrl.ios}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"iOS"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="ic:baseline-apple" width={20} />
                        </div>
                      </div>
                    </a>
                  :gameData.url.ios.length > 0 &&
                  gameData.url.ios[0].includes("https://") ? (
                    <a
                      href={`${gameData.url.ios}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"iOS"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="ic:baseline-apple" width={20} />
                        </div>
                      </div>
                    </a>
                  ) : (
                    <a
                      href={`https://${gameData.url.ios}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="download-apk-btn flex">
                        <div className="flex flex-col justify-center">
                          {"iOS"} {"Download"}
                        </div>
                        <div className="flex flex-col justify-center">
                          <Icon icon="ic:baseline-apple" width={20} />
                        </div>
                      </div>
                    </a>
                  )}
                </div>
                <div className="flex justify-between w-full" style={{gap: "5px"}}>
                  <a
                    className="w-full"
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e)=>{
                      e.preventDefault();
                      if (!fetchingGameId) {
                        changeGameId(gameData.started_id)}
                      }
                    }
                  >
                    <div className="play-btn">
                          <div className="d-flex flex-col justify-center">
                            
                          </div>
                        </div>
                    <ButtonWrapper style={{fontSize: "1em", padding: "10px 0"}} containerStyle={{height: "auto", marginTop:"10px"}}>
                    {!fetchingGameId?"Change Game ID":"fetching..."}
                    </ButtonWrapper>
                  </a>
                </div>
                {userAgent.indexOf("android") > -1 ? (
                  <div className="flex justify-between w-full" style={{gap: "5px"}}>
                    <a
                      className="w-full"
                      href={androidGameUrl ? androidGameUrl : "/"}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ButtonWrapper style={{fontSize: "1em", padding: "10px 0"}} containerStyle={{height: "auto", marginTop:"10px"}}>Play Now</ButtonWrapper>
                    </a>
                  </div>
                ) : (
                  <>
                    {userAgent.indexOf("iphone") > -1 &&
                    window.innerWidth <= 320 ? (
                      <div className="flex justify-between w-full" style={{gap: "5px"}}>
                        <a
                          className="w-full"
                          href={ios32GameUrl ? ios32GameUrl : "/"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ButtonWrapper style={{fontSize: "1em", padding: "10px 0"}} containerStyle={{height: "auto", marginTop:"10px"}}>Play Now</ButtonWrapper>
                        </a>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full" style={{gap: "5px"}}>
                        <a
                          className="w-full"
                          href={ios64GameUrl ? ios64GameUrl : "/"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ButtonWrapper style={{fontSize: "1em", padding: "10px 0"}} containerStyle={{height: "auto", marginTop:"10px"}}>Play Now</ButtonWrapper>
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </CustomModal>
        )}
        {selectedGame && (
          <CustomModal
            title={selectedGame.name}
            open={playModal}
            onClose={() => setPlayModal(false)}
            style={{
              textAlign: "center",
              borderRadius: "15px",
              padding: "1.5rem 1rem",
            }}
            containerStyle={{height:"auto"}}
          >
            <div>
              <div className="flex flex-row justify-center">
                <img
                  src={
                    selectedGame.image_mobile
                      ? selectedGame.image_mobile
                      : selectedGame.thumbnail
                  }
                  alt={selectedGame.name}
                  className="selected-game-image"
                  style={{ borderRadius: "1rem" }}
                />
              </div>
              <p className="text-md font-medium mt-3" style={{fontSize: "1em"}}>
                {"Note"}: 
                <span style={{ color: "white", fontWeight: "bold" }}>
                  {"The_Game"} {"Supports"}{" "}
                  {selectedGame.credit_type === "CA" && "only CASH. "}
                  {selectedGame.credit_type === "CH" && "only CHIPS. "}
                  {selectedGame.credit_type === "CC" &&
                  "Cash and Chips both types. "}
                </span>
                {"Please_select_an_option"}.
              </p>
              <div
                style={{ display: "flex" }}
                className="flex flex-row justify-center items-center my-3 gap-x-3"
              >
                {(selectedGame.credit_type === "CC" ||
                  selectedGame.credit_type === "CA") && (
                  <div
                    // onClick={() => setSelectedCredit("CA")}
                    className="flex items-center justify-center gap-2 balance-account w-1/2 p-3"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "1rem",
                      width: "50%",
                      borderColor:
                        selectedCredit === "CA" ? "rgb(92, 149, 224)" : "#ccc",
                      background:
                        selectedCredit === "CA"
                          ? "rgba(92, 149, 224, .2)"
                          : "transparent",
                    }}
                  >
                    <img className="img-icon" src={""} alt="" />
                    <div
                      className={`flex flex-col items-end text-stone-900`}
                      style={{ fontWeight: "bold" }}
                    >
                      <h6>{"Cash"}</h6>
                      <h6>{currentUser ? walletInfo.balance : "0.00"}</h6>
                    </div>
                  </div>
                )}
                {(selectedGame.credit_type === "CC" ||
                  selectedGame.credit_type === "CH") && (
                  <div
                    // onClick={() => setSelectedCredit("CH")}
                    className="flex items-center justify-center gap-2 balance-account w-1/2 p-3"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "1rem",
                      width: "50%",
                      borderColor:
                        selectedCredit === "CH" ? "rgb(92, 149, 224)" : "#ccc",
                      background:
                        selectedCredit === "CH"
                          ? "rgba(92, 149, 224, .2)"
                          : "transparent",
                    }}
                  >
                    <img className="img-icon" src={""} alt="" />
                    <div
                      className={`flex flex-col items-end text-stone-900`}
                      style={{ fontWeight: "bold" }}
                    >
                      <h6>{"Chips"}</h6>
                      <h6>{currentUser ? walletInfo.chips_balance : "0.00"}</h6>
                    </div>
                  </div>
                )}
              </div>
              {/* <button
                onClick={handleGameLaunch}
                className={`btn btn-sm bg-blue-dark rounded-xs text-uppercase
            font-700 w-100 btn-s mt-2 h-12`}
              >
              </button> */}
              <ButtonWrapper onClick={handleGameLaunch} style={{fontSize: "1em", padding: "10px 0"}}>
                {playText}
              </ButtonWrapper>
            </div>
          </CustomModal>
        )}

      <CustomModal
          title={selectedGame ? selectedGame.name : "Game Error"}
          open={gameError?true:false}
          onClose={() => setGameError(false)}
          style={{ textAlign: "center", padding: "1rem", borderRadius: "15px" }}
          container={() => document.getElementById('root')}
          containerStyle={{height:"auto"}}
        >
          <div>
            <div className="flex flex-row justify-center">
              <Icon icon="codicon:error" color="#f27474" width={70} />
              {/* <img
                src={selectedGame.image_mobile}
                alt={selectedGame.name}
                style={{ width: "150px", borderRadius: "1rem" }}
              /> */}
            </div>
            <p className="text-md font-medium my-3 text-white">
              {gameError && gameError.msg ? gameError.msg : null}
            </p>
            <ButtonWrapper onClick={() => setGameError(false)} style={{fontSize: "1em", padding: "10px 0"}}>
                {"Ok"}
              </ButtonWrapper>
            {/* <button
              onClick={() => setGameError(false)}
              className={`btn btn-sm bg-blue-dark rounded-xs text-uppercase
            font-700 w-100 btn-l mt-3 h-12`}
            >
              {"OK"}
            </button> */}
          </div>
        </CustomModal>
    </div>
  );
}

export default GameList;
