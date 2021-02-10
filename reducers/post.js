import faker from 'faker';
import shortId from 'shortid';

export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 123,
        nickname: 'Hama',
      },
      title: '하마 공구',
      personnel: 5,
      curPersonnel: 3,
      from: '2021-02-09T03:00:00.000Z',
      to: '2021-02-13T03:00:00.000Z',
      location: '북측',
      price: 60000,
      link: 'https://namu.wiki/w/%ED%95%98%EB%A7%88',
      textArea: '안녕하세요 하마 공구하고 싶어서 올려봅니다 총총 @)))))',
      tag: [
        {
          content: 'tag1',
        },
        {
          content: 'tag2',
        },
      ],
    },
  ],
};

const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      title: faker.name.jobTitle(),
      personnel: 7,
      curPersonnel: 1,
      from: faker.date.past(),
      to: faker.date.future(),
      location: '어은동',
      price: Number(faker.commerce.price()) * 100,
      link: 'http://item.gmarket.co.kr/Item?goodscode=995511248',
      textArea: faker.lorem.sentence(),
      tag: [
        {
          content: '수능대박',
        },
        {
          content: '컴싸',
        },
        {
          content: '모나미',
        },
      ],
    }));

export const ADD_CHAT = 'ADD_CHAT';

export const addChatAction = (data) => ({
  type: ADD_CHAT,
  data,
});

const reducer = (
  state = { ...initialState, mainPosts: generateDummyPost(20) },
  action
) => {
  switch (action.type) {
    case ADD_CHAT:
      return {
        ...state,
        mainPosts: [action.data, ...state.mainPosts], //postAdded 없으면 어떻게 됨?
      };
    default:
      return state;
  }
};

export default reducer;
