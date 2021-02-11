import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const FormWrapper = styled(Form.Control)`
  border-radius: 9999px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loginLoding } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onLogIn = useCallback((e) => {
    e.preventDefault();
    console.log(id, password);
    dispatch(loginRequestAction({ id, password }));
    Router.push('/');
  }, [id, password]);

  return (
    <div className="shadow-md mt-10 mb-24 mx-auto w-96 bg-white rounded-2xl">
      <div className="border-none text-center px-4 pt-2 pb-5 mt-3">
        <div className="mb-4 mt-2">
          <span
            id="login_title"
            className="mb-12 mt-3"
            style={{ color: '#00b9f1', fontSize: '30px' }}
          >
            로
          </span>
          <span
            id="login_title"
            className="mb-12 mt-3"
            style={{ color: '#f9c00c', fontSize: '30px' }}
          >
            그
          </span>
          <span
            id="login_title"
            className="mb-12 mt-3"
            style={{ color: '#ff7473', fontSize: '30px' }}
          >
            인
          </span>
        </div>
        <div>
          <Form onSubmit={onLogIn}>
            <Form.Group className="py-2">
              <FormWrapper
                onChange={onChangeId}
                type="text"
                placeholder="아이디"
                required
              />
            </Form.Group>
            <Form.Group className="py-4">
              <FormWrapper
                onChange={onChangePassword}
                type="password"
                placeholder="비밀번호"
                required
              />
              <p className="text-sm text-right mt-1 text-gray-400">
                비밀번호 찾기
              </p>
            </Form.Group>
            <Form.Group>
              <Button
                loading={loginLoding}
                type="submit"
                variant="primary w-full rounded-full text-sm mb-2 py-2"
              >
                로그인
              </Button>
              <Link href="/signup">
                <a>
                  <Button
                    variant="secondary w-full rounded-full text-sm py-2"
                  >
                    회원 가입
                  </Button>
                </a>
              </Link>
            </Form.Group>
          </Form>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
