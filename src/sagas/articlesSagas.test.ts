import { put, take, call, select } from "redux-saga/effects"
import { watchFetchArticles } from "./articlesSagas"
import sagaHelper from "redux-saga-testing"
import * as t from "actions/articlesActions"
import { arrayArticles, fakeRequest } from "api"
import { successArticles } from "actions/articlesActions"
import { rootState } from "reducers"

const api = jest.fn(() => [])

const getArticlesFromStore = (state: rootState) => state.articles.data

describe("watchFetchArticles", () => {
  describe("1 always ok", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: undefined }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return [arrayArticles[5]]
    })

    it("and then put", (result) => {
      expect(result).toEqual(put(t.requestArticles()))
    })

    it("test api", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(
          call(() => {
            return fakeRequest().then((response) => {
              return response
            })
          })
        )
      )
      expect(api).not.toHaveBeenCalled()
      return [arrayArticles[5]]
    })

    it("and then put successArticles", (result) => {
      expect(result).toEqual(put(successArticles([arrayArticles[5]])))
    })
  })
})
