import React from 'react';
import { formattedDate } from '../components/convertDate';

const DateListingField = ({ date }) => {
  if (date) {
    return <span>{formattedDate(date)}</span>;
  } else {
    return <span>-</span>;
  }
};

export default DateListingField;
