import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import MyChatBox from '../components/chatBox/MyChatBox';
import MyMenuBar from '../components/myMenuBar/MyMenuBar';

const profile = () => {
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      <div className="flex">
        <div className="w-72 pl-5 mr-3">
          <MyMenuBar />
        </div>
        <div className="w-4/5 px-5">
          <Card className="w-full mx-auto md:w-3/4">
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
