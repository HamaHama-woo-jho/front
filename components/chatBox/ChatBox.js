import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, ButtonGroup, Overlay, Tooltip } from 'react-bootstrap';
import { BsCalendar } from 'react-icons/bs';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoEarthSharp } from 'react-icons/io5';
import { Price, Title, TextWrapper } from './style';
import { IN_POST_REQUEST, OUT_POST_REQUEST } from '../../reducers/post';
import Hashtag from './hashtag';

const ChatBox = ({ post }) => {
  const target = useRef(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { inPostError } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const ifIn = me ? post.Participants.map((p) => p.id).includes(me.id) : false;
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

  const onDelete = useCallback((e) => {
    e.preventDefault();
    console.log('클릭');
    setShow(!show);
  }, [show]);

  useEffect(() => {
    console.log('실행중');
    if (inPostError) {
      alert(inPostError);
    }
  }, []);

  const joinButton = (join, finish) => {
    if (join && !finish) {
      return (
        <>
          {isOwner
            ? (
              <Button
                className="text-sm"
                variant="outline-secondary"
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
            <TextWrapper>{post.Participants.length} / {post.personnel}</TextWrapper>
          </div>
          <TextWrapper className="mt-1">
            <Hashtag postData={post.textArea} hashData={post.Hashtags} />
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
          <a href={post.link} target="_blank" rel="noopener noreferrer">
            <IoEarthSharp />
          </a>
          <BsCalendar className="cursor-pointer ml-2" />
        </div>
        <div>
          {me && (me.id === post.UserId
            ? (
              <>
                <AiOutlineDelete ref={target} onClick={onDelete} className="cursor-pointer" />
                <Overlay target={target.current} show={show} placement="top">
                  <Tooltip>
                    <ButtonGroup>
                      <Button>
                        삭제
                      </Button>
                      <Button>
                        삭제
                      </Button>
                    </ButtonGroup>
                  </Tooltip>
                </Overlay>
              </>
            )
            : (
              <RiAlarmWarningLine className="cursor-pointer" />
            )
          )}
        </div>
      </Card.Footer>
    </Card >
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
    Hashtags: PropTypes.arrayOf(PropTypes.object),
    isDivide: PropTypes.bool,
  }).isRequired,
};

export default ChatBox;
