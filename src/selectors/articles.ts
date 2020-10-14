import { createSelector } from "reselect"
import { rootState } from "reducers"

const getArticles = (state: rootState) => state.articles

export const getVisibleArticles = createSelector(getArticles, (articles) =>
  articles.data.filter((article) => article.visible)
)

export const getStatusArticles = createSelector(
  getArticles,
  (articles) => articles.status
)

export const getLast = createSelector(getArticles, (articles) => articles.last)
