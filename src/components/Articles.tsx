import React, { FunctionComponent, useState } from "react"
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
  const [editMode, setEditMode] = useState(false)
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-xs-9"></div>
          <div className="col-xs-3">
            <button
              className="edit-button"
              onClick={(e) => setEditMode(!editMode)}
            >
              Режим редактирования
            </button>
            {editMode && (
              <Link href={"/add/"}>
                <button className="edit-button edit-button_add">
                  Добавить статью
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="container">
        {articles.map((article) => (
          <div
            className={article.viewed ? "row article-card-gray" : "row"}
            key={article.id}
          >
            <div className="col-xs-2">
              <Link href={"/article/" + article.id} key={article.id}>
                <h2 className="article article-h2">{article.title}</h2>
              </Link>

              <img
                src={article.image}
                alt="article_img"
                className="article article-img"
              />
            </div>
            <div className="col-xs-8">
              <Link href={"/article/" + article.id}>
                <div className="article article-pre">{article.priview}</div>
              </Link>
            </div>

            <div className="col-xs-2">
              <div className="article article-date">{article.date}</div>
              {editMode && (
                <Link href={"/edit/" + article.id}>
                  <button className="article article-edit">Edit</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
      <Paginator status={id} />
    </>
  )
}
