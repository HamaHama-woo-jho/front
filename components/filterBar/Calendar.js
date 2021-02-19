import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import 'react-day-picker/lib/style.css';
import { FILTER_DATE } from '../../reducers/filter';

const Calender = () => {
  const dispatch = useDispatch();
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);

  const handleDayClick = useCallback(
    (day) => {
      const range = DateUtils.addDayToRange(day, { from, to });
      setFrom(range.from);
      setTo(range.to);
      dispatch({
        type: FILTER_DATE,
        data: range,
      });
    },
    [from, to],
  );

  return (
    <div className="text-center">
      <DayPicker
        className="Selectable bg-white"
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={{ start: from, end: to }}
        onDayClick={handleDayClick}
      />
      <Helmet>
        <style>
          {`
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
              background-color: #f0f8ff !important;
              color: #4a90e2;
            }
            .Selectable .DayPicker-Day {
              border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
              border-top-left-radius: 50% !important;
              border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
              border-top-right-radius: 50% !important;
              border-bottom-right-radius: 50% !important;
            }
          `}
        </style>
      </Helmet>
    </div>
  );
};

export default Calender;
