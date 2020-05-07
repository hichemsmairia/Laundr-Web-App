import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import OrderTable from "./components/OrderTable";
import baseURL from "../../baseURL";
import driverDashboardStyles from "../../styles/DriverDashboard/driverDashboardStyles";

//todo: change order structure to pickupInfo and dropoffInfo, move address to orderInfo
//todo: add isDriver to user, also iswasher, etc.
//todo: conditional redirects
//todo: fix header error in server

class DriverDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [] };
  }

  componentDidMount = async () => {
    await axios
      .get(baseURL + "/order/getOrders", {})
      .then((res) => {
        if (res.data.success) {
          console.log("list of orders:");
          console.log(res.data.message);
          this.setState({ orders: res.data.message });
        } else {
          console.log("error with fetching orders");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  acceptOrder = async (order) => {
    let token = localStorage.getItem("token");
    const data = jwtDecode(token);
    let driverEmail = data.email;
    let orderID = order.orderInfo.orderID;

    let success;
    await axios
      .post(baseURL + "/driver/assignOrder", { driverEmail, orderID })
      .then((res) => {
        if (res.data.success) {
          success = true;
        } else {
          success = false;
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    return success;
  };

  render() {
    return (
      <OrderTable orders={this.state.orders} acceptOrder={this.acceptOrder} />
    );
  }
}

DriverDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(driverDashboardStyles)(DriverDashboard);
