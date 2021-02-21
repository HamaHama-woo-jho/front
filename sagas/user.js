import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE,
  LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST,
  LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST,
  CHECKID_SUCCESS, CHECKID_FAILURE, CHECKID_REQUEST,
} from '../reducers/user';

function loadmyinfoAPI() {
  return axios.get('/user');
}

function logInAPI(data) {
  return axios.post('/user/login', data);
}

function logOutAPI() {
  return axios.post('/user/logout');
}

function signUpAPI(data) {
  return axios.post('/user', data);
}

function checkIdAPI(data) {
  return axios.post('/user/checkid', data);
}

function* loadmyinfo(action) {
  try {
    const result = yield call(loadmyinfoAPI, action.data);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err.response.data,
    });
  }
}

function* login(action) {
  try {
    const result = yield call(logInAPI, action.data);
    console.log(result);
    yield put({
      type: LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logout() {
  try {
    yield call(logOutAPI);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signUp(action) {
  try {
    yield call(signUpAPI, action.data);
    yield call(logInAPI, { id: action.data.id, password: action.data.password });
    yield put({
      type: SIGNUP_SUCCESS,
      data: action.data,
    });
    yield put({
      type: LOGIN_SUCCESS,
      data: { id: action.data.id, password: action.data.password },
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      error: err.response.data,
    });
  }
}

function* checkId(action) {
  try {
    const result = yield call(checkIdAPI, action.data);
    console.log(result);
    yield put({
      type: CHECKID_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: CHECKID_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadmyinfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadmyinfo);
}

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signUp);
}

function* watchChekId() {
  yield takeLatest(CHECKID_REQUEST, checkId);
}

export default function* userSaga() {
  yield all([
    fork(watchLoadmyinfo),
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChekId),
  ]);
}
