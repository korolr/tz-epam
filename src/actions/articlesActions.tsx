import { Action } from "redux"
import { Article } from "../reducers/articles"

export const ARTICLES_REQUEST = "ARTICLES_REQUEST"

interface ARTICLES_REQUEST extends Action {
  type: typeof ARTICLES_REQUEST
}

export const ARTICLES_SUCCESS = "ARTICLES_SUCCESS"

interface ARTICLES_SUCCESS extends Action {
  type: typeof ARTICLES_SUCCESS
  payload: Array<Article>
}

export const ARTICLES_CLEAR = "ARTICLES_CLEAR"

interface ARTICLES_CLEAR extends Action {
  type: typeof ARTICLES_CLEAR
}

export const ARTICLES_FAIL = "ARTICLES_FAIL"

interface ARTICLES_FAIL extends Action {
  type: typeof ARTICLES_FAIL
  payload: string
}

export const ARTICLES_FETCH = "ARTICLES_FETCH"

export interface ARTICLES_FETCH extends Action {
  type: typeof ARTICLES_FETCH
  payload: number
}

export type articlesAction =
  | ARTICLES_CLEAR
  | ARTICLES_FETCH
  | ARTICLES_REQUEST
  | ARTICLES_SUCCESS
  | ARTICLES_FAIL

// ----------------------------------------------------------

export function requestArticles(): ARTICLES_REQUEST {
  return { type: ARTICLES_REQUEST }
}

export function successArticles(data: Array<Article>): ARTICLES_SUCCESS {
  return { type: ARTICLES_SUCCESS, payload: data }
}

export function failArticles(err: string): ARTICLES_FAIL {
  return { type: ARTICLES_FAIL, payload: err }
}

export function clearArticles(): ARTICLES_CLEAR {
  return { type: ARTICLES_CLEAR }
}

export function fetchArticles(number: number): ARTICLES_FETCH {
  return { type: ARTICLES_FETCH, payload: number }
}
