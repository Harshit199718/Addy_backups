import React, { useState } from 'react'
import OptimizedImage from './OptimizedImage'
import './UploadImage.css'

function Upload({onChange, ...props}) {
    const [imagePreview, setImagePreview] = useState("")
    const handleImageChange = (e) => {
        setImagePreview(URL.createObjectURL(e.target.files[0]))
        onChange && onChange(e.target.files[0])
    }
  return (
    <div className='upload-container'>
        <div className="upload-label">
           <span>+</span> <br /> Upload
        </div>
        <input type="file" onChange={handleImageChange} {...props} />
        {
            imagePreview?
            <OptimizedImage src={imagePreview} alt="" />
            :null
        }
    </div>
  )
}

export default Upload