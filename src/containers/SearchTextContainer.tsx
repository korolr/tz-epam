import { useRoute } from "wouter"
import { useSelector, useDispatch } from "react-redux"

import {
  fetchArticles,
  removeArticle,
  requestArticles,
} from "actions/articlesActions"
import { getVisibleArticles, getStatusArticles } from "selectors/articles"
import { SearchText } from "components/SearchText"
import { Error } from "components/Error"
import { ArticlesWrapper } from "hoc/ArticlesHOC"

const SearchTextContainer = () => {
  const [, params] = useRoute("/search/:text")
  const dispatch = useDispatch()

  const articles = useSelector(getVisibleArticles)
  const status = useSelector(getStatusArticles)

  const toFetchArticles = (number: number) => dispatch(fetchArticles(number))
  const toRemoveArticle = (number: number) => dispatch(removeArticle(number))
  const toLoadArticle = () => dispatch(requestArticles())

  return ArticlesWrapper(SearchText, Error, {
    articles: articles,
    status: status,
    fetchArticles: toFetchArticles,
    removeArticle: toRemoveArticle,
    loadArticle: toLoadArticle,
    text: params === null ? "" : params.text,
  })
}

export default SearchTextContainer
