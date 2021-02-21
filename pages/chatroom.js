import React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';

const chatroom = () => {
  return (
    <AppLayout>
      <div className="flex flex-row">
        <div classsName="w-1/3">
          안녕하세요
        </div>
        <div className="d-flex flex-column flex-grow-1">
          <div className="flex-grow-1 overflow-auto">
            <div className="d-flex flex-column align-items-start justify-content-end px-3">
              안녕하세요
            </div>
          </div>
          {/* <Form onSubmit={handleSubmit}> */}
          <Form>
            <Form.Group className="m-2">
              <InputGroup>
                <Form.Control
                  required
                // value={text}
                // onChange={e => setText(e.target.value)}
                />
                <InputGroup.Append>
                  <Button type="submit">보내기</Button>
                </InputGroup.Append>
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </AppLayout>
  );
};

export default chatroom;
