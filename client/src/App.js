import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import NewOrder from "./components/NewOrder/NewOrder";
import DriverDashboard from "./components/DriverDashboard/DriverDashboard";

import theme from "./theme";
import { ThemeProvider } from "@material-ui/styles";
import { Main as MainLayout } from "./layouts";
import RouteWithLayout from "./layouts/RouteWithLayout";

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
          <Route
            exact
            path="/driverDashboardTest"
            component={DriverDashboard}
          />
          <ThemeProvider theme={theme}>
            <RouteWithLayout
              component={DriverDashboard}
              exact
              layout={MainLayout}
              path="/driverDashboardTestTheme"
            />
          </ThemeProvider>
          <Route path="/">
            <Redirect to="/login" />
          </Route>
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
