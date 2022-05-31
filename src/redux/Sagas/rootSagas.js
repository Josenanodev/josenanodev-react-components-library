import { all } from "redux-saga/effects";
import FechasAnunciosSaga from "./FechasAnunciosSaga";

/**
 * Redux Sagas sit between the Actions and Reducers listening for "messages"
 */

export default function* rootSaga(params) {
  console.log(" <---------  Sagas index --------->");
  // console.log(params)
  yield all([
    FechasAnunciosSaga(),
  ]);
}
