import React, { FunctionComponent, useEffect, useState } from "react"
import { Props as PropsA } from "./Articles"
import { Props as PropsS } from "./SearchText"
import { Props as PropsP } from "./Page"
import { Props as PropsE } from "./Edit"
import { Link } from "wouter"

interface Props extends PropsA, PropsS, PropsP, PropsE {}

export const ArticlesWrapper = <T extends Props>(
  WrappedComponent: FunctionComponent<T>,
  ErrorComponent: FunctionComponent,
  props: T,
  button: boolean,
  id?: string
) => {
  const { articles, status, fetchArticles } = props

  useEffect(() => {
    id !== null
      ? fetchArticles(parseInt(id))
      : !articles.length && fetchArticles() // if not array get from api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const [editMode, setEditMode] = useState(false)

  if (id !== null && Number.isNaN(parseInt(id))) {
    return <ErrorComponent>Bad Request</ErrorComponent>
  }
  if (status) {
    return <ErrorComponent>{status}</ErrorComponent>
  }
  return (
    <>
      {button ? (
        <div className="container">
          <div className="row">
            <div className="col-xs-9"></div>
            <div className="col-xs-3">
              <button
                className="edit-button"
                onClick={(e) => setEditMode(!editMode)}
              >
                Режим редактирования
              </button>
              {editMode && (
                <Link href={"/edit/add"}>
                  <button className="edit-button edit-button_add">
                    Добавить статью
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {!articles.length ? (
        <ErrorComponent>Нет статей</ErrorComponent>
      ) : (
        <WrappedComponent {...props} editMode={editMode} />
      )}
    </>
  )
}
