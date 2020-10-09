import React, { FunctionComponent } from "react"
import Fuse from "fuse.js"

import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  status: string | null
  text?: string
}

export const SearchText: FunctionComponent<Props> = ({ articles, text }) => {
  const options = {
    keys: ["title", "priview", "text"],
  }
  const fuse = new Fuse(articles, options)
  const searchedAricles = fuse.search(text)
  if (searchedAricles.length === 0) {
    return (
      <div className="container">
        <h1>Not found</h1>
      </div>
    )
  } else {
    return (
      <div className="container">
        {searchedAricles.map((article) => (
          <div className="row article-card" key={article.item.id}>
            <div className="col-xs-2">
              <h2 className="article article-h2">{article.item.title}</h2>
              <img
                src={article.item.image}
                alt="article_img"
                className="article article-img"
              />
            </div>
            <div className="col-xs-8">
              <div className="article article-pre">{article.item.priview}</div>
            </div>
            <div className="col-xs-2">
              <div className="article article-date">{article.item.date}</div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}
