import React, { FunctionComponent } from "react"
import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
}

export const Header: FunctionComponent<Props> = (props) => {
  return (
    <div className="container article">
      <div className="row">
        <div className="col-xs-12">
          <h1>{props.children}</h1>
        </div>
      </div>
    </div>
  )
}
