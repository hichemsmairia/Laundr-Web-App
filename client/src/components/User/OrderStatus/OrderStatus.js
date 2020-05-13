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

class OrderStatus extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Card className={classes.root}>
          <CardHeader
            title="Order Status"
            titleTypographyProps={{ variant: "h1" }}
          />
          <Divider />
          <CardContent>
            <ProgressBar step={5} />
          </CardContent>
          <CardContent>
            <Grid
              container
              direction="row"
              alignItems="flex-end"
              justify="space-between"
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
                    <Typography color="textSecondary">3000 SW 35 Pl</Typography>
                    <Typography>
                      <QueryBuilderIcon
                        fontSize="small"
                        style={{ marginBottom: -4 }}
                      />{" "}
                      Pickup Time
                    </Typography>
                    <Typography color="textSecondary">4:40 PM</Typography>
                    <Typography>
                      <QueryBuilderIcon
                        fontSize="small"
                        style={{ marginBottom: -4 }}
                      />{" "}
                      Dropoff Time
                    </Typography>
                    <Typography color="textSecondary">4:40 PM</Typography>
                    <Typography>
                      <LocalMallIcon
                        fontSize="small"
                        style={{ marginBottom: -4 }}
                      />{" "}
                      Weight
                    </Typography>
                    <Typography color="textSecondary">420 lbs</Typography>
                    <Typography variant="h5">Price: $4.20</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item style={{ alignSelf: "right" }}>
                <Button
                  variant="contained"
                  style={{ background: "red", color: "white" }}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

OrderStatus.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(orderStatusStyles)(OrderStatus);
