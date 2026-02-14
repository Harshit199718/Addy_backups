import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectConfigData } from "../../api/generalApi";
import { useNavigate } from "react-router-dom";
import Image from "../../components/common/Image";
import "./suneditor.min.css";
import Modal from "../../components/common/Modal";
import useWindowSize from "../../hooks/useWindowSize";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import { PromotionDescContainer } from "./Promo.styled";

function PromoDescription2({ title, description, end_date }) {
  const { t } = useTranslation();
  const [showDescription, setShowDescription] = useState(false);
  const windowSize = useWindowSize();

  return (
    <PromotionDescContainer>
      <div className="buttons_container">
        <h2 className="title">
          {title} <br /> {t("End_Date")}: {end_date}
        </h2>
        <Button
          $fontSize="10px"
          $fontWeight="100"
          $width="auto"
          $padding="7px 10px"
          $transform="auto"
          onClick={() => setShowDescription(!showDescription)}
        >
          {t("Click_For_More_Info")}
        </Button>
      </div>
      <div className="promotion-description-sm">
        {showDescription && (
          <div className="promotion-info">
            <button
              className="close-button"
              onClick={() => setShowDescription(!showDescription)}
            >
              <span>×</span>
            </button>
            <h2 className="promotion-info-title">{title}</h2>
            <div
              className="sun-editor-editable"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>
        )}
      </div>
      <Modal
        title={title}
        isOpen={windowSize.width > 770 ? showDescription : false}
        onClose={() => setShowDescription(false)}
      >
        <div
          className="sun-editor-editable"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </Modal>
    </PromotionDescContainer>
  );
}

export default PromoDescription2;
