import React, { useCallback, useEffect, useMemo, useState } from "react";
import { GameProgress, GamesContainer, GamesContent, LaunchGame } from "./Games.styled";
import Image from "../../components/common/Image";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import useHandleProduct from "./useHandleProduct";
import Modal from "../../components/common/Modal";
import AppDialog from "./AppDialog";
import Loading from "../../components/common/Loading";
import SearchGame from "./SearchGame";
import { useSearchGameMutation, useWalletQuery } from "../../api/hooks";
import { otherProducts } from "./game.utils";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import ToggleSwitch from "../../components/common/ToggleSwitch";

function Gamelist({gamelist, handleLaunch, mainGamesData, mainGameLoading, isHotGames, activeCategory}) {
    const [query, setQuery] = useState("");
    const {handleProduct, startedGamesObject, startedProductObject, gameData, isLoading} = useHandleProduct();
    // const [searchGame, {data: filteredList, isLoading: isSearching}] = useSearchGameMutation();
    const {max_rtp, min_rtp} = useSelector(selectConfigData);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [allGames, setAllGames] = useState([]);
    const [filteredList, setFilteredList]  = useState([]);
    const { data: wallet } = useWalletQuery();
    const [selectedGame, setSelectedGame] = useState(null);
    const [amount, setAmount] = useState("");
    const [amountError, setAmountError] = useState("");
    const [transferAll, setTransferAll] = useState(false);
    useEffect(() => {
      if (gameData || mainGamesData) {
        setOpenDialog(true);
      }
    }, [gameData, mainGamesData]);

    useEffect(() => {
      if (gameData || mainGamesData) {
        setOpenDialog(true);
      }
    }, [gameData, mainGamesData]);

    useEffect(() => {
      setSelectedCategory("All")
      setQuery("")
    }, [activeCategory])
    
    useEffect(() => {
      if (query && filteredList) {
        let games
        if(filteredList?.length > 0 && filteredList[0]?.urltype){
          games = filteredList.map(item=>({
            "id": item?.id,
            "name": item?.name,
            "category": item?.category,
            "ltype": item?.ltype,
            "module": item?.module,
            "android_dl_link": item?.android_dl_link,
            "ios_dl_link": item?.ios_dl_link,
            "credit_type": item?.credit_type,
            "active": item?.active,
            "featured": item?.featured,
            "is_live": item?.is_live,
            "image_mobile": item?.image_mobile,
            "image_feature": item?.image_feature,
            "urltype": item?.urltype,
            "is_gamelist": item?.is_gamelist,
            "is_launch_in_site": item?.is_launch_in_site,
            "title": item?.title,
            "image": item?.image,
          }))
        } else {
          games = filteredList.map(item=>({
            baseProduct: item?.baseProduct,
            id: item?.baseProduct?.id,
            gameid: item.gameid,
            title: item.title,
            image: item.image,
            name: item.name,
            provider: item.provider,
            category: item.category,
            credit_type: item.credit_type,
            ltype: item?.baseProduct?.ltype,
          }))
        }
        setAllGames(games);
      } else {
        setAllGames(gamelist);
      }
    }, [gamelist, filteredList])

    useEffect(() => {
        // const timerId = setTimeout(() => {
        //   const name = otherProducts[gamelist[0]?.baseProduct?.name] || gamelist[0]?.baseProduct?.name
        //   // query && searchGame({name, query: query})
        // }, 500); // Delay in milliseconds
    
        // // Cleanup timeout on component unmount or query change
        // return () => clearTimeout(timerId);
        const filteredListValue = gamelist?.filter((game) => {
          return game?.name?.toLowerCase()?.includes(query?.toLowerCase()) || game?.title?.toLowerCase()?.includes(query?.toLowerCase());
        })
        setFilteredList(filteredListValue)
    }, [query]);
    

  const onSelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  const onSearch = useCallback(
    (value) => {
      setQuery(value);
    },
    [gamelist]
  );

  const filterGamesByCategories = (game) => {
    if (selectedCategory === "All") return true;
    return game.category === selectedCategory;
  };
  return (
    <>
      {
        gamelist?.length && !isHotGames ?
        <SearchGame gamelist={allGames} onSelect={onSelect} onSearch={onSearch} query={query}/>
        :null
      }
      <GamesContainer $isHotGames={isHotGames}>
        <Loading isLoading={isLoading || mainGameLoading}  message=" " imageLoading fullscreen={false} />

        {!(isLoading || mainGameLoading)
          ? allGames?.filter(filterGamesByCategories)?.map((game) => {
              const maxRtp = parseInt(max_rtp || 0, 10);
              const minRtp = parseInt(min_rtp || 0, 10);

          const randomPercentage = Math.random() * (maxRtp - minRtp) + minRtp;
          return (
            <GamesContent
              $isHotGames={isHotGames}
              key={game.gameid ? `${game.gameid}${game.category}`  : game?.id}
              $gameImage={
                isHotGames ? (game?.image_feature || game.image) 
                : 
                (game.image || game?.baseProduct?.image || game?.baseProduct?.image_mobile)
              }
            >
              <div className="game-img_container">
                <div className="game-img"
                  onClick={() => {
                    if (wallet && !wallet?.auto_transfer_credit_to_game && !game.is_gamelist) {
                      setSelectedGame(game);
                    } else {
                      handleLaunch
                        ? handleLaunch(game)
                        : handleProduct(game);
                      setQuery("")
                    }
                  }}
                />
              </div>
              {allGames?.length && allGames[0]?.baseProduct ? (
                <>
                  <p className="game-name">{game?.name}</p>
                  <GameProgress
                    $isStarted={game.gameid in startedGamesObject}
                    $percentage={randomPercentage}
                  >
                  </GameProgress>
                </>
              ) 
              :
                <>
                  <p 
                    className="game-name" 
                    style={{
                      backgroundColor: startedProductObject.hasOwnProperty(game.id) ? "orange" : "initial",
                      borderBottomLeftRadius: startedProductObject.hasOwnProperty(game.id) && "20px",
                      borderBottomRightRadius: startedProductObject.hasOwnProperty(game.id) && "20px"
                    }}
                  >
                    {game.id in startedProductObject && 'Started'} 
                  </p>
                </>
              }
            </GamesContent>
          );
        }):null}
        <Modal title="" isOpen={openDialog} onClose={() => setOpenDialog(false)}>
          <AppDialog gameData={gameData || mainGamesData} />
        </Modal>
        <Modal
          title="Launch Game"
          isOpen={selectedGame}
          onClose={() => setSelectedGame(null)}
        >
          <LaunchGame>
            <Image
              width="100px"
              height="100px"
              src={
                selectedGame?.image ||
                selectedGame?.baseProduct?.image ||
                selectedGame?.baseProduct?.image_mobile
              }
              alt={selectedGame?.name}
              skeletonHeight="100px"
            />
            <Input
              type="number"
              placeholder="Amount"
              disabled={transferAll}
              value={amount}
              onChange={(event) => {
                const inputValue = event.target.value;
                const parsedValue = parseFloat(inputValue);
                const balance = Number(wallet?.balance);
                if (isNaN(parsedValue)) {
                  setAmountError('Please enter a valid number');
                  setAmount('');
                  return;
                }
                if (parsedValue < 0) {
                  setAmountError('Amount must be greater than zero');
                  setAmount('');
                  return;
                }
                if (balance >= parsedValue) {
                  setAmountError('');
                  setAmount(parsedValue);
                } else {
                  setAmount(balance)
                }
              }}
              error={amountError}
            />
            <div className="options">
              <ToggleSwitch 
                label="Transfer All"
                defaultChecked={transferAll}
                onChange={(checked) => {
                  setAmountError('')
                  setAmount(wallet?.balance)
                  setTransferAll(checked)
                }}
              />
            </div>
            <Button
              onClick={() => {
                handleLaunch
                  ? handleLaunch({
                      ...selectedGame,
                      amount:
                        transferAll
                          ? 0
                          : wallet?.balance>amount?amount || 0:wallet?.balance,
                      auto_transfer: true
                    })
                  : handleProduct({
                      ...selectedGame,
                      amount:
                        transferAll
                          ? 0
                          : wallet?.balance>amount?amount || 0:wallet?.balance,
                      auto_transfer: true
                    });
                    setSelectedGame(null)
              }}
              disabled={amountError || amount < 0 }
            >
              Launch Game
            </Button>
          </LaunchGame>
        </Modal>
      </GamesContainer>
    </>
  );
}

export default Gamelist;
