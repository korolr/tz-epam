import { FunctionComponent } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { useRoute } from "wouter"

import {
  articlesAction,
  fetchArticles,
  removeArticle,
} from "actions/articlesActions"
import { rootState } from "reducers"
import { getVisibleArticles, getStatusArticles } from "selectors/articles"
import { Article } from "reducers/articles"
import { SearchText } from "components/SearchText"
import { Error } from "components/Error"
import { ArticlesWrapper } from "hoc/ArticlesHOC"

interface Props {
  toFetchArticles: (number?: number) => void
  toRemoveArticle: (number?: number) => void

  articles: Array<Article>
  status: string | null
}

const SearchTextContainer: FunctionComponent<Props> = ({
  articles,
  toFetchArticles,
  toRemoveArticle,
  status,
}) => {
  const [, params] = useRoute("/search/:text")
  return ArticlesWrapper(SearchText, Error, {
    articles: articles,
    status: status,
    fetchArticles: toFetchArticles,
    removeArticle: toRemoveArticle,

    text: params === null ? "" : params.text,
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
    toRemoveArticle: (number: number) => dispatch(removeArticle(number)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchTextContainer)
