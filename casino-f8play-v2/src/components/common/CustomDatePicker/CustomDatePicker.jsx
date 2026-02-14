import React, { useEffect, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function CustomDatePicker(props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker {...props} />
    </LocalizationProvider>
    
  )
}

export default CustomDatePicker