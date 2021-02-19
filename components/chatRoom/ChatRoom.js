import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { TextWrapper, MainTextWrapper } from './style';

const ChatRoom = () => {
  return (
    <div className="bg-white h-full rounded-xl w-full">
      <div className="divide-y">
        <div className="flex justify-between py-3">
          <MainTextWrapper>
            상세검색
          </MainTextWrapper>
          <MainTextWrapper
            className="cursor-pointer hover:text-blue-500"
          >
            필터 초기화
          </MainTextWrapper>
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              키워드
            </TextWrapper>
            <FiPlus className="cursor-pointer mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
