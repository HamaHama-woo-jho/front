import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

const FormWrapper = styled(Form.Control)`
  border-radius: 9999px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onLogIn = useCallback(() => {
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <div className="shadow-md mt-24 mb-24 mx-auto w-96 bg-white rounded-2xl">
      <div className="border-none text-center px-4 pt-2 pb-5">
        <div
          id="login_title"
          className="mb-10 mt-3"
          style={{ color: '#0080ff', fontSize: '30px' }}
        >
          하마하마
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
                type="sumit"
                variant="primary w-full rounded-full text-sm"
              >
                로그인
              </Button>
              <p className="text-sm text-right mt-1 text-gray-400">회원 가입</p>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
