import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import NewOrder from "./components/NewOrder/NewOrder";
import AvailableDriverDashboard from "./components/DriverDashboards/AvailableDashboard";
import AcceptedDriverDashboard from "./components/DriverDashboards/AcceptedDashboard";
import AssignedWasherDashboard from "./components/WasherDashboards/AssignedDashboard";
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
          <ThemeProvider theme={theme}>
            <Switch>
              <RouteWithLayout
                component={AvailableDriverDashboard}
                exact
                layout={MainLayout}
                path="/driverAvailableDashTheme"
              />
              <RouteWithLayout
                component={AcceptedDriverDashboard}
                exact
                layout={MainLayout}
                path="/driverAcceptDashTheme"
              />
              <RouteWithLayout
                component={AssignedWasherDashboard}
                exact
                layout={MainLayout}
                path="/washerAssignedDashTheme"
              />
              <Route path="/">
                <Redirect to="/login" />
              </Route>
            </Switch>
          </ThemeProvider>
        </Switch>
        <br />
      </React.Fragment>
    );
  }
}
