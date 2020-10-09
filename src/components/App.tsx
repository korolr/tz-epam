import * as React from "react"
import { Route } from "wouter"
import ArticlesContainer from "../containers/ArticlesContainer"
import PaginationContainer from "../containers/PaginationContainer"
import HeaderContainer from "../containers/HeaderContainer"
import "../static/css/flexboxgrid2.css"
import "../static/css/main.css"

class App extends React.Component {
  render() {
    return (
      <div>
        <HeaderContainer />
        <Route path="/" component={ArticlesContainer} />
        <Route path="/pag/:id" component={PaginationContainer} />
      </div>
    )
  }
}

export default App
