import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchFakePagArticles,
} from "../actions/articlesActions"
import { rootState } from "../reducers"
import { getVisibleArticles, getStatusArticles } from "../selectors/articles"
import { Article } from "../reducers/articles"
import { Pagination } from "../components/Pagination"
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
  const [, params] = useRoute("/pag/:id")

  return ArticlesWrapper(
    Pagination,
    Error,
    {
      articles: articles,
      status: status,
      fetchArticles: toFetchArticles,
      id: parseInt(params.id),
    },
    parseInt(params.id)
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
    toFetchArticles: (number: number) => dispatch(fetchFakePagArticles(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer)
