import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Button, Modal } from 'react-bootstrap';

const DetailCard = ({ post }) => {
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

  return (
    <div className="flex h-60">
      <div className="w-48 h-full">
        <img src={post.img} alt="" />
      </div>
      <div className="rounded mx-2">
        <div>{post.title}</div>
        <p>
          {post.textArea}
        </p>
        <div className="w-16">
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
        <Button>참가하기</Button>
      </div>
    </div>
  );
};

DetailCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default DetailCard;
