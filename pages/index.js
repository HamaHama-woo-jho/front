import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import ChatBox from '../components/chatBox/ChatBox';

const addPostButton = styled(Button)`
  background: black;
  position: fixed;
  margin: 40px;
`;

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <AppLayout className="h-full">
      {isLoggedIn
        ? (
          <>
            <ChatBox />
            <ChatBox />
            <addPostButton
              className="border-none rounded-full shadow-lg"
            />
          </>
        )
        : (
          <LoginForm />
        )}
    </AppLayout>
  );
};

export default Home;
