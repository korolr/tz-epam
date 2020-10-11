import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchArticles,
  removeArticle,
  fetchFakePagArticles,
} from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Articles } from "../components/Articles"
import { Error } from "../components/Error"
import { ArticlesWrapper } from "../components/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  toRemoveArticle: (number?: number) => void
  toFetchFakeArticles: (number?: number) => void
  articles: Array<Article>
  status: string | null
}

const ArticlesContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  toRemoveArticle,
  toFetchFakeArticles,
  status,
}) => {
  let [, params] = useRoute("/pag/:id")

  return ArticlesWrapper(
    Articles,
    Error,
    {
      articles: articles,
      status: status,
      fetchArticles: params === null ? toFetchArticles : toFetchFakeArticles,
      removeArticle: toRemoveArticle,
      // for page /
      id: params === null ? null : params.id,
    },
    true,
    params === null ? null : params.id
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
    toFetchFakeArticles: (number: number) =>
      dispatch(fetchFakePagArticles(number)),
    toRemoveArticle: (number: number) => dispatch(removeArticle(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
