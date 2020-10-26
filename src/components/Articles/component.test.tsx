import * as React from "react"

import { Articles, Props } from "."
import { Paginator } from "../Paginator"

import { arrayArticles } from "../../api"
import { shallow } from "enzyme"

describe("Articles", () => {
  describe("Articles with edit false", () => {
    const props: Props = {
      articles: arrayArticles,
      id: null,
      removeArticle: (a: number) => null,
      fetchArticles: (a: number) => null,
      editMode: false,
    }
    const articlesContainer = shallow(<Articles {...props} />)

    it("how many data", () => {
      expect(articlesContainer.find(".row")).toHaveLength(15)
    })

    it("edit off", () => {
      expect(articlesContainer.find("Link")).toHaveLength(30)
    })

    it("paginator hase", () => {
      expect(articlesContainer.find(Paginator)).toHaveLength(1)
    })

    it("how many pag number", () => {
      expect(
        articlesContainer.find(Paginator).dive().find("Link")
      ).toHaveLength(5)
    })
  })

  describe("Articles with edit true and 5 data", () => {
    const props: Props = {
      articles: arrayArticles.slice(0, 4),
      id: null,
      removeArticle: (a: number) => null,
      fetchArticles: (a: number) => null,
      editMode: true,
    }
    const articlesContainer = shallow(<Articles {...props} />)

    it("how many data", () => {
      expect(articlesContainer.find(".row")).toHaveLength(4)
    })

    it("edit off", () => {
      expect(articlesContainer.find("Link")).toHaveLength(12)
    })

    it("paginator hase", () => {
      expect(articlesContainer.find(Paginator)).toHaveLength(1)
    })

    it("how many pag number", () => {
      expect(
        articlesContainer.find(Paginator).dive().find("Link")
      ).toHaveLength(5)
    })
  })
})
