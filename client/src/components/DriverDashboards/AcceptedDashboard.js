import React, { Component } from "react";
import { withStyles, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import OrderTable from "./components/OrderTable";
import baseURL from "../../baseURL";
import acceptedDashboardStyles from "../../styles/DriverDashboards/acceptedDashboardStyles";

//todo: refresh list after completing an action

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//6: order accept by driver to be delivered back to user
//7: order delivered to user
//8: canceled

//only display status 1 (need to enter weight), 2: (mark dropped to washer),

class AcceptedDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [], weight: "" };
  }

  componentDidMount = async () => {
    await axios
      .get(baseURL + "/order/getOrders", {})
      .then((res) => {
        if (res.data.success) {
          console.log("list of orders:");
          console.log(res.data.message);

          //filter only status 1 and 2
          let filteredOrders = res.data.message.filter((order) => {
            return order.orderInfo.status === 1 || order.orderInfo.status === 2;
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

  handleWeightChange = (weight) => {
    const regex = /^[0-9\b]+$/;

    if (weight === "" || regex.test(weight)) {
      this.setState({ weight: weight });
    }
  };

  handleWeightEntered = async (order) => {
    console.log("entered weight: " + this.state.weight);

    let orderID = order.orderInfo.orderID;
    let weight = this.state.weight;

    let success;
    await axios
      .post(baseURL + "/driver/updateOrderWeight", { weight, orderID })
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
          Accepted Orders
        </Typography>
        <OrderTable
          orders={this.state.orders}
          weight={this.state.weight}
          handleWeightChange={this.handleWeightChange}
          handleWeightEntered={this.handleWeightEntered}
        />
      </React.Fragment>
    );
  }
}

AcceptedDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(acceptedDashboardStyles)(AcceptedDashboard);
