import { all } from "redux-saga/effects"
import {
  watchFetchArticles
} from "./articlesSagas"
export function* rootSaga() {
  yield all([watchFetchArticles()])
}