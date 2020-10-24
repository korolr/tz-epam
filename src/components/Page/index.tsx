import React, { FunctionComponent, useEffect } from "react"
import { Link } from "wouter"

import { Article } from "reducers/articles"
import styleArticle from "components/Articles/style.module.css"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  loadArticle?: () => void
  status?: string | null
  text?: string
  id?: string
  setArticlesViewed?: (id: number) => void
  setStatusArticles?: (id: number) => void
  last?: number
  editMode?: boolean
}

export const Page: FunctionComponent<Props> = ({
  articles,
  id,
  setArticlesViewed,
  setStatusArticles,
  loadArticle,
  editMode,
  last,
}) => {
  const idParse = parseInt(id)
  const article = articles.filter((article) => article.id === idParse)

  useEffect(() => {
    if (article.length > 0) {
      if (last !== idParse) {
        setStatusArticles(parseInt(id))
      }
      if (!article[0].viewed) {
        setArticlesViewed(parseInt(id))
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, id, last])

  useEffect(() => {
    return () => {
      loadArticle()
    }
  }, [loadArticle])

  if (article.length === 0) {
    return <div className="container">Not Found Article</div>
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-10">
            <h2
              className={`${styleArticle["article"]} ${styleArticle["article-h2"]}`}
            >
              {article[0].title}
            </h2>
          </div>
          <div className={`col-xs-2 ${styleArticle["article-date"]}`}>
            {article[0].date}
          </div>
        </div>
        {editMode && (
          <Link href={"/edit/" + article[0].id}>
            <button
              className={`${styleArticle["article"]} ${styleArticle["article-edit-page"]}`}
            >
              Edit
            </button>
          </Link>
        )}
        <div className="row">
          <div className="col-xs-12">
            <div
              className={`${styleArticle["article"]} ${styleArticle["article-pre-page"]}`}
            >
              <img
                src={article[0].image}
                alt="article_img"
                className={`${styleArticle["article"]} ${styleArticle["article-img-post"]}`}
              />
              <p>{article[0].text}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
