import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { signupAction } from '../reducers/user';
import termtext from '../components/term.txt';

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

  const dispatch = useDispatch();

  const onSubmit = useCallback((e) => {
    e.preventDefault();
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(id, nickname, password);
    dispatch(signupAction({ id, nickname }));
    // 서버에 연결해서 회원가입 정보를 db에 저장
    // 에러 없이 성공적으로 저장되었다면 index페이지로 전환
  }, [password, passwordCheck, term]);

  const checkId = () => {
    console.log(idRef);
    // 서버와 통신하여 중복 id 있는지 검사
    // 검사해서 통과되지 않았다면 가입할 수 없도록 하기
    // 검사하지 않았다면 가입할 수 없도록 하기
  };

  // const readTextFile = (file) => {
  //   const rawFile = new XMLHttpRequest();
  //   rawFile.open('GET', file, false);
  //   // eslint-disable-next-line func-names
  //   rawFile.onreadystatechange = function () {
  //     if (rawFile.readyState === 4) {
  //       if (rawFile.status === 200 || rawFile.status === 0) {
  //         const allText = rawFile.responseText;
  //         alert(allText);
  //       }
  //     }
  //   };
  //   rawFile.send(null);
  // };

  // const termtext = () => {
  //   readTextFile('file:///C:/사용자/우혜인/바탕화면/카이스트/몰입캠프/week6/front/components/term.txt');
  // };

  // const termtext = () => {
  //   fs.readFile('/term', function (err, data) {
  //     if (err) throw err;
  //     console.log(data);
  //   });
  // };

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
              <div className="flex flex-col">
                <div style={{ color: '#503a99' }} className="self-start mb-2 ml-1 font-semibold">✓ 이용 약관</div>
                <div style={{ backgroundColor: '#f0f0f0' }} className="mb-2 h-24 overflow-y-scroll">
                  <div className="p-2">
                    이용 약관은 이러이러이러이러이러합니다!!!!!!
                    {termtext}
                  </div>
                </div>
                <div>
                  <input type="checkbox" name="user-term" checked={term} onChange={onChangeTerm} />
                  <label className="ml-1">하마하마 이용약관에 동의합니다.</label>
                  <br />
                  {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
                </div>
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
