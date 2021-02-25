import React, { useCallback, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Modal, Form, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { AiOutlineDelete, AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoEarthSharp } from 'react-icons/io5';
import { Price, Title, TextWrapper, Report } from './style';
import {
  IN_POST_REQUEST,
  OUT_POST_REQUEST,
  REMOVE_POST_REQUEST,
  REPORT_POST_REQUEST,
  REPORT_INFO_REQUEST,
} from '../../reducers/post';
import Hashtag from './hashtag';
import useInput from '../../hooks/useInput';

const ChatBox = ({ post }) => {
  const target = useRef(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { removePostDone, reportPostDone, reportInfoLoading } = useSelector((state) => state.post);
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

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [like, setLike] = useState(false);

  const onDelete = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);

  const postId = post.id;
  const [title, onChangeTitle] = useInput('');
  const [reason, onChangeReason] = useInput('');

  const onReport = useCallback(
    (e) => {
      e.preventDefault();
      dispatch({
        type: REPORT_POST_REQUEST,
        data: { postId, title, reason },
      });
    },
    [title, reason],
  );

  const onLikeToggle = (e) => {
    e.preventDefault();
    setLike(!like);
  };

  const report = () => {
    const contents = ['불쾌한 감정을 불러일으키는 게시물', '스팸성 게시물', '성적으로 부적절한 게시물', '사기 또는 오해의 소지', '약물 또는 범죄와 관련된 불법성 게시물', '기타 사유'];
    const titles = [0, 0, 0, 0, 0, 0];
    if (post.Reports) {
      // eslint-disable-next-line no-return-assign
      post.Reports.map((i) => titles[i.title] += 1);
    }
    return titles.map((t) => ((t === 0) ? <></> : <span>{contents[t]}: {t}회<br /></span>));
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3" className="bg-red-500 text-white">신고 현황</Popover.Title>
      <Popover.Content className="bg-red-50">
        {
          reportInfoLoading
            ? (<Spinner />)
            : (<>{report()}</>)
        }
      </Popover.Content>
    </Popover>
  );

  const Reportinfo = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: REPORT_INFO_REQUEST,
      data: post.id,
    });
  }, [post]);

  useEffect(() => {
    if (removePostDone) {
      setShow(false);
    }
    if (reportPostDone) {
      setShow(false);
    }
  }, [removePostDone, reportPostDone]);

  const onModify = () => {
    Router.push({
      pathname: '/modify/[pid]', // dynamic routing. 방 id를 어떻게 넘겨줄지 생각해야 함!
      query: { pid: post.id },
    });
  };

  const joinButton = (join, finish) => {
    if (join && !finish) {
      return (
        <>
          {isOwner ? (
            <Button className="text-sm" variant="outline-secondary" onClick={onModify}>
              수정하기
            </Button>
          ) : (
            <>
              <Button className="text-sm" variant="outline-secondary" disabled>
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
          <Button className="text-sm" variant="outline-danger" disabled>
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
        <Button className="text-sm" variant="outline-danger" disabled>
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
          <div className="flex">
            <Title>{post.title}</Title>
            {post.isReported ? (
              <>
                <OverlayTrigger trigger="click" placement="top" overlay={popover}>
                  <Report onClick={Reportinfo} className="ml-auto push cursor-pointer hover:text-gray-600">
                    신고당한 게시물
                  </Report>
                </OverlayTrigger>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="text-xs text-gray-400">
            <span>{post.location}</span>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper>
              {post.Participants.length} / {post.personnel}
            </TextWrapper>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper>
              {post.to.split('-')[1][0] === '0' ? post.to.split('-')[1][1] : post.to.split('-')[1]}월 {post.to.split('-')[2]}일까지
            </TextWrapper>
          </div>
          <TextWrapper className="mt-1">
            <Hashtag postData={post.textArea} hashData={post.Hashtags} />
          </TextWrapper>
          <div className="my-1">
            <TextWrapper>인당 </TextWrapper>
            {post.isDivide ? (
              <Price>
                {num2currency(Math.round(post.price / post.personnel))}
              </Price>
            ) : (
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
            <IoEarthSharp className="mr-1" />
          </a>
          <div className="flex">
            {like
              ? (<AiFillHeart className="cursor-pointer text-red-500 text-lg" onClick={onLikeToggle} />)
              : (<AiOutlineHeart className="cursor-pointer text-red-500 text-lg" onClick={onLikeToggle} />)}
            <TextWrapper className="ml-1 text-gray-400">
              0
            </TextWrapper>
          </div>
        </div>
        <div>
          {me
            && (me.id === post.UserId ? (
              <>
                <AiOutlineDelete
                  ref={target}
                  onClick={handleShow}
                  className="cursor-pointer"
                />
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton className="bg-gray-100">
                    게시물 삭제
                  </Modal.Header>
                  <Modal.Body>
                    현재 공구 게시물을 삭제하시겠습니까?
                    <br /> 삭제한 뒤에는 복구가 불가합니다.
                  </Modal.Body>
                  <Modal.Footer className="border-none pt-0">
                    <Button variant="secondary" onClick={handleClose}>
                      취소
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                      삭제
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ) : (
              <>
                <RiAlarmWarningLine
                  onClick={handleShow}
                  className="cursor-pointer"
                />
                <Modal show={show} onHide={handleClose} centered>
                  <Modal.Header closeButton className="bg-gray-100">
                    게시물 신고
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group className="my-4">
                      <Form.Label>신고항목</Form.Label>
                      <Form.Control
                        as="select"
                        required
                        onChange={onChangeTitle}
                      >
                        <option hidden value>신고항목을 선택해 주세요.</option>
                        <option value="1">
                          불쾌한 감정을 불러일으키는 게시물임
                        </option>
                        <option value="2">스팸성 게시물임</option>
                        <option value="3">성적으로 부적절한 게시물임</option>
                        <option value="4">
                          사기 또는 오해의 소지가 있음
                        </option>
                        <option value="5">
                          약물 또는 범죄와 관련된 불법성 게시물임
                        </option>
                        <option value="6">기타</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="my-4">
                      <Form.Label>상세 내용</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="신고 사유를 자세히 적어주세요"
                        onChange={onChangeReason}
                      />
                    </Form.Group>
                  </Modal.Body>
                  <Modal.Footer className="border-none pt-0">
                    <Button variant="secondary" onClick={handleClose}>
                      취소
                    </Button>
                    <Button variant="danger" onClick={onReport}>
                      신고
                    </Button>
                  </Modal.Footer>
                </Modal>
              </>
            ))}
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
    Hashtags: PropTypes.arrayOf(PropTypes.object),
    isDivide: PropTypes.bool,
    isReported: PropTypes.bool,
    Reports: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default ChatBox;
