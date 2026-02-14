import { useState } from "react";
import styled from "styled-components";
import { useUploadImageMutation } from "../../api/hooks";

export const SettingsTitle = styled.h2`
  padding: 10px 20px;
  font-size: 1.6em;
  background-color: ${({ theme }) => theme.primary_color};
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 20px !important;
`;

export const SettingInput = styled.label`
  font-size: 20px;
  line-height: 20px;
  margin-bottom: 10px;
  display: block;

  input,
  textarea {
    border: 1px solid ${({ theme }) => theme.primary_color};
    border-radius: 10px;
    display: block;
    width: 50%;
    font-size: 20px;
    padding: 10px;
    margin: 10px 0;
    outline: none;
  }
  textarea {
    resize: none;
    width: 100%;
    min-height: 150px;
    max-height: 250px;
    overflow-y: auto;
    border: 1px solid ${({theme}) => theme.primary_color};
  }
  .allowed-variables {
    color: #FFBF00;
    font-weight: 700;
  }
`;

export const SettingsColorInput = styled.label`
  font-size: 20px;
  line-height: 20px;

  input {
    border: 1px solid ${({ theme }) => theme.primary_color};
    border-radius: 10px;
    display: block;
    width: 50%;
    height: 36px;
    padding: 5px;
    margin: 10px 0;
  }
`;

const SettingsImageInputContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 4px;
  border: 2px solid dashed;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
  }
`;

const LIVECHAT_API_URL = process.env.REACT_APP_LIVECHAT_API_URL;
export const SettingsImageInput = function ({ image, onChange }) {
  const [uploadImage] = useUploadImageMutation();

  const selectFile = async (event) => {
    try {
        const file = event.target.files[0];
        const maxSize = 2 * 1024 * 1024; // 5 MB in bytes
    
        if (file.size > maxSize) {
          alert("File size should not exceed 2MB");
          return;
        }
        const { data } = await uploadImage(file).unwrap();
        const filePath = data?.filePath;
        onChange(filePath)
    } catch (error) {
        console.log(error)
    }
  };
  return (
    <SettingsImageInputContainer>
      <img src={`${LIVECHAT_API_URL}/uploads/${image}`} />
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        name=""
        id=""
        onChange={selectFile}
      />
    </SettingsImageInputContainer>
  );
};
