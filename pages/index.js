import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import ChatBox from '../components/chatBox/ChatBox';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <AppLayout className="h-full">
      {isLoggedIn ? (
        <>
          <ChatBox />
          <ChatBox />
          <Button
            style={{
              backgroundColor: '#0080ff',
              bottom: 0,
              right: 0,
              position: 'fixed',
              margin: '40px',
              width: '50px',
              height: '50px',
            }}
            className="border-none rounded-full text-lg shadow-lg"
          />
        </>
      ) : (
        <LoginForm />
      )}
    </AppLayout>
  );
};

export default Home;
