import { combineReducers } from "redux"
import { articlesReducer, StoreStateArticles } from "reducers/articles"

export interface rootState {
  articles: StoreStateArticles
}

export const rootReducer = combineReducers({
  articles: articlesReducer,
})
