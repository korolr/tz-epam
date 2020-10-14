import React, { FunctionComponent } from "react"
import { Link } from "wouter"

export interface Props {
  id: string
}

export const Paginator: FunctionComponent<Props> = ({ id }) => {
  const intId = parseInt(id)
  return (
    <div className="container paginator">
      <div className="row paginator-cell">
        <Link
          href={"/pag/" + (id === null ? 1 : intId > 1 ? intId - 1 : status)}
        >
          <button>Left</button>
        </Link>
        {[1, 2, 3].map((number) => {
          return (
            <Link href={"/pag/" + number} key={number}>
              <button className={intId === number ? "paginator-active" : ""}>
                {number}
              </button>
            </Link>
          )
        })}
        <Link
          href={
            "/pag/" + (status === null ? 2 : intId < 3 ? intId + 1 : status)
          }
        >
          <button>Right</button>
        </Link>
      </div>
    </div>
  )
}
