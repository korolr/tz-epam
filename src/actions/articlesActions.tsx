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

export const ARTICLES_EDIT = "ARTICLES_EDIT"

export interface ARTICLES_EDIT extends Action {
  type: typeof ARTICLES_EDIT
  payload: { id: number; data: Article }
}

export const ARTICLES_ADD = "ARTICLES_ADD"

export interface ARTICLES_ADD extends Action {
  type: typeof ARTICLES_ADD
  payload: Article
}

export const ARTICLES_REMOVE = "ARTICLES_REMOVE"

export interface ARTICLES_REMOVE extends Action {
  type: typeof ARTICLES_REMOVE
  payload: number
}

export const ARTICLES_VIEWED = "ARTICLES_VIEWED"

export interface ARTICLES_VIEWED extends Action {
  type: typeof ARTICLES_VIEWED
  payload: number
}

export const ARTICLES_FETCH_FAKE = "ARTICLES_FETCH_FAKE"

export interface ARTICLES_FETCH_FAKE extends Action {
  type: typeof ARTICLES_FETCH_FAKE
}

export type articlesAction =
  | ARTICLES_CLEAR
  | ARTICLES_FETCH
  | ARTICLES_FETCH_FAKE
  | ARTICLES_REQUEST
  | ARTICLES_SUCCESS
  | ARTICLES_FAIL
  | ARTICLES_VIEWED
  | ARTICLES_EDIT
  | ARTICLES_ADD
  | ARTICLES_REMOVE

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

export function setArticlesViewed(id: number): ARTICLES_VIEWED {
  return { type: ARTICLES_VIEWED, payload: id }
}

export function editArticle(id: number, data: Article): ARTICLES_EDIT {
  return { type: ARTICLES_EDIT, payload: { id: id, data: data } }
}

export function addArticle(data: Article): ARTICLES_ADD {
  return { type: ARTICLES_ADD, payload: data }
}

export function removeArticle(id: number): ARTICLES_REMOVE {
  return { type: ARTICLES_REMOVE, payload: id }
}

export function fetchFakePagArticles(number: number): ARTICLES_FETCH_FAKE {
  return { type: ARTICLES_FETCH_FAKE }
}
