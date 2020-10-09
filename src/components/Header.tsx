import React, { FunctionComponent, useState } from "react"
import { Link, useLocation } from "wouter"

import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
}

export const Header: FunctionComponent<Props> = (props) => {
  const [searchText, setSearchText] = useState("")
  const [, setLocation] = useLocation()
  const keyPressSearchText = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText("")
      setLocation("/search/" + searchText)
    }
  }
  return (
    <div className="container">
      <div className="row header">
        <div className="col-xs-4">
          <input
            type="text"
            name="Search"
            className="header-searchText"
            onChange={(e) => setSearchText(e.target.value)}
            onKeyPress={keyPressSearchText}
          />
        </div>
        <div className="col-xs-4 header-name">
          <Link href="/">
            <p>Blog</p>
          </Link>
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
