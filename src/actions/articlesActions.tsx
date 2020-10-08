import { Action } from "redux"

export const ARTICLES_CLEAR = "ARTICLES_CLEAR"

interface ARTICLES_CLEAR extends Action {
  type: typeof ARTICLES_CLEAR;
}

export const ARTICLES_FETCH = "ARTICLES_FETCH"

interface ARTICLES_FETCH extends Action {
  type: typeof ARTICLES_FETCH;
}


export type articlesAction =
  | ARTICLES_CLEAR
  | ARTICLES_FETCH

// ----------------------------------------------------------

export function clearArticles(): ARTICLES_CLEAR {
  return { type: ARTICLES_CLEAR }
}

export function fetchArticles(): ARTICLES_FETCH {
  return { type: ARTICLES_FETCH }
}
