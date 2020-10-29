import { useRoute } from "wouter"
import { useSelector, useDispatch } from "react-redux"

import {
  fetchArticles,
  setArticlesViewed,
  setStatusArticles,
  requestArticles,
} from "actions/articlesActions"
import {
  getVisibleArticles,
  getStatusArticles,
  getLast,
} from "selectors/articles"
import { Page } from "components/Page"
import { Error } from "components/Error"
import { ArticlesWrapper } from "hoc/ArticlesHOC"

const ArticlesContainer = () => {
  const [, params] = useRoute("/article/:id")
  const dispatch = useDispatch()

  const articles = useSelector(getVisibleArticles)
  const status = useSelector(getStatusArticles)
  const last = useSelector(getLast)

  const toFetchArticles = (number: number) => dispatch(fetchArticles(number))
  const toSetStatusArticles = (id: number) => dispatch(setStatusArticles(id))
  const toSetArticlesViewed = (id: number) => dispatch(setArticlesViewed(id))
  const toLoadArticle = () => dispatch(requestArticles())

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

export default ArticlesContainer
