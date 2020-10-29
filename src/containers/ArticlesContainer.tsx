import { useRoute } from "wouter"
import { useSelector, useDispatch } from "react-redux"

import { fetchArticles, removeArticle } from "actions/articlesActions"
import { getVisibleArticles, getStatusArticles } from "selectors/articles"
import { Articles } from "components/Articles"
import { Error } from "components/Error"
import { ArticlesWrapper } from "hoc/ArticlesHOC"

const ArticlesContainer = () => {
  let [, params] = useRoute("/pag/:id")
  const dispatch = useDispatch()

  const articles = useSelector(getVisibleArticles)
  const status = useSelector(getStatusArticles)

  const toFetchArticles = (number: number) => dispatch(fetchArticles(number))
  const toRemoveArticle = (number: number) => dispatch(removeArticle(number))

  return ArticlesWrapper(
    Articles,
    Error,
    {
      articles: articles,
      status: status,
      fetchArticles: toFetchArticles,
      removeArticle: toRemoveArticle,
      // for page /
      id: params === null ? null : params.id,
    },
    true,
    params === null ? "1" : params.id
  )
}

export default ArticlesContainer
