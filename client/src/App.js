import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import NewOrder from "./components/NewOrder/NewOrder";
import OldOrder from "./components/NewOrder/OldOrder";

import Review from "./components/NewOrder/Review";

//todo: make page not found

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/userDashboard" component={UserDashboard} />
          <Route exact path="/newOrderTest" component={NewOrder} />
          <Route exact path="/oldOrder" component={OldOrder} />
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
