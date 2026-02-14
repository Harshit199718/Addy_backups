import styled from "styled-components";

export const TableWithPagination = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const TableContainer = styled.table`
  width: 100%;
  background-color: ${({ $table_bg = "none" }) => $table_bg};
  border-spacing: 0px;
  border-collapse: collapse;
  font-size: ${({$fontSize}) => $fontSize?$fontSize:"10px"};
  text-align: ${({ $text_align = "left" }) => $text_align};
  @media screen and (min-width: 768px) {
    font-size: ${({ $responsive_text = false }) =>
      $responsive_text ? "22px" : "10px"};
  }
  `;
export const TableBody = styled.tbody`
  color: ${(props) => (props.$color ? props.$color : props.theme.text_color)};
  `;
export const TableCell = styled.td`
  padding: ${({ padding }) => (padding ? padding : "8px")};
  font-size: ${({$fontSize}) => $fontSize?$fontSize:"1.2em"};
  text-transform: ${({$uppercase})=> $uppercase?"uppercase": "capitalize"};
  font-weight: ${(props) => (props.$bold ? props.$bold : "400")};
  // border-top: 1px solid ${({$borderColor}) => $borderColor?$borderColor:"#fff"};
  // border-bottom: 1px solid ${({$borderColor}) => $borderColor?$borderColor:"#fff"};
  border-left: ${({ $columnBorder = true, $borderColor }) =>
    $columnBorder ? `1px solid ${$borderColor?$borderColor:"#fff"}` : "0"};
  border-right: ${({ $columnBorder = true, $borderColor }) =>
    $columnBorder ? `1px solid ${$borderColor?$borderColor:"#fff"}` : "0"};

  border-top: 1px solid ${({theme}) => theme.border_color ? theme.border_color : "#fff"};
  border-bottom: 1px solid ${({theme}) => theme.border_color ? theme.border_color : "#fff"};

  color: ${(props) => (props.$color ? props.$color : props.theme.text_color)};
  background: ${(props) => (props.$background ? props.$background : "none")};
`;
export const TableRow = styled.tr`
  /* Row styles here */
`;

export const Pagination = styled.div`
  max-width: 100%;
  display: flex;
  border-radius: 4px;
  border: 1px solid ${props=>props.theme.border_color};
  margin: 10px 0;
`;
export const Page = styled.div`
  flex: 1;
  padding: 14px;
  color:${props=>props.theme.text_color};
  font-size: 12px;
  text-align: center;
  background-color: ${({ $active }) =>
    $active ? (props=>props.theme.secondary_color) : "transparent"};

.page-dots{
      color: ${props=>props.theme.text_color};
      align-items: center;
    }
`;
