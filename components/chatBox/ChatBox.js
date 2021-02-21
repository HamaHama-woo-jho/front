import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button } from 'react-bootstrap';
import { BsThreeDots, BsCalendar } from 'react-icons/bs';
import { IoEarthSharp } from 'react-icons/io5';
import { Price, Title, TextWrapper } from './style';
import { IN_POST_REQUEST, OUT_POST_REQUEST } from '../../reducers/post';
import Hashtag from '../chatBox/hashtag';

const ChatBox = ({ post }) => {
  const dispatch = useDispatch();
  const { inPostDone, inPostError, outPostDone } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const ifIn = me ? post.Participants.map((p) => p.id).includes(me.id) : false;
  const [inPost, setInPost] = useState(ifIn);
  const isFinish = post.Participants.length === post.personnel;
  const isOwner = me ? post.UserId === me.id : false;

  const onClickChat = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: IN_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const onOutChat = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: OUT_POST_REQUEST,
      data: post.id,
    });
  }, []);

  useEffect(() => {
    if (inPostDone) {
      setInPost(true);
    }
    if (outPostDone) {
      setInPost(false);
    }
    if (inPostError) {
      alert(inPostError);
    }
  }, [inPostDone, inPostError, outPostDone]);

  const joinButton = (join, finish) => {
    if (join && !finish) {
      return (
        <>
          {isOwner
            ? (
              <Button
                className="text-sm"
                variant="outline-secondary"
                disabled
              >
                수정하기
              </Button>
            )
            : (
              <>
                <Button
                  className="text-sm"
                  variant="outline-secondary"
                  disabled
                >
                  구매 신청하기
                </Button>
                <Button
                  className="text-sm ml-3"
                  variant="outline-danger"
                  onClick={onOutChat}
                >
                  신청 취소
                </Button>
              </>
            )}
        </>
      );
    } else if (join && finish) {
      return (
        <>
          <Button
            className="text-sm"
            variant="outline-danger"
            disabled
          >
            마감
          </Button>
          <Button
            className="text-sm ml-3"
            variant="success"
          // onClick={onOutChat}
          >
            입장하기
          </Button>
        </>
      );
    } else if (!join && !finish) {
      return (
        <Button
          className="text-sm"
          variant="outline-info"
          onClick={onClickChat}
        >
          구매 신청하기
        </Button>
      );
    } else {
      return (
        <Button
          className="text-sm"
          variant="outline-danger"
          disabled
        >
          마감
        </Button>
      );
    }
  }

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
            <TextWrapper>{post.Participants.length} / {post.personnel}</TextWrapper>
          </div>
          <TextWrapper className="mt-1">
            <Hashtag postData={post.textArea} />
          </TextWrapper>
          <div className="my-1">
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
        </Card.Text>
        {joinButton(ifIn, isFinish)}
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
  post: PropTypes.shape({
    id: PropTypes.number,
    UserId: PropTypes.number,
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

export default ChatBox;
