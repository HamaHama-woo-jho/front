import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';
import { IoEarthSharp } from 'react-icons/io5';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Price, Title, TextWrapper } from './style';

const ChatBox = ({ post }) => {
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
    <Card style={{ width: '16rem' }}>
      <Card.Img variant="top" src={post.img} className="border" />
      <Card.Body>
        <Card.Text>
          <Title>{post.title}</Title>
          <div className="text-xs text-gray-400">
            <span>{post.location}</span>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper> {post.curPersonnel} / {post.personnel}</TextWrapper>
          </div>
          <div className="mt-1">
            {post.textArea}
          </div>
          <div className="my-1">
            <TextWrapper>인당 </TextWrapper>
            <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
            <TextWrapper> 원</TextWrapper>
          </div>
        </Card.Text>
        <Button
          className="text-sm"
          variant="primary"
        >
          구매 신청하기
        </Button>
      </Card.Body>
      <Card.Footer className="flex">
        <div>
          <div className="bg-green-400 w-1" />
          <a href={post.link}>
            <IoEarthSharp />
          </a>
        </div>
        <div>
          <BsThreeDots />
        </div>
      </Card.Footer>
    </Card>
  );
};

ChatBox.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ChatBox;
