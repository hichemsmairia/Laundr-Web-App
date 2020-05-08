import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import OrderTable from "./components/OrderTable";
import baseURL from "../../baseURL";
import mainDashboardStyles from "../../styles/DriverDashboards/mainDashboardStyles";

//todo: add isDriver to user, also iswasher, etc.
//todo: conditional redirects

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//6: order accept by driver to be delivered back to user
//7: order delivered to user
//8: canceled

//only display status 0 and 4, ones able to be "accepted"

class MainDashboard extends Component {
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

          //filter only status 0 and 4
          let filteredOrders = res.data.message.filter((order) => {
            return order.orderInfo.status === 0 || order.orderInfo.status === 4;
          });

          this.setState({ orders: filteredOrders });
        } else {
          alert("Error with fetching orders, please contact us.");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  handlePickupAccept = async (order) => {
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
      <React.Fragment>
        <Typography variant="h1" gutterBottom>
          Available Orders
        </Typography>
        <OrderTable
          orders={this.state.orders}
          handlePickupAccept={this.handlePickupAccept}
        />
      </React.Fragment>
    );
  }
}

MainDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(mainDashboardStyles)(MainDashboard);
