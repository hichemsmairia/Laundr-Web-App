import React, { Component } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  withStyles,
} from "@material-ui/core";
import PropTypes from "prop-types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import NewOrder from "./NewOrder/NewOrder";
import OrderStatus from "./OrderStatus/OrderStatus";
import baseURL from "../../baseURL";
import dashboardStyles from "../../styles/User/dashboardStyles";

//todo: ensure only one order at a time
//todo: add loading backdrop
//todo: implement status 8 feature for order status when order is delivered
//todo: test button gradients, normal vs login one

class Dashboard extends Component {
  constructor(props) {
    super(props);

    let token = localStorage.getItem("token");
    const data = jwtDecode(token);
    this.userFname = data.fname;

    this.state = { orderComponent: null };
  }

  componentDidMount = () => {
    this.renderOrderInfo();
  };

  renderOrderInfo = async () => {
    let token = localStorage.getItem("token");
    const data = jwtDecode(token);
    let userEmail = data.email;

    let component = null;

    await axios
      .post(baseURL + "/order/getCurrentOrder", { userEmail })
      .then((res) => {
        if (res.data.success) {
          if (res.data.message === "N/A") {
            component = <NewOrder />;
          } else {
            component = <OrderStatus order={res.data.message} />;
          }
        } else {
          alert("Error with fetching orders, please contact us.");
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    this.setState({ orderComponent: component });
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Grid container spacing={1} direction="column" /*main page column*/>
          <Grid item>
            <Grid container spacing={1} direction="row" /*first row*/>
              <Grid item>
                <Card className={classes.hoverCard}>
                  <CardHeader
                    title={`Welcome, ${this.userFname}`}
                    titleTypographyProps={{ variant: "h1" }}
                    classes={{ title: classes.welcomeText }}
                  />
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container spacing={1} direction="row" /*second row*/>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justify="space-evenly"
                  alignItems="flex-start"
                  /*first column*/
                >
                  <Grid item>{this.state.orderComponent}</Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid
                  container
                  spacing={1}
                  direction="column"
                  justify="space-evenly"
                  alignItems="flex-start"
                  /*second column*/
                >
                  <Grid item>
                    <h1>2nd</h1>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyles)(Dashboard);
