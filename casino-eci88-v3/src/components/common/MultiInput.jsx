import React, { useEffect, useRef, useState } from 'react'
import OTPInput from 'react-otp-input';
import styled from 'styled-components';

const MultiInputWrapper = styled.div`
    font-size: 14px;
    color: ${props=>props.theme.text_color};
    display: flex;
    gap: 10px;

    input {
        width: calc((100%/5) - (10px));
        font-size: ${props=>props.$fontSize?props.$fontSize:"1.6rem"};
        padding: ${props=>props.$padding?props.$padding:"0.375rem 0.75rem"};
        margin: ${props=>props.$margin?props.$margin:"0.375rem 0"};
        border: 1px solid ${props=>props.$borderColor?props.$borderColor:"#86b7fe"};
        border-radius: ${props=>props.$borderRadius?props.$borderRadius:"0"};
        outline: none;
        background: ${props=>props.$background?props.$background:"#fff"};
        color: ${props=>props.$color?props.$color:"#000"};
        line-height: 1.5;

        @media screen and (max-width: 800px) {
            font-size: .75rem;
        }
    }
`
function MultiInput({length, onChange, name}) {
    const [code, setCode] = useState("")
    useEffect(() => {
        onChange({
            target: {
                name,
                value: code
            }
        })
    }, [code])
  return (
    <OTPInput
        containerStyle={{
            marginTop: "1.5rem",
            columnGap: "10px",
            justifyContent: "space-between",
        }}
        inputStyle={{
            width: "50px",
            height: "50px",
            borderRadius: "8px",
            color: "black",
            fontSize: "2rem",
            fontWeight: "bold",
        }}
        value={code}
        onChange={setCode}
        numInputs={length}
        inputType="number"
        separator={<span>-</span>}
        renderInput={(props) => (
            <input {...props} pattern="[0-9]*" type="text" />
        )}
        shouldAutoFocus
    />
  )
}

export default React.memo(MultiInput)