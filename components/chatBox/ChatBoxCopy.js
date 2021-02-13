import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Price, Title, TextWrapper } from './style';
import DetailCard from './DetailCard';

const ChatBox = ({ post }) => {
  const [flip, setFlip] = useState(false);
  const onClickDetail = () => {
    console.log('클릭되었습니다.');
    // e.preventDefualt();
    setFlip(!flip);
  };

  const calcDateDiff = (a, b) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((Date.parse(b) - Date.parse(a)) / oneDay);
  };

  const calcDate = (from, to, now) => {
    const isStart = Date.parse(from) < Date.parse(now);
    return isStart
      ? `D-${calcDateDiff(now, to)}`
      : `${calcDateDiff(now, from)}일 후`;
  };

  const calcProgressBar = (from, to, now) => {
    const isStart = Date.parse(from) < Date.parse(now);
    const dateDiff = isStart ? calcDateDiff(now, to) : 0;
    return dateDiff > 7 || dateDiff === 0 ? 0 : ((7 - dateDiff) * 100) / 7;
  };

  const num2currency = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

  return (
    <div
      className="flex border-none text-center shadow-md mx-auto my-3 rounded-xl bg-white justify-between"
      style={{ width: '20rem', height: '6rem' }}
    >
      <div
        className="overflow-hidden rounded-xl"
        style={{ width: '6rem' }}
      >
        {flip
          ? (
            <div className="m-2">
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
          )
          : (
            <img src={post.img} alt="" className=" w-auto h-full inline" />
          )}
      </div>
      <div
        className="px-3 py-2 flex flex-col text-left"
        style={{ width: '14rem' }}
      >
        <Title>{post.title}</Title>
        <div className="text-xs text-gray-400">
          <span>{post.location}</span>
          <TextWrapper> ⋅ </TextWrapper>
          <TextWrapper> {post.curPersonnel} / {post.personnel}</TextWrapper>
        </div>
        <div>
          <div className="inline-block">
            <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
            <TextWrapper> 원/인</TextWrapper>
          </div>
          <div className="mx-3 inline-block text-gray-400 cursor-pointer">
            <BsThreeDots onClick={onClickDetail} />
          </div>
        </div>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ChatBox;
