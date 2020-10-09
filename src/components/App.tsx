import * as React from "react"
import { Link, Route } from "wouter"
import ArticlesContainer from "../containers/ArticlesContainer"
import PaginationContainer from "../containers/PaginationContainer"
import "../static/css/flexboxgrid2.css"
import "../static/css/main.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <Link href="/pag/2">
          <a className="link" href="#/">
            Profile
          </a>
        </Link>
        <Route path="/about">About Us</Route>
        <Route path="/" component={ArticlesContainer} />
        <Route path="/pag/:id" component={PaginationContainer} />
      </div>
    )
  }
}

export default App
