import styled from "styled-components";

export const HistoryContainer = styled.div`
  padding: 4px 8px;
  padding-bottom: 60px;
  & > div > div:first-child {
    margin-bottom: 20px;
  }
`;
export const Status = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .status {
    padding: 5px 10px;
    border-radius: 20px;
    background: ${props=>{
      switch (props.$status) {
        case "pending":
          return "rgb(234 179 8)";
        case "approved":
          return "rgb(34 197 94)";
        case "deleted":
          return "rgb(244 63 94)";
        case "rejected":
          return "rgb(217 70 239)";
        case "error":
          return "#ff9999";
      
        default:
          break;
      }
    }};
    width: max-content;
    margin: auto;
  }

  .delete {
    padding: 2px;
    background: rgb(234 179 8);
    color: ${props=>props.theme.text_color};;
    font-size: 20px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`