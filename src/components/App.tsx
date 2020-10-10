import * as React from "react"
import { Route, Switch } from "wouter"

import ArticlesContainer from "../containers/ArticlesContainer"
import PaginationContainer from "../containers/PaginationContainer"
import HeaderContainer from "../containers/HeaderContainer"
import SearchTextContainer from "../containers/SearchTextContainer"
import "../static/css/flexboxgrid2.css"
import "../static/css/main.css"
import "react-datepicker/dist/react-datepicker.css"

class App extends React.Component {
  render() {
    return (
      <>
        <HeaderContainer />
        <Switch>
          <Route path="/" component={ArticlesContainer} />
          <Route path="/pag/:id" component={PaginationContainer} />
          <Route path="/search/:text" component={SearchTextContainer} />
          <Route>
            <h1>404, Not Found!</h1>
          </Route>
        </Switch>
      </>
    )
  }
}

export default App
