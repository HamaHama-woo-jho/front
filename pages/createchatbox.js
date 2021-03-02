import React, { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
// import Calender from '../components/Ca/lendar';
import NewCalender from '../components/NewCalendar';
import useInput from '../hooks/useInput';

import { addChatRequestAction } from '../reducers/post';
import { InfoWrapper } from '../components/chatBox/style';

const initialData = {
  id: 1,
  title: '',
  personnel: 0,
  curPersonnel: 1,
  from: new Date(),
  to: new Date(),
  price: 0,
  location: '북측',
  link: '',
  textArea: '',
  tag: '',
  isDivide: true,
  isReported: false,
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

  const plusPageCount = (e) => {
    e.preventDefault();
    if (page === 0) {
      setData({ ...data, title, link, price, personnel, isDivide });
    }
    setPage(page + 1);
  };

  const minusPageCount = (e) => {
    e.preventDefault();
    if (page === 2) {
      setData({ ...data, textArea, location });
    }
    setPage(page - 1);
    console.log(data);
  };

  const onCreate = () => {
    dispatch(addChatRequestAction({ ...data, textArea, location }));
  };

  const renderPage = (key) => {
    switch (key) {
      case 0:
        return (
          <>
            <Form.Group controlId="chatBoxTitle" className="my-2">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요 (20자 이내)"
                className="rounded-full"
                onChange={onChangeTitle}
                defaultValue={data.title}
                maxLength="20"
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
            <Form className="mt-3 mb-2 flex justify-center">
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
            <InfoWrapper className="text-base text-gray-500 justify-center">
              * 분할구매는 한 품목을 여러 명이 나눠 가지는 경우, 개인구매는 한 상품을 각자 구매하는 경우에 선택해 주세요! :)
              <br />☞ 귤 한 박스를 5인이 나눠 갖는 경우: 분할 구매
              <br />☞ 한 종류의 반찬을 3인이 각각 구매하는 경우: 개인 구매
            </InfoWrapper>
          </>
        );
      case 1:
        return <NewCalender data={data} setData={setData} />;
      case 2:
        return (
          <>
            <Form.Group className="my-4">
              <Form.Label>위치</Form.Label>
              <Form.Control
                as="select"
                onChange={onChangeLocaton}
              >
                <option hidden value>지역을 선택해 주세요.</option>
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
                placeholder="상세 정보를 작성해 주세요. (200자 이내)   예시: 귤 5kg 대량구매. 같이 사서 나눠 드실 분 구해요! #귤 #겨울 #자취생"
                onChange={onChangeTextArea}
                defaultValue={data.textArea}
                maxLength="200"
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
      <div className="bg-white w-96 rounded-xl shadow-md mx-auto py-2 px-4 mt-12 mb-5">
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
