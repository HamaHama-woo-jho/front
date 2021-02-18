import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { FiUnlock, FiLock } from 'react-icons/fi';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';
import { TextWrapper } from './style';
import { logoutRequestAction } from '../../reducers/user';

const Menu = () => {
  const { me, logoutLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isHoverLog, setIsHoverLog] = useState(false);
  const [isHoverCreate, setIsHoverCreate] = useState(false);
  const [isHoverProfile, setIsHoverProfile] = useState(false);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const onHover = useCallback(() => {
    setIsHoverLog(true);
  }, [isHoverLog]);

  const onHoverLeave = useCallback(() => {
    setIsHoverLog(false);
  }, [isHoverLog]);

  const onHoverCreate = useCallback(() => {
    setIsHoverCreate(true);
  }, [isHoverCreate]);

  const onHoverCreateLeave = useCallback(() => {
    setIsHoverCreate(false);
  }, [isHoverCreate]);

  const onHoverProfile = useCallback(() => {
    setIsHoverProfile(true);
  }, [isHoverProfile]);

  const onHoverProfileLeave = useCallback(() => {
    setIsHoverProfile(false);
  }, [isHoverProfile]);

  return (
    <div
      className="py-4 shadow-md"
      style={{
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      <div className="w-full flex">
        <div className="w-1/3" />
        <div className="w-1/3 text-center my-auto">
          <Link href="/">
            <a>
              <span
                id="title"
                className="ml-4 text-2xl align-middle pt-1"
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
        </div>
        <div className="w-1/3 flex justify-end">
          <div>
            <Link href="/profile">
              <a>
                <div
                  onMouseEnter={onHoverProfile}
                  onMouseLeave={onHoverProfileLeave}
                  className="border rounded-full flex items-center mx-3 text-gray-400 w-20 h-8 justify-center"
                >
                  {isHoverProfile
                    ? (
                      <BsFillPersonFill />
                    )
                    : (
                      <TextWrapper className="ml-1">
                        내 정보
                      </TextWrapper>
                    )}
                </div>
              </a>
            </Link>
          </div>
          <div>
            <Link href="/createchatbox">
              <a>
                <div
                  onMouseEnter={onHoverCreate}
                  onMouseLeave={onHoverCreateLeave}
                  className="border rounded-full flex items-center mx-3 text-gray-400 w-20 h-8 justify-center"
                >
                  {isHoverCreate
                    ? (
                      <HiOutlinePencil />
                    )
                    : (
                      <TextWrapper className="ml-1">
                        방 만들기
                      </TextWrapper>
                    )}
                </div>
              </a>
            </Link>
          </div>
          {me
            ? (
              <div
                onMouseEnter={onHover}
                onMouseLeave={onHoverLeave}
                className="border rounded-full flex items-center mx-3 text-gray-400 w-20 h-8 justify-center"
              >
                {logoutLoading
                  ? (
                    <Spinner size="sm" animation="border" className="pl-1" />
                  )
                  : (
                    <>
                      {isHoverLog
                        ? (
                          <FiUnlock onClick={onLogOut} className="cursor-pointer" />
                        )
                        : (
                          <TextWrapper className="ml-1 cursor-pointer">
                            로그아웃
                          </TextWrapper>
                        )}
                    </>
                  )}
              </div>
            )
            : (
              <div>
                <Link href="/login">
                  <a>
                    <div
                      onMouseEnter={onHover}
                      onMouseLeave={onHoverLeave}
                      className="border rounded-full flex items-center mx-3 text-gray-400 w-20 h-8 justify-center"
                    >
                      {isHoverLog
                        ? (
                          <FiLock />
                        )
                        : (
                          <TextWrapper className="ml-1">
                            로그인
                          </TextWrapper>
                        )}
                    </div>
                  </a>
                </Link>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
