import styled from "styled-components";

export const SocialsContainer = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;

  ${({ theme }) =>
    theme.sub_line_fix
      ? {
          position: "fixed",
          left: "0",
          bottom: "60px",
          zIndex: "50",
          flexDirection: "column"
        }
      : {}}

  &>div {
    width: 33.33%;
    border: 2px solid ${(props) => props.theme.border_color};
    border-radius: 15px;
    max-width: 300px;

    ${({ theme }) =>
      theme.sub_line_fix
        ? {
            width: "65px",
            height: "65px",
            border: "none"
          }
        : {}}
  }
`;

export const SocialsListItem = styled.div` 
    display: flex;
    width: 100%;
    padding: 10px;
    background: rgba(0, 0, 0, .7);

    .socials-list-icon {
      justify-content: center;
      align-items: center;
      margin-right: 20px;
    }

    .socials-list-content {
      align-content: center;
      width: 85%;
      color: white;
      margin: 0 0 0 .44rem;
      overflow: auto;
    }

    .socials-list-content-title {
      color: ${(props) => props.theme.text_color};
      margin-bottom: .1rem;
      font-size: 24px;
    }

    .socials-list-content-description {
      color: ${(props) => props.theme.text_color_secondary};
      margin-top: 0;
    }
`