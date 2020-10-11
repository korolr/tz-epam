import React, { FunctionComponent } from "react"
import { Link } from "wouter"

export interface Props {
  status: string
}

export const Paginator: FunctionComponent<Props> = ({ status }) => {
  const intStatus = parseInt(status)
  return (
    <div className="container paginator">
      <div className="row paginator-cell">
        <Link
          href={
            "/pag/" +
            (status === null ? 1 : intStatus > 1 ? intStatus - 1 : status)
          }
        >
          <button>Left</button>
        </Link>
        {[1, 2, 3].map((a) => {
          return (
            <Link href={"/pag/" + a} key={a}>
              <button className={intStatus === a ? "paginator-active" : ""}>
                {a}
              </button>
            </Link>
          )
        })}
        <Link
          href={
            "/pag/" +
            (status === null ? 2 : intStatus < 3 ? intStatus + 1 : status)
          }
        >
          <button>Right</button>
        </Link>
      </div>
    </div>
  )
}
