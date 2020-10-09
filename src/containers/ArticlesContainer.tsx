import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"

import { articlesAction, fetchArticles } from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Articles } from "../components/Articles"
import { Error } from "../components/Error"
import { ArticlesWrapper } from "../components/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  articles: Array<Article>
  status: string | null
}

const ArticlesContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  status,
}) => {
  return ArticlesWrapper(Articles, Error, {
    articles: articles,
    status: status,
    fetchArticles: toFetchArticles,
  })
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
