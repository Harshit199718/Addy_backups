import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({$fontSize}) => $fontSize?$fontSize:"1.2em"};
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

export const Thead = styled.thead`
  background-color: ${({theme}) => theme.primary_color};
  color: #ffffff;
  text-align: left;
`;

export const Th = styled.th`
  padding: 12px 15px;
  text-align: ${({$textAlign}) => $textAlign?$textAlign:"left"};
`;

export const Tr = styled.tr`
  border-bottom: 1px solid #dddddd;

  &:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  &:last-of-type {
    border-bottom: 2px solid ${({theme}) => theme.primary_color};
  }
`;

export const Td = styled.td`
  padding: 12px 15px;
  text-align: ${({$textAlign}) => $textAlign?$textAlign:"left"};
`;
