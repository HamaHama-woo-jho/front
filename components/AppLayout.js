import React, { useCallback } from 'react';
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
        <div style={{ height: "100vh" }}>
            <div
                className="mx-auto py-3"
                style={{
                    backgroundColor: "white",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 5000,
                }}
            >
                <div className="m-2 inline-block align-middle justify-between">
                    <span
                        id="title"
                        className="ml-10 mr-2 text-2xl align-middle pt-2"
                        style={{
                            color: "#0080ff",
                        }}
                    >
                        하마하마
                    </span>
                    <Form.Group className="m-2 inline-block align-middle">
                        <Form.Control className="h-8 text-md" placeholder="검색어를 입력하세요" />
                    </Form.Group>
                    {isLoggedIn
                        ? <Button
                            variant='secondary'
                            classsName='text-sm'
                            onClick={onLogOut}
                        >
                            로그아웃
                            </Button>
                        : <></>}
                </div>
            </div>
            <div className="align-items-center flex flex-col pt-24 h-full">
                {children}
            </div>
            <div className="flex flex-col">
                <span className="text-gray-500 text-center">@재구 혜인</span>
            </div>
        </div >
    )
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppLayout;