import { combineReducers } from "redux"
import { articlesReducer, StoreStateArticles } from "./articles"

export interface rootState {
  articles: StoreStateArticles;
}

export const rootReducer = combineReducers({
  articles: articlesReducer
})