import React, { Component } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import orderTableStyles from "../../../styles/Driver/components/orderTableStyles";

//todo: change snackbars to https://github.com/iamhosseindhv/notistack to make it prettier

class OrderTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false,
      dialogText: "",
      dialogTitle: "",
      currentOrder: null,
      openSnackbar: false,
      snackbarMessage: "",
      snackbarSuccess: true,
    };
  }

  renderStage = (stage) => {
    if (stage === 0) {
      return "User Pickup";
    } else if (stage === 1) {
      return "Weighing";
    } else if (stage === 2) {
      return "Washer Dropoff";
    } else if (stage === 4) {
      return "Washer Pickup";
    } else if (stage === 5) {
      return "Dropoff";
    }
  };

  renderActions = (stage) => {
    if (stage === 0) {
      return "Accept";
    } else if (stage === 1) {
      return "Enter Weight";
    } else if (stage === 2) {
      return "Delivered to Washer";
    } else if (stage === 4) {
      return "Accept";
    } else if (stage === 5) {
      return "Delivered to User";
    }
  };

  handleActionClicked = (stage, order) => {
    this.setState({ currentOrder: order }, () => {
      if (stage === 0) {
        this.setState({
          dialog: true,
          dialogTitle: "Confirmation",
        });
      } else if (stage === 1) {
        this.setState({
          dialog: true,
          dialogTitle: "Enter Weight",
        });
      } else if (stage === 2) {
        this.setState({
          dialog: true,
          dialogTitle: "Confirmation",
        });
      } else if (stage === 4) {
        this.setState({
          dialog: true,
          dialogTitle: "Confirmation",
        });
      } else if (stage === 5) {
        this.setState({
          dialog: true,
          dialogTitle: "Confirmation",
        });
      }
    });
  };

  renderDialogContent = () => {
    let order = this.state.currentOrder;

    if (order) {
      let status = order.orderInfo.status;
      if (status === 0) {
        return (
          <React.Fragment>
            <Typography variant="body1">
              Plese confirm that you are accepting an order from:&nbsp;
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: 600, textAlign: "center" }}
            >
              {`${order.userInfo.fname} ${order.userInfo.lname}`}
            </Typography>
          </React.Fragment>
        );
      } else if (status === 1) {
        return (
          <React.Fragment>
            <Typography variant="body1">
              Plese enter the weight, in pounds, of the order from:&nbsp;
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: 600, textAlign: "center" }}
            >
              {`${order.userInfo.fname} ${order.userInfo.lname}`}
            </Typography>
            <div style={{ textAlign: "center" }}>
              <TextField
                autoFocus
                margin="dense"
                label="Weight"
                value={this.props.weight}
                onChange={(event) => {
                  this.props.handleWeightChange(event.target.value);
                }}
                style={{ width: 100 }}
              />
            </div>
          </React.Fragment>
        );
      } else if (status === 2) {
        return (
          <React.Fragment>
            <Typography variant="body1">
              Plese confirm that you have delivered the order to the washer.
            </Typography>
          </React.Fragment>
        );
      } else if (status === 4) {
        return (
          <React.Fragment>
            <Typography variant="body1">
              Plese confirm that you are accepting an order from the following
              user for final delivery:&nbsp;
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: 600, textAlign: "center" }}
            >
              {`${order.userInfo.fname} ${order.userInfo.lname}`}
            </Typography>
          </React.Fragment>
        );
      } else if (status === 5) {
        return (
          <React.Fragment>
            <Typography variant="body1">
              Plese confirm that you have delivered the order to:
            </Typography>
            <Typography
              variant="body1"
              style={{ fontWeight: 600, textAlign: "center" }}
            >
              {`${order.userInfo.fname} ${order.userInfo.lname}`}
            </Typography>
          </React.Fragment>
        );
      }
    }
  };

  renderDialogActions = (classes) => {
    let order = this.state.currentOrder;

    if (order) {
      let status = order.orderInfo.status;
      if (status === 0) {
        return (
          <React.Fragment>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                let success = await this.props.handlePickupAccept(
                  this.state.currentOrder
                );
                if (success) {
                  this.renderAcceptedMsg();
                } else {
                  this.renderErrorAcceptMsg();
                }
              }}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Confirm
            </Button>
          </React.Fragment>
        );
      } else if (status === 1) {
        return (
          <React.Fragment>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                let success = await this.props.handleWeightEntered(
                  this.state.currentOrder
                );
                if (success) {
                  this.renderWeightSuccessMsg();
                } else {
                  this.renderWeightErrorMsg();
                }
              }}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Confirm
            </Button>
          </React.Fragment>
        );
      } else if (status === 2) {
        return (
          <React.Fragment>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                let success = await this.props.handleWasherReceived(
                  this.state.currentOrder
                );
                if (success) {
                  this.renderWasherReceivedMsg();
                } else {
                  this.renderWasherReceivedErrorMsg();
                }
              }}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Confirm
            </Button>
          </React.Fragment>
        );
      } else if (status === 4) {
        return (
          <React.Fragment>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                let success = await this.props.handleDropoffAccept(
                  this.state.currentOrder
                );
                if (success) {
                  this.renderAcceptedMsg();
                } else {
                  this.renderErrorAcceptMsg();
                }
              }}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Confirm
            </Button>
          </React.Fragment>
        );
      } else if (status === 5) {
        return (
          <React.Fragment>
            <Button
              onClick={this.handleDialogClose}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Cancel
            </Button>
            <Button
              onClick={async () => {
                let success = await this.props.handleUserReceived(
                  this.state.currentOrder
                );
                if (success) {
                  this.renderUserReceivedMsg();
                } else {
                  this.renderUserReceivedErrorMsg();
                }
              }}
              color="primary"
              variant="contained"
              className={classes.gradient}
            >
              Confirm
            </Button>
          </React.Fragment>
        );
      }
    }
  };

  handleDialogClose = () => {
    this.setState({ dialog: false });

    let order = this.state.currentOrder;

    if (order.orderInfo.status === 1) {
      //clear weight text field
      this.props.handleWeightChange("");
    }
  };

  renderAcceptedMsg = () => {
    this.setState({ dialog: false }, async () => {
      await this.props.getOrders();
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Order successfully accepted!",
        snackbarSuccess: true,
      });
    });
  };

  renderErrorAcceptMsg = () => {
    this.setState({ dialog: false }, () => {
      this.setState({
        openSnackbar: true,
        snackbarMessage:
          "Error with accepting this order - you could be too late! Please refresh and try again.",
        snackbarSuccess: false,
      });
    });
  };

  renderWeightSuccessMsg = () => {
    this.setState({ dialog: false }, async () => {
      await this.props.getOrders();
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Weight successfully entered!",
        snackbarSuccess: true,
      });
    });
  };

  renderWeightErrorMsg = () => {
    this.setState({ dialog: false }, () => {
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Error with entering weight - please contact us.",
        snackbarSuccess: false,
      });
    });
  };

  renderWasherReceivedMsg = () => {
    this.setState({ dialog: false }, async () => {
      await this.props.getOrders();
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Successfully confirmed delivery to washer!",
        snackbarSuccess: true,
      });
    });
  };

  renderWasherReceivedErrorMsg = () => {
    this.setState({ dialog: false }, () => {
      this.setState({
        openSnackbar: true,
        snackbarMessage:
          "Error with washer delivery confirmation - please contact us.",
        snackbarSuccess: false,
      });
    });
  };

  renderUserReceivedMsg = () => {
    this.setState({ dialog: false }, async () => {
      await this.props.getOrders();
      this.setState({
        openSnackbar: true,
        snackbarMessage: "Successfully confirmed delivery to user!",
        snackbarSuccess: true,
      });
    });
  };

  renderUserReceivedErrorMsg = () => {
    this.setState({ dialog: false }, () => {
      this.setState({
        openSnackbar: true,
        snackbarMessage:
          "Error with user delivery confirmation - please contact us.",
        snackbarSuccess: false,
      });
    });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Card>
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <React.Fragment>
              <Dialog open={this.state.dialog} onClose={this.handleDialogClose}>
                <DialogTitle>{this.state.dialogTitle}</DialogTitle>
                <DialogContent>
                  {this.renderDialogContent(classes)}
                </DialogContent>
                <DialogActions>
                  {this.renderDialogActions(classes)}
                </DialogActions>
              </Dialog>
            </React.Fragment>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="left">Date/Time</TableCell>
                    <TableCell align="left">Address</TableCell>
                    <TableCell align="left">Phone</TableCell>
                    <TableCell align="left">Instructions</TableCell>
                    <TableCell align="left">Load Size</TableCell>
                    <TableCell align="left">Stage</TableCell>
                    <TableCell align="left">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.props.orders.map((order) => (
                    <TableRow hover key={order.orderInfo.orderID}>
                      <TableCell>
                        <div className={classes.nameContainer}>
                          <Typography variant="body1">
                            {`${order.userInfo.fname} ${order.userInfo.lname}`}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            Pickup:&nbsp;
                          </Typography>
                          <Typography variant="body1">{` ${order.pickupInfo.date} @ ${order.pickupInfo.time}`}</Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            Dropoff:&nbsp;
                          </Typography>
                          <Typography variant="body1">
                            {` ${order.dropoffInfo.date} @ ${order.dropoffInfo.time}`}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            User:&nbsp;
                          </Typography>
                          <Typography variant="body1">{` ${order.orderInfo.address}`}</Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            Washer:&nbsp;
                          </Typography>
                          <Typography variant="body1">
                            {` ${order.washerInfo.address}`}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            User:&nbsp;
                          </Typography>
                          <Typography variant="body1">
                            {order.userInfo.phone}
                          </Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Typography
                            variant="body1"
                            style={{ fontWeight: 600 }}
                          >
                            Washer:&nbsp;
                          </Typography>
                          <Typography variant="body1">
                            {order.washerInfo.phone}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell>{order.pickupInfo.prefs}</TableCell>
                      <TableCell>{420}</TableCell>
                      <TableCell>
                        {this.renderStage(order.orderInfo.status)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          className={classes.gradient}
                          color="primary"
                          onClick={() => {
                            this.handleActionClicked(
                              order.orderInfo.status,
                              order
                            );
                          }}
                        >
                          {this.renderActions(order.orderInfo.status)}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
        <CardActions className={classes.actions}></CardActions>
        <React.Fragment>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            open={this.state.openSnackbar}
            autoHideDuration={6000}
            onClose={(event, reason) => {
              if (reason !== "clickaway") {
                this.setState({ openSnackbar: false });
              }
            }}
            message={this.state.snackbarMessage}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={() => {
                    this.setState({ openSnackbar: false });
                  }}
                >
                  <Close fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
            ContentProps={{
              style: {
                backgroundColor: this.state.snackbarSuccess ? "green" : "red",
              },
            }}
          />
        </React.Fragment>
      </Card>
    );
  }
}

OrderTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(orderTableStyles)(OrderTable);
