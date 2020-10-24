import React, { FunctionComponent } from "react"
import { Link } from "wouter"

import { arrayArticles } from "api"
import stylePaginator from "components/Paginator/style.module.css"

export interface Props {
  id: string
}

export const Paginator: FunctionComponent<Props> = ({ id }) => {
  const intId = parseInt(id)
  return (
    <div className={`container ${stylePaginator["paginator"]}`}>
      <div className={`row ${stylePaginator["paginator-cell"]}`}>
        <Link href={"/pag/" + (id === null ? 1 : intId > 1 ? intId - 1 : id)}>
          <button>Left</button>
        </Link>
        {Array(Math.ceil(arrayArticles.length / 5))
          .fill(null)
          .map((_, i) => i + 1)
          .map((number) => {
            return (
              <Link href={"/pag/" + number} key={number}>
                <button
                  className={
                    intId === number
                      ? `${stylePaginator["paginator-active"]}`
                      : ""
                  }
                >
                  {number}
                </button>
              </Link>
            )
          })}
        <Link href={"/pag/" + (id === null ? 2 : intId < 3 ? intId + 1 : id)}>
          <button>Right</button>
        </Link>
      </div>
    </div>
  )
}
