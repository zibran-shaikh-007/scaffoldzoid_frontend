import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from "axios"
import { NotificationManager } from 'react-notifications';


import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,

} from '../actions';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,

} from './actions';
import { setCurrentUser } from '../../helpers/Utils';
import { API_URL } from "../../apiUrl.js"


export function* watchLoginUser() {
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password, history) =>

  await axios.post(`${API_URL}/user/login`, { email, password })
    .then((user) => {
      /* console.log("user", user) */
      if (user.status === 200) {
        setCurrentUser(user.data.data);
        put(loginUserSuccess(user.data.data));

        NotificationManager.success(user.data.message);
        if (user.data.data.role === "seller") {
          history.push("/seller")
        } else if (user.data.data.role === "buyer") {
          history.push("/buyer")
        }

      } else if (user.status === 206) {
        put(loginUserError(user.data.message))
        NotificationManager.warning(user.data.message);
      }
    })
    .catch((error) => NotificationManager.warning(error));

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  
   yield call(loginWithEmailPasswordAsync, email, password, history);
}

export function* watchRegisterUser() {
  
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (username, email, password, role, history) =>

await axios.post(`${API_URL}/user/register`, { username, email, password, role })
    
    .then((user) => {
    
      if (user.status === 200) {
        put(registerUserSuccess(user.data.data))
        NotificationManager.success(user.data.message);
        history.push('/login')
      } else if (user.status === 206) {
        put(registerUserError(user.data.message))
        NotificationManager.warning(user.data.message);
      }

    })
    .catch((error) => {
     
      NotificationManager.warning(error, 'Registeration Error', 3000, null, null, '')
    });

function* registerWithEmailPassword({ payload }) {
  console.log("value register", payload)
  const { username, email, password, role } = payload.user;
  const { history } = payload;
  try {
    yield call(
      registerWithEmailPasswordAsync,
      username, email, password, role, history

    );
    /* console.log("register user data", registerUser) */

  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {

  yield takeEvery(LOGOUT_USER, logout);
}



function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  history.push("/");

}




export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),

  ]);
}
