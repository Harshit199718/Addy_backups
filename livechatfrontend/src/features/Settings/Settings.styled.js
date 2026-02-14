import styled from "styled-components";

export const SettingsTitle = styled.h2`
    padding: 10px 20px;
    font-size: 1.6em;
    background-color: #7792b1;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 20px !important;
`

export const SettingInput = styled.label`
    font-size: 20px;
    line-height: 20px;
    
    input, textarea {
        border: 1px solid #7792b1;
        border-radius: 10px;
        display: block;
        width: 50%;
        font-size: 20px;
        padding: 10px;
        margin: 10px 0;
    }
    textarea {
        resize: none;
        height: 150px;
    }
`

export const SettingsColorInput = styled.label`
    
    input {
        border: 1px solid #7792b1;
        border-radius: 10px;
        display: block;
        width: 50%;
        padding: 10px;
        margin: 10px 0;
    }
`