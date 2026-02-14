import React, { useRef, useEffect, useContext } from "react";
import Tick from "@pqina/flip";
import "./SpecialBonus.css";
import "@pqina/flip/dist/flip.min.css";

const SpecialBonus = () => {
  const tickRef = useRef(null);
  const tickRef1 = useRef(null)
  const tickRef2 = useRef(null)
  const decRef = useRef(null)
  
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
    const getRandomIncrement = (min, max) => {
      return Math.random() * (max - min) + min;
    };

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

  const formatNumberWithCommas = (number) => {
    const [wholePart, decimalPart] = number.toFixed(2).split(".");
    const formattedWholePart = addCommasToNumber(wholePart);
    const splitNumber = String(formattedWholePart).split(",");
    return {
      wholeNumber: `${formattedWholePart}.${decimalPart}`,
      first: splitNumber[0],
      second: splitNumber[1],
      third: splitNumber[2],
      decimal: decimalPart
    }
  };

  const addCommasToNumber = (number) => {
    const reversed = number.split("").reverse();
    let result = [];
    for (let i = 0; i < reversed.length; i++) {
      if (i > 0 && i % 3 === 0) {
        result.push(",");
      }
      result.push(reversed[i]);
    }
    return result.reverse().join("");
  };

  return (
    <div className="jackpot-ticker-container" style={{borderRadius: "1rem"}}>
      <div className="flex w-100 justify-center items-center flex-col countdown-header">
        <p className="subtitle">Special</p>
        <h5 className="title">Bonus</h5>
      </div>
      <div className="countdown-container">
        <div className="tick-counter-container">
          <div ref={tickRef} className="tick">
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <div className="c">
            <p>,</p>
          </div>
          <div ref={tickRef1} className="tick">
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <div className="c"><p>,</p></div>
          <div ref={tickRef2} className="tick">
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
          <div className="c"><p>.</p></div>
          <div ref={decRef} className="tick">
            <div data-repeat="true" aria-hidden="true">
              <span data-view="flip"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialBonus;
