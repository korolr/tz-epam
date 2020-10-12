import React, { FunctionComponent, useEffect } from "react"
import { Link } from "wouter"

import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  status?: string | null
  text?: string
  id?: string
  setArticlesViewed?: (id: number) => void
  editMode?: boolean
}

export const Page: FunctionComponent<Props> = ({
  articles,
  id,
  setArticlesViewed,
  editMode,
}) => {
  const article = articles.filter((article) => article.id === parseInt(id))

  useEffect(() => {
    if (article.length !== 0 && !article[0].viewed) {
      setArticlesViewed(parseInt(id))
    }
  }, [article, id, setArticlesViewed])

  if (article.length === 0) {
    return <div className="container">Not Found Article</div>
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-10">
            <h2 className="article article-h2">{article[0].title}</h2>
          </div>
          <div className="col-xs-2 article-date">{article[0].date}</div>
        </div>
        {editMode && (
          <Link href={"/edit/" + article[0].id}>
            <button className="article article-edit-page">Edit</button>
          </Link>
        )}
        <div className="row">
          <div className="col-xs-12">
            <div className="article article-pre">
              <img
                src={article[0].image}
                alt="article_img"
                className="article article-img-post"
              />
              {article[0].text}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
