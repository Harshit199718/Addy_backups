import { useState } from 'react';
import { Button, DatePicker } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isoWeek from 'dayjs/plugin/isoWeek'
import timezone from 'dayjs/plugin/timezone';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import { formattedDate, getTodayDate } from '../components/convertDate';
import { useTranslation } from 'react-i18next';

dayjs.extend(isoWeek)
dayjs.extend(utc);
dayjs.extend(timezone)
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

const timeZone = import.meta.env.VITE_TIME_ZONE;
const { RangePicker } = DatePicker;

const FormToDatePicker = ({ isLoading, onChangeFromDate, onChangeToDate, fromDate, toDate }) => {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(() => 
    [dayjs(fromDate).tz(timeZone), dayjs(toDate).tz(timeZone)]
    );

    const handleDateChange = (dates) => {
        if (dates && dates.length === 2) {
            const startDate = dayjs(dates[0]).tz(timeZone).startOf('day');
            const endDate = dayjs(dates[1]).tz(timeZone).endOf('day');
            setSelectedDate([startDate, endDate]);
            const fromDate = formattedDate(startDate);
            const toDate = formattedDate(endDate);
            onChangeFromDate(fromDate)
            onChangeToDate(toDate)
        } else {
            setSelectedDate([]);
            onChangeFromDate(null);
            onChangeToDate(null)
        }
    };

    const handlePresetClick = (preset) => {
        let startDate, endDate;

        switch (preset) {
            case 'today':
                startDate = dayjs().tz(timeZone).startOf('day');
                endDate = dayjs().tz(timeZone).endOf('day');
                break;
            case 'yesterday':
                startDate = dayjs().tz(timeZone).subtract(1, 'day').startOf('day');
                endDate = dayjs().tz(timeZone).subtract(1, 'day').endOf('day');
                break;
            case 'thisWeek':
                startDate = dayjs().tz(timeZone).startOf('isoWeek');
                endDate = dayjs().tz(timeZone).endOf('isoWeek');
                break;
            case 'lastWeek':
                startDate = dayjs().tz(timeZone).subtract(1, 'week').startOf('isoWeek');
                endDate = dayjs().tz(timeZone).subtract(1, 'week').endOf('isoWeek');
                break;
            case 'thisMonth':
                startDate = dayjs().tz(timeZone).startOf('month');
                endDate = dayjs().tz(timeZone).endOf('month');
                break;
            case 'lastMonth':
                startDate = dayjs().tz(timeZone).subtract(1, 'month').startOf('month');
                endDate = dayjs().tz(timeZone).subtract(1, 'month').endOf('month');
                break;
            default:
                break;
        }
        setSelectedDate([startDate, endDate]);
        const fromDate = formattedDate(startDate);
        const toDate = formattedDate(endDate);

        onChangeFromDate(fromDate)
        onChangeToDate(toDate)
    
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            <RangePicker
                value={selectedDate}
                disabled={isLoading}
                onChange={handleDateChange}
                allowClear={false}
            />
            <div style={{ textAlign: 'center' }}>
                <Button type="secondary" onClick={() => handlePresetClick('today')}>{t('fromtodatepicker.Today')}</Button>
                <Button type="secondary" onClick={() => handlePresetClick('yesterday')}>{t('fromtodatepicker.Yesterday')}</Button>
                <Button type="secondary" onClick={() => handlePresetClick('thisWeek')}>{t('fromtodatepicker.This Week')}</Button>
                <Button type="secondary" onClick={() => handlePresetClick('lastWeek')}>{t('fromtodatepicker.Last Week')}</Button>
                <Button type="secondary" onClick={() => handlePresetClick('thisMonth')}>{t('fromtodatepicker.This Month')}</Button>
                <Button type="secondary" onClick={() => handlePresetClick('lastMonth')}>{t('fromtodatepicker.Last Month')}</Button>
            </div>
        </div>
    );
};

export default FormToDatePicker;
