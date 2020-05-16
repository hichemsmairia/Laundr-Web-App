import React, { Component } from "react";
import {
  withStyles,
  Backdrop,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import OrderTable from "./components/OrderTable";
import baseURL from "../../baseURL";
import acceptedDashboardStyles from "../../styles/Driver/acceptedDashboardStyles";

//todo: refresh list after completing an action, and THEN show the snackbar?

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//5: order accept by driver to be delivered back to user
//6: order delivered to user
//7: canceled

//only display status 1 (need to enter weight), 2: (mark dropped to washer), 5: (mark delivered to user)

class AcceptedDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [], weight: "" };
  }

  componentDidMount = async () => {
    this.getOrders();
  };

  getOrders = () => {
    this.setState({ showLoading: true }, async () => {
      let token = localStorage.getItem("token");
      const data = jwtDecode(token);
      let driverEmail = data.email;

      await axios
        .get(baseURL + "/order/getOrders", {})
        .then((res) => {
          if (res.data.success) {
            console.log("list of orders:");
            console.log(res.data.message);

            //filter only status 1, 2, 5 of orders assigned to the logged in driver
            let filteredOrders = res.data.message.filter((order) => {
              return (
                (order.orderInfo.status === 1 ||
                  order.orderInfo.status === 2 ||
                  order.orderInfo.status === 5) &&
                order.pickupInfo.driverEmail === driverEmail
              );
            });

            this.setState({ orders: filteredOrders }, () => {
              this.setState({ showLoading: false });
            });
          } else {
            alert("Error with fetching orders, please contact us.");
          }
        })
        .catch((error) => {
          alert("Error: " + error);
        });
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

  handleWasherReceived = async (order) => {
    let orderID = order.orderInfo.orderID;
    let success;

    await axios
      .post(baseURL + "/driver/setWasherDelivered", { orderID })
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

  handleUserReceived = async (order) => {
    let orderID = order.orderInfo.orderID;
    let success;

    await axios
      .post(baseURL + "/driver/setUserDelivered", { orderID })
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
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Card>
          <CardHeader
            title="Accepted Orders"
            titleTypographyProps={{ variant: "h1", align: "center" }}
          />
          <Divider />
          <CardContent>
            <OrderTable
              orders={this.state.orders}
              getOrders={this.getOrders}
              weight={this.state.weight}
              handleWeightChange={this.handleWeightChange}
              handleWeightEntered={this.handleWeightEntered}
              handleWasherReceived={this.handleWasherReceived}
              handleUserReceived={this.handleUserReceived}
            />
            <Backdrop
              className={classes.backdrop}
              open={this.state.showLoading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

AcceptedDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(acceptedDashboardStyles)(AcceptedDashboard);
