import { take, call, put } from "redux-saga/effects"
import {
  requestArticles,
  failArticles,
  ARTICLES_FETCH,
  successArticles,
} from "../actions/articlesActions"
import { Article } from "../reducers/articles"
import { fakeRequest } from "../api"

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
