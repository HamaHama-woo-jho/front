import React, { useState, useCallback } from 'react';
import { Card } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import {
  InfoCircleOutlined,
  PlayCircleOutlined,
  PlayCircleTwoTone,
} from '@ant-design/icons';
import { Price, Title, TextWrapper, HashTag } from './style';

const dummy = {
  title: '귤 공구해요',
  cost: '16,000',
  info: ['무농약 귤', '제주도 직송', '꿀맛'],
  current: 8,
  max: 10,
  startDate: '2020.02.01',
  endDate: '2020.02.07',
};

const NewChatBox = () => {
  const [isIn, setIsIn] = useState('false');

  const onClickEnter = useCallback(() => {
    setIsIn(!isIn);
  }, [isIn]);

  return (
    <Card className="border-none text-center shadow-md mx-auto my-3 w-72 sm:w-70 md:w-50">
      <Card.Body className="pb-1">
        <Title>{dummy.title}</Title>
        <div className="w-1/3 pb-1 m-auto">
          <CircularProgressbar
            value={66}
            text="D-3"
            styles={buildStyles({
              textSize: '20px',
              pathTransitionDuration: 0.5,
              pathColor: '#0080ff',
              textColor: '#0080ff',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7',
            })}
          />
        </div>
        <div>
          <Price>{dummy.cost}</Price>
          <TextWrapper> /인</TextWrapper>
        </div>
      </Card.Body>
      <Card.Footer className="bg-white">
        <div className="flex flex-col text-sm my-1">
          {dummy.info.map((item) => (
            <div className="mb-1" key="info">
              <HashTag className="px-1 text-gray-500">{`#${item}`}</HashTag>
            </div>
          ))}
        </div>
      </Card.Footer>
      <Card.Footer className="flex p-0 h-9 bg-white">
        <div className="w-1/3 inline-block align-middle text-gray-400">
          <a
            href="https://github.com/"
            target="__blank"
            rel="noreferrer noopener"
          >
            <InfoCircleOutlined />
          </a>
        </div>
        <div
          className="w-1/3"
          style={{ borderRightWidth: '1px', borderLeftWidth: '1px' }}
        >
          <span className="inline-block align-middle text-gray-400 text-sm">
            4 / 5
          </span>
        </div>
        <div className="w-1/3 inline-block align-middle">
          {isIn
            ? (
              <PlayCircleTwoTone twoToneColor="#0080ff" onClick={onClickEnter} />
            )
            : (
              <PlayCircleOutlined
                className="text-gray-400"
                onClick={onClickEnter}
              />
            )}
        </div>
      </Card.Footer>
    </Card>
  );
};

export default NewChatBox;
