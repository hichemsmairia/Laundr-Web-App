import React, { Component } from "react";
import { Grid, Typography, Button, withStyles } from "@material-ui/core";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";
import PropTypes from "prop-types";
import DateFnsUtils from "@date-io/date-fns";
import ScheduleIcon from "@material-ui/icons/Schedule";
import schedulingStyles from "../../styles/NewOrder/schedulingStyles";

const moment = require("moment");

class Scheduling extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: "N/A",
      time: "N/A",
      todaySelected: false,
      tomorrowSelected: false,
      formattedTime: "N/A",
      rawTime: null,
    };

    this.today = moment().format("MM/DD/YYYY");
    this.tomorrow = moment().add(1, "days").format("MM/DD/YYYY");
  }

  handleToday = () => {
    this.setState({
      todaySelected: true,
      tomorrowSelected: false,
      date: this.today,
    });
  };

  handleTomorrow = () => {
    this.setState({
      todaySelected: false,
      tomorrowSelected: true,
      date: this.tomorrow,
    });
  };

  handleTime = (time) => {
    let formatted = moment(time, "HH:mm:ss").format("LT");
    this.setState({ rawTime: time, formattedTime: formatted });
    alert(formatted + " " + time);
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
              disabled={this.state.todaySelected}
              onClick={this.handleToday}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<CalendarTodayIcon />}
            >
              Today: {this.today}
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={this.state.tomorrowSelected}
              onClick={this.handleTomorrow}
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              startIcon={<CalendarTodayIcon />}
            >
              Tomorrow: {this.tomorrow}
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
                onChange={(value) => {
                  this.handleTime(value);
                }}
                value={this.state.rawTime}
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
