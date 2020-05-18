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
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ProgressBar from "./components/ProgressBar";
import orderStatusStyles from "../../../styles/User/OrderStatus/orderStatusStyles";

//0: order just placed
//1: order accepted by driver to be picked up from user
//2: weight entered
//3: order dropped off to washer
//4: order done by washer
//5: order accept by driver to be delivered back to user
//6: order delivered to user
//7: canceled
//8: fulfilled (user confirmed theyve seen the status on it)

class OrderStatus extends Component {
  constructor(props) {
    super(props);

    this.state = { dialog: false };
  }

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
          <div className={classes.root}>
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
            <CardContent id="orderStatusContainer">
              <ProgressBar status={this.props.order.orderInfo.status} />
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="center"
              >
                <Grid item>
                  <Card className={classes.infoCard}>
                    <CardHeader
                      title={`Order ID: #${this.props.order.orderInfo.orderID}`}
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
                        {this.props.order.orderInfo.address}
                      </Typography>
                      <Typography>
                        <QueryBuilderIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Pickup Time
                      </Typography>
                      <Typography color="textSecondary">
                        {this.props.order.pickupInfo.time}
                      </Typography>
                      <Typography>
                        <QueryBuilderIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Dropoff Time
                      </Typography>
                      <Typography color="textSecondary">
                        {this.props.order.dropoffInfo.time}
                        "functionality later"
                      </Typography>
                      <Typography>
                        <LocalMallIcon
                          fontSize="small"
                          style={{ marginBottom: -4 }}
                        />{" "}
                        Weight
                      </Typography>
                      <Typography color="textSecondary">
                        {this.props.order.orderInfo.weight} lbs
                      </Typography>
                      <Typography variant="h5">
                        Price: {this.props.order.orderInfo.cost}
                      </Typography>
                      <Button
                        variant="contained"
                        className={classes.gradient}
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
          </div>
        </main>
      </React.Fragment>
    );
  }
}

OrderStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(orderStatusStyles)(OrderStatus);
