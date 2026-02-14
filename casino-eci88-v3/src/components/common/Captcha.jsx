import React, { useEffect, useState } from 'react'
import Input from './Input'
import styled from 'styled-components';

const CaptchaText = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: red;
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    padding: 9px;
    letter-spacing: 5px;
    border-radius: 4px;
    width: 90%;
`
function Captcha({onChange}) {
    const [initCaptcha, setInitCaptcha] = useState("")
    const randomString = (length, chars) => {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
    const [invalid, setInvalid] = useState(false);
    const handleChange = (event) => {
        onChange && onChange(initCaptcha, event.target.value, setInvalid);
    }
    useEffect(() => {
        const captcha = randomString(6, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'); 
        setInitCaptcha(captcha);
        onChange && onChange(captcha, "", setInvalid);
    }, [])
  return (
    <>
        <Input label={<CaptchaText>{initCaptcha}</CaptchaText>} type="text" onChange={handleChange} error={invalid?"Wrong Captch":""} horizontal $borderRadius="4px" $padding="6px 12px" $fontSize="15px" />
    </>
  )
}

export default React.memo(Captcha)