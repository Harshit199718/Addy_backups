import React, { useEffect, useRef, useState } from 'react'
import "@pqina/flip/dist/flip.min.css";
import { CountdownContainer2, JackpotTickerContainer2, LeftContainer2, Separator2, Subtitle2, TickCounterContainer2, TickView2, Title2 } from './Jackpot2.styled';
import { useTranslation } from 'react-i18next';
import LayoutSpacing from '../Layout/LayoutSpacing';
import { useSelector } from 'react-redux';
import { selectConfigData } from '../../api/generalApi';

function Jackpot2() {
  const {jackpot_number, jackpot_number_min_increment, jackpot_number_max_increment, currency_symbol} = useSelector(selectConfigData);
  const { t } = useTranslation();
  const [number, setNumber] = useState(jackpot_number);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const increment = (Math.random() * (jackpot_number_max_increment - jackpot_number_min_increment)) + jackpot_number_min_increment;
      setNumber((prevNumber) => prevNumber + increment)
    }, 1000); // Increment every 1000ms (1 second)

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [jackpot_number_min_increment, jackpot_number_max_increment]);

  const formattedNumber = number && number.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
    return (
      <LayoutSpacing>
        <JackpotTickerContainer2>
          <LeftContainer2>
            <Subtitle2>{t("Jackpot")}</Subtitle2>
            <Title2>{t("Progressive")}</Title2>
          </LeftContainer2>
          <CountdownContainer2>
            <TickCounterContainer2>
              {currency_symbol} {formattedNumber}
            </TickCounterContainer2>
          </CountdownContainer2>
        </JackpotTickerContainer2>
      </LayoutSpacing>
  )
}

export default Jackpot2