import React, { useRef, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import Router from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';
import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { signupAction } from '../reducers/user';

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

  const [showterm, setShowterm] = useState(false);
  const onOpenTerm = useCallback((e) => {
    e.preventDefault();
    setShowterm(true);
  });
  const onCloseTerm = useCallback((e) => {
    e.preventDefault();
    setShowterm(false);
  });

  const [showinfo, setShowinfo] = useState(false);
  const onOpenInfo = useCallback((e) => {
    e.preventDefault();
    setShowinfo(true);
  });
  const onCloseInfo = useCallback((e) => {
    e.preventDefault();
    setShowinfo(false);
  });

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
    Router.push('/');
  }, [password, passwordCheck, term]);

  const checkId = () => {
    console.log(idRef);
    // 서버와 통신하여 중복 id 있는지 검사
    // 검사해서 통과되지 않았다면 가입할 수 없도록 하기
    // 검사하지 않았다면 가입할 수 없도록 하기
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

              <div className="flex flex-col">
                <div style={{ color: '#503a99' }} className="self-start mb-2 ml-1 font-semibold">✓ 이용 약관</div>
                {
                  showterm ? (
                    <>
                      <Button className="border rounded-full border-blue-400 mb-1 text-sm" variant="light" onClick={onCloseTerm}>약관 닫기</Button>
                      <div style={{ backgroundColor: '#f0f0f0' }} className="mb-2 border rounded-lg">
                        <div className="p-2 text-sm">
                          본 하마하마 이용약관(이하 '본 약관'이라 함)은 본 서비스를 이용하는 고객에게 제공하는 서비스의 이용에 관한 조건에 대해 정합니다. {'\n'}
                          1. 고객은 본 약관에 따라 본 서비스를 이용해야 합니다. 고객은 본 약관에 대해 동의를 했을 경우에 한하여 본 서비스를 이용할 수 
                          있습니다.
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button className="border rounded-full border-blue-400 mb-2 text-sm" variant="light" onClick={onOpenTerm}>약관 보기</Button>
                  )
                }
                <div style={{ color: '#503a99' }} className="self-start mb-2 ml-1 mt-2 font-semibold">✓ 개인정보 수집 및 이용 방침</div>
                {
                  showinfo ? (
                    <>
                      <Button className="border rounded-full border-blue-400 mb-1 text-sm" variant="light" onClick={onCloseInfo}>개인정보 방침 닫기</Button>
                      <div style={{ backgroundColor: '#f0f0f0' }} className="mb-3 border rounded-lg">
                        <div className="p-2 text-sm">
                          아직은 개인정보를 수집하지 않지만, 나중에 전화번호나 이름 등의 개인정보를 수집할 수 있습니다.
                          최종 수정일: 2021.02.10.
                        </div>
                      </div>
                    </>
                  ) : (
                    <Button className="border rounded-full border-blue-400 mb-3 text-sm" variant="light" onClick={onOpenInfo}>개인정보 방침 보기</Button>
                  )
                }

                <div>
                  <input type="checkbox" name="user-term" checked={term} onChange={onChangeTerm} />
                  <label className="ml-1 text-sm">하마하마 이용약관과 개인정보 방침에 동의합니다.</label>
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
