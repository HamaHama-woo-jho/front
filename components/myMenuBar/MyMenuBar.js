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
import { CLEAR_FILTER, FILTER_HASHTAG_REMOVE, FILTER_KEYWORD, locationAddAction, FILTER_HASHTAG_REMOVE_ALL, locationRemoveAction } from '../../reducers/filter';

const MyMenuBar = () => {
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
            마이 메뉴
          </MainTextWrapper>
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
            onClick={keywordFilterToggle}
          >
            <TextWrapper>
              신청공구
            </TextWrapper>
          </div>
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
            onClick={keywordFilterToggle}
          >
            <TextWrapper>
              나의 채팅방
            </TextWrapper>
          </div>
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
            onClick={keywordFilterToggle}
          >
            <TextWrapper>
              신청공구
            </TextWrapper>
          </div>
        </div>
        <div>
          <div
            className="flex items-center py-3 justify-between cursor-pointer pl-1 hover:bg-blue-100"
            onClick={keywordFilterToggle}
          >
            <TextWrapper>
              신청공구
            </TextWrapper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMenuBar;
