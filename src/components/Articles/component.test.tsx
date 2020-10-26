import * as React from "react"

import { Articles, Props } from "."
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

    it("no item", () => {
      expect(articlesContainer.find("Link")).toHaveLength(2)
    })
  })
})
