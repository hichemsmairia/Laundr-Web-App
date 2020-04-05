import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./views/login";
import Register from "./views/register";
import UserDashboard from "./views/userDashboard";

import { Main as MainLayout } from "./components/layouts";
import RouteWithLayout from "./components/RouteWithLayout";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./theme";

//todo: make page not found

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userDashboard" component={UserDashboard} />
          <ThemeProvider theme={theme}>
            <RouteWithLayout
              component={UserDashboard}
              exact
              layout={MainLayout}
              path="/dashboard"
            />
          </ThemeProvider>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
