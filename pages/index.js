import React from 'react';
import AppLayout from '../components/AppLayout';
import LoginForm from '../components/LoginForm';
import NewChatBox from '../components/chatBox/NewChatBox';
import { Container, Button } from 'react-bootstrap';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Home = () => {
    const { isLoggedIn } = useSelector((state) => state.user);
    return (
        <AppLayout className="h-full">
            {isLoggedIn
                ? <>
                    <NewChatBox />
                    <NewChatBox />
                    <Container>
                        <Button
                            style={{
                                backgroundColor: "#f88",
                                right: 0,
                            }}
                            className="border-none rounded-full text-lg inline-block align-middle"
                        >
                            <PlusOutlined className="inline-block align-middle" />
                        </Button>
                    </Container>
                </>
                : <LoginForm />
            }
        </AppLayout>
    );
};

export default Home;