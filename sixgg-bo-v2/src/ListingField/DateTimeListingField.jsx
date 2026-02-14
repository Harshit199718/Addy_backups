import React from 'react';
import { formattedDateTime } from '../components/convertDate';

const DateTimeListingField = ({ dateTime }) => {
  // Convert the provided date string to a Date object
  if(dateTime){
    return <span>{formattedDateTime(dateTime)}</span>;
  } else {
    return <span>-</span>
  }

};

export default DateTimeListingField;
