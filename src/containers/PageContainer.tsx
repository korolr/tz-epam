import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchArticles,
  setArticlesViewed,
  setStatusArticles,
  requestArticles,
} from "actions/articlesActions"
import { rootState } from "reducers"
import {
  getVisibleArticles,
  getStatusArticles,
  getLast,
} from "selectors/articles"
import { Article } from "reducers/articles"
import { Page } from "components/Page"
import { Error } from "components/Error"
import { ArticlesWrapper } from "hoc/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  toSetArticlesViewed: (id?: number) => void
  toSetStatusArticles: (id?: number) => void
  toLoadArticle: () => void

  articles: Array<Article>
  status: string | null
  last: number
}

const ArticlesContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  toSetArticlesViewed,
  toSetStatusArticles,
  toLoadArticle,
  status,
  last,
}) => {
  const [, params] = useRoute("/article/:id")

  return ArticlesWrapper(
    Page,
    Error,
    {
      articles: articles,
      fetchArticles: toFetchArticles,
      setArticlesViewed: toSetArticlesViewed,
      loadArticle: toLoadArticle,
      setStatusArticles: toSetStatusArticles,
      last: last,
      status: status,
      id: params === null ? "" : params.id,
    },
    true
  )
}

const mapStateToProps = (store: rootState) => {
  return {
    articles: getVisibleArticles(store),
    status: getStatusArticles(store),
    last: getLast(store),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<articlesAction>) => {
  return {
    toSetStatusArticles: (id: number) => dispatch(setStatusArticles(id)),
    toFetchArticles: (number: number) => dispatch(fetchArticles(number)),
    toSetArticlesViewed: (id: number) => dispatch(setArticlesViewed(id)),
    toLoadArticle: () => dispatch(requestArticles()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
