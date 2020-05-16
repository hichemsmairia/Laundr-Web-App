import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import axios from "axios";
import jwtDecode from "jwt-decode";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ProgressBar from "./components/ProgressBar";
import orderStatusStyles from "../../../styles/User/OrderStatus/orderStatusStyles";
import baseURL from "../../../baseURL";

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//5: order accept by driver to be delivered back to user
//6: order delivered to user
//7: canceled

//todo: change user file structure components to have new order and order status
//todo: make this display info only, on user dashboard first fetch if the user has an order and if so, display this and pass the order down as props

class OrderStatus extends Component {
  constructor(props) {
    super(props);

    this.defaultOrder = {
      userInfo: {
        email: "N/A",
        phone: "N/A",
        fname: "N/A",
        lname: "N/A",
      },
      washerInfo: {
        scented: false,
        delicates: false,
        separate: false,
        towelsSheets: false,
        prefs: "N/A",
        address: "N/A",
        email: "N/A",
        phone: "N/A",
      },
      pickupInfo: {
        prefs: "N/A",
        date: "N/A",
        time: "N/A",
        driverEmail: "N/A",
      },
      dropoffInfo: { date: "N/A", time: "N/A", driverEmail: "N/A" },
      orderInfo: {
        coupon: "N/A",
        status: 0,
        weight: "N/A",
        cost: 99.99,
        address: "N/A",
        orderID: -1,
      },
      __v: 0,
    };

    this.state = { order: this.defaultOrder, dialog: false };
  }

  componentDidMount = async () => {
    let token = localStorage.getItem("token");
    const data = jwtDecode(token);
    let userEmail = data.email;

    await axios
      .post(baseURL + "/order/getCurrentOrder", { userEmail })
      .then((res) => {
        if (res.data.success) {
          if (res.data.message === "N/A") {
            alert("Order not found for user.");
          } else {
            this.setState({ order: res.data.message });
            console.log(res.data.message);
          }
        } else {
          alert("Error with fetching orders, please contact us.");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  handleOrderCancel = () => {
    alert("order canceled");
  };

  handleDialogClose = () => {
    this.setState({ dialog: false });
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Card className={classes.root}>
            <Dialog
              disableEnforceFocus
              disableAutoFocus
              disableRestoreFocus
              open={this.state.dialog}
              onClose={this.handleDialogClose}
              container={() => document.getElementById("orderStatusContainer")}
              style={{ position: "absolute", zIndex: 1 }}
              BackdropProps={{
                style: {
                  position: "absolute",
                  backgroundColor: "transparent",
                },
              }}
            >
              <DialogTitle>Confirmation</DialogTitle>
              <DialogContent>
                <Typography variant="body1">
                  Are you sure you want to cancel your order?
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleDialogClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={this.handleOrderCancel} color="primary">
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
            <CardHeader
              title="Order Status"
              titleTypographyProps={{ variant: "h1", align: "center" }}
            />
            <Divider />
            <CardContent id="orderStatusContainer">
              <ProgressBar step={2} />
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Card className={classes.infoCard}>
                    <CardHeader
                      title="Order ID: #420"
                      titleTypographyProps={{ variant: "h5" }}
                    />
                    <Divider />
                    <CardContent>
                      <Typography>
                        <HomeRoundedIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Address
                      </Typography>
                      <Typography color="textSecondary">
                        {this.state.order.orderInfo.address}
                      </Typography>
                      <Typography>
                        <QueryBuilderIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Pickup Time
                      </Typography>
                      <Typography color="textSecondary">
                        {this.state.order.pickupInfo.time}
                      </Typography>
                      <Typography>
                        <QueryBuilderIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Dropoff Time
                      </Typography>
                      <Typography color="textSecondary">
                        {this.state.order.dropoffInfo.time}
                      </Typography>
                      <Typography>
                        <LocalMallIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Weight
                      </Typography>
                      <Typography color="textSecondary">
                        {this.state.order.orderInfo.weight} lbs
                      </Typography>
                      <Typography variant="h5">
                        Price: {this.state.order.orderInfo.cost}
                      </Typography>
                      <Button
                        variant="contained"
                        style={{
                          backgroundImage:
                            "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
                          color: "white",
                        }}
                        onClick={() => {
                          this.setState({ dialog: true });
                        }}
                      >
                        Cancel
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </main>
      </React.Fragment>
    );
  }
}

OrderStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(orderStatusStyles)(OrderStatus);
