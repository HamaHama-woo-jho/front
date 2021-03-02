import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputGroup, Form } from 'react-bootstrap';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoClose, IoCloseOutline } from 'react-icons/io5';
import { TextWrapper, MainTextWrapper, HashtagWrapper } from './style';
import useFilter from '../../hooks/useFilter';
import useInput from '../../hooks/useInput';
import RangeSlider from './RangeSlider';
import Calender from './Calendar';
import NewCalender from './NewCalendar';
import { CLEAR_FILTER, FILTER_HASHTAG_REMOVE, FILTER_KEYWORD, locationAddAction, FILTER_HASHTAG_REMOVE_ALL, locationRemoveAction } from '../../reducers/filter';

const FilterBar = () => {
  const dispatch = useDispatch();
  const { hashtags } = useSelector((state) => state.filter);

  const [keywordFilter, setKeywordFilter, keywordFilterToggle] = useFilter(false);
  const [locationFilter, setLocationFilter, locationFilterToggle] = useFilter(false);
  const [priceFilter, setPriceFilter, priceFilterToggle] = useFilter(false);
  const [dateFilter, setDateFilter, dateFilterToggle] = useFilter(false);

  const [keyword, onChangeKeyword] = useInput('');

  const [north, setNorth] = useState(true);
  const [west, setWest] = useState(true);
  const [east, setEast] = useState(true);
  const [near1, setNear1] = useState(true);
  const [near2, setNear2] = useState(true);

  const [date, setDate] = useState({ from: null, to: null });

  const onClear = (e) => {
    e.preventDefault();
    setNorth(true);
    setWest(true);
    setEast(true);
    setNear1(true);
    setNear2(true);
    setKeywordFilter(false);
    setLocationFilter(false);
    setPriceFilter(false);
    setDateFilter(false);
    dispatch({
      type: CLEAR_FILTER,
    });
  };

  const onCheckNorth = useCallback(() => {
    if (north) {
      dispatch(locationRemoveAction('북측'));
    } else {
      dispatch(locationAddAction('북측'));
    }
    setNorth(!north);
  }, [north]);

  const onCheckWest = useCallback(() => {
    if (west) {
      dispatch(locationRemoveAction('서측'));
    } else {
      dispatch(locationAddAction('서측'));
    }
    setWest(!west);
  }, [west]);

  const onCheckEast = useCallback(() => {
    if (east) {
      dispatch(locationRemoveAction('동측'));
    } else {
      dispatch(locationAddAction('동측'));
    }
    setEast(!east);
  }, [east]);

  const onCheckNear1 = useCallback(() => {
    if (near1) {
      dispatch(locationRemoveAction('어은동'));
    } else {
      dispatch(locationAddAction('어은동'));
    }
    setNear1(!near1);
  }, [near1]);

  const onCheckNear2 = useCallback(() => {
    if (near2) {
      dispatch(locationRemoveAction('궁동'));
    } else {
      dispatch(locationAddAction('궁동'));
    }
    setNear2(!near2);
  }, [near2]);

  const onSubmitKeyword = useCallback((e) => {
    e.preventDefault();
    dispatch({
      type: FILTER_KEYWORD,
      data: keyword,
    });
  }, [keyword]);

  const onHashtagDelete = useCallback((content) => {
    dispatch({
      type: FILTER_HASHTAG_REMOVE,
      data: content,
    });
  }, []);

  const onHashAllRemove = useCallback(() => {
    dispatch({
      type: FILTER_HASHTAG_REMOVE_ALL,
    });
  }, []);

  return (
    <div>
      <div className="divide-y">
        <div className="flex justify-between py-3">
          <MainTextWrapper>
            상세검색
          </MainTextWrapper>
          <MainTextWrapper
            onClick={onClear}
            className="cursor-pointer hover:text-blue-500"
          >
            필터 초기화
          </MainTextWrapper>
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer"
            onClick={keywordFilterToggle}
          >
            <TextWrapper>
              키워드
            </TextWrapper>
            {keywordFilter
              ? <FiMinus />
              : <FiPlus />}
          </div>
          {keywordFilter
            ? (
              <Form onSubmit={onSubmitKeyword}>
                <InputGroup className="h-8 mb-3">
                  <Form.Control
                    className="rounded-full border-none text-sm"
                    placeholder="검색어를 입력하세요"
                    onChange={onChangeKeyword}
                  />
                  <InputGroup.Append>
                    <InputGroup.Text
                      type="submit"
                      className="text-gray-400 border-none bg-white h-8 rounded-br-full rounded-tr-full"
                    >
                      <AiOutlineSearch />
                    </InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Form>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer"
            onClick={locationFilterToggle}
          >
            <TextWrapper>
              위치
            </TextWrapper>
            {locationFilter
              ? <FiMinus />
              : <FiPlus />}
          </div>
          {locationFilter
            ? (
              <Form className="mb-3">
                <Form.Check checked={north} onChange={onCheckNorth} label="북측" />
                <Form.Check checked={east} onChange={onCheckEast} label="동측" />
                <Form.Check checked={west} onChange={onCheckWest} label="서측" />
                <Form.Check checked={near1} onChange={onCheckNear1} label="어은동" />
                <Form.Check checked={near2} onChange={onCheckNear2} label="궁동" />
              </Form>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer"
            onClick={priceFilterToggle}
          >
            <TextWrapper>
              금액
            </TextWrapper>
            {priceFilter
              ? <FiMinus />
              : <FiPlus />}
          </div>
          {priceFilter
            ? (<RangeSlider />)
            : (<></>)}
        </div>
        <div>
          <div
            className="flex item-center py-3 justify-between cursor-pointer"
            onClick={dateFilterToggle}
          >
            <TextWrapper>
              날짜
            </TextWrapper>
            {dateFilter
              ? <FiMinus className="mt-1" />
              : <FiPlus className="mt-1" />}
          </div>
          {dateFilter
            ? (
              <div className="mb-3">
                <NewCalender data={date} setData={setDate} />
              </div>
            )
            : (
              <></>
            )}
        </div>
        <div>
          <div className="flex items-center py-3 justify-between cursor-pointer">
            <TextWrapper>
              해시 태그
            </TextWrapper>
            <IoCloseOutline className="cursor-pointer text-lg" onClick={onHashAllRemove} />
          </div>
          <div>
            {hashtags.map((tags) => (
              <div className="inline-flex bg-blue-100 rounded px-2 py-1 mx-2 items-center mb-2">
                <HashtagWrapper>
                  {tags.content}
                </HashtagWrapper>
                <IoClose className="ml-1 cursor-pointer" onClick={() => onHashtagDelete(tags.content)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
