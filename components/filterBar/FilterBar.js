import React, { useState } from 'react';
import { InputGroup, Form } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { TextWrapper, MainTextWrapper } from './style';
import useFilter from '../../hooks/useFilter';
import RangeSlider from './RangeSlider';
import Calender from './Calendar';

const FilterBar = () => {
  const [titleFilter, titleFilterToggle] = useFilter(false);
  const [contentFilter, contentFilterToggle] = useFilter(false);
  const [locationFilter, locationFilterToggle] = useFilter(false);
  const [priceFilter, priceFilterToggle] = useFilter(false);
  const [dateFilter, dateFilterToggle] = useFilter(false);

  const [date, setDate] = useState({ from: null, to: null });

  return (
    <div>
      <div className="divide-y">
        <div className="flex justify-between py-3 border-">
          <MainTextWrapper>
            상세검색
          </MainTextWrapper>
          <MainTextWrapper>
            필터 초기화
          </MainTextWrapper>
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              제목
            </TextWrapper>
            <FiPlus className="cursor-pointer" onClick={titleFilterToggle} />
          </div>
          {titleFilter
            ? (
              <InputGroup className="h-8 mb-3">
                <Form.Control
                  className="rounded-full border-none text-sm"
                  placeholder="검색어를 입력하세요"
                />
                <InputGroup.Append>
                  <InputGroup.Text className="text-gray-400 border-none bg-white h-8 rounded-br-full rounded-tr-full">
                    <AiOutlineSearch />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              내용
            </TextWrapper>
            <FiPlus className="cursor-pointer" onClick={contentFilterToggle} />
          </div>
          {contentFilter
            ? (
              <InputGroup className="h-8 mb-3">
                <Form.Control
                  className="rounded-full border-none text-sm"
                  placeholder="검색어를 입력하세요"
                />
                <InputGroup.Append>
                  <InputGroup.Text className="text-gray-400 border-none bg-white h-8 rounded-br-full rounded-tr-full">
                    <AiOutlineSearch />
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              위치
            </TextWrapper>
            <FiPlus className="cursor-pointer" onClick={locationFilterToggle} />
          </div>
          {locationFilter
            ? (
              <Form className="mb-3">
                <Form.Check label="북측" />
                <Form.Check label="동측" />
                <Form.Check label="서측" />
                <Form.Check label="어은동" />
                <Form.Check label="궁동" />
              </Form>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              금액
            </TextWrapper>
            <FiPlus className="cursor-pointer" onClick={priceFilterToggle} />
          </div>
          {priceFilter
            ? (
              <RangeSlider />
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div className="flex item-center py-3 justify-between">
            <TextWrapper>
              날짜
            </TextWrapper>
            <FiPlus className="cursor-pointer" onClick={dateFilterToggle} />
          </div>
          {dateFilter
            ? (
              <Calender data={date} setData={setDate} />
            )
            : (
              <></>
            )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
