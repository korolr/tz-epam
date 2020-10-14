import * as React from "react"
import { Route, Switch } from "wouter"

import ArticlesContainer from "../containers/ArticlesContainer"
import { Header } from "./Header"
import SearchTextContainer from "../containers/SearchTextContainer"
import PageContainer from "../containers/PageContainer"
import EditContainer from "../containers/EditContainer"

import "../static/css/flexboxgrid2.css"
import "../static/css/main.css"
import "react-datepicker/dist/react-datepicker.css"

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route path="/" component={ArticlesContainer} />
          <Route path="/pag/:id" component={ArticlesContainer} />
          <Route path="/pag/" component={ArticlesContainer} />
          <Route path="/article/:id" component={PageContainer} />
          <Route path="/article/" component={PageContainer} />
          <Route path="/search/:text" component={SearchTextContainer} />
          <Route path="/search/" component={SearchTextContainer} />
          <Route path="/edit/:text" component={EditContainer} />
          <Route path="/edit/" component={EditContainer} />

          <Route>
            <h1>404, Not Found!</h1>
          </Route>
        </Switch>
      </>
    )
  }
}

export default App
