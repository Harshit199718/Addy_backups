import styled from "styled-components";
import { CountdownContainer, JackpotTickerContainer, LeftContainer, Separator, Subtitle, TickCounterContainer, TickView, Title } from "./Jackpot1.styled";

export const JackpotTickerContainer2 = styled(JackpotTickerContainer)`
    border: none;
    box-shadow: none;
    background-image: url(${({theme})=> theme.jackpot_image});
    background-size: cover;
    background-position: center center;
    margin: 0;
    border-radius: 0;
    height: 100px;
    padding: 25px 30px 25px 25px;
    flex-wrap: nowrap;
`
export const LeftContainer2 = styled(LeftContainer)`
    flex-basis: 30%;
`
export const Subtitle2 = styled(Subtitle)``
export const Title2 = styled(Title)`
    font-size: 12px;
    letter-spacing: normal;
`
export const CountdownContainer2 = styled(CountdownContainer)`
    flex-basis: 70%;
`
export const TickCounterContainer2 = styled(TickCounterContainer)`
    font-size: 10px;
    font-family: advanced_dot_digital7;
    font-weight: 700;
    color: rgb(217, 125, 3);
    text-transform: uppercase;

    @media screen and (min-width: 500px) and (max-width: 800px) {
        font-size: 20px;
    }
`
export const TickView2 = styled(TickView)``
export const Separator2 = styled(Separator)``