import React, { Component } from "react";
import NewOrder from "./NewOrder/NewOrder";
import OrderStatus from "./OrderStatus/OrderStatus";

//todo: other todos, also change alert to appear inside the new order box
//todo: fix spacing, use card for the new order to follow same structure and look as the order status
//todo: research cssbaseline, try to fix overflow of stepper on new order (see order status stepper?)

class UserDashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <NewOrder />
        <OrderStatus />
      </React.Fragment>
    );
  }
}

export default UserDashboard;
