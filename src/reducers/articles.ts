import {
  ARTICLES_CLEAR,
  ARTICLES_REQUEST,
  ARTICLES_SUCCESS,
  ARTICLES_FAIL,
  ARTICLES_VIEWED,
  ARTICLES_EDIT,
  ARTICLES_ADD,
  ARTICLES_REMOVE,
  ARTICLES_STATUS,
  articlesAction,
} from "actions/articlesActions"

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
  last: number | null
  status: string | null
}

const initialState: StoreStateArticles = {
  data: [],
  last: null,
  status: "Loading",
}

export function articlesReducer(
  state: StoreStateArticles = initialState,
  action: articlesAction
): StoreStateArticles {
  switch (action.type) {
    case ARTICLES_REQUEST:
      return { ...state, data: [], status: "Loading" }
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
    case ARTICLES_VIEWED:
      return {
        ...state,
        data: state.data.map((a) =>
          a.id === action.payload ? { ...a, viewed: true } : a
        ),
      }
    case ARTICLES_STATUS:
      return {
        ...state,
        last: action.payload,
      }
    case ARTICLES_EDIT:
      return {
        ...state,
        data: state.data.map((a) =>
          a.id === action.payload.id ? action.payload.data : a
        ),
      }
    case ARTICLES_ADD:
      return {
        ...state,
        data: [...state.data, ...[action.payload]],
      }
    case ARTICLES_REMOVE:
      return {
        ...state,
        data: state.data.filter((a) => (a.id !== action.payload ? a : false)),
      }

    default:
      return state
  }
}
