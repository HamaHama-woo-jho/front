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
  outPostLoading: false,
  outPostDone: false,
  outPostError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  reportPostLoading: false,
  reportPostDone: false,
  reportPostError: null,
  reportInfoLoading: false,
  reportInfoDone: false,
  reportInfoError: null,
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

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const REPORT_POST_REQUEST = 'REPORT_POST_REQUEST';
export const REPORT_POST_SUCCESS = 'REPORT_POST_SUCCESS';
export const REPORT_POST_FAILURE = 'REPORT_POST_FAILURE';

export const REPORT_INFO_REQUEST = 'REPORT_INFO_REQUEST';
export const REPORT_INFO_SUCCESS = 'REPORT_INFO_SUCCESS';
export const REPORT_INFO_FAILURE = 'REPORT_INFO_FAILURE';

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
        addPostError: null,
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
      const postin = state.mainPosts.find((v) => v.id === action.data.PostId);
      postin.Participants.push({ id: action.data.UserId });
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
    case OUT_POST_REQUEST:
      return {
        ...state,
        outPostLoading: true,
        outPostDone: false,
        outPostError: null,
      };
    case OUT_POST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const postout = state.mainPosts.find((v) => v.id === action.data.PostId);
      postout.Participants = postout.Participants.filter((v) => v.id !== action.data.UserId);
      return {
        ...state,
        outPostLoading: false,
        outPostDone: true,
      };
    case OUT_POST_FAILURE:
      return {
        ...state,
        outPostLoading: true,
        outPostDone: false,
        outPostError: action.data,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const newPost = state.mainPosts.filter((v) => v.id !== action.data.postId);
      return {
        ...state,
        removePostLoading: false,
        removePostDone: true,
        mainPosts: newPost,
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        removePostLoading: true,
        removePostDone: false,
        removePostError: action.error,
      };
    case REPORT_POST_REQUEST:
      return {
        ...state,
        reportPostLoading: true,
        reportPostDone: false,
        reportPostError: null,
      };
    case REPORT_POST_SUCCESS:
      return {
        ...state,
        reportPostLoading: false,
        reportPostDone: true,
      };
    case REPORT_POST_FAILURE:
      return {
        ...state,
        reportPostLoading: true,
        reportPostDone: false,
        reportPostError: action.error,
      };
    case REPORT_INFO_REQUEST:
      return {
        ...state,
        reportInfoLoading: true,
        reportInfoDone: false,
        reportInfoError: null,
      };
    case REPORT_INFO_SUCCESS:
      // eslint-disable-next-line no-case-declarations
      const post = state.mainPosts.find((v) => v.id === action.data[0].PostId);
      post.Reports = action.data;
      return {
        ...state,
        reportInfoLoading: false,
        reportInfoDone: true,
      };
    case REPORT_INFO_FAILURE:
      return {
        ...state,
        reportInfoLoading: true,
        reportInfoDone: false,
        reportInfoError: action.error,
      };
    case CLEAR_PAGE_DATA:
      return {
        ...state,
        mainPosts: [],
        pageData: null,
      };
    default:
      return state;
  }
};

export default reducer;
