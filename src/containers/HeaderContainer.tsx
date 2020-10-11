import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { articlesAction } from "../actions/articlesActions"
import { rootState } from "../reducers"
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
