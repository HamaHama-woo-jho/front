import { all, fork, put, takeLatest, delay } from 'redux-saga/effects';
// import axios from 'axios';
import { LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, generateDummyPost } from '../reducers/post';

// function loadPostsAPI(data) {
//   return axios.post('/api/loadpost', data);
// }

function* loadPosts() {
  try {
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(20),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPosts() {
  yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
  ]);
}
