import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { useNavigate } from "react-router-dom";
import Image from "../../components/common/Image";
import "./suneditor.min.css";
import Modal from "../../components/common/Modal";
import useWindowSize from "../../hooks/useWindowSize";

function PromoDescription({title, description}) {
  const { promo_joinnow = "", promo_moredetails = "" } =
    useSelector(selectConfigData);
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const windowSize = useWindowSize();

  return (
    <>
      <div className="buttons_container">
        <Image
          src={promo_moredetails}
          alt=""
          onClick={() => setShowDescription(!showDescription)}
        />
        <Image
          src={promo_joinnow}
          alt=""
          onClick={() => navigate("/deposit")}
        />
      </div>
      <div className="promotion-description-sm">
        {showDescription && (
          <div className="sun-editor-editable" dangerouslySetInnerHTML={{ __html: description }} />
        )}
      </div>
      <div className="promotion-description-lg">
        <Modal title={title} isOpen={windowSize.width>770?showDescription:false} onClose={() => setShowDescription(false)}>
          <div className="sun-editor-editable" dangerouslySetInnerHTML={{ __html: description }} />
        </Modal>
      </div>
    </>
  );
}

export default PromoDescription;
