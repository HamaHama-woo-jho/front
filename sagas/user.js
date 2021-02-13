import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST,
  LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST,
  CHECKID_SUCCESS, CHECKID_FAILURE, CHECKID_REQUEST,
} from '../reducers/user';

// function logInAPI(data) {
//   return axios.post('/api/login', data);
// }

// function logOutAPI() {
//   return axios.get('/api/logout');
// }

function signUpAPI(data) {
  return axios.post('/user', data);
}

function checkIdAPI(data) {
  return axios.post('/user/checkid', data);
}

function* login(action) {
  try {
    yield delay(1000);
    yield put({
      type: LOGIN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOGIN_FAILURE,
      data: err.response.data,
    });
  }
}

function* logout() {
  try {
    yield delay(1000);
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: LOGOUT_FAILURE,
      data: err.response.data,
    });
  }
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log(result);
    yield put({
      type: SIGNUP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGNUP_FAILURE,
      data: err.response.data,
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
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
    fork(watchChekId),
  ]);
}
