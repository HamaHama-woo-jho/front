import React, { useRef, useState, useCallback } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form.Control)`
  border-radius: 9999px;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const ErrorMessage = styled.div`
    color: red;
`;

const signup = () => {
  const idRef = useRef();
  const nickRef = useRef();
  const pwRef = useRef();
  const pw2Ref = useRef();

  const [id, onChangeId] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
  }, [password, passwordCheck, term]);

  const checkId = () => {
    console.log(idRef);
    // 서버와 통신하여 중복 id 있는지 검사
  };

  return (
    <AppLayout>
      <div className="shadow-md mt-24 mb-24 mx-auto w-96 bg-white rounded-2xl">
        <div className="border-none text-center px-4 pt-2 pb-5 mt-3">
          <div className="mb-4 mt-2">
            <span
              id="login_title"
              className="mb-12 mt-3"
              style={{ color: '#a593e0', fontSize: '30px' }}
            >
              회
            </span>
            <span
              id="login_title"
              className="mb-12 mt-3"
              style={{ color: '#f9c00c', fontSize: '30px' }}
            >
              원
            </span>
            <span
              id="login_title"
              className="mb-12 mt-3"
              style={{ color: '#ff7473', fontSize: '30px' }}
            >
              가
            </span>
            <span
              id="login_title"
              className="mb-12 mt-3"
              style={{ color: '#00b9f1', fontSize: '30px' }}
            >
              입
            </span>
          </div>
          <div>
            <Form onSubmit={onSubmit}>
              <Form.Group>
                <Row>
                  <Col>
                    <FormWrapper className="mb-3" placeholder="아이디" onChange={onChangeId} value={id} ref={idRef} type="text" required />
                  </Col>
                  <Col xs="auto">
                    <Button className="border rounded-full border-blue-400" variant="outline-info" onClick={checkId}>중복 확인</Button>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <FormWrapper className="mb-3" placeholder="닉네임" onChange={onChangeNickname} value={nickname} ref={nickRef} type="text" required />
              </Form.Group>
              <Form.Group>
                <FormWrapper className="mb-3" placeholder="비밀번호" onChange={onChangePassword} value={password} ref={pwRef} type="password" required />
              </Form.Group>
              <Form.Group>
                <FormWrapper className="mb-3" placeholder="비밀번호 재확인" onChange={onChangePasswordCheck} value={passwordCheck} ref={pw2Ref} type="password" required />
                {passwordError && <ErrorMessage className="mb-2">비밀번호가 일치하지 않습니다.</ErrorMessage>}
              </Form.Group>
              <div>
                <input type="checkbox" name="user-term" checked={term} onChange={onChangeTerm} />
                <label className="ml-1">하마하마 이용약관에 동의합니다.</label>
                <br />
                {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
              </div>
              <div className="mt-10">
                <Link href="/">
                  <a>
                    <Button className="px-4 mr-3 border rounded-full" variant="secondary">뒤로가기</Button>
                  </a>
                </Link>
                <Button className="px-4 border rounded-full" type="submit">가입하기</Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default signup;
