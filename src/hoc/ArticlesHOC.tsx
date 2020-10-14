import React, { FunctionComponent, useEffect, useState } from "react"
import { Props as PropsA } from "../components/Articles"
import { Props as PropsS } from "../components/SearchText"
import { Props as PropsP } from "../components/Page"
import { Props as PropsE } from "../components/Edit"
import { Link } from "wouter"

interface Props extends PropsA, PropsS, PropsP, PropsE {}

export const ArticlesWrapper = <T extends Props>(
  WrappedComponent: FunctionComponent<T>,
  ErrorComponent: FunctionComponent,
  props: T,
  button: boolean = false,
  id: string | null = null
) => {
  const { articles, status, fetchArticles } = props
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    id !== null
      ? fetchArticles(parseInt(id))
      : !articles.length && fetchArticles() // if not array get from api
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  // проверка на плохой запрос в роутере
  if (id !== null && Number.isNaN(parseInt(id))) {
    return <ErrorComponent>Bad Request</ErrorComponent>
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
                Edit
              </button>
              {editMode && (
                <Link href={"/edit/add"}>
                  <button className="edit-button edit-button_add">Add</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {!articles.length ? (
        <ErrorComponent>Нет статей</ErrorComponent>
      ) : status ? (
        <ErrorComponent>{status}</ErrorComponent>
      ) : (
        <WrappedComponent {...props} editMode={editMode} />
      )}
    </>
  )
}