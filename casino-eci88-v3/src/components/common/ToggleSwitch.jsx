import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SwitchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({theme}) => theme.text_color}
`
const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 26px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + span {
    background-color: #2196F3;
  }
  input:disabled + span {
    background-color: #ddd;
  }

  input:checked + span:before {
    transform: translateX(26px);
  }
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const ToggleSwitch = ({label, onChange, defaultChecked, disabled}) => {
  // const [checked, setChecked] = useState(defaultChecked);

  // useEffect(() => {
  //   setChecked(defaultChecked)
  // }, [defaultChecked])
  
  // useEffect(() => {
  //   if (onChange) {
  //       onChange(checked)
  //   }
  // }, [checked])
  
  return (
    <SwitchContainer>
        {label}
        <Switch>
        <input
            type="checkbox"
            checked={defaultChecked}
            onChange={() => onChange(!defaultChecked)}
            disabled={disabled}
        />
        <Slider />
        </Switch>
    </SwitchContainer>
  );
};

export default ToggleSwitch;
