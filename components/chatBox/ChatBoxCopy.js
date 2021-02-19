import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { BsThreeDots, BsCalendar } from 'react-icons/bs';
import { IoEarthSharp } from 'react-icons/io5';
import { Price, Title, TextWrapper } from './style';
import { IN_POST_REQUEST } from '../../reducers/post';

const ChatBox = ({ post }) => {
  const calcDateDiff = (a, b) => {
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.round((Date.parse(b) - Date.parse(a)) / oneDay);
  };

  const dispatch = useDispatch();
  const [inPost, setInPost] = useState(false);
  const { inPostDone, inPostError } = useSelector((state) => state.post);

  const onClickChat = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: IN_POST_REQUEST,
      data: post.id,
    });
  }, []);

  useEffect(() => {
    if (inPostDone) {
      setInPost(true);
    }
    if (inPostError) {
      alert(inPostError);
    }
  }, [inPostDone, inPostError]);

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
            {post.isDivide
              ? (
                <TextWrapper>{post.curPersonnel} / {post.personnel}</TextWrapper>
              )
              : (
                <TextWrapper>{post.curPersonnel}</TextWrapper>
              )}
          </div>
          <TextWrapper className="mt-1">
            {post.textArea}
          </TextWrapper>
          <div className="my-1">
            <TextWrapper>인당 </TextWrapper>
            <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
            <TextWrapper> 원</TextWrapper>
          </div>
        </Card.Text>
        {
          inPost
            ? (
              <>
                <Button
                  className="text-sm"
                  variant="outline-secondary"
                  disabled
                >구매 신청하기
                </Button>
                <Button
                  className="text-sm ml-3"
                  variant="outline-danger"
                >신청 취소
                </Button>
              </>
            )
            : (
              <Button
                className="text-sm"
                variant="outline-info"
                onClick={onClickChat}
              >구매 신청하기
              </Button>
            )
        }

      </Card.Body>
      <Card.Footer className="flex justify-between">
        <div className="flex">
          <a href={post.link}>
            <IoEarthSharp />
          </a>
          <BsCalendar className="cursor-pointer ml-2" />
        </div>
        <div>
          <BsThreeDots />
        </div>
      </Card.Footer>
    </Card>
  );
};

ChatBox.propTypes = {
  //post: PropTypes.object.isRequired,
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
  }).isRequired,
};

export default ChatBox;
