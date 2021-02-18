import React from 'react';
import { useSelector } from 'react-redux';
import Slider from '@material-ui/core/Slider';

const valuetext = (value) => value;

const RangeSlider = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const max = Math.max(...(mainPosts.map((post) => post.price / post.personnel)));
  const [value, setValue] = React.useState([0, max]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mt-4">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={max}
      />
    </div>
  );
};

export default RangeSlider;
