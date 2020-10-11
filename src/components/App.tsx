import * as React from "react"
import { Route, Switch } from "wouter"

import ArticlesContainer from "../containers/ArticlesContainer"
import HeaderContainer from "../containers/HeaderContainer"
import SearchTextContainer from "../containers/SearchTextContainer"
import PageContainer from "../containers/PageContainer"

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
          <Route path="/pag/:id" component={ArticlesContainer} />
          <Route path="/article/:id" component={PageContainer} />
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
