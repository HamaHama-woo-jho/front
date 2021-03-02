import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaCheck } from 'react-icons/fa';
import { TextWrapper, MainTextWrapper } from './style';
import { LOAD_PAGE_0, LOAD_PAGE_1, LOAD_PAGE_2, LOAD_PAGE_3 } from '../../reducers/mypage';

const MyMenuBar = () => {
  const dispatch = useDispatch();
  const [op0, setOp0] = useState(true);
  const [op1, setOp1] = useState(false);
  const [op2, setOp2] = useState(false);
  const [op3, setOp3] = useState(false);

  const onSelect = (option, type) => {
    setOp0(false);
    setOp1(false);
    setOp2(false);
    setOp3(false);
    option(true);
    dispatch({
      type,
    });
  };

  return (
    <div>
      <div className="divide-y">
        <div className="flex justify-between py-3 pl-1">
          <MainTextWrapper>
            마이 메뉴
          </MainTextWrapper>
        </div>
        <div>
          {op0
            ? (
              <div
                className="flex items-center py-3 justify-between cursor-pointer px-1"
              >
                <TextWrapper>
                  신청공구
                </TextWrapper>
                <FaCheck />
              </div>
            )
            : (
              <div
                onClick={() => onSelect(setOp0, LOAD_PAGE_0)}
                className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
              >
                <TextWrapper>
                  신청공구
                </TextWrapper>
              </div>
            )}
        </div>
        <div>
          {op1
            ? (
              <div
                className="flex items-center py-3 justify-between cursor-pointer px-1"
              >
                <TextWrapper>
                  나의 채팅방
                </TextWrapper>
                <FaCheck />
              </div>
            )
            : (
              <div
                onClick={() => onSelect(setOp1, LOAD_PAGE_1)}
                className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
              >
                <TextWrapper>
                  나의 채팅방
                </TextWrapper>
              </div>
            )}
        </div>
        <div>
          {op2
            ? (
              <div
                className="flex items-center py-3 justify-between cursor-pointer px-1"
              >
                <TextWrapper>
                  신청공구
                </TextWrapper>
                <FaCheck />
              </div>
            )
            : (
              <div
                onClick={() => onSelect(setOp2, LOAD_PAGE_2)}
                className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
              >
                <TextWrapper>
                  신청공구
                </TextWrapper>
              </div>
            )}
        </div>
        <div>
          {op3
            ? (
              <div
                className="flex items-center py-3 justify-between cursor-pointer px-1"
              >
                <TextWrapper>
                  내 정보
                </TextWrapper>
                <FaCheck />
              </div>
            )
            : (
              <div
                onClick={() => onSelect(setOp3, LOAD_PAGE_3)}
                className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
              >
                <TextWrapper>
                  내 정보
                </TextWrapper>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default MyMenuBar;
