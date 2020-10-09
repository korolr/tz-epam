import React, { FunctionComponent, useEffect } from "react"
import { Props as PropsA } from "./Articles"
import { Props as PropsS } from "./SearchText"

interface Props extends PropsA, PropsS {}

export const ArticlesWrapper = (
  WrappedComponent: FunctionComponent<Props>,
  ErrorComponent: FunctionComponent,
  props: Props,
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
