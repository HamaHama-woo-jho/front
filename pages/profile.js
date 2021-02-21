import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import MyChatBox from '../components/chatBox/MyChatBox';

const profile = () => {
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <div className="px-5 md:w-full md:h-full">
        <div className="h-1/2 pb-3 md:flex md:justify-between">
          <Card className="w-full mr-2 md:w-1/2">
            <Card.Header className="bg-yellow-100">신청 공구</Card.Header>
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card className="w-full mr-2 md:w-1/2">
            <Card.Header className="bg-blue-100">참여 채팅방</Card.Header>
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
        <div className="h-1/2 pb-3 md:flex md:justify-between">
          <Card className="w-full mr-2 md:w-1/2">
            <Card.Header className="bg-red-100">완료된 공구</Card.Header>
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
          <Card className="w-full mr-2 md:w-1/2">
            <Card.Header className="bg-purple-100">내 정보</Card.Header>
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default profile;
