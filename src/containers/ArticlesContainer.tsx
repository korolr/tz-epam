import React, { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Articles } from "../components/Articles"
import { clearArticles, articlesAction } from "../actions/articlesActions"
import { ThunkDispatch } from "redux-thunk"

import { rootState } from "../reducers"

interface Props {
  toClearArticles: () => void
  articles: any[]
}

const ArticlesContainer: FunctionComponent<Props> = ({
  toClearArticles,
}) => {
  return (
    <div>
      <Articles clearArticles={toClearArticles} />
    </div>
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    articles: store.articles.data,
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<rootState, void, articlesAction>
) => {
  return {
    toClearArticles: () => dispatch(clearArticles()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
