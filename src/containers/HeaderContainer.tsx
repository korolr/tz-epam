import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { articlesAction, fetchArticles } from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Header } from "../components/Header"
import React from "react"

interface Props {
  toFetchArticles: (number?: number) => void
  articles: Array<Article>
}

const HeaderContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
}) => {
  return (
    <div>
      <Header articles={articles} fetchArticles={toFetchArticles} />
    </div>
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    articles: getVisibleArticles(store),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<articlesAction>) => {
  return {
    toFetchArticles: (number: number) => dispatch(fetchArticles(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
