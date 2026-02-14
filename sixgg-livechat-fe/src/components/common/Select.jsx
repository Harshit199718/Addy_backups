// Import necessary dependencies
import React from 'react';
import styled from 'styled-components';

// Styled select component
const StyledSelect = styled.select`
    border-radius: 10px;
    background-color: #fff;
    border: 1px solid ${({theme}) => theme.primary_color};
    outline: none;
    padding: 10px;
    font-size: ${({$fontSize}) => $fontSize?$fontSize:"1.8em"};

  &:hover {
    background-color: #f8f9fa;
  }
`;

// Option styled component (optional if you want to style individual options)
const StyledOption = styled.option`
  color: #555;
`;

// The component accepts options and an onChange function via props
const Select = ({ name, options, onChange, $fontSize }) => {
  return (
    <StyledSelect name={name} onChange={onChange} $fontSize={$fontSize}>
      {options.map((option, index) => (
        <StyledOption key={index} value={option.value}>
          {option.label}
        </StyledOption>
      ))}
    </StyledSelect>
  );
};

export default Select;
