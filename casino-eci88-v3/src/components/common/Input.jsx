import React from "react";
import styled from "styled-components";
import Select from "./Select";
import MultiInput from "./MultiInput";
import MobileInput from "./MobileInput";
import { useTranslation } from "react-i18next";

export const ErrorMessage = styled.span`
    padding-left: 5px;
    font-size: 12px;
    font-weight: 500;
    color: red;
    margin-bottom: 10px;
    pointer-events: none;
`

const InputWrapper = styled.label`
  font-size: 14px;
  color: ${props=>props.theme.text_color};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  input {
    font-size: ${(props) => (props.$fontSize ? props.$fontSize : "12px")};
    padding: ${(props) => (props.$padding ? props.$padding : "15px")};
    margin: ${(props) => (props.$margin ? props.$margin : "0.375rem 0")};
    border: 1px solid
      ${(props) =>
        props.$borderColor ? props.$borderColor : "rgba(255, 255, 255, 0.1)"};
    border-radius: ${(props) =>
      props.$borderRadius ? props.$borderRadius : "10px"};
    outline: none;
    background: ${(props) => (props.$background ? props.$background : "#fff")};
    color: ${(props) => (props.$color ? props.$color : "#000")};
    line-height: 1.5;

    &:disabled {
      background: #ddd;
    }

    @media screen and (max-width: 800px) {
      font-size: ${(props) => (props.$fontSize ? props.$fontSize : "0.75rem")};
    }
    ${({$horizontal}) => $horizontal?({
      width: "65%",
    }):({})}
  }
  .error, .warning, .message {
    padding-left: 5px;
    font-size: 12px;
    font-weight: 500;
    color: red;
    margin-bottom: 10px;
    opacity: ${props=> props.$isError?"1":"0"};
    pointer-events: none;
    ${({$horizontal}) => $horizontal?({
      paddingLeft: "35%",
    }):({})}
  }

  .warning, .message {
    color: #ffc107;
    opacity: 1;
  }

  .message {
    color: #fff;
  }

  ${({$horizontal}) => $horizontal?({
    flexDirection: "row",
    alignItems: "center"
  }):({})}

  .label {
    font-size: ${({$labelSize})=> $labelSize?$labelSize:"14px"};
    line-height: 24px;
    padding: 0 5px;
    ${({$horizontal}) => $horizontal?({
      width: "35%",
    }):({})}
  }
`;
function Input({ label, error, onChange, horizontal, warning, message, disableError, options, ...props }) {
  const { t } = useTranslation();

  return (
    <InputWrapper {...props} $isError={error} $horizontal={horizontal}>
      <span className="label">
        {label}
      </span>
      {
        props.type === "phone"?
        <MobileInput {...props} onChange={onChange} horizontal={horizontal} />
        :
        props.type === "multi-input" ? 
        <MultiInput {...props} onChange={onChange} />
        :
        props.type === "select" ? 
        <Select {...props} onChange={onChange} options={options} />
        :
        <input {...props} onChange={onChange} />
      }
      {
        warning?
        <span className="warning">{warning}</span>
        :null
      }
      {
        message?
        <span className="message">{message}</span>
        :null
      }
      {
        !disableError?
        <span className="error">{t(error)}</span>
        :null
      }
    </InputWrapper>
  );
}

export default Input;
