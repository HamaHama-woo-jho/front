import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from '@material-ui/core/Slider';
import { Form } from 'react-bootstrap';
import { FILTER_PRICE } from '../../reducers/filter';

const valuetext = (value) => value;

const num2currency = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

const RangeSlider = () => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector((state) => state.post);
  const max = Math.max(...(mainPosts.map((post) => (post.isDivide ? post.price / post.personnel : post.price))));
  const [value, setValue] = React.useState([0, max]);

  const handleChange = (e, newValue) => {
    e.preventDefault();
    console.log(newValue);
    setValue(newValue);
    dispatch({
      type: FILTER_PRICE,
      data: newValue,
    });
  };

  return (
    <div className="mt-2">
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="off"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        max={max}
      />
      <div className="flex justify-between mb-3">
        <Form.Control
          className="rounded-full border-none text-sm w-1/3 px-2 text-center"
          value={`${num2currency(value[0] > value[1] ? value[1] : value[0])}원`}
        />
        <Form.Control
          className="rounded-full border-none text-sm w-1/3 mx-2 text-center"
          value={`${num2currency(value[0] < value[1] ? value[1] : value[0])}원`}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
