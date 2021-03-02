import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const TextWrapper = styled.span`
font-family: 'NanumSquare', sans-serif !important;
font-size: 16px;
`;

const NewCalendar = ({ data, setData }) => {
  const [to, setTo] = useState(data.to);

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
    setData({ ...data, to: day });
    setTo(day);
  };

  return (
    <div className="text-center">
      {/* {to && <TextWrapper>{to.toLocaleDateString()}</TextWrapper>} */}
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={to}
        disabledDays={{ before: new Date() }}
      />
      {to && <p><TextWrapper>마감 날짜를 선택해주세요</TextWrapper></p>}
    </div>
  );
};

NewCalendar.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};

export default NewCalendar;
