import * as React from "react"
import { Link } from "wouter"

import { Article } from "reducers/articles"
import { Paginator } from "components/Paginator"
import styleArticle from "components/Articles/style.module.css"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  removeArticle?: (number?: number) => void
  status?: string | null
  id?: string | null
  text?: string | null
  editMode?: boolean
}

export const Articles: React.FunctionComponent<Props> = ({
  articles,
  id,
  removeArticle,
  editMode,
}) => {
  return (
    <>
      <div className="container">
        {articles.map((article) => (
          <div className="row" key={article.id}>
            <div className="col-lg-2 col-xs-12">
              <Link href={"/article/" + article.id} key={article.id}>
                <h2
                  className={
                    article.viewed
                      ? `${styleArticle["article"]} ${styleArticle["article-h2"]} ${styleArticle["article-card-gray"]}`
                      : `${styleArticle["article"]} ${styleArticle["article-h2"]}`
                  }
                >
                  {article.title}
                </h2>
              </Link>

              <img
                src={article.image}
                alt="article_img"
                className={`${styleArticle["article"]} ${styleArticle["article-img"]} ss`}
              />
            </div>
            <div className="col-lg-8 col-xs-10">
              <Link href={"/article/" + article.id}>
                <div
                  className={`${styleArticle["article"]} ${styleArticle["article-pre"]}`}
                >
                  {article.priview}
                </div>
              </Link>
            </div>

            <div className="col-lg-2 col-xs-2">
              <div
                className={`${styleArticle["article"]} ${styleArticle["article-date"]}`}
              >
                {article.date}
              </div>
              {editMode && (
                <Link href={"/edit/" + article.id}>
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
                  onClick={() => removeArticle(article.id)}
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Paginator id={id} />
    </>
  )
}
