import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FILTER_HASHTAG } from '../../reducers/filter';

const PostCardContent = ({ postData, hashData }) => {
  const dispatch = useDispatch();
  const onHashtag = (value) => {
    // e.preventDefault();
    console.log('해시 데이터: ', hashData);
    const data = hashData.find((tag) => tag.content === value.slice(1));
    console.log('누구냐: ', data);
    dispatch({
      type: FILTER_HASHTAG,
      data,
    });
    console.log('클릭: ', value);
  };

  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <span
              className="cursor-pointer text-blue-500 hover:bg-indigo-100"
              // value={v}
              onClick={() => onHashtag(v)}
            >
              {v}
            </span>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  hashData: PropTypes.array.isRequired,
};

export default PostCardContent;
