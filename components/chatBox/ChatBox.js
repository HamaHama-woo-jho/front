import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
  InfoCircleOutlined,
  PlayCircleOutlined,
  PlayCircleTwoTone,
} from '@ant-design/icons';
import { Price, Title, TextWrapper, HashTag } from './style';

const ChatBox = ({ post }) => {
  const [isIn, setIsIn] = useState('false');
  const onClickJoin = useCallback(() => {
    setIsIn(!isIn);
  }, [isIn]);

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
    <Card className="border-none text-center shadow-md mx-auto my-3 w-72">
      <Card.Body className="pb-1">
        <img src="https://thumbnail8.coupangcdn.com/thumbnails/remote/492x492ex/image/retail/images/511854261736331-ad4bc2d1-c0de-47c0-bef2-0492c8873ea0.jpg" alt="" />
        <Title>{post.title}</Title>
        <div className="w-1/3 pb-1 m-auto">
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
        <div>
          <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
          <TextWrapper> /인</TextWrapper>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="flex flex-col text-sm my-1 text-gray-500">
          {/* {post.tag.map((item) => (
            <div className="mb-1" key="info">
              <HashTag className="px-1 text-gray-500">{`#${item.content}`}</HashTag>
            </div>
          ))} */}
          <HashTag>{post.textArea}</HashTag>
        </div>
      </Card.Footer>
      <Card.Footer className="flex p-0 h-9 bg-white">
        <div className="w-1/3 inline-block align-middle text-gray-400">
          <a href={post.link} target="__blank" rel="noreferrer noopener">
            <InfoCircleOutlined />
          </a>
        </div>
        <div
          className="w-1/3"
          style={{ borderRightWidth: '1px', borderLeftWidth: '1px' }}
        >
          <span className="inline-block align-middle text-gray-400 text-sm">
            {post.curPersonnel} / {post.personnel}
          </span>
        </div>
        <div className="w-1/3 inline-block align-middle">
          {isIn ? (
            <PlayCircleOutlined
              className="text-gray-400"
              onClick={onClickJoin}
            />
          ) : (
              <PlayCircleTwoTone twoToneColor="#0080ff" onClick={onClickJoin} />
            )}
        </div>
      </Card.Footer>
    </Card>
  );
};

ChatBox.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ChatBox;
