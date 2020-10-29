import React, { FunctionComponent } from "react"

export const Error: FunctionComponent = (props) => {
  return (
    <div className="container article">
      <div className="row">
        <div className="col-xs-12">
          <h1>{props.children}</h1>
        </div>
      </div>
    </div>
  )
}
