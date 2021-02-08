import React from 'react';
import { Form, Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';

const createchatbox = () => {
  return (
    <AppLayout>
      <Form>
        <Form.Group controlId="chatBoxTitle">
          <Form.Label>제목</Form.Label>
          <Form.Control type="text" placeholder="제목을 입력하세요" />
        </Form.Group>

        <Form.Group controlId="personnel">
          <Form.Label>구매링크</Form.Label>
          <Form.Control type="text" placeholder="구매링크를 넣어주세요" />
        </Form.Group>

        <div className="flex">
          <Form.Group controlId="personnel">
            <Form.Label>가격</Form.Label>
            <Form.Control type="text" placeholder="제품 가격을 적어주세요" />
          </Form.Group>

          <Form.Group controlId="personnel">
            <Form.Label>총원</Form.Label>
            <Form.Control type="text" placeholder="총인원 수" />
          </Form.Group>

          <Form.Group controlId="personnel">
            <Form.Label>개인 비용</Form.Label>
            <Form.Control type="text" placeholder="구매링크를 넣어주세요" />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit">
          Submit
          </Button>
      </Form>
    </AppLayout>
  );
};

export default createchatbox;
