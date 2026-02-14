import React, { useState, useEffect } from 'react';
import { MissionTimerContainer } from './Mission.styled';
import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next';

const MissionTimer = ({ period, children }) => {
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(null);
  const { t } = useTranslation()

  useEffect(() => {
    setCountdown(null);
    setLoading(true);
    const calculateTimeLeft = () => {
      let today = new Date();
      let endOfDay;
      if (period === "daily") {
        endOfDay = new Date(today);
        endOfDay.setHours(23, 59, 59, 999); // Set to end of today
      } else if (period === "weekly") {
        // Calculate end of the current week
        const endOfWeek = new Date(today);
        endOfWeek.setDate(today.getDate() + (7 - today.getDay())); // Get the last day of the current week
        endOfWeek.setHours(23, 59, 59, 999); // Set to end of the day
        endOfDay = endOfWeek;
      } else if (period === "monthly") {
        endOfDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999); // End of this month
      } 
      
      let difference;
      if (today < endOfDay) {
        difference = endOfDay - today;
      }

      let timeLeft = null;

      if (difference > 0) {
        timeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      setCountdown(timeLeft);
      setLoading(false)
    };
    
    const updateCountdown = () => {
      calculateTimeLeft();
    };

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [period]);

  return (
    <MissionTimerContainer>
        {loading ? 
          <Icon icon="eos-icons:bubble-loading" fontSize={"20px"} color='#ddd' />
        :
          (period && countdown) ?
            <span>{countdown?.days} {t("days")} {countdown?.hours} {t("hours")} {countdown?.minutes} {t("minutes")} {countdown?.seconds} {t("seconds")} {children} </span> 
          :
            <span>{t(period)}</span>
        }
    </MissionTimerContainer>
  );
};

export default MissionTimer;
