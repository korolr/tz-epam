import React, { FunctionComponent } from "react"

import { Articles } from "./Articles"
import { Article } from "../reducers/articles"

interface Props {
  clearArticles: () => void
  articles: Array<Article>
  fetchArticles: (number: number) => void
  error: string | null
}

export const articlesWrapper = (
  WrappedComponent: FunctionComponent<Props>,
  props: Props
) => {
  return function () {
    const { articles, error } = props
    if (error) {
      return (
        <div className="container article">
          <div className="row">
            <div className="col-xs-12">
              <h1>{error}</h1>
            </div>
          </div>
        </div>
      )
    } else if (!articles.length) {
      return (
        <div className="container article">
          <div className="row">
            <div className="col-xs-12">
              <h1>Loading Articles</h1>
            </div>
          </div>
        </div>
      )
    } else {
      return <WrappedComponent {...props} />
    }
  }
}
