import React from 'react';
import { Card } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import ChatRoom from '../components/chatRoom/ChatRoom';

const profile = () => {
  const word = '준비 중입니다.';
  return (
    <AppLayout>
      <div className="h-full flex mb-4">
        <div className="w-3/4 mx-5">
          <div className="h-1/2 pb-4">
            <Card className="h-full">
              <Card.Header>내 정보</Card.Header>
              <Card.Body>
                <Card.Title>아이디</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
                <Card.Title>닉네임</Card.Title>
                <Card.Title>비밀번호</Card.Title>
              </Card.Body>
            </Card>
          </div>
          <div className="h-1/2 flex justify-between">
            <Card className="w-1/2 mr-2">
              <Card.Header>신청 공구</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="w-1/2 ml-2">
              <Card.Header>참여 채팅방</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
        <div className="w-1/4 mr-12">
          <ChatRoom />
        </div>
      </div>
    </AppLayout>
  );
};

export default profile;
