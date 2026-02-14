import React, { useEffect, useState } from "react";
import Image from "../../components/common/Image";
import QR from "qrcode";
import { useWalletQuery } from "../../api/hooks";
import { QRCodeContainer } from "./General.styled";
import { Icon } from "@iconify/react";

function QRCode({copyLink}) {
  const { data: wallet } = useWalletQuery();
  const [qrImage, setQrImage] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const getQrCode = async () => {
      const image = await QR.toDataURL(wallet?.referral_link);
      setQrImage(image);
    };
    if (wallet) {
      getQrCode();
    }
  }, [wallet]);

  return (
    <QRCodeContainer>
      <Image src={qrImage} alt="" />
      <div className="referral-link_container">
        <p className="link">
            {wallet?.referral_link}
            <Icon icon={!copied?"solar:copy-linear":"akar-icons:double-check"} color={copied?"green":""} fontSize={32} onClick={copyLink} />
        </p>
      </div>
    </QRCodeContainer>
  );
}

export default React.memo(QRCode);
