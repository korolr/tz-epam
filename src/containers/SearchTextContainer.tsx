import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import { articlesAction, fetchArticles } from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { SearchText } from "../components/SearchText"
import { Error } from "../components/Error"
import { ArticlesWrapper } from "../components/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  articles: Array<Article>
  status: string | null
}

const SearchTextContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  status,
}) => {
  const [, params] = useRoute("/search/:text")
  return ArticlesWrapper(SearchText, Error, {
    articles: articles,
    status: status,
    fetchArticles: toFetchArticles,
    text: params.text,
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextContainer)