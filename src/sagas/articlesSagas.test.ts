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

  describe("2 test arguments", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: 5 }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return arrayArticles
    })

    it("and then put", (result) => {
      expect(result).toEqual(put(t.requestArticles()))
    })

    it("test api", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(
          call(() => {
            return fakeRequest(5).then((response) => {
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

  describe("2 test store add article", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: undefined }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return arrayArticles.push(arrayArticles[1])
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
      return arrayArticles
    })

    it("and then put successArticles", (result) => {
      expect(result).toEqual(put(successArticles(arrayArticles)))
    })
  })

  describe("2 test store update change", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: undefined }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return arrayArticles.filter((a) => (a.id !== 1 ? a : false))
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
      return arrayArticles
    })

    it("and then put successArticles", (result) => {
      expect(result).toEqual(put(successArticles(arrayArticles)))
    })
  })

  describe("test error articles", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: undefined }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return []
    })

    it("and then put", (result) => {
      expect(result).toEqual(put(t.requestArticles()))
    })

    it("test api", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(
          call(() => {
            return fakeRequest(50).then((response) => {
              return response
            })
          })
        )
      )
      expect(api).not.toHaveBeenCalled()
      return []
    })

    it("and then put successArticles", (result) => {
      expect(result).toEqual(put(t.failArticles("Пустое тело ответа")))
    })
  })

  describe("error api", () => {
    const it = sagaHelper(watchFetchArticles())

    it("and then trigger watchFetchArticles", (result) => {
      expect(result).toEqual(take(t.ARTICLES_FETCH))
      return { payload: undefined }
    })

    it("test select", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(select(getArticlesFromStore))
      )
      return []
    })

    it("and then put", (result) => {
      expect(result).toEqual(put(t.requestArticles()))
    })

    it("test api", (result) => {
      expect(JSON.stringify(result)).toEqual(
        JSON.stringify(
          call(() => {
            return new Error()
          })
        )
      )
      expect(api).not.toHaveBeenCalled()
      return new Error()
    })

    it("and then put successArticles", (result) => {
      expect(result).toEqual(put(t.failArticles("Ошибка сервера")))
    })
  })
})
