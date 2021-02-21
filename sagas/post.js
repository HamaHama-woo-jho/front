import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS,
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
  IN_POST_SUCCESS, IN_POST_FAILURE, IN_POST_REQUEST,
  OUT_POST_SUCCESS, OUT_POST_FAILURE, OUT_POST_REQUEST,
} from '../reducers/post';

function outPostAPI(data) {
  return axios.delete(`/post/${data}/out`);
}

function inPostAPI(data) {
  return axios.patch(`/post/${data}/in`);
}

function loadPostsAPI(data) {
  return axios.post('/posts', data);
}

function addPostAPI(data) {
  return axios.post('/post/add', data);
}

function* outPost(action) {
  try {
    const result = yield call(outPostAPI, action.data);
    yield put({
      type: OUT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OUT_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* inPost(action) {
  try {
    const result = yield call(inPostAPI, action.data);
    yield put({
      type: IN_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IN_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* loadPosts(action) {
  try {
    const result = yield call(loadPostsAPI, action.data);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    console.log('포스트가 등록되었습니다.', result);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchOutPost() {
  yield takeLatest(OUT_POST_REQUEST, outPost);
}

function* watchInPost() {
  yield takeLatest(IN_POST_REQUEST, inPost);
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

export default function* postSaga() {
  yield all([
    fork(watchOutPost),
    fork(watchInPost),
    fork(watchLoadPosts),
    fork(watchAddPost),
  ]);
}
