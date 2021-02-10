import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import 'react-day-picker/lib/style.css';
import { RedoOutlined } from '@ant-design/icons';

const Calender = ({ data, setData }) => {
  const [from, setFrom] = useState(data.from);
  const [to, setTo] = useState(data.to);

  const handleResetClick = useCallback(
    (e) => {
      e.preventDefault();
      setFrom(undefined);
      setTo(undefined);
      setData({ ...data, from: undefined, to: undefined });
    },
    [from, to]
  );

  const handleDayClick = useCallback(
    (day) => {
      const range = DateUtils.addDayToRange(day, { from, to });
      setFrom(range.from);
      setTo(range.to);
      setData({ ...data, from: range.from, to: range.to });
    },
    [from, to]
  );

  return (
    <div className="text-center">
      <div className="mx-4 mb-2">
        {!from && !to && '날짜를 선택하세요'}
        {from && !to && '마지막 날짜를 선택하세요'}
        {from && to && '날짜를 확인하세요'}
        {from && to && (
          <RedoOutlined
            className="inline-block align-middle px-2 pb-1"
            onClick={handleResetClick}
          />
        )}
      </div>
      <DayPicker
        className="Selectable bg-white"
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={{ start: from, end: to }}
        onDayClick={handleDayClick}
        disabledDays={{ before: new Date() }}
      />
      <div className="mx-10 my-2">
        <div className="flex justify-between">
          {from && from.toLocaleDateString() && (
            <div className="rounded-full shadow-md py-2 px-3">
              {from.toLocaleDateString()}
            </div>
          )}
          {to && to.toLocaleDateString() && <div className="pt-2">~</div>}
          {to && to.toLocaleDateString() && (
            <div className="rounded-full shadow-md py-2 px-3">
              {to.toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
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

Calender.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default Calender;
