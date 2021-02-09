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

const dummyPost = {
  mainPosts: [
    {
      id: 2,
      User: {
        id: 456,
        nickname: 'IamHama',
      },
      title: '컴싸 공구',
      personnel: 7,
      curPersonnel: 1,
      from: '2021-02-05',
      now: '2021-02-08',
      to: '2021-03-01',
      location: '어은동',
      price: 30000,
      link: 'http://item.gmarket.co.kr/Item?goodscode=995511248',
      textArea: '컴싸 공구하실 고등학생 분들 연락바랍니다 열공합시다 ^^ 화이팅',
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
    },
  ],
};

export const ADD_CHAT = 'ADD_CHAT';

export const addChatAction = (data) => ({
  type: ADD_CHAT,
  data,
});

const reducer = (state = initialState, action) => {
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
