import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { FILTER_DATE } from '../../reducers/filter';

const TextWrapper = styled.span`
font-family: 'NanumSquare', sans-serif !important;
font-size: 16px;
`;

const NewCalendar = () => {
  const dispatch = useDispatch();
  const [to, setTo] = useState(null);

  const handleDayClick = (day, { selected, disabled }) => {
    if (disabled) {
      // Day is disabled, do nothing
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      setTo(undefined);
      return;
    }
    setTo(day);
    dispatch({
      type: FILTER_DATE,
      data: { from: undefined, to: day },
    });
  };

  return (
    <div className="text-center">
      {/* {to && <TextWrapper>{to.toLocaleDateString()}</TextWrapper>} */}
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={to}
        disabledDays={{ before: new Date() }}
      />
      <p><TextWrapper>마감 날짜를 선택해주세요</TextWrapper></p>
    </div>
  );
};

export default NewCalendar;
