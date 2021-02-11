import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { FiHome, FiUnlock, FiSettings } from 'react-icons/fi';
import { RiProfileLine } from 'react-icons/ri';
import { HiOutlinePencil } from 'react-icons/hi';
import { MainTextWrapper, TextWrapper } from './style';
import { logoutAction } from '../../reducers/user';

const Menu = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <div
      className="py-3 shadow-md"
      style={{
        width: '16rem',
        backgroundColor: 'white',
        position: 'fixed',
        top: 0,
        bottom: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <div className="m-2 inline-block">
        <div className="mb-8">
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
        <div className="flex flex-col">
          <MainTextWrapper className="mx-3 my-2 text-gray-500">Main Menu</MainTextWrapper>
          <div className="my-1">
            <Link href="/">
              <a>
                <div className="flex items-center mx-3 text-gray-400">
                  <FiHome />
                  <TextWrapper className="ml-1">Home</TextWrapper>
                </div>
              </a>
            </Link>
          </div>
          <div className="my-1">
            <Link href="/profile" className="my-2">
              <a>
                <div className="flex items-center mx-3 text-gray-400">
                  <RiProfileLine />
                  <TextWrapper className="ml-1">Profile</TextWrapper>
                </div>
              </a>
            </Link>
          </div>
          <div className="my-1">
            <Link href="/createchatbox" className="my-2">
              <a>
                <div className="flex items-center mx-3 text-gray-400">
                  <HiOutlinePencil />
                  <TextWrapper className="ml-1 text-gray-400">Create</TextWrapper>
                </div>
              </a>
            </Link>
          </div>
          {isLoggedIn
            ? (
              <div className="flex items-center my-1 mx-3 text-gray-400">
                <FiUnlock />
                <TextWrapper className="ml-1" onClick={onLogOut}>
                  Logout
                </TextWrapper>
              </div>
            )
            : (
              <div className="flex items-center my-1 mx-3 text-gray-400">
                <FiUnlock />
                <TextWrapper className="ml-1">
                  Login
                </TextWrapper>
              </div>
            )}
        </div>
        <div className="flex flex-col mt-4">
          <MainTextWrapper className="mx-3 my-2 text-gray-500">Settings</MainTextWrapper>
          <div className="my-1">
            <Link href="/">
              <a>
                <div className="flex items-center mx-3 text-gray-400">
                  <FiSettings />
                  <TextWrapper className="ml-1">Settings</TextWrapper>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
