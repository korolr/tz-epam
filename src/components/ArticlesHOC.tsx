import React, { FunctionComponent } from "react"

import { Props } from "./Articles"

export const articlesWrapper = (
  WrappedComponent: FunctionComponent<Props>,
  ErrorComponent: FunctionComponent<Props>,
  props: Props
): FunctionComponent<Props> => {
  const cb: FunctionComponent<Props> = () => {
    const { articles, error } = props
    if (error) {
      return <ErrorComponent {...props}>{error}</ErrorComponent>
    } else if (!articles.length) {
      return <ErrorComponent {...props}>Нет статей</ErrorComponent>
    } else {
      return <WrappedComponent {...props} />
    }
  }
  return cb
}
