import React, { useEffect, useState } from "react";
import "./Header.css";
import userService from "../../../services/user.service";
import authService from "../../../services/auth.service";
import ButtonWrapper from "../ButtonWrapper/ButtonWrapper";
import { Icon } from "@iconify/react";
import CustomModal from "../CustomModal/CustomModal";
import DailyCheckin from "../../DailyCheckin/DailyCheckin";
import Tooltip from '@mui/material/Tooltip';
import Loading from "../Loading/Loading";
import DepositContainer from "../../deposit/DepositContainer";

function Header({
  isLoggedIn,
  setIsLoggedIn,
  appRef,
  isFullScreen,
  setIsFullScreen, 
  StopProduct, 
  setIsLoading, 
  walletInfo, 
  getWalletInfo,
  setTokens,
  configData
}) {
  // const [walletInfo, setWalletInfo] = useState(null);
  const [checkIn, setCheckIn] = useState(false);
  const [checkinObject, setCheckinObject] = useState(null);
  const [startedGames, setStartedGames] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false); 
  const [newsfeeds, setNewsfeeds] = useState([]);
  const [openDeposit, setOpenDeposit] = useState(false);

  const fetchDailyCheckins = async () => {
    try {
      const { data } = await userService.getDailyCheckins();
      if (!data) {
        setCheckinObject(null);
      }
      setCheckinObject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTokens = async () => {
    try {
      const { data } = await userService.getTokens();
      setTokens(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      getWalletInfo();
      fetchTokens()
      fetchDailyCheckins();
    }
  }, [isLoggedIn]);

  function openFullscreen() {
    if (appRef.current.requestFullscreen) {
      appRef.current.requestFullscreen();
    } else if (appRef.current.webkitRequestFullscreen) {
      /* Safari */
      appRef.current.webkitRequestFullscreen();
    } else if (appRef.current.msRequestFullscreen) {
      /* IE11 */
      appRef.current.msRequestFullscreen();
    }
    setIsFullScreen(true);
  }

  /* Close fullscreen */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
    setIsFullScreen(false);
  }
  const logoHeight = window.innerWidth;

  function calculateLogoStyles(containerWidth) {
    let size = "10.5rem"; // default size for larger screens
    let margin = "-6%"; // default margin

    if (containerWidth <= 320) {
      size = "5rem";
      margin = "-4%";
    } else if (containerWidth <= 375) {
      size = "5rem";
      margin = "-4%";
    } else if (containerWidth <= 414) {
      size = "5rem";
      margin = "-4%";
    } else if (containerWidth <= 768) {
      size = "9.5rem";
      margin = "-4%";
    } else if (containerWidth <= 1024) {
      size = "9.5rem";
      margin = "-4%";
    }

    return { size, margin };
  }
  const getNewsfeedsList = async () => {
    try {
      const newslist = await userService.getNewsfeeds();

      setNewsfeeds(newslist && newslist.data ? newslist.data : []);
    } catch (err) {
      console.log(err);
    }
  };
  const getStartedGames = async (userId) => {
    try {
      const startedProducts = await userService.getStartedGames(userId);
      if (startedProducts.data) {
        setStartedGames(startedProducts.data);
      }
    } catch (error) {
      setStartedGames([]);
    }
  };
  useEffect(() =>{
    getNewsfeedsList();
  },[])

  useEffect(() =>{
    if (walletInfo && walletInfo.user && walletInfo.user.id) {
      getStartedGames(walletInfo.user.id);
    }
  }, [walletInfo])
  const { size, margin } = calculateLogoStyles(logoHeight);

  return (
    <div id="header" className="flex justify-between">
      {/* <div className="header-top"></div> */}
      <img
        className="hot-games-img cursor-pointer"
        src={require("../../../assets/images/daily-check-in.gif")}
        alt=""
        onClick={async () => {
          setCheckIn(true);
        }}
      />
      {/* <ButtonWrapper
        containerStyle={{position: "absolute", bottom: "5%", width: "10%"}}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1em",
          padding: "10px 20px",
          margin: "0 auto",
        }}
        onClick={async () => {
          await authService.logout();
          setIsLoggedIn(false);
        }}
      >
        Daily CheckIn
      </ButtonWrapper> */}
      <div className="header-section_container">
        <div className="header-left flex items-end">
          {/* <ButtonWrapper
            containerStyle={{ width: "35%" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: ".8em",
              padding: "5px 20px",
              margin: "0 auto",
            }}
            onClick={async () => {
              setCheckIn(true);
            }}
          >
            Daily CheckIn
          </ButtonWrapper> */}
           <div className="refresh-button ml-auto" style={{marginBottom: "0.5%", marginRight:"2%"}}>
            <Icon icon="ic:round-refresh" style={{ fontSize: "3em", color: "white"}} onClick={async (e) => {
                setIsLoading(true)
                startedGames.forEach(startedGame => {
                  StopProduct(startedGame.id)
                })
                setTimeout(() => {
                  setIsLoading(false)
                }, 500);
              }}/>
            </div>
          <div className="wallet_container" style={{marginBottom: "1%",marginRight:"5%"}}>
            <div className="wallet flex items-center">
            {/* <div> */}
            <div className="image_container">
              <img
                className="user-img"
                src={require("../../../assets/images/user.png")}
                alt=""
              />
            </div>
              
              <div className="wallet-balance relative">
                <span className="relative" style={{zIndex: "2"}}>
                  Balance: {walletInfo ? walletInfo.balance : 0}
                </span>
                <div className="" style={{background: "linear-gradient(#061c41, #061d45, #041e45, #041e45, #041e45, #031d42, #011b3c)", boxShadow:"none", position: "absolute", top: "1px", transform: "translate(0%, -90%)", left: "-5%", borderRadius: "30px 30px 0 0",}}>
                  <div className="wallet flex items-center justify-center px-2" style={{borderRadius:"5px"}}>
                    <div className="user-name text-white" style={{fontSize: "1em"}}>
                      <Tooltip title={walletInfo && walletInfo.user
                            ? walletInfo.user.username
                            : "DemoAccount"}>
                              {walletInfo && walletInfo.user
                            ? walletInfo.user.username
                            : "DemoAccount"}
                      </Tooltip>
                    </div>
                    {/* <div className="user-name" title={walletInfo && walletInfo.user
                        ? walletInfo.user.username
                        : "DemoAccount"}>
                      {walletInfo && walletInfo.user
                        ? walletInfo.user.username
                        : "DemoAccount"}
                    </div> */}
                  </div>
                </div> 
              </div>
              {/* {configData && configData.available_paymentgateway_providers ?
              configData.available_paymentgateway_providers.split(",").map(provider=>(
                provider === "telcopay" && */}
                <div className="image_container ml-auto">
                  <img
                    className="coin-img"
                    src={configData && configData.deposit_telcopay_image}
                    alt=""
                    onClick={() =>{
                      setOpenDeposit(!openDeposit)
                    }}
                  />
                </div>
              {/* ))
            :
            null} */}
              
            </div> 
          </div>
          {/* <div className="refresh-button" style={{marginRight:"5%",marginBottom: "0.5%"}}>
            <Icon icon="ic:round-refresh" style={{ fontSize: "3em", color: "white"}} onClick={async (e) => {
                setIsLoading(true)
                startedGames.forEach(startedGame => {
                  StopProduct(startedGame.id)
                })
                setTimeout(() => {
                  setIsLoading(false)
                }, 500);
              }}/>
            </div> */}
        </div>
      </div>
      <div className="logo_container-outer">
      <div className="logo_container flex items-center justify-center">
            <img
              className="logo h-full mx-auto"
              style={{
                // height: "128%",
                // marginTop: "-3%",
                height: "100%",
                marginTop: "0%",
                zIndex: 20
              }}
              // src={require("../../../assets/icons/logo.png")}
              src={configData && configData.logo}
              alt=""
            />
          </div>
        {/* <div className="logo_container-inner">
        </div> */}
      </div>
      <div className="header-section_container">
        <div className="header-right flex items-center justify-end gap-x-7">
       <div className="marquee ms-9">
        {
          newsfeeds && newsfeeds.length ?
       <marquee width="100%" style={{color:"white"}}>
       {newsfeeds.map((feed, newsindex) => (
                <span
                  key={newsindex}
                >
                  {feed.text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
              ))}
</marquee> : null
        }
       </div>
          {/* <div className="notice-btn_container">
            <button className="notice-btn uppercase px-3">
              {" "}
              <img src={require("../../../assets/images/notice.png")} alt="" />
            </button>
          </div> */}
          {/* <ButtonWrapper
          containerStyle={{width: "10%"}}
          style={{display: "flex", justifyContent: "center", alignItems: "center"}}
          >
            <img src={require("../../../assets/images/notice.png")} alt="" style={{maxWidth: "auto", width: "auto"}} />
          </ButtonWrapper> */}
          <ButtonWrapper
            containerStyle={{ width: "20%" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={async () => {
              setLogoutLoading(true);
              await authService.logout();
              setLogoutLoading(false);
              setIsLoggedIn(false);
            }}
          >
            <img
              src={require("../../../assets/images/logout.png")}
              alt=""
              style={{ maxWidth: "auto", width: "auto" }}
            />
          </ButtonWrapper>
          <ButtonWrapper
            containerStyle={{ width: "20%" }}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={() => {
              if (isFullScreen) {
                closeFullscreen();
              } else {
                openFullscreen();
              }
            }}
          >
            <Icon icon="material-symbols:fullscreen" />
          </ButtonWrapper>
          {/* <div className="logout-btn_container mr-3">
            <button
              className="logout-btn uppercase px-3"
              onClick={async () => {
                await authService.logout();
                setIsLoggedIn(false);
              }}
            >
              {" "}
              <img src={require("../../../assets/images/logout.png")} alt="" />
            </button>
          </div> */}
        </div>
      </div>
      <CustomModal
        title="Daily Checkin"
        open={checkIn}
        onClose={() => setCheckIn(false)}
        containerStyle={{width: "90%", overflowY: "auto", maxWidth: "960px"}}
        style={{
          textAlign: "center",
          borderRadius: "15px",
          padding: "1.5rem 1rem",
        }}
      >
        <DailyCheckin checkin={checkinObject} fetchDailyCheckins={fetchDailyCheckins} fetchTokens={fetchTokens} getWalletInfo={getWalletInfo} />
      </CustomModal>
      {
        openDeposit &&
        <CustomModal
          title={"Deposit"}
          titleStyle={{
            fontSize: "21px",
            textTransform:"uppercase"
          }}
          open={true}
          onClose={() => setOpenDeposit(false)}
          containerStyle={{
            width:"90%", 
            maxWidth:"95%", 
            overflowY: "auto"
          }}
          style={{
            borderRadius: "15px",
            padding: "1.5rem 1rem",
            color: "white", 
          }}
        >
          <DepositContainer isLoggedIn={isLoggedIn} setOpenDeposit={setOpenDeposit} />
        </CustomModal>
      }
      {logoutLoading && <Loading fullscreen />}
    </div>
  );
}

export default Header;
