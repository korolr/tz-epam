import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { articlesAction, fetchArticles } from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Header } from "../components/Header"
import React from "react"

const HeaderContainer: FunctionComponent = () => {
  return (
    <div>
      <Header />
    </div>
  )
}

const mapStateToProps = (store: rootState) => {
  return {}
}

const mapDispatchToProps = (dispatch: Dispatch<articlesAction>) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)
