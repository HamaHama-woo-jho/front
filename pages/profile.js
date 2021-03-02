import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import AppLayout from '../components/AppLayout';
import MyChatBox from '../components/chatBox/MyChatBox';
import MyMenuBar from '../components/myMenuBar/MyMenuBar';

const PhotoWrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
  font-size: 12px;
`;

const Text2Wrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
`;

const TextWrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
  font-size: 15px;
`;

const TitleWrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
  font-size: 20px;
  font-weight: bold;
`;

const MenuWrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
  font-size: 15px;
`;

const AvatarWrapper = styled.span`
  font-family: 'NanumSquare', sans-serif !important;
  font-size: 40px;
`;

const profile = () => {
  const { mainPosts } = useSelector((state) => state.post);
  const { me } = useSelector((state) => state.user);
  const { page } = useSelector((state) => state.mypage);

  const renderByPage = (pageNum) => {
    switch (pageNum) {
      case 0:
        return (
          <Card className="w-full mx-auto md:w-3/4">
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        );
      case 1:
        return (
          <Card className="w-full mx-auto md:w-3/4">
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        );
      case 2:
        return (
          <Card className="w-full mx-auto md:w-3/4">
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        );
      // 내 정보 수정 페이지
      case 3:
        return (
          <>
            <Card className="w-full mb-5 mx-auto md:w-3/4">
              <Card.Body className="divide-y">
                <div className="mb-8 flex">
                  <div className="w-48">
                    <div className="w-24">
                      <div className="bg-gray-200 rounded-xl w-24 h-24 flex items-center">
                        <AvatarWrapper className="text-white mx-auto">
                          {me.nickname[0]}
                        </AvatarWrapper>
                      </div>
                      <div className="flex justify-between">
                        <PhotoWrapper className="cursor-pointer text-gray-500 hover:text-blue-500">
                          삭제
                        </PhotoWrapper>
                        <PhotoWrapper className="cursor-pointer text-gray-500 hover:text-blue-500">
                          편집
                        </PhotoWrapper>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between  w-full">
                    <TitleWrapper>
                      {me.nickname}
                    </TitleWrapper>
                    <TextWrapper className="cursor-pointer hover:text-blue-500">
                      편집
                    </TextWrapper>
                  </div>
                </div>
                <div className="mb-8 flex pt-3">
                  <MenuWrapper className="w-48 text-gray-500 pl-2">
                    개인 ID
                  </MenuWrapper>
                  <div className="flex justify-between w-full">
                    <Text2Wrapper>
                      {me.userid}
                    </Text2Wrapper>
                    <TextWrapper className="cursor-pointer hover:text-blue-500">
                      편집
                    </TextWrapper>
                  </div>
                </div>
                <div className="mb-8 flex pt-3">
                  <MenuWrapper className="w-48 text-gray-500 pl-2">
                    로그인 비밀번호
                  </MenuWrapper>
                  <div className="flex justify-between w-full">
                    <span>
                      **********
                    </span>
                    <TextWrapper className="cursor-pointer hover:text-blue-500">
                      편집
                    </TextWrapper>
                  </div>
                </div>
                <div className="lg:flex pt-3">
                  <MenuWrapper className="w-48 text-gray-500 pl-2">
                    내가 만든 게시물
                  </MenuWrapper>
                  <div className="flex justify-between w-full mb-3">
                    <Card.Body className="p-0">
                      {mainPosts.map((post) => (
                        <div>
                          <MyChatBox post={post} />
                        </div>
                      ))}
                    </Card.Body>
                  </div>
                </div>
                <div className="h-32 flex pt-3">
                  <MenuWrapper className="w-48 text-gray-500 pl-2">
                    신고 현황
                  </MenuWrapper>
                  <div className="flex justify-between w-full">
                    <Text2Wrapper>
                      비속어 사용으로 인한 경고 1회
                    </Text2Wrapper>
                    <TextWrapper className="cursor-pointer hover:text-blue-500">
                      편집
                    </TextWrapper>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </>
        );
      default:
        return (
          <Card className="w-full mx-auto md:w-3/4">
            <Card.Body className="overflow-y-auto">
              {mainPosts.map((post) => (
                <div>
                  <MyChatBox post={post} />
                </div>
              ))}
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <AppLayout>
      <div className="flex">
        <div className="w-72 pl-5 mr-3">
          <MyMenuBar />
        </div>
        <div className="w-4/5 px-5">
          {renderByPage(page)}
        </div>
      </div>
    </AppLayout>
  );
};

export default profile;
