import React, { useState } from 'react'
import styled from 'styled-components'
import OptimizedImage from '../OptimizedImage'
import { useTranslation } from 'react-i18next';

const UploadWrapper = styled.div`
    width: 102px;
    height: 102px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #fff;
    border: 1px dashed ${({theme}) => theme.border_color ? theme.border_color : "#fff"};
    border-radius: 6px;
    position: relative;

    .upload-label {
        font-size: 14px;
        font-weight: 100;
        color: ${props=>props.theme.text_color};
        text-align: center;

        span {
            font-size: 22px;
        }
    }
    input, img {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 10;
        opacity: 0;
    }
    img {
        opacity: 1;
        pointer-events: none;
    }
`
function Upload({onChange, ...props}) {
    const { t } = useTranslation();
    const [imagePreview, setImagePreview] = useState("")
    const handleImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        onChange && onChange(e.target.files[0])
    }
  return (
    <UploadWrapper>
        <div className="upload-label">
           <span>+</span> <br />{t("Upload")}
        </div>
        <input type="file" onChange={handleImageChange} {...props} />
        {
            imagePreview?
            <OptimizedImage src={imagePreview} alt="" />
            :null
        }
    </UploadWrapper>
  )
}

export default Upload