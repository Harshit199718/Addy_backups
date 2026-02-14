import React, { useEffect, useRef } from 'react'
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";
import { CountdownContainer, JackpotTickerContainer, LeftContainer, Separator, Subtitle, TickCounterContainer, TickView, Title } from './Jackpot1.styled';
import { useTranslation } from 'react-i18next';
import { formatNumberWithCommas, getRandomIncrement } from './jackpot.utils';
import LayoutSpacing from '../Layout/LayoutSpacing';

function Jackpot1() {
    const tickRef = useRef(null);
    const tickRef1 = useRef(null);
    const tickRef2 = useRef(null);
    const decRef = useRef(null);
    const { t } = useTranslation();
    let tickInstance = null;
    let tickInstance1 = null;
    let tickInstance2 = null;
    let decInstance = null;
  
    let wholeValue = 1164639.30
    let currentValue = 1; // Starting value
    let currentValue1 = 164; // Starting value
    let currentValue2 = 639; // Starting value
    let decimalValue = 30; // Starting value
    useEffect(() => {
        tickInstance = Tick.DOM.create(tickRef.current, {
          value: currentValue,
        });
        tickInstance1 = Tick.DOM.create(tickRef1.current, {
          value: currentValue1,
        });
        tickInstance2 = Tick.DOM.create(tickRef2.current, {
          value: currentValue2,
        });
        decInstance = Tick.DOM.create(decRef.current, {
          value: decimalValue,
        });
    
        const updateTicker = () => {
          wholeValue += getRandomIncrement(0.01, 9);
          const {first, second, third, decimal} = formatNumberWithCommas(wholeValue, 100);
          tickInstance.value = first;
          tickInstance1.value = second;
          tickInstance2.value = third;
          decInstance.value = decimal;
          const randomInterval = Math.floor(Math.random() * 500);
          setTimeout(updateTicker, randomInterval);
        };
    
        // Initial update
        updateTicker();
    
        return () => {
          if (tickInstance) {
            Tick.DOM.destroy(tickRef.current);
          }
        };
      }, []);

    return (
      <LayoutSpacing>
        <JackpotTickerContainer>
          <LeftContainer>
            <Subtitle>{t("Progressive")}</Subtitle>
            <Title>{t("Jackpot")}</Title>
          </LeftContainer>
          <CountdownContainer>
            <TickCounterContainer>
              <TickView ref={tickRef}>
                <div data-repeat="true" aria-hidden="true">
                  <span data-view="flip"></span>
                </div>
              </TickView>
              <Separator><p>,</p></Separator>
              <TickView ref={tickRef1}>
                <div data-repeat="true" aria-hidden="true">
                  <span data-view="flip"></span>
                </div>
              </TickView>
              <Separator><p>,</p></Separator>
              <TickView ref={tickRef2}>
                <div data-repeat="true" aria-hidden="true">
                  <span data-view="flip"></span>
                </div>
              </TickView>
              <Separator><p>.</p></Separator>
              <TickView ref={decRef}>
                <div data-repeat="true" aria-hidden="true">
                  <span data-view="flip"></span>
                </div>
              </TickView>
            </TickCounterContainer>
          </CountdownContainer>
        </JackpotTickerContainer>
      </LayoutSpacing>
  )
}

export default Jackpot1