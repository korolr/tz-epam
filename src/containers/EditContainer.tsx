import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchArticles,
  addArticle,
  editArticle,
} from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Edit } from "../components/Edit"
import { Error } from "../components/Error"

import { ArticlesWrapper } from "../components/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  toAddArticle: (data: Article) => void
  toEditArticle: (id: number, data: Article) => void
  articles: Array<Article>
  status: string | null
}

const EditContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  toAddArticle,
  toEditArticle,
  status,
}) => {
  const [, params] = useRoute("/edit/:text")
  return ArticlesWrapper(
    Edit,
    Error,
    {
      articles: articles,
      fetchArticles: toFetchArticles,
      addArticle: toAddArticle,
      editArticle: toEditArticle,
      status: status,
      text: params.text,
    },
    false,
    null
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    articles: getVisibleArticles(store),
    status: getStatusArticles(store),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<articlesAction>) => {
  return {
    toFetchArticles: (number: number) => dispatch(fetchArticles(number)),
    toAddArticle: (data: Article) => dispatch(addArticle(data)),
    toEditArticle: (id: number, data: Article) =>
      dispatch(editArticle(id, data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
