import React from 'react'
import styled from 'styled-components'

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    
    .input_container {
        overflow: hidden;
        width: 17px;
        height: 17px;
        border-radius: 4px;
        border: 1.5px solid #e4ae60;
        background: #fff;
        position: relative;

        input {
            appearance: none;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 20;
        }
        
        input + .check {
            opacity: 0;
            color: ${props=>props.theme.text_color_secondary};
            font-weight: 900;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            font-size: 70%;
        }
    
        input:checked + .check {
            opacity: 1;
        }
    }

    label {
        font-size: 13px;
        font-weight: 700;
        color: ${props=>props.theme.text_color};
        text-transform: uppercase;
    }
`
function Checkbox({label, singleSelect, ...props}) {
  return (
    <CheckboxWrapper>
        <div className="input_container">
            <input type={singleSelect?"radio":"checkbox"} {...props} />
            <i className="check">✔</i>
        </div>
        <label htmlFor="">{label}</label>
    </CheckboxWrapper>
  )
}

export default Checkbox