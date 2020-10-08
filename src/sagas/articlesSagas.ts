import {
  clearArticles,
  ARTICLES_FETCH
} from "../actions/articlesActions"
import { take, call, put, select } from "redux-saga/effects"

export function* watchFetchArticles() {
  while (true) {
    yield take(ARTICLES_FETCH)
    yield call(() => {})
    yield select(() => {})
    try {
      yield put(clearArticles())
    } catch (error) {
      yield put(clearArticles())
    }
  }
}