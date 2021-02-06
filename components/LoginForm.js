import React, { useCallback } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user'

const FormWrapper = styled(Form.Control)`
    border-radius: 9999px;
    font-size: 0.875rem;
    line-height: 1.25rem;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput("");
    const [password, onChangePassword] = useInput("");

    const onLogIn = useCallback(() => {
        console.log(id, password);
        dispatch(loginAction({ id, password }));
    }, [id, password]);

    return (
        <div className="shadow-md m-auto w-25">
            <Card className="border-none text-center px-4 pt-2 pb-5">
                <Card.Body>
                    <Card.Title
                        id="login_title"
                        className="mb-10 mt-2"
                        style={{ color: "#0080ff", fontSize: "30px" }}
                    >
                        하마하마
                            </Card.Title>
                    <div>
                        <Form>
                            <Form.Group className="py-2">
                                <FormWrapper
                                    onChange={onChangeId}
                                    type="text"
                                    placeholder="아이디"
                                />
                            </Form.Group>
                            <Form.Group className="py-4">
                                <FormWrapper
                                    onChange={onChangePassword}
                                    type="password"
                                    placeholder="비밀번호"
                                />
                                <p className="text-sm text-right mt-1">비밀번호 찾기</p>
                            </Form.Group>
                            <Form.Group className="pt-2">
                                <Button
                                    onClick={onLogIn}
                                    variant="primary w-full rounded-full text-sm"
                                >
                                    로그인
                                </Button>
                                <p className="text-sm text-right mt-1">회원 가입</p>
                            </Form.Group>
                        </Form>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default LoginForm;