import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDashboard from "./components/UserDashboard";
import NewOrder from "./components/User/NewOrder/NewOrder";
import AvailableDriverDashboard from "./components/Driver/AvailableDashboard";
import AcceptedDriverDashboard from "./components/Driver/AcceptedDashboard";
import AssignedWasherDashboard from "./components/Washer/AssignedDashboard";
import UserOrderStatus from "./components/User/OrderStatus/OrderStatus";
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
                path="/driverAvailable"
              />
              <RouteWithLayout
                component={AcceptedDriverDashboard}
                exact
                layout={MainLayout}
                path="/driverAccepted"
              />
              <RouteWithLayout
                component={AssignedWasherDashboard}
                exact
                layout={MainLayout}
                path="/washerAssigned"
              />
              <RouteWithLayout
                component={UserOrderStatus}
                exact
                layout={MainLayout}
                path="/userOrderStatus"
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
