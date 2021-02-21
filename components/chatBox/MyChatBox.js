import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { BsThreeDots, BsCalendar } from 'react-icons/bs';
import { IoEarthSharp } from 'react-icons/io5';
import { Price, Title, TextWrapper } from './style';
import { IN_POST_REQUEST } from '../../reducers/post';

const MyChatBox = ({ post }) => {
  const calcDateDiff = (a, b) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((Date.parse(b) - Date.parse(a)) / oneDay);
  };

  const calcDate = (from, to) => {
    const now = new Date();
    const isStart = Date.parse(from) < Date.parse(now);
    return isStart
      ? `D-${calcDateDiff(now, to)}`
      : `${calcDateDiff(now, from)}일 후`;
  };

  const calcProgressBar = (from, to) => {
    const now = new Date();
    const isStart = Date.parse(from) < Date.parse(now);
    const dateDiff = isStart ? calcDateDiff(now, to) : 0;
    return dateDiff > 7 || dateDiff === 0 ? 0 : ((7 - dateDiff) * 100) / 7;
  };

  const num2currency = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

  return (
    <div className="rounded flex border h-24 my-2 py-2 px-2">
      <div className="w-24 rounded">
        <img src={post.img} alt="" className="w-24" />
      </div>
      <div className="pl  -2 flex w-full justify-between">
        <div>
          <Title>
            {post.title}
          </Title>
          <div className="text-xs text-gray-400 flex">
            <span>{post.location}</span>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper>{post.curPersonnel} / {post.personnel}</TextWrapper>
          </div>
          <div>
            <TextWrapper>인당 </TextWrapper>
            {post.isDivide
              ? (
                <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
              )
              : (
                <Price>{num2currency(Math.round(post.price))}</Price>
              )}
            <TextWrapper> 원</TextWrapper>
          </div>
        </div>
        <div className="w-16 my-auto">
          <CircularProgressbar
            value={calcProgressBar(post.from, post.to, new Date())}
            text={calcDate(post.from, post.to, new Date())}
            styles={buildStyles({
              textSize: '20px',
              pathTransitionDuration: 0.5,
              pathColor: '#0080ff',
              textColor: '#0080ff',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
      </div>
    </div>
  );
};

MyChatBox.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    title: PropTypes.string,
    personnel: PropTypes.number,
    curPersonnel: PropTypes.number,
    from: PropTypes.object,
    to: PropTypes.object,
    location: PropTypes.string,
    price: PropTypes.number,
    link: PropTypes.string,
    img: PropTypes.string,
    textArea: PropTypes.string,
    createdAt: PropTypes.string,
    Participants: PropTypes.arrayOf(PropTypes.object),
    isDivide: PropTypes.bool,
  }).isRequired,
};

export default MyChatBox;
