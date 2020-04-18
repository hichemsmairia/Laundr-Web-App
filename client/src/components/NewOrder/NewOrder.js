import React, { Component } from "react";
import {
  withStyles,
  CssBaseline,
  AppBar,
  Toolbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  Fade,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Geocode from "react-geocode";
import Scheduling from "./Scheduling";
import Preferences from "./Preferences";
import Address from "./Address";
import Pricing from "./Pricing";
import Review from "./Review";
import newOrderStyles from "../../styles/NewOrder/newOrderStyles";

const moment = require("moment");
const apiKEY =
  process.env.GOOGLE_MAPS_API_KEY || require("../../config").google.mapsKEY;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const steps = ["Scheduling", "Preferences", "Address", "Pricing", "Review"];

class NewOrder extends Component {
  constructor(props) {
    super(props);

    this.now = moment();
    this.today = this.now.format("MM/DD/YYYY");
    this.tomorrow = this.now.add(1, "days").format("MM/DD/YYYY");
    this.nowFormattedTime = moment(this.now, "HH:mm:ss").format("LT");
    //console.log(moment().format("HH:mm:ss"));

    this.state = {
      activeStep: 0, //navigation
      schedulingStep: true,
      preferencesStep: false,
      addressStep: false,
      pricingStep: false,
      reviewStep: false,
      error: false,
      errorMessage: "",
      date: "N/A", //scheduling
      todaySelected: false,
      tomorrowSelected: false,
      formattedTime: this.nowFormattedTime,
      rawTime: new Date(),
      scented: false, //preferences
      delicates: false,
      separate: false,
      towelsSheets: false,
      washerPreferences: "",
      center: {
        //address
        lat: 29.6516, //default view is gainesville
        lng: -82.3248,
      },
      zoom: 12,
      address: "",
      markerLat: 0,
      markerLong: 0,
      renderMarker: false,
      addressPreferences: "",
    };
  }

  handleNext = () => {
    //also handle validation in here!
    let canNext = true;
    switch (this.state.activeStep) {
      case 0:
        console.log("today: " + this.state.todaySelected);
        console.log("tomorrow:" + this.state.tomorrowSelected);
        console.log("formatted time: " + this.state.formattedTime);
        console.log("raw time: " + this.state.rawTime);
        console.log("====================================");

        //time checks, military time format: check if logged in user is gainesville or etc, hardcode gnv for now
        let scheduledTime = moment(this.state.rawTime, "HH:mm:ss"); //note: converting Date() to moment obj
        let lowerBound = moment("10:00:00", "HH:mm:ss");
        let upperBound = moment("19:00:00", "HH:mm:ss");

        //universal 1 hour from now check
        let hourFromNow = moment(moment(), "HH:mm:ss").add(1, "hours");

        if (!this.state.todaySelected && !this.state.tomorrowSelected) {
          //if no date selected
          this.setState({
            error: true,
            errorMessage: "Please select a pickup date.",
          });
          canNext = false;
        } else if (
          this.state.todaySelected &&
          moment(moment(), "HH:mm:ss").isAfter(moment("17:00:00", "HH:mm:ss"))
        ) {
          //if selected today and its after 7 PM
          this.setState({
            error: true,
            errorMessage:
              "Sorry! We are closed after 7 PM. Please select a different day.",
          });
          canNext = false;
        } else if (!scheduledTime.isBetween(lowerBound, upperBound)) {
          //if pickup time isnt between 10 am and 7 pm
          this.setState({
            error: true,
            errorMessage: "Pickup time must be between 10 AM and 7 PM.",
          });
          canNext = false;
        } else if (
          hourFromNow.isBetween(lowerBound, upperBound) &&
          scheduledTime.isBefore(hourFromNow)
        ) {
          //if 1 hr in advance is between 10 and 7 AND pickup time is before that
          this.setState({
            error: true,
            errorMessage: "Pickup time must be at least 1 hour in advance.",
          });
          canNext = false;
        } else {
          this.setState({ schedulingStep: false, preferencesStep: true });
        }

        break;
      case 1:
        console.log("scented: " + this.state.scented);
        console.log("delicates: " + this.state.delicates);
        console.log("separate: " + this.state.separate);
        console.log("towels and sheets: " + this.state.towelsSheets);
        console.log("washer preferences: " + this.state.washerPreferences);
        console.log("====================================");

        this.setState({ preferencesStep: false, addressStep: true });
        break;
      case 2:
        console.log("address: " + this.state.address);
        console.log("driver instructions: " + this.state.addressPreferences);
        console.log("====================================");

        if (this.state.address === "") {
          this.setState({
            error: true,
            errorMessage: "Please enter an address.",
          });
          canNext = false;
        } else {
          this.setState({ addressStep: false, pricingStep: true });
        }

        break;
      case 3:
        this.setState({ pricingStep: false, reviewStep: true });
        break;
      default:
        break;
    }

    if (canNext) {
      this.setState({ activeStep: this.state.activeStep + 1 });
    }
  };

  handleBack = () => {
    switch (this.state.activeStep) {
      case 1:
        this.setState({ schedulingStep: true, preferencesStep: false });
        break;
      case 2:
        this.setState({ preferencesStep: true, addressStep: false });
        break;
      case 3:
        this.setState({ addressStep: true, pricingStep: false });
        break;
      case 4:
        this.setState({ pricingStep: true, reviewStep: false });
        break;
      default:
        break;
    }
    this.setState({ activeStep: this.state.activeStep - 1 });
  };

  //scheduling
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
  };

  handleErrorClose = () => {
    this.setState({ error: false });
  };

  //preferences
  handleScented = (scented) => {
    this.setState({ scented: scented });
  };

  handleDelicates = (delicates) => {
    this.setState({ delicates: delicates });
  };

  handleSeparate = (separate) => {
    this.setState({ separate: separate });
  };

  handleTowelsSheets = (towelsSheets) => {
    this.setState({ towelsSheets: towelsSheets });
  };

  handleWasherPrefsChange = (preferences) => {
    this.setState({ washerPreferences: preferences });
  };

  //address
  handleAddressSelect = async (suggestion) => {
    this.setState({ address: suggestion.description });

    Geocode.setApiKey(apiKEY);
    await Geocode.fromAddress(suggestion.description).then(
      (res) => {
        const { lat, lng } = res.results[0].geometry.location;
        this.setState({
          center: {
            lat: lat,
            lng: lng,
          },
          zoom: 16,
          markerLat: lat,
          markerLong: lng,
          renderMarker: true,
        });
      },
      (error) => {
        alert("Error: " + error);
      }
    );
  };

  handleAddressChange = (address) => {
    this.setState({ address: address });
  };

  handleMapChange = (properties) => {
    this.setState({
      center: properties.center,
      zoom: properties.zoom,
    });
  };

  handleAddressPrefsChange = (preferences) => {
    this.setState({ addressPreferences: preferences });
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              New Order
            </Typography>
            <Stepper
              activeStep={this.state.activeStep}
              className={classes.stepper}
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              <Dialog
                open={this.state.error}
                onClose={this.handleErrorClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Alert</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {this.state.errorMessage}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleErrorClose} color="primary">
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
              {this.state.activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order
                    confirmation, and will send you an update when your order
                    has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Fade
                    in={this.state.schedulingStep}
                    style={{
                      display: !this.state.schedulingStep ? "none" : "block",
                      transitionDelay: this.state.schedulingStep
                        ? "500ms"
                        : "0ms",
                    }}
                  >
                    <div>
                      <Scheduling
                        today={this.today}
                        tomorrow={this.tomorrow}
                        update={this.handleScheduling}
                        todaySelected={this.state.todaySelected}
                        tomorrowSelected={this.state.tomorrowSelected}
                        formattedTime={this.state.formattedTime}
                        rawTime={this.state.rawTime}
                        handleToday={this.handleToday}
                        handleTomorrow={this.handleTomorrow}
                        handleTime={this.handleTime}
                      />
                    </div>
                  </Fade>
                  <Fade
                    in={this.state.preferencesStep}
                    style={{
                      display: !this.state.preferencesStep ? "none" : "block",
                      transitionDelay: this.state.preferencesStep
                        ? "500ms"
                        : "0ms",
                    }}
                  >
                    <div>
                      <Preferences
                        scented={this.state.scented}
                        delicates={this.state.delicates}
                        separate={this.state.separate}
                        towelsSheets={this.state.towelsSheets}
                        washerPreferences={this.state.washerPreferences}
                        handleScented={this.handleScented}
                        handleDelicates={this.handleDelicates}
                        handleSeparate={this.handleSeparate}
                        handleTowelsSheets={this.handleTowelsSheets}
                        handleWasherPrefsChange={this.handleWasherPrefsChange}
                      />
                    </div>
                  </Fade>
                  <Fade
                    in={this.state.addressStep}
                    style={{
                      display: !this.state.addressStep ? "none" : "block",
                      transitionDelay: this.state.addressStep ? "500ms" : "0ms",
                    }}
                  >
                    <div>
                      <Address
                        center={this.state.center}
                        zoom={this.state.zoom}
                        address={this.state.address}
                        markerLat={this.state.markerLat}
                        markerLong={this.state.markerLong}
                        renderMarker={this.state.renderMarker}
                        addressPreferences={this.state.addressPreferences}
                        handleAddressSelect={this.handleAddressSelect}
                        handleAddressChange={this.handleAddressChange}
                        handleAddressPrefsChange={this.handleAddressPrefsChange}
                        handleMapChange={this.handleMapChange}
                      />
                    </div>
                  </Fade>
                  <Fade
                    in={this.state.pricingStep}
                    style={{
                      display: !this.state.pricingStep ? "none" : "block",
                      transitionDelay: this.state.pricingStep ? "500ms" : "0ms",
                    }}
                  >
                    <div>
                      <Pricing />
                    </div>
                  </Fade>
                  <Fade
                    in={this.state.reviewStep}
                    style={{
                      display: !this.state.reviewStep ? "none" : "block",
                      transitionDelay: this.state.reviewStep ? "500ms" : "0ms",
                    }}
                  >
                    <div>
                      <Review />
                    </div>
                  </Fade>
                  <div className={classes.buttons}>
                    {this.state.activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {this.state.activeStep === steps.length - 1
                        ? "Place order"
                        : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
          <Copyright />
        </main>
      </React.Fragment>
    );
  }
}

NewOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(newOrderStyles)(NewOrder);
