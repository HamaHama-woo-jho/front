export const initialState = {
  pageData: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  inPostLoading: false,
  inPostDone: false,
  inPostError: null,
  mainPosts: [],
};

export const IN_POST_REQUEST = 'IN_POST_REQUEST';
export const IN_POST_SUCCESS = 'IN_POST_SUCCESS';
export const IN_POST_FAILURE = 'IN_POST_FAILURE';

export const OUT_POST_REQUEST = 'OUT_POST_REQUEST';
export const OUT_POST_SUCCESS = 'OUT_POST_SUCCESS';
export const OUT_POST_FAILURE = 'OUT_POST_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';
export const CLEAR_PAGE_DATA = 'CLEAR_PAGE_DATA';

export const outPostRequestAction = (data) => ({
  type: OUT_POST_REQUEST,
  data,
});

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
    case IN_POST_REQUEST:
      return {
        ...state,
        inPostLoading: true,
        inPostDone: false,
        inPostError: null,
      };
    case IN_POST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      //const post = state.mainPosts.find((v) => v.id === action.data.PostId);
      //console.log(post);
      //post.Participants.push({ id: action.data.UserId });
      return {
        ...state,
        inPostLoading: false,
        inPostDone: true,
      };
    case IN_POST_FAILURE:
      return {
        ...state,
        inPostLoading: true,
        inPostDone: false,
        inPostError: action.data,
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
