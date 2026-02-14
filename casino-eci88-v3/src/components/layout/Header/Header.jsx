import React, { useCallback, useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';
import { HeaderContainer, HeaderLeft, HeaderMiddle, HeaderRight } from './Header.styled';
import { changeLanguage, selectCurrentCountry, toggleSidebar } from '../../../app/slices/general';
import Modal from '../../common/Modal';
import { selectConfigData } from '../../../api/generalApi';
import Image from '../../common/Image';
import LanguageSelector from '../../common/LanguageSelector';
import { countries } from '../../../i18n/countries';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { usePWAInstallPrompt } from '../../../app/PWAInstallContext';
import GooglePlayLogo from "../../../assets/google-play.svg"

function Header() {
  const { logo, sub_line, subline_icon, enabled_partner_section, partner_icon, country, default_lang, enable_sidebar, header_logo_height, show_pwa_download } = useSelector(selectConfigData);
  const { t } = useTranslation();
  const currentCountry = useSelector(selectCurrentCountry);
  const dispatch = useDispatch();
  const [languageModal, setLanguageModal] = useState(false);
  const navigate = useNavigate();
  const { isPromptAvailable } = usePWAInstallPrompt();

  useEffect(() => {
    if (country && default_lang) {
      const selectedLanguage = localStorage.getItem("i18nlanguage");
      let language = selectedLanguage || default_lang || countries[country?.toLowerCase()]?.defaultLang 
      dispatch(changeLanguage({country: country.toLowerCase(), language}));
    }
  }, [country, default_lang])
  
  const handleClose = useCallback(() => {
    setLanguageModal(false)
  }, [])
  return (
    <HeaderContainer>
        <HeaderLeft>
          {
            enable_sidebar?
            <Icon className='sidebar-toggler' icon="fa:bars" onClick={() => {
              dispatch(toggleSidebar())
            }} />
            :null
          }
        </HeaderLeft>
        <HeaderMiddle>
          <div className="column">
            {
            enabled_partner_section && partner_icon &&
            <div className="not-logo">
              <Image src={partner_icon} alt="Referral" style={{height: "60px", width: "auto"}} skeletonHeight={50} skeletonWidth={50} onClick={() => navigate("/partnership")} />
              {/* <span>{t("Partnership")}</span> */}
            </div>
            }
          </div>
          <div className="column">
            <Image src={logo} alt="" className="logo" style={{height: header_logo_height ? `${header_logo_height}px` : "30px", width: "auto"}} skeletonHeight={50} skeletonWidth={50} square 
            onClick={() => 
              enabled_partner_section && !partner_icon ?
              navigate("/partnership")
              :
              navigate("/")
            } 
            />
          </div>
          <div className="column">
          {
            sub_line &&
            <div className="not-logo">
              <Image src={subline_icon} alt="Referral" height="25px" width="25px" skeletonHeight={25} skeletonWidth={25} onClick={() => navigate("/subline")} />
              <span>{t("EXPRESS")}</span>
            </div>
          }
          </div>
        </HeaderMiddle>
        <HeaderRight>
          {isPromptAvailable && show_pwa_download &&
            <Image src={GooglePlayLogo} alt="Referral" height="30px" width="30px" skeletonHeight={25} skeletonWidth={25} onClick={() => navigate("/google-play")} />
          }
          <Image className='flag' src={countries[country.toLowerCase()]?.flag} alt="" style={{height: "25px", width: "auto"}}
            skeletonHeight={25} skeletonWidth={25}
            onClick={() => {
              setLanguageModal(true)
            }}
          />
        </HeaderRight>
        <Modal
          title={t("Select_Language")}
          isOpen={languageModal} 
          onClose={handleClose}
        >
          <LanguageSelector />
        </Modal>
    </HeaderContainer>
  )
}

export default React.memo(Header)