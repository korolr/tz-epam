import { initialState, articlesReducer } from "reducers/articles"
import * as t from "actions/articlesActions"
import { arrayArticles } from "api"

describe("articles reducer", () => {
  it("ARTICLES_REQUEST", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_REQUEST,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: [],
      status: "Loading",
    })
  })

  it("ARTICLES_SUCCESS", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_SUCCESS,
      payload: arrayArticles,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      status: null,
      data: arrayArticles,
    })
  })

  it("ARTICLES_FAIL", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_FAIL,
      payload: "fail",
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      status: "fail",
    })
  })

  it("ARTICLES_CLEAR", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_CLEAR,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: [],
      status: null,
    })
  })

  it("ARTICLES_VIEWED", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_VIEWED,
      payload: 1,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: initialState.data.map((a) =>
        a.id === 1 ? { ...a, viewed: true } : a
      ),
    })
  })

  it("ARTICLES_STATUS", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_STATUS,
      payload: 1,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      last: 1,
    })
  })

  it("ARTICLES_EDIT", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_EDIT,
      payload: { id: 1, data: arrayArticles[5] },
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: initialState.data.map((a) => (a.id === 1 ? arrayArticles[5] : a)),
    })
  })

  it("ARTICLES_ADD", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_ADD,
      payload: arrayArticles[5],
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: [...initialState.data, ...[action.payload]],
    })
  })

  it("ARTICLES_REMOVE", () => {
    const action: t.articlesAction = {
      type: t.ARTICLES_REMOVE,
      payload: 1,
    }

    expect(articlesReducer(initialState, action)).toEqual({
      ...initialState,
      data: initialState.data.filter((a) => (a.id !== 1 ? a : false)),
    })
  })
})
