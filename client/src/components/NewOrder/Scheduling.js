import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import schedulingStyles from "../../styles/NewOrder/schedulingStyles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ScheduleIcon from "@material-ui/icons/Schedule";
var moment = require("moment");

class Scheduling extends Component {
  getDate = (when) => {
    if (when === "today") {
      return moment().format("MM/DD/YYYY");
    } else if (when === "tomorrow") {
      return moment().add(1, "days").format("MM/DD/YYYY");
    }

    return "N/A";
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" gutterBottom>
          What day would you like your order to be picked up?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<CalendarTodayIcon />}
            >
              Today: {this.getDate("today")}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<CalendarTodayIcon />}
            >
              Tomorrow: {this.getDate("tomorrow")}
            </Button>
          </Grid>
        </Grid>
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          className={classes.title}
        >
          What's your preferred pickup time?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
                keyboardIcon={<ScheduleIcon />}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Scheduling.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(schedulingStyles)(Scheduling);
