import { take, call, put, select } from "redux-saga/effects"
import {
  requestArticles,
  failArticles,
  ARTICLES_FETCH,
  ARTICLES_FETCH_FAKE,
  successArticles,
} from "../actions/articlesActions"
import { Article } from "../reducers/articles"
import { fakeRequest } from "../api"
import { rootState } from "../reducers"

export function* watchFetchArticles() {
  while (true) {
    const action: ARTICLES_FETCH = yield take(ARTICLES_FETCH)
    const number = action.payload

    try {
      yield put(requestArticles())
      const articles: Array<Article> = yield call(() => {
        return fakeRequest(number).then((response) => {
          return response
        })
      })
      if (articles.length) {
        yield put(successArticles(articles))
      } else {
        yield put(failArticles("Пустое тело ответа"))
      }
    } catch (error) {
      yield put(failArticles("Ошибка сервера"))
    }
  }
}

const getArticlesFromStore = (state: rootState) => state.articles.data

export function* watchFakePagFetchArticles() {
  while (true) {
    yield take(ARTICLES_FETCH_FAKE)
    try {
      const articles = yield select(getArticlesFromStore)

      yield put(requestArticles())

      yield call(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 1000)
        })
      })
      if (articles.length) {
        yield put(successArticles(articles))
      } else {
        yield put(failArticles("Пустое тело ответа"))
      }
    } catch (error) {
      yield put(failArticles("Ошибка сервера"))
    }
  }
}
