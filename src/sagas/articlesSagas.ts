import { take, call, put, select } from "redux-saga/effects"
import {
  requestArticles,
  failArticles,
  ARTICLES_FETCH,
  ARTICLES_FETCH_FAKE,
  successArticles,
} from "actions/articlesActions"
import { Article } from "reducers/articles"
import { fakeRequest, setArticles, arrayArticles } from "api"
import { rootState } from "reducers"

const getArticlesFromStore = (state: rootState) => state.articles.data

export function* watchFetchArticles() {
  while (true) {
    const action: ARTICLES_FETCH = yield take(ARTICLES_FETCH)
    const number = action.payload

    const articlesStore: Array<Article> = yield select(getArticlesFromStore)

    const newGlobalStore = arrayArticles.map((i) => {
      for (let j of articlesStore) {
        if (i.id === j.id) {
          return j
        }
      }
      return i
    })

    setArticles(newGlobalStore)

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
