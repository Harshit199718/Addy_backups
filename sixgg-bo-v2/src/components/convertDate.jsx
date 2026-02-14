import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { useEffect, useState } from 'react';
import { Row } from 'antd';
dayjs.extend(utc);
dayjs.extend(timezone)
const timeZone = import.meta.env.VITE_TIME_ZONE;

export const getTodayDate = () => {
    const startDate = dayjs().tz(timeZone).startOf('day');
    const endDate = dayjs().tz(timeZone).endOf('day');
    return { startDate, endDate };
}

export const getCurrentTime = () => {
    const currentDateTime = dayjs().tz(timeZone);
    return currentDateTime;
}

export const formattedDate = (date) => {
    if (!date || !dayjs(date).isValid()) {
      return null;
    }
    try {
      return dayjs(date).tz(timeZone).format('YYYY-MM-DD');
    } catch (error) {
      return null;
    }
};

export const formattedTime = (date) => {
  if (!date || !dayjs(date).isValid()) {
    return null;
  }
  try {
    return dayjs(date).tz(timeZone).format('HH:mm:ss');
  } catch (error) {
    return null;
  }
};

export const formattedDateTime = (date) => {;
    if (!date || !dayjs(date).isValid()) {
      return null;
    }
    try {
      return dayjs(date).tz(timeZone).format('YYYY-MM-DD HH:mm:ss');
    } catch (error) {
      return null;
    }
};

export const dayjsDateTime = (date) => {
  if (!date || !dayjs(date).isValid()) {
    return null;
  }
  try {
    return dayjs(date).tz(timeZone);
  } catch (error) {
    return null;
  }
}

export const dayjsTime = (time) => {
  try {
    const currentDateWithoutTime = dayjs().tz(timeZone).startOf('day');
    const [hours, minutes, seconds] = time.split(':');
    const dateTimeWithTime = currentDateWithoutTime.add(hours, 'hour').add(minutes, 'minute').add(seconds, 'second');

    return dateTimeWithTime;
  } catch (error) {
    return null;
  }
}

export const isItemExpired = (updatedAt) => {
  const currentDate = dayjs().tz(timeZone);
  const updatedAtDate = dayjs(updatedAt).tz(timeZone);
  const timeDifference = currentDate - updatedAtDate;
  const threeDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000; 
  return timeDifference > threeDaysInMilliseconds;
}

export const InternationalClock = () => {
  const [siteTime, setSiteTime] = useState(dayjs().tz(timeZone));
  // const [localTime, setLocalTime] = useState(dayjs());

  useEffect(() => {
    const interval = setInterval(() => {
      setSiteTime(dayjs().tz(timeZone));
      // setLocalTime(dayjs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{ color: "white" }}>{timeZone.match(/\/([^/]+)$/)[1]}: {siteTime.format('HH:mm')} {siteTime.format('MMM DD')}</span>
  );
}