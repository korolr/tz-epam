import { createSelector } from "reselect"
import { rootState } from "../reducers"

const getArticles = (state: rootState) => state.articles

export const getVisibleArticles = createSelector(getArticles, (articles) =>
  articles.data.filter((article) => article.visible)
)

export const getErrorArticles = createSelector(
  getArticles,
  (articles) => articles.error
)
