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
  id?: number
) => {
  const { articles, status, fetchArticles } = props

  useEffect(() => {
    fetchArticles(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const [editMode, setEditMode] = useState(false)

  if (status) {
    return <ErrorComponent>{status}</ErrorComponent>
  }
  return (
    <>
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
      {!articles.length ? (
        <ErrorComponent>Нет статей</ErrorComponent>
      ) : (
        <WrappedComponent {...props} editMode={editMode} />
      )}
    </>
  )
}
