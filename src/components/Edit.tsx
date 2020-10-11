import React, { FunctionComponent, useEffect } from "react"

import { Article } from "../reducers/articles"

export interface Props {
  articles: Array<Article>
  fetchArticles: (number?: number) => void
  addArticle?: (data: Article) => void
  editArticle?: (id: number, data: Article) => void
  status?: string | null
  text?: string | null
}

export const Edit: FunctionComponent<Props> = ({
  articles,
  addArticle,
  editArticle,
}) => {
  return <h1>ss</h1>
}
