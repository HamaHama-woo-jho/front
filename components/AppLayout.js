import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { logoutAction } from '../reducers/user';

const AppLayout = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <>
      <div style={{ height: '100vh' }}>
        <div
          className="mx-auto py-3  shadow-md "
          style={{
            backgroundColor: 'white',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <div className="m-2 inline-block align-middle flex justify-between">
            <div>
              <Link href="/">
                <a>
                  <span
                    id="title"
                    className="ml-10 text-2xl align-middle pt-1"
                    style={{
                      color: '#f9c00c',
                    }}
                  >
                    하
                  </span>
                  <span
                    id="title"
                    className="text-2xl align-middle pt-1"
                    style={{
                      color: '#00b9f1',
                    }}
                  >
                    마
                  </span>
                  <span
                    id="title"
                    className="text-2xl align-middle pt-1"
                    style={{
                      color: '#ff7473',
                    }}
                  >
                    하
                  </span>
                  <span
                    id="title"
                    className="mr-2 text-2xl align-middle pt-1"
                    style={{
                      color: '#a593e0',
                    }}
                  >
                    마
                  </span>
                </a>
              </Link>
              <Form.Group className="m-2 inline-block align-middle">
                <Form.Control
                  className="h-8 text-md rounded-full"
                  placeholder="검색어를 입력하세요"
                />
              </Form.Group>
            </div>
            {isLoggedIn
              ? (
                <div className="m-2 inline-block align-middle justify-self-end">
                  <Button
                    className="text-sm h-8 mr-4 rounded-full"
                    variant="secondary"
                    onClick={onLogOut}
                  >
                    로그아웃
                  </Button>
                </div>
              )
              : (
                <></>
              )}
          </div>
        </div>
        <div className="pt-36 h-full flex flex-col" style={{ justifyContent: 'space-between' }}>
          <div>
            {children}
          </div>
          <div
            className="w-full text-center text-white py-1"
            style={{
              backgroundColor: '#5f5f5f',
              bottom: 0,
            }}
          >
            @jaegoo hyein
          </div>
        </div>
      </div>
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
