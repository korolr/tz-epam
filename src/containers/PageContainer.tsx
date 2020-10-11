import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchArticles,
  setArticlesViewed,
} from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Page } from "../components/Page"
import { Error } from "../components/Error"
import { ArticlesWrapper } from "../components/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  toSetArticlesViewed: (id?: number) => void
  articles: Array<Article>
  status: string | null
}

const ArticlesContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  toSetArticlesViewed,
  status,
}) => {
  const [, params] = useRoute("/article/:id")

  return ArticlesWrapper(
    Page,
    Error,
    {
      articles: articles,
      fetchArticles: toFetchArticles,
      setArticlesViewed: toSetArticlesViewed,
      status: status,
      id: params.id,
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
    toSetArticlesViewed: (id: number) => dispatch(setArticlesViewed(id)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
