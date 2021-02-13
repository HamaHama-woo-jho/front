import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
// import axios from 'axios';
import {
  LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST,
  LOGOUT_SUCCESS, LOGOUT_FAILURE, LOGOUT_REQUEST,
  SIGNUP_SUCCESS, SIGNUP_FAILURE, SIGNUP_REQUEST,
} from '../reducers/user';

// function logInAPI(data) {
//   return axios.post('/api/login', data);
// }

// function logOutAPI() {
//   return axios.get('/api/logout');
// }

// function signUpAPI() {
//   return axios.get('/api/signup');
// }

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

function* signup() {
  try {
    yield delay(1000);
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

function* watchLogIn() {
  yield takeLatest(LOGIN_REQUEST, login);
}

function* watchLogOut() {
  yield takeLatest(LOGOUT_REQUEST, logout);
}

function* watchSignUp() {
  yield takeLatest(SIGNUP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
    fork(watchLogOut),
    fork(watchSignUp),
  ]);
}
