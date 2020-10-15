import { all } from "redux-saga/effects"
import { watchFetchArticles } from "sagas/articlesSagas"
export function* rootSaga() {
  yield all([watchFetchArticles()])
}
