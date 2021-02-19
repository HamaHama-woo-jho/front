export const initialState = {
  pageData: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  mainPosts: [],
};

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const CLEAR_PAGE_DATA = 'CLEAR_PAGE_DATA';

export const addChatRequestAction = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const loadPostsRequestAction = (page) => ({
  type: LOAD_POSTS_REQUEST,
  data: page,
});

const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_POSTS_REQUEST:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: null,
      };
    case LOAD_POSTS_SUCCESS: {
      return {
        ...state,
        pageData: action.data.lastId,
        loadPostsLoading: false,
        loadPostsDone: true,
        mainPosts: [...state.mainPosts, ...action.data.posts],
      };
    }
    case LOAD_POSTS_FAILURE:
      return {
        ...state,
        loadPostsLoading: true,
        loadPostsDone: false,
        loadPostsError: action.error,
      };
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostrror: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: action.error,
      };
    case CLEAR_PAGE_DATA:
      return {
        ...state,
        pageData: null,
      };
    default:
      return state;
  }
};

export default reducer;
