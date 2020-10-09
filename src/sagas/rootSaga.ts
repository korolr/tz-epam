import { all } from "redux-saga/effects"
import { watchFetchArticles, watchFakePagFetchArticles } from "./articlesSagas"
export function* rootSaga() {
  yield all([watchFetchArticles(), watchFakePagFetchArticles()])
}
