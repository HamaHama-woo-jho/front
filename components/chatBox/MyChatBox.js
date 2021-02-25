import React from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Price, Title, TextWrapper } from './style';

const MyChatBox = ({ post }) => {
  const num2currency = (num) => num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,').split('.')[0];

  return (
    <div className="rounded flex border h-24 my-2 pr-2">
      <div className="w-28">
        <img src={post.img} alt="" className="w-full h-full" />
      </div>
      <div className="pl-2 flex w-full justify-between">
        <div>
          <Title>
            {post.title}
          </Title>
          <div className="text-xs text-gray-400 flex">
            <span>{post.location}</span>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper>{post.curPersonnel} / {post.personnel}</TextWrapper>
            <TextWrapper> ⋅ </TextWrapper>
            <TextWrapper>
              {post.to.split('-')[1][0] === '0' ? post.to.split('-')[1][1] : post.to.split('-')[1]}월 {post.to.split('-')[2]}일까지
            </TextWrapper>
          </div>
          <div>
            <TextWrapper>인당 </TextWrapper>
            {post.isDivide
              ? (
                <Price>{num2currency(Math.round(post.price / post.personnel))}</Price>
              )
              : (
                <Price>{num2currency(Math.round(post.price))}</Price>
              )}
            <TextWrapper> 원</TextWrapper>
          </div>
        </div>
        <div className="w-16 my-auto">
          <Button>
            하이하이
          </Button>
        </div>
      </div>
    </div>
  );
};

MyChatBox.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    title: PropTypes.string,
    personnel: PropTypes.number,
    curPersonnel: PropTypes.number,
    from: PropTypes.object,
    to: PropTypes.object,
    location: PropTypes.string,
    price: PropTypes.number,
    link: PropTypes.string,
    img: PropTypes.string,
    textArea: PropTypes.string,
    createdAt: PropTypes.string,
    Participants: PropTypes.arrayOf(PropTypes.object),
    isDivide: PropTypes.bool,
  }).isRequired,
};

export default MyChatBox;
