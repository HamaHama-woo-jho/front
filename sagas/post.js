import { all, fork, put, takeLatest, delay } from 'react-redux-saga/effects';
import axios from 'axios';

function logInAPI(data) {
  return axios.post('/api/login', data);
}

function* login(action) {

}
