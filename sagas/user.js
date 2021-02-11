import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST } from '../reducers/user';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {
  console.log('안녕하세요');
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

function* watchLogIn() {
  console.log('로그인 리스너');
  yield takeLatest(LOGIN_REQUEST, login);
}

export default function* userSaga() {
  yield all([
    fork(watchLogIn),
  ]);
}
