// src/components/GooglePlay.js
import React, { useMemo } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { usePWAInstallPrompt } from '../../app/PWAInstallContext.jsx';
import GooglePlayLogo from "../../assets/google-play.svg"
import { GooglePlayContainer, Header, AppTitle, AppRateSection, InstallSection, ShareWishList, AvailableSection } from "./GooglePlay.styled"
import { useGetPWAConfigQuery } from "../../api/hooks.js";
import Loading from "../../components/common/Loading.jsx";
import { ConvertToArray } from "../../utils/helper.js";

const siteName = import.meta.env.VITE_APP_SITE_NAME;

const GooglePlay = () => {
  const { logo } = useSelector(selectConfigData);
  const { promptInstall, isPromptAvailable, progress } = usePWAInstallPrompt();
  const {data: pwaConfig, isLoading} = useGetPWAConfigQuery();
  const pwaConfigValue = useMemo(() => {
    const value = {
      logo: pwaConfig?.logo ? pwaConfig?.logo : logo,
      game_demo_image1: pwaConfig?.game_demo_image1 ? pwaConfig?.game_demo_image1 : logo,
      game_demo_image2: pwaConfig?.game_demo_image2 ? pwaConfig?.game_demo_image2 : logo,
      game_demo_image3: pwaConfig?.game_demo_image3 ? pwaConfig?.game_demo_image3 : logo,
      title: pwaConfig?.title ? pwaConfig?.title : siteName,
      provider_name: pwaConfig?.provider_name ? pwaConfig?.provider_name : "Casino888",
      app_contain: pwaConfig?.app_contain ? pwaConfig?.app_contain : "Contains ads  ·  In-app purchases",
      rate: pwaConfig?.rate ? pwaConfig?.rate : "4.8",
      review: pwaConfig?.review ? pwaConfig?.review : "288k",
      download: pwaConfig?.download ? pwaConfig?.download : "10M+",
      about_this_description: pwaConfig?.about_this_description ? pwaConfig?.about_this_description : `${siteName} is the best`,
      tag: pwaConfig?.tag ? ConvertToArray(pwaConfig?.tag) : ["Top 1 Casino", "Slots"],
    } 
    return value

  },[pwaConfig])

  return (
    <GooglePlayContainer>
      <Loading isLoading={isLoading} />
      <div className="body">
        <Header>
          <img className="logo" src={GooglePlayLogo} />
          Google Play
        </Header>
        <AppTitle>
          <img className="logo" src={pwaConfigValue?.logo} />
          <div>
            <h1 className="title">
              {pwaConfigValue?.title}
            </h1>
            <div className="provider-name">
              {pwaConfigValue?.provider_name}
            </div>
            <div className="app-contain">
              <span>
                {pwaConfigValue?.app_contain}
              </span>
            </div>
          </div>
        </AppTitle>
        <AppRateSection>
          <div className="row">
            <div className="column">
              <div className="first-row">
                {pwaConfigValue?.rate} ★
              </div>
              <div className="second-row">
                {pwaConfigValue?.review} reviews
              </div>
            </div>
            <div className="column-line" />
            <div className="column">
              <div className="first-row">
                {pwaConfigValue?.download}
              </div>
              <div className="second-row">
                Downloads
              </div>
            </div>
            <div className="column-line" />
            <div className="column">
              <div className="first-row">
                <Icon icon="tabler:rating-18-plus" width="1.8rem" height="1.8rem" />
              </div>
              <div className="second-row">
                Rated for 18+
              </div>
            </div>
          </div>
        </AppRateSection>
        <InstallSection>
          <button onClick={() => promptInstall()}>
            {
            isPromptAvailable ? 
              progress > 0 ? 
                `Installing ${progress?.toFixed(2)}%` 
                :
                "Install" 
            : "Installed"
            }
          </button>
        </InstallSection>
        <ShareWishList>
          <button onClick={() => promptInstall()}>
            <Icon icon={"material-symbols:share"} width="1.8rem"/>
            Share
          </button>
          <button onClick={() => promptInstall()}>
            <Icon icon="mdi:heart-outline" width="1.8rem"/>
            Add to wishlist
          </button>
        </ShareWishList>
        <AvailableSection>
        <div className="text">
          <Icon icon={"fluent:phone-laptop-24-regular"} width="1rem" style={{ marginRight: "5px" }}/>
          This app is available for all of your devices
          </div>
          <div className="text">
          <Icon icon={"mdi:love"} width="1rem" style={{ marginRight: "5px" }}/>
          You can share this with your family. 
          </div>
          <div className="scroll-container">
          <img 
            src={pwaConfigValue?.game_demo_image1}
            alt="First" 
            className="scroll-image" 
          />
          <img 
            src={pwaConfigValue?.game_demo_image2}
            alt="Second" 
            className="scroll-image" 
          />
          <img 
            src={pwaConfigValue?.game_demo_image3}
            alt="Third" 
            className="scroll-image" 
          />
        </div>
        <div className="text">
          <h1 style={{ marginBottom: "15px" }}>About this game</h1>
        </div>
        <div className="text" style={{ marginBottom: "15px" }}>
          {pwaConfigValue?.about_this_description}
        </div>
        <div className="text">
          <h3>Updated On</h3>
        </div>
        <div className="text"  style={{ marginBottom: "15px" }}>
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
        <div className="tag-container">
          {pwaConfigValue?.tag && pwaConfigValue?.tag?.length > 0 ?
          pwaConfigValue?.tag.map((tag) => 
            <div key={tag} className="tag">{tag}</div>
          )
          :
          null
          }
        </div>
        <div className="text">
          <h2 style={{ marginBottom: "15px" }}>Data Safety</h2>
        </div>
        <div className="text">
          Safety starts with understanding how developers collect and share your data. 
          Data privacy and security practices may vary based on your use, region, and age. 
          The developer provided this information and may update it over time.
        </div>
        </AvailableSection>
      </div>
    </GooglePlayContainer>
  );
};

export default GooglePlay;
