import React, { useCallback, useMemo, useState } from "react";
import {
  GeneralWrapper,
  MoreInfoImage,
  ShareImageContainer,
} from "./General.styled";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import Modal from "../../components/common/Modal";
import Image from "../../components/common/Image";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { useWalletQuery } from "../../api/hooks";
import QRCode from "./QRCode";
import { getButtons, getShareImages } from "./general.utils";
import { useTranslation } from "react-i18next";

function General({ fullWidth, downlinePage, showReferralinBanner }) {
  const {t} = useTranslation();
  const {
    general_downline,
    general_share,
    general_more_info,
    general_copy_link,
    more_info_modal,
    general_buttons_rows,
    whatsapp,
    telegram,
    qrcode,
  } = useSelector(selectConfigData);
  const { data: wallet } = useWalletQuery();
  const navigate = useNavigate();
  const [selectedGeneral, setSelectedGeneral] = useState("");
  const [copied, setCopied] = useState(false);
  const buttons = getButtons({general_downline, general_share, general_more_info, general_copy_link});

  const shareImages = useMemo(
    () => getShareImages(wallet?.referral_link, {whatsapp, telegram, qrcode}),
    [wallet]
  );
  
  const handleClose = useCallback(() => {
    setSelectedGeneral("");
  }, []);

  const copyLink = useCallback(() => {
    if (!copied) {
        navigator.clipboard.writeText(wallet?.referral_link)
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    }
  }, [wallet])

  const handleClick = (name, data) => {
    switch (name) {
      case "downline":
        navigate(data?.path);
        break;
      case "whatsapp":
        window.open(data?.path, "_blank");
        break;
      case "telegram":
        window.open(data?.path, "_blank");
        break;
      case "copy_link":
        copyLink();

      default:
        setSelectedGeneral(name);
        break;
    }
  };
  return (
    <GeneralWrapper style={{ flexWrap: downlinePage ? "nowrap" : "wrap"}} showReferralinBanner={showReferralinBanner}> 
      {buttons.map((button) => (
        (downlinePage && button?.id === "downline") ?
         null
        :
        <Image
          key={button.id}
          src={button.img}
          alt=""
          onClick={() => handleClick(button.id, button)}
          width={
            fullWidth ? "100%" : downlinePage ? "33%" :
            general_buttons_rows === "1" ? "24%" : "48%"
          }
          skeletonHeight={
            fullWidth ? "100%" : downlinePage ? "33%" :
            general_buttons_rows === "1" ? 23 : 48
          }
        />
      ))}
      <Modal
        title={t("More_Info")}
        isOpen={selectedGeneral === "more_info"}
        onClose={handleClose}
      >
        <MoreInfoImage>
          <Image src={more_info_modal} alt="More Info Image" />
        </MoreInfoImage>
      </Modal>
      <Modal
        title={t("Share")}
        isOpen={selectedGeneral === "share"}
        onClose={handleClose}
      >
        <>
          {shareImages?.map((share) => (
            share?.image &&
            <ShareImageContainer key={share.id} onClick={() => {
              handleClick(share.id, {path: share?.link})
            }}>
              <Image
                src={share?.image}
                alt={share?.title}
                width="auto"
                skeletonWidth="60px"
                skeletonHeight="60px"
              />
              {share?.title}
            </ShareImageContainer>
          ))}
        </>
      </Modal>
      <Modal title="QRCODE" isOpen={selectedGeneral==="qrcode"} onClose={() => setSelectedGeneral("")}>
          <QRCode copied={copied} setCopied={setCopied} copyLink={copyLink} />
      </Modal>
      <Modal title="Copy Link" isOpen={copied} onClose={() => setCopied(false)}>
          {t("Successfully_Copied") + "!"}
      </Modal>
    </GeneralWrapper>
  );
}

export default General;
