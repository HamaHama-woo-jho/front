import Router from 'next/router';

const initialState = {
  loadmyinfoLoading: false,
  loadmyinfoDone: false,
  loadmyinfoError: null,
  loginLoading: false,
  loginDone: false,
  loginError: null,
  logoutLoading: false,
  logoutDone: false,
  logoutError: null,
  signupLoading: false,
  signupDone: false,
  signupError: null,
  checkLoading: false,
  checkDone: false,
  checkError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOAD_MY_INFO_REQUEST = 'LOAD_MY_INFO_REQUEST';
export const LOAD_MY_INFO_SUCCESS = 'LOAD_MY_INFO_SUCCESS';
export const LOAD_MY_INFO_FAILURE = 'LOAD_MY_INFO_FAILURE';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const CHECKID_REQUEST = 'CHECKID_REQUEST';
export const CHECKID_SUCCESS = 'CHECKID_SUCCESS';
export const CHECKID_FAILURE = 'CHECKID_FAILURE';

export const loginRequestAction = (data) => ({
  type: LOGIN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOGOUT_REQUEST,
});

export const signupRequsetAction = (data) => ({
  type: SIGNUP_REQUEST,
  data,
});

export const checkidAction = (data) => ({
  type: CHECKID_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MY_INFO_REQUEST:
      return {
        ...state,
        loadmyinfoLoading: true,
        loadmyinfoDone: false,
        loadmyinfoError: null,
      };
    case LOAD_MY_INFO_SUCCESS:
      return {
        ...state,
        loadmyinfoLoading: false,
        loadmyinfoDone: true,
        me: action.data,
      };
    case LOAD_MY_INFO_FAILURE:
      return {
        ...state,
        loadmyinfoLoading: false,
        loadmyinfoError: action.error,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOGIN_SUCCESS:
      Router.push('/');
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.error,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
      };
    case LOGOUT_SUCCESS:
      Router.push('/');
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        me: null,
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };
    case SIGNUP_REQUEST:
      return {
        ...state,
        signupLoading: true,
        signupDone: false,
        signupError: null,
      };
    case SIGNUP_SUCCESS:
      Router.push('/');
      return {
        ...state,
        signupLoading: false,
        signupDone: true,
        loginDone: true,
        me: action.data,
      };
    case SIGNUP_FAILURE:
      return {
        ...state,
        signupLoading: false,
        signupError: action.error,
      };
    case CHECKID_REQUEST:
      return {
        ...state,
        checkLoading: true,
        checkDone: false,
        checkError: null,
      };
    case CHECKID_SUCCESS:
      return {
        ...state,
        checkLoading: false,
        checkDone: true,
      };
    case CHECKID_FAILURE:
      return {
        ...state,
        checkLoading: false,
        checkError: 1,
      };
    case 'SIGN_UP':
      return {
        ...state,
        isLoggedIn: true,
        me: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
