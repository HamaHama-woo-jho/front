import React, { useState } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import Helmet from 'react-helmet';
import 'react-day-picker/lib/style.css';
import { Button } from 'react-bootstrap';

const Calender = () => {
  const [from, setFrom] = useState(undefined);
  const [to, setTo] = useState(undefined);

  const handleResetClick = () => {
    setFrom(undefined);
    setTo(undefined);
  };

  const handleDayClick = (day) => {
    const range = DateUtils.addDayToRange(day, { from, to });
    setFrom(range.from);
    setTo(range.to);
  };

  return (
    <div className="text-center">
      <p className="mx-4 mb-2">
        {!from && !to && '날짜를 선택하세요'}
        {from && !to && '마지막 날짜를 선택하세요'}
        {from && to && '날짜를 확인하세요'}
      </p>
      <DayPicker
        className="Selectable bg-white shadow-md rounded-xl m-auto"
        numberOfMonths={1}
        selectedDays={[from, { from, to }]}
        modifiers={{ start: from, end: to }}
        onDayClick={handleDayClick}
        disabledDays={{ before: new Date() }}
      />
      <div className="mx-8 my-5 bg-white shadow-md rounded-xl">
        <div className="flex flex-col">
          {from
            && from.toLocaleDateString()
            && (
              <span>
                {from.toLocaleDateString()}
              </span>
            )}
          {to
            && to.toLocaleDateString()
            && (
              <span>
                {to.toLocaleDateString()}
              </span>
            )}
          {from && to && (
            <Button
              className="link h-8 text-sm"
              onClick={handleResetClick}
            >
              초기화
            </Button>
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

export default Calender;
