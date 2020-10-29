import * as t from "./articles"
import { arrayArticles } from "../api"

it("getVisibleArticles(): test", () => {
  expect(
    t.getVisibleArticles({
      articles: {
        last: null,
        status: "Loading",
        data: arrayArticles,
      },
    })
  ).toEqual(arrayArticles)
})

it("getVisibleArticles(): test not visible", () => {
  expect(
    t.getVisibleArticles({
      articles: {
        last: null,
        status: "Loading",
        data: arrayArticles.map((a) =>
          a.id === 1 ? { ...a, visible: true } : a
        ),
      },
    })
  ).toEqual(
    arrayArticles.map((a) => (a.id === 1 ? { ...a, visible: true } : a))
  )
})

it("getStatusArticles: test", () => {
  expect(
    t.getStatusArticles({
      articles: {
        last: null,
        status: "Loading",
        data: arrayArticles,
      },
    })
  ).toEqual("Loading")
})

it("getLast: test", () => {
  expect(
    t.getLast({
      articles: {
        last: 1,
        status: "Loading",
        data: arrayArticles,
      },
    })
  ).toEqual(1)
})
