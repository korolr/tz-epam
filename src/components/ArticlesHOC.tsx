import React, { FunctionComponent, useEffect } from "react"

import { Props } from "./Articles"

export const ArticlesWrapper = (
  WrappedComponent: FunctionComponent<Props>,
  ErrorComponent: FunctionComponent,
  id: number,

  props: Props
) => {
  const { articles, error, fetchArticles } = props

  useEffect(() => {
    !articles.length && fetchArticles(id) // if empty array get from api
  })

  if (error) {
    return <ErrorComponent>{error}</ErrorComponent>
  } else if (!articles.length) {
    return <ErrorComponent>Нет статей</ErrorComponent>
  }
  return <WrappedComponent {...props} />
}
