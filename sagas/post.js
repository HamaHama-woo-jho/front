import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS,
  ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
  IN_POST_SUCCESS, IN_POST_FAILURE, IN_POST_REQUEST,
  OUT_POST_SUCCESS, OUT_POST_FAILURE, OUT_POST_REQUEST,
  REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST,
  REPORT_POST_SUCCESS, REPORT_POST_FAILURE, REPORT_POST_REQUEST,
  REPORT_INFO_SUCCESS, REPORT_INFO_FAILURE, REPORT_INFO_REQUEST,
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

function removePostAPI(data) {
  return axios.delete(`/post/${data}`);
}

function reportPostAPI(data) {
  return axios.post('/post/report', data);
}

function reportInfoAPI(data) {
  return axios.post(`/post/${data}/report`, data);
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

function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    console.log('포스트가 삭제되었습니다.', result);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* reportPost(action) {
  try {
    const result = yield call(reportPostAPI, action.data);
    yield put({
      type: REPORT_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REPORT_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function* reportInfo(action) {
  try {
    const result = yield call(reportInfoAPI, action.data);
    yield put({
      type: REPORT_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: REPORT_INFO_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchReportInfo() {
  yield takeLatest(REPORT_INFO_REQUEST, reportInfo);
}

function* watchReportPost() {
  yield takeLatest(REPORT_POST_REQUEST, reportPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
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
    fork(watchReportInfo),
    fork(watchReportPost),
    fork(watchRemovePost),
    fork(watchOutPost),
    fork(watchInPost),
    fork(watchLoadPosts),
    fork(watchAddPost),
  ]);
}
