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
import assignedDashboardStyles from "../../styles/Washer/assignedDashboardStyles";

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//6: order accept by driver to be delivered back to user
//7: order delivered to user
//8: canceled

//only display status 0 and 4, ones able to be "accepted"

class AssignedDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = { orders: [], showLoading: false };
  }

  componentDidMount = async () => {
    this.getOrders();
  };

  getOrders = () => {
    this.setState({ showLoading: true }, async () => {
      let token = localStorage.getItem("token");
      const data = jwtDecode(token);
      let washerEmail = data.email;

      await axios
        .get(baseURL + "/order/getOrders", {})
        .then((res) => {
          if (res.data.success) {
            console.log("list of orders:");
            console.log(res.data.message);

            //filter only status 3 and assigned to logged in washer
            let filteredOrders = res.data.message.filter((order) => {
              return (
                order.orderInfo.status === 3 &&
                order.washerInfo.email === washerEmail
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

  handleWasherDone = async (order) => {
    let orderID = order.orderInfo.orderID;
    let success;

    await axios
      .post(baseURL + "/washer/setWasherDone", { orderID })
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
            title="Assigned Orders"
            titleTypographyProps={{ variant: "h1", align: "center" }}
          />
          <Divider />
          <CardContent>
            <OrderTable
              orders={this.state.orders}
              getOrders={this.getOrders}
              handleWasherDone={this.handleWasherDone}
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

AssignedDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(assignedDashboardStyles)(AssignedDashboard);
