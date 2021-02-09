import React, { useState, useCallback } from 'react';
import { Form, Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import Calender from '../components/Calendar';
import useInput from '../hooks/useInput';

const initialData = {
  title: '',
  link: '',
  cost: 0,
  personnel: 0,
  costPerPerson: 0,
  location: '',
  tag: '',
  from: undefined,
  to: undefined,
};

const createchatbox = () => {
  const [data, setData] = useState(initialData);
  const [page, setPage] = useState(0);
  const [title, onChangeTitle] = useInput(data.title);
  const [link, onChangeLink] = useInput(data.link);
  const [cost, onChangeCost] = useInput(data.cost);
  const [personnel, onChangePersonnel] = useInput(data.personnel);
  const [tag, onChangeTag] = useInput(data.tag);
  const [location, onChangeLocaton] = useInput(data.location);

  const plusPageCount = useCallback(
    (e) => {
      e.preventDefault();
      if (page === 0) {
        setData({ ...data, title, link, cost, personnel });
        setPage(page + 1);
      } else if (page === 1) {
        setPage(page + 1);
      } else {
        setData({ ...data, tag, location });
      }
      console.log(data);
    },
    [page, title, link, cost, personnel, tag, location]
  );

  const minusPageCount = useCallback(
    (e) => {
      e.preventDefault();
      if (page === 2) {
        setData({ ...data, tag, location });
      }
      setPage(page - 1);
      console.log(data);
    },
    [tag, location]
  );

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
                  onChange={onChangeCost}
                  defaultValue={data.cost}
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
            <Form.Group controlId="personnel">
              <Form.Label>개인 비용</Form.Label>
              <Form.Control
                type="text"
                placeholder="1인당 가격"
                className="rounded-full"
              />
            </Form.Group>
          </>
        );
      case 1:
        return <Calender data={data} setData={setData} />;
      case 2:
        return (
          <>
            <Form.Group className="my-4">
              <Form.Label>위치</Form.Label>
              <Form.Control as="select" />
            </Form.Group>
            <Form.Group className="my-4">
              <Form.Label>정보</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="#짱맛있는귤 #ㅎㅎ #너도와ㅎㅎ엄청맛있어요!!"
                onChange={onChangeTag}
                defaultValue={data.tag}
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
      <div className="bg-white w-96 rounded-xl shadow-md mx-auto mt-8 px-4">
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
          {page === 0 ? (
            <></>
          ) : (
            <Button
              variant="secondary"
              onClick={minusPageCount}
              className="rounded-full w-full mx-1"
            >
              이전
            </Button>
          )}
          <Button onClick={plusPageCount} className="rounded-full w-full mx-1">
            {page === 2 ? '제출' : '다음'}
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default createchatbox;
