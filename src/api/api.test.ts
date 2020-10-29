import * as t from "./"
import { Article } from "reducers/articles"

it("fakeRequest(): test", async () => {
  expect.assertions(1)
  const data = await t.fakeRequest()
  expect(data).toEqual(t.arrayArticles)
})

it("fakeRequest(): test", async () => {
  expect.assertions(1)
  const data = await t.fakeRequest(1)
  expect(data).toEqual(t.getArticles(1))
})

it("getArticles(): test", () => {
  expect(t.getArticles(2)).toEqual(
    t.arrayArticles.slice((2 - 1) * 5, (2 - 1) * 5 + 5)
  )
})

it("getArticles(): test", () => {
  const test_data = t.arrayArticles.slice(10, 15)
  expect(t.getArticles(3)).toEqual(test_data)
})

it("getArticles(): test big number", () => {
  const test_data: Array<Article> = []
  expect(t.getArticles(100)).toEqual(test_data)
})

it("setArticles(): test", () => {
  expect.assertions(1)
  t.setArticles([])
  expect(t.arrayArticles).toEqual([])
})
