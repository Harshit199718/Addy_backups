import React, { useState } from "react";
import styled from "styled-components";
import OptimizedImage from "../OptimizedImage";
import { useTranslation } from "react-i18next";
import Button from "../Button";

const UploadWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  border: 1px solid #ffb74d;
  border-radius: 6px;
  position: relative;
  background: #fff2e1;
  gap: 10px;
  position: relative;

  &>button {
    position: relative;
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 50;
    opacity: 0;
  }
  img {
    max-width: 50px;
    opacity: 1;
    pointer-events: none;
  }
`;
function Upload2({ label, onChange, ...props }) {
  const { t } = useTranslation();
  const [imagePreview, setImagePreview] = useState("");
  const handleImageChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    onChange && onChange(e.target.files[0]);
  };
  return (
    <UploadWrapper>
        <label htmlFor="">{label}: </label>
      <Button
        className="upload-btn"
        $width="auto"
        $fontSize="15px"
        $fontWeight="100"
        $padding="8px 16px"
        $backgroundImage="linear-gradient(rgb(48, 147, 199), rgb(28, 90, 133))"
      >
        <input type="file" onChange={handleImageChange} {...props} />
        {t("Upload")}
      </Button>
      {imagePreview ? <OptimizedImage src={imagePreview} alt="" /> : null}
    </UploadWrapper>
  );
}

export default Upload2;
