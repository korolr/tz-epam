import {
  ARTICLES_CLEAR,
  articlesAction,
} from "../actions/articlesActions"

export interface StoreStateArticles {
  data: Array<any>;
}

const initialState: StoreStateArticles = {
  data: [],
}

export function articlesReducer(
  state: StoreStateArticles = initialState,
  action: articlesAction
): StoreStateArticles {
  switch (action.type) {
    case ARTICLES_CLEAR:
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}