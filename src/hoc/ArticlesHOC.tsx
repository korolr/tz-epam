import * as React from "react"
import { Props as PropsA } from "components/Articles"
import { Props as PropsS } from "components/SearchText"
import { Props as PropsP } from "components/Page"
import { Props as PropsE } from "components/Edit"
import { ModalContext } from "context/modalContext"

import { EditHeader } from "components/EditHeader"

export interface Props extends PropsA, PropsS, PropsP, PropsE {}

export const ArticlesWrapper = <T extends Props>(
  WrappedComponent: React.FunctionComponent<T>,
  ErrorComponent: React.FunctionComponent,
  props: T,
  button: boolean = false,
  id: string | null = null
) => {
  const { articles, status, fetchArticles } = props

  const edit = React.useContext(ModalContext)

  React.useEffect(() => {
    id !== null ? fetchArticles(parseInt(id)) : fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // проверка на плохой запрос в роутере
  if (id !== null && Number.isNaN(parseInt(id))) {
    return <ErrorComponent>Bad Request</ErrorComponent>
  }
  return (
    <>
      {button ? <EditHeader {...edit}></EditHeader> : null}

      {status ? (
        <ErrorComponent>{status}</ErrorComponent>
      ) : !articles.length ? (
        <ErrorComponent>Нет статей</ErrorComponent>
      ) : (
        <WrappedComponent {...props} editMode={edit.editMode} />
      )}
    </>
  )
}
