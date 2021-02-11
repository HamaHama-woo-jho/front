import React from 'react';
import { useSelector } from 'react-redux';
import { Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import ChatBoxCopy from '../components/chatBox/ChatBoxCopy';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);

  return (
    <AppLayout>
      {isLoggedIn
        ? (
          <>
            <Form.Group className="ml-24 mb-3 inline-block align-middle w-50">
              <Form.Control
                className="h-12 text-md rounded-full text-sm text-gray-400"
                placeholder="검색어를 입력하세요"
              />
            </Form.Group>
            <InputGroup className="ml-24 mb-3 w-50 h-12">
              <Form.Control
                className="rounded-full border-none text-sm"
                placeholder="검색어를 입력하세요"
              />
              <InputGroup.Append>
                <InputGroup.Text className="text-gray-400 border-none bg-white h-12 rounded-br-full rounded-tr-full">
                  <AiOutlineSearch />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
            <div className="grid gap-x-0 grid-cols-2">
              {mainPosts.map((post) => (
                <ChatBoxCopy post={post} />
              ))}
            </div>
          </>
        )
        : (
          <LoginForm />
        )}
    </AppLayout>
  );
};

export default Home;
