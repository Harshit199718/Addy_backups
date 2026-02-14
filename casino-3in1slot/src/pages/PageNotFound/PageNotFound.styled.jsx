import styled from "styled-components";

export const PageNotFoundContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 10px;
width: 100%;
height: 50vh;
margin: auto;

h2 {
  font-size: 42px;
  color: ${props=>props.theme.text_color};;
  font-weight: 700;
  text-transform: uppercase;
}
p {
  font-size: 22px;
  color: ${props=>props.theme.text_color};;
  font-weight: 400;
}
`