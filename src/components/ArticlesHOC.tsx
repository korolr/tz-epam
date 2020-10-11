import React, { FunctionComponent, useEffect } from "react"
import { Props as PropsA } from "./Articles"
import { Props as PropsS } from "./SearchText"
import { Props as PropsP } from "./Page"
import { Props as PropsE } from "./Edit"

interface Props extends PropsA, PropsS, PropsP, PropsE {}

export const ArticlesWrapper = <T extends Props>(
  WrappedComponent: FunctionComponent<T>,
  ErrorComponent: FunctionComponent,
  props: T,
  id?: number
) => {
  const { articles, status, fetchArticles } = props

  useEffect(() => {
    id !== undefined ? fetchArticles(id) : !articles.length && fetchArticles() // if not array get from api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  if (status) {
    return <ErrorComponent>{status}</ErrorComponent>
  } else if (!articles.length) {
    return <ErrorComponent>Нет статей</ErrorComponent>
  }
  return <WrappedComponent {...props} />
}
