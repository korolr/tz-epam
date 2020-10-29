import * as t from "./articlesActions"
import { Article } from "reducers/articles"

it("requestArticles(): test", () => {
  const expectedAction = {
    type: t.ARTICLES_REQUEST,
  }
  expect(t.requestArticles()).toEqual(expectedAction)
})

it("successArticles(): test", () => {
  const data: Array<Article> = [
    {
      id: 1,
      title: "",
      priview: "",
      text: "",
      date: "",
      image: "",
      visible: false,
      viewed: false,
    },
  ]
  const expectedAction = {
    type: t.ARTICLES_SUCCESS,
    payload: data,
  }
  expect(t.successArticles(data)).toEqual(expectedAction)
})

it("failArticles(): test", () => {
  const data = "error"
  const expectedAction = {
    type: t.ARTICLES_FAIL,
    payload: data,
  }
  expect(t.failArticles(data)).toEqual(expectedAction)
})

it("clearArticles(): test", () => {
  const expectedAction = {
    type: t.ARTICLES_CLEAR,
  }
  expect(t.clearArticles()).toEqual(expectedAction)
})

it("fetchArticles(): test", () => {
  const data = 1
  const expectedAction = {
    type: t.ARTICLES_FETCH,
    payload: data,
  }
  expect(t.fetchArticles(data)).toEqual(expectedAction)
})

it("setArticlesViewed(): test", () => {
  const data = 1
  const expectedAction = {
    type: t.ARTICLES_VIEWED,
    payload: data,
  }
  expect(t.setArticlesViewed(data)).toEqual(expectedAction)
})

it("editArticle(): test", () => {
  const id = 1
  const data: Article = {
    id: 1,
    title: "",
    priview: "",
    text: "",
    date: "",
    image: "",
    visible: false,
    viewed: false,
  }

  const expectedAction = {
    type: t.ARTICLES_EDIT,
    payload: { id, data },
  }
  expect(t.editArticle(id, data)).toEqual(expectedAction)
})

it("addArticle(): test", () => {
  const data: Article = {
    id: 1,
    title: "",
    priview: "",
    text: "",
    date: "",
    image: "",
    visible: false,
    viewed: false,
  }

  const expectedAction = {
    type: t.ARTICLES_ADD,
    payload: data,
  }
  expect(t.addArticle(data)).toEqual(expectedAction)
})

it("removeArticle(): test", () => {
  const data = 1
  const expectedAction = {
    type: t.ARTICLES_REMOVE,
    payload: data,
  }
  expect(t.removeArticle(data)).toEqual(expectedAction)
})

it("setStatusArticles(): test", () => {
  const data = 1
  const expectedAction = {
    type: t.ARTICLES_STATUS,
    payload: data,
  }
  expect(t.setStatusArticles(data)).toEqual(expectedAction)
})
