import * as React from "react"
import { Link, Route } from "wouter"
import ArticlesContainer from "../containers/ArticlesContainer"
import "../static/css/flexboxgrid2.css"
import "../static/css/main.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <Link href="/users/1">
          <a className="link" href="#/">
            Profile
          </a>
        </Link>
        <Route path="/about">About Us</Route>
        <Route path="/users/:name">
          {(params) => <div>Hello, {params.name}!</div>}
        </Route>
        <Route path="/" component={ArticlesContainer} />
      </div>
    )
  }
}

export default App
