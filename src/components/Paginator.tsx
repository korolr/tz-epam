import React, { FunctionComponent } from "react"
import { Link } from "wouter"

export interface Props {
  status: number
}

export const Paginator: FunctionComponent<Props> = ({ status }) => {
  return (
    <div className="container paginator">
      <div className="row paginator-cell">
        <Link
          href={
            "/pag/" + (status === null ? 1 : status > 1 ? status - 1 : status)
          }
        >
          <button>Left</button>
        </Link>
        {[1, 2, 3].map((a) => {
          return (
            <Link href={"/pag/" + a} key={a}>
              <button className={status === a ? "paginator-active" : ""}>
                {a}
              </button>
            </Link>
          )
        })}
        <Link
          href={
            "/pag/" + (status === null ? 2 : status < 3 ? status + 1 : status)
          }
        >
          <button>Right</button>
        </Link>
      </div>
    </div>
  )
}
