import React, { FunctionComponent } from "react"
import { Link } from "wouter"

import { Article } from "../reducers/articles"
import { Paginator } from "./Paginator"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  status?: string | null
  id?: number
}

export const Articles: FunctionComponent<Props> = ({ articles, id }) => {
  return (
    <>
      <div className="container">
        {articles.map((article) => (
          <Link href={"/article/" + article.id} key={article.id}>
            <div className={article.viewed ? "row article-card-gray" : "row"}>
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
          </Link>
        ))}
      </div>
      <Paginator status={id} />
    </>
  )
}
