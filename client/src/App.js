import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/login";
import Register from "./components/register";
import UserDashboard from "./components/userDashboard";

//todo: make page not found

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userDashboard" component={UserDashboard} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
