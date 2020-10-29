import { useRoute } from "wouter"
import { useSelector, useDispatch } from "react-redux"

import {
  fetchArticles,
  addArticle,
  editArticle,
  requestArticles,
} from "actions/articlesActions"
import { getVisibleArticles, getStatusArticles } from "selectors/articles"
import { Article } from "reducers/articles"
import { Edit } from "components/Edit"
import { Error } from "components/Error"

import { ArticlesWrapper } from "../hoc/ArticlesHOC"

const EditContainer = () => {
  const [, params] = useRoute("/edit/:text")
  const dispatch = useDispatch()

  const articles = useSelector(getVisibleArticles)
  const status = useSelector(getStatusArticles)

  const toFetchArticles = (number: number) => dispatch(fetchArticles(number))
  const toAddArticle = (data: Article) => dispatch(addArticle(data))
  const toEditArticle = (id: number, data: Article) =>
    dispatch(editArticle(id, data))
  const toLoadArticle = () => dispatch(requestArticles())

  return ArticlesWrapper(Edit, Error, {
    articles: articles,
    fetchArticles: toFetchArticles,
    loadArticle: toLoadArticle,
    addArticle: toAddArticle,
    editArticle: toEditArticle,
    status: status,
    text: params === null ? "" : params.text,
  })
}

export default EditContainer
