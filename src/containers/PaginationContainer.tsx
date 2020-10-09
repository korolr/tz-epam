import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { Articles } from "../components/Articles"

import {
  clearArticles,
  articlesAction,
  fetchArticles,
} from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getErrorArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"

interface Props {
  toClearArticles: () => void
  toFetchArticles: (number: number) => void
  articles: Array<Article>
  error: string | null
}

const ArticlesContainer: FunctionComponent<Props> = ({
  toClearArticles,
  articles,
  toFetchArticles,
  error,
}) => {
  return (
    <div>
      <Articles
        articles={articles}
        error={error}
        clearArticles={toClearArticles}
        fetchArticles={toFetchArticles}
      />
    </div>
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    articles: getVisibleArticles(store),
    error: getErrorArticles(store),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<articlesAction>) => {
  return {
    toClearArticles: () => dispatch(clearArticles()),
    toFetchArticles: (number: number) => dispatch(fetchArticles(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
