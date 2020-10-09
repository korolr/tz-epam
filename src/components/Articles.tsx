import React, { FunctionComponent, useEffect } from "react"

import { Article } from "../reducers/articles"

interface Props {
  clearArticles: () => void
  articles: Array<Article>
  fetchArticles: (number: number) => void
  error: string | null
}

export const Articles: FunctionComponent<Props> = ({
  articles,
  error,
  fetchArticles,
}) => {
  useEffect(() => {
    !articles.length && fetchArticles(10) // if empty array get from api
  })

  useEffect(() => {
    console.log(articles)
  })

  return (
    <div className="container">
      {articles.map((article) => (
        <div className="row article-card" key={article.id}>
          <div className="col-xs-2">
            <h2 className="article article-h2">{article.title}</h2>
            <img
              src={article.image}
              alt="article_img"
              className="article article-img"
            />
          </div>
          <div className="col-xs-8">
            <div className="article article-pre">{article.priview}</div>
          </div>
          <div className="col-xs-2">
            <div className="article article-date">{article.date}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
