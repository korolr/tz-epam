import React, { FunctionComponent } from "react"
import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
}

export const Header: FunctionComponent<Props> = (props) => {
  return (
    <div className="container">
      <div className="row header">
        <div className="col-xs-4">
          <input type="text" name="Search" className="header-searchText" />
        </div>
        <div className="col-xs-4 header-name">
          <p>Blog</p>
        </div>
        <div className="col-xs-1"></div>
        <div className="col-xs-3 header-searchDate">
          <input
            type="text"
            name="Search"
            className="header-searchDate-input"
          />
          <button className="header-searchDate-button">Date</button>
        </div>
      </div>
    </div>
  )
}
