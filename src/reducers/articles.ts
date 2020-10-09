import {
  ARTICLES_CLEAR,
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
  articlesAction,
} from "../actions/articlesActions"

export type Article = {
  id: number
  title: string
  priview: string
  text: string
  date: string
  image: string
  visible: boolean
  viewed: boolean
}

export interface StoreStateArticles {
  data: Array<Article>
  last?: number
  status: string | null
}

const initialState: StoreStateArticles = {
  data: [],
  status: "Loading",
}

export function articlesReducer(
  state: StoreStateArticles = initialState,
  action: articlesAction
): StoreStateArticles {
  switch (action.type) {
    case ARTICLES_REQUEST:
      return { data: [], status: "Loading" }
    case ARTICLES_SUCCESS:
      return {
        ...state,
        status: null,
        data: action.payload,
      }
    case ARTICLES_FAIL:
      return { ...state, status: action.payload }
    case ARTICLES_CLEAR:
      return {
        ...state,
        data: [],
        status: null,
      }
    default:
      return state
  }
}
