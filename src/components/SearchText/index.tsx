import React, { FunctionComponent, useEffect } from "react"
import Fuse from "fuse.js"
import { Link } from "wouter"

import { Article } from "reducers/articles"
import styleArticle from "components/Articles/style.module.css"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  removeArticle?: (number?: number) => void
  loadArticle?: () => void
  status?: string | null
  text?: string
  editMode?: boolean
}

export const SearchText: FunctionComponent<Props> = ({
  articles,
  text,
  editMode,
  removeArticle,
  loadArticle,
}) => {
  useEffect(() => {
    return () => {
      loadArticle()
    }
  }, [loadArticle])

  const options = {
    keys: ["title", "priview", "text"],
  }
  const fuse = new Fuse(articles, options)
  const searchedAricles = fuse.search(text)
  articles.map((a) => {
    if (a.date === text) {
      searchedAricles.push({ item: a, refIndex: a.id })
    }
    return a
  })
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
          <div className="row" key={article.item.id}>
            <div className="col-lg-2 col-xs-12">
              <Link href={"/article/" + article.item.id} key={article.item.id}>
                <h2
                  className={
                    article.item.viewed
                      ? `${styleArticle["article"]} ${styleArticle["article-h2"]} ${styleArticle["article-card-gray"]}`
                      : `${styleArticle["article"]} ${styleArticle["article-h2"]}`
                  }
                >
                  {article.item.title}
                </h2>{" "}
              </Link>

              <img
                src={article.item.image}
                alt="article_img"
                className={`${styleArticle["article"]} ${styleArticle["article-img"]} col-lg-12`}
              />
            </div>
            <div className="col-lg-8 col-xs-10">
              <Link href={"/article/" + article.item.id} key={article.item.id}>
                <div
                  className={`${styleArticle["article"]} ${styleArticle["article-pre"]}`}
                >
                  {article.item.priview}
                </div>
              </Link>
            </div>
            <div className="col-lg-2 col-xs-2">
              <div
                className={`${styleArticle["article"]} ${styleArticle["article-date"]}`}
              >
                {article.item.date}
              </div>
              {editMode && (
                <Link href={"/edit/" + article.item.id}>
                  <button
                    className={`${styleArticle["article"]} ${styleArticle["article-edit"]}`}
                  >
                    Edit
                  </button>
                </Link>
              )}
              {editMode && (
                <button
                  className={`${styleArticle["article"]} ${styleArticle["article-edit"]} ${styleArticle["article-edit_remove"]}`}
                  onClick={() => removeArticle(article.item.id)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}
