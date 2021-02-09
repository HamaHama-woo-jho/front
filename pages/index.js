import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import ChatBox from '../components/chatBox/ChatBox';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {isLoggedIn ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {mainPosts.map((post) => (
              <ChatBox post={post} />
            ))}
          </div>
          <Link href="/createchatbox">
            <a>
              <Button
                style={{
                  backgroundColor: '#0080ff',
                  bottom: 0,
                  right: 0,
                  position: 'fixed',
                  margin: '40px',
                  width: '50px',
                  height: '50px',
                  zIndex: 1,
                }}
                className="border-none rounded-full shadow-lg"
              />
            </a>
          </Link>
        </>
      ) : (
        <LoginForm />
      )}
    </AppLayout>
  );
};

export default Home;
