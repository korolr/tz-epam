import { all } from "redux-saga/effects"
import {
  watchFetchArticles,
  watchFakePagFetchArticles,
} from "sagas/articlesSagas"
export function* rootSaga() {
  yield all([watchFetchArticles(), watchFakePagFetchArticles()])
}
