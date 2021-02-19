import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import Calender from '../components/Calendar';
import useInput from '../hooks/useInput';

import { addChatRequestAction } from '../reducers/post';

const initialData = {
  id: 1,
  User: {
    id: 'jaegoo',
    nickname: '재구몬',
    password: 'worn981012',
  },
  title: '',
  personnel: 0,
  curPersonnel: 1,
  from: undefined,
  to: undefined,
  price: 0,
  location: '',
  link: '',
  textArea: '',
  tag: '',
};

const createchatbox = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [title, onChangeTitle] = useInput(data.title);
  const [link, onChangeLink] = useInput(data.link);
  const [price, onChangePrice] = useInput(data.price);
  const [personnel, onChangePersonnel] = useInput(data.personnel);
  const [textArea, onChangeTextArea] = useInput(data.textArea);
  const [location, onChangeLocaton] = useInput(data.location);
  const [isDivide, setIsDivide] = useState(true);

  const plusPageCount = useCallback((e) => {
    e.preventDefault();
    if (page === 0) {
      setData({ ...data, title, link, price, personnel });
    }
    setPage(page + 1);
  }, [page, title, link, price, personnel]);

  const minusPageCount = useCallback((e) => {
    e.preventDefault();
    if (page === 2) {
      setData({ ...data, textArea, location });
    }
    setPage(page - 1);
    console.log(data);
  }, [page, title, link, price, personnel, textArea, location]);

  const onCreate = useCallback(() => {
    dispatch(addChatRequestAction({ ...data, textArea, location }));
  }, [textArea, location]);

  const renderPage = (key) => {
    switch (key) {
      case 0:
        return (
          <>
            <Form.Group controlId="chatBoxTitle" className="my-2">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요"
                className="rounded-full"
                onChange={onChangeTitle}
                defaultValue={data.title}
              />
            </Form.Group>
            <Form.Group controlId="personnel" className="my-2">
              <Form.Label>구매링크</Form.Label>
              <Form.Control
                type="text"
                placeholder="구매링크를 넣어주세요"
                className="rounded-full"
                onChange={onChangeLink}
                defaultValue={data.link}
              />
            </Form.Group>
            <div className="flex my-2">
              <Form.Group controlId="personnel" className="mr-1">
                <Form.Label>가격</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="제품 가격을 적어주세요"
                  className="rounded-full"
                  onChange={onChangePrice}
                  defaultValue={data.price}
                />
              </Form.Group>
              <Form.Group controlId="personnel" className="ml-1">
                <Form.Label>총원</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="총인원 수"
                  className="rounded-full"
                  onChange={onChangePersonnel}
                  defaultValue={data.personnel}
                />
              </Form.Group>
            </div>
            <Form className="my-3 flex justify-center">
              <Form.Check
                checked={isDivide}
                onChange={() => setIsDivide(!isDivide)}
                className="mx-2"
                label="분할 구매"
              />
              <Form.Check
                checked={!isDivide}
                onChange={() => setIsDivide(!isDivide)}
                className="mx-2"
                label="개인 구매"
              />
            </Form>
          </>
        );
      case 1:
        return <Calender data={data} setData={setData} />;
      case 2:
        return (
          <>
            <Form.Group className="my-4">
              <Form.Label>위치</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeLocaton}
                defaultValue={data.location}
              >
                <option>북측</option>
                <option>서측</option>
                <option>동측</option>
                <option>어은동</option>
                <option>궁동</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>정보</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="#짱맛있는귤 #ㅎㅎ #너도와ㅎㅎ엄청맛있어요!!"
                onChange={onChangeTextArea}
                defaultValue={data.textArea}
              />
            </Form.Group>
          </>
        );
      default:
        return <Calender />;
    }
  };

  return (
    <AppLayout className="h-full">
      <div className="bg-white w-96 rounded-xl shadow-md mx-auto mt-8 py-2 px-4 mb-5">
        <Form>
          <div className="w-full text-center text-2xl mt-8 mb-4">
            <span
              id="title"
              className="text-2xl align-middle pt-1"
              style={{
                color: '#f9c00c',
              }}
            >
              방
            </span>
            <span
              id="title"
              className="text-2xl align-middle pt-1"
              style={{
                color: '#00b9f1',
              }}
            >
              만
            </span>
            <span
              id="title"
              className="text-2xl align-middle pt-1"
              style={{
                color: '#ff7473',
              }}
            >
              들
            </span>
            <span
              id="title"
              className="mr-2 text-2xl align-middle pt-1"
              style={{
                color: '#a593e0',
              }}
            >
              기
            </span>
          </div>
          {renderPage(page)}
        </Form>
        <div className="flex justify-between my-4">
          {page === 0
            ? (
              <></>
            )
            : (
              <Button
                variant="secondary"
                onClick={minusPageCount}
                className="rounded-full w-full mx-1"
              >
                이전
              </Button>
            )}
          {page === 2
            ? (
              <Link href="/">
                <a className="rounded-full w-full mx-1">
                  <Button className="rounded-full w-full" onClick={onCreate}>
                    제출
                  </Button>
                </a>
              </Link>
            )
            : (
              <Button
                onClick={plusPageCount}
                className="rounded-full w-full mx-1"
              >
                다음
              </Button>
            )}
        </div>
      </div>
    </AppLayout>
  );
};

export default createchatbox;
