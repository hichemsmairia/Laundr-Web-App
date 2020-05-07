import React, { Component } from "react";
import {
  withStyles,
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
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
import jwtDecode from "jwt-decode";
import axios from "axios";
import Scheduling from "./Scheduling";
import Preferences from "./Preferences";
import Address from "./Address";
import Pricing from "./Pricing";
import Review from "./Review";
import newOrderStyles from "../../styles/NewOrder/newOrderStyles";
import baseURL from "../../baseURL";

const moment = require("moment");
const geolib = require("geolib");
const apiKEY =
  process.env.GOOGLE_MAPS_API_KEY || require("../../config").google.mapsKEY;

//todo: add functionality for orlando users, check which city user is from

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
      orderID: -1, //done screen
    };
  }

  handleNext = async () => {
    //also handle validation in here!
    let canNext = true;
    switch (this.state.activeStep) {
      case 0:
        canNext = this.handleTimeCheck();

        if (canNext) {
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
        let addressCords = { lat: -1, lng: -1 };

        //coordinates of entered address
        await Geocode.fromAddress(this.state.address).then(
          (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            addressCords.lat = lat;
            addressCords.lng = lng;
          },
          (error) => {}
        );

        //determine distance in m from center of range based on city, hardcode gnv for now
        let distance = geolib.getPreciseDistance(
          { latitude: addressCords.lat, longitude: addressCords.lng },
          { latitude: 29.6499, longitude: -82.3486 }
        );

        console.log("lat: " + addressCords.lat);
        console.log("lng: " + addressCords.lng);

        if (this.state.address === "") {
          this.setState({
            error: true,
            errorMessage: "Please enter an address.",
          });
          canNext = false;
        } else if (distance > 16094) {
          this.setState({
            error: true,
            errorMessage:
              "The address entered is not valid or it is not within our service range. Please try again.",
          });
          console.log("distance: " + distance);
          console.log("====================================");
          canNext = false;
        } else {
          this.setState({ addressStep: false, pricingStep: true });
        }

        break;
      case 3:
        this.setState({ pricingStep: false, reviewStep: true });
        break;
      case 4:
        //check time again in case they waited and then came back to continue their order
        canNext = this.handleTimeCheck();

        let orderPlaced;

        if (canNext) {
          orderPlaced = await this.handlePlaceOrder();
        } else {
          return;
        }

        if (!orderPlaced) {
          this.setState({
            error: true,
            errorMessage:
              "There was an error with placing your order. Please try again later.",
          });
          canNext = false;
        }

        break;
      default:
        break;
    }

    if (canNext) {
      console.log("moved on to next");
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

  handleTimeCheck = () => {
    console.log("scheduled time:" + this.state.formattedTime);
    let canNext = true;
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
      hourFromNow.isAfter(moment("17:00:00", "HH:mm:ss"))
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
        errorMessage: "The pickup time must be between 10 AM and 7 PM.",
      });
      canNext = false;
    } else if (
      hourFromNow.isBetween(lowerBound, upperBound) &&
      scheduledTime.isBefore(hourFromNow) &&
      this.state.todaySelected
    ) {
      //if 1 hr in advance is between 10 and 7 AND pickup time is before that AND the date selected is today
      this.setState({
        error: true,
        errorMessage: "The pickup time must be at least 1 hour in advance.",
      });
      canNext = false;
    }

    return canNext;
  };

  //scheduling
  handleTodayChange = () => {
    this.setState({
      todaySelected: true,
      tomorrowSelected: false,
      date: this.today,
    });
  };

  handleTomorrowChange = () => {
    this.setState({
      todaySelected: false,
      tomorrowSelected: true,
      date: this.tomorrow,
    });
  };

  handleTimeChange = (time) => {
    let formatted = moment(time, "HH:mm:ss").format("LT");
    this.setState({ rawTime: time, formattedTime: formatted });
  };

  handleErrorClose = () => {
    this.setState({ error: false });
  };

  //preferences
  handleScentedChange = (scented) => {
    this.setState({ scented: scented });
  };

  handleDelicatesChange = (delicates) => {
    this.setState({ delicates: delicates });
  };

  handleSeparateChange = (separate) => {
    this.setState({ separate: separate });
  };

  handleTowelsSheetsChange = (towelsSheets) => {
    this.setState({ towelsSheets: towelsSheets });
  };

  handleWasherPrefsChange = (preferences) => {
    let limit = 200;

    if (preferences.length > limit) {
      preferences = preferences.slice(0, limit);
    }

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
    let limit = 200;

    if (preferences.length > limit) {
      preferences = preferences.slice(0, limit);
    }

    this.setState({ addressPreferences: preferences });
  };

  evaluateWhitespace = (text) => {
    if (!text.replace(/\s/g, "").length) {
      return "N/A";
    }

    return text;
  };

  handlePlaceOrder = async () => {
    let token = localStorage.getItem("token");
    axios.defaults.headers.common["token"] = token;
    const data = jwtDecode(token);
    let email = data.email;
    let fname = data.fname;
    let lname = data.lname;
    console.log("fname: " + fname);
    console.log("lname: " + lname);
    let phone = data.phone;
    let coupon = "placeholder"; //todo: changed when functionality added
    let scented = this.state.scented;
    let delicates = this.state.delicates;
    let separate = this.state.separate;
    let towelsSheets = this.state.towelsSheets;
    let washerPrefs = this.evaluateWhitespace(this.state.washerPreferences);
    let address = this.state.address;
    let addressPrefs = this.evaluateWhitespace(this.state.addressPreferences);
    let pickupDate = this.state.date;
    let pickupTime = this.state.formattedTime;
    let weight = 99.99; //todo: be changed when functionality added
    let cost = 99.99; //todo: be changed when functionality added
    let created = new Date();

    let orderPlaced;

    await axios
      .post(baseURL + "/order/placeOrder", {
        email,
        fname,
        lname,
        phone,
        coupon,
        scented,
        delicates,
        separate,
        towelsSheets,
        washerPrefs,
        address,
        addressPrefs,
        pickupDate,
        pickupTime,
        weight,
        cost,
        created,
      })
      .then((res) => {
        if (res.data.success) {
          orderPlaced = true;
          this.setState({ orderID: res.data.orderID });
        } else {
          orderPlaced = false;
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });

    return orderPlaced;

    //return order ID
  };

  handleDone = () => {
    alert("moved past confirmation screen");
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <CssBaseline />
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
                    Thank you for your order!
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #{this.state.orderID}. You can track
                    your order through your dashboard. Thanks for choosing
                    Laundr!
                  </Typography>
                  <div className={classes.buttons}>
                    {this.state.activeStep === steps.length && (
                      <Button
                        color="primary"
                        onClick={this.handleDone}
                        className={classes.button}
                      >
                        Okay
                      </Button>
                    )}
                  </div>
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
                        handleTodayChange={this.handleTodayChange}
                        handleTomorrowChange={this.handleTomorrowChange}
                        handleTimeChange={this.handleTimeChange}
                      />
                      {/* {
                        <div>
                          <Review
                            address={"3000 SW 35 Pl"}
                            addressPreferences={
                              "Building is next to the leasing office. Follow the yellow line to get to the leasing office."
                            }
                            scented={this.state.scented}
                            delicates={this.state.delicates}
                            separate={this.state.separate}
                            towelsSheets={this.state.towelsSheets}
                            washerPreferences={
                              "Please take care of my clothes as they are very delicate."
                            }
                            pickupDate={"4/20/20"}
                            pickupTime={"4:20 PM"}
                          />
                        </div>
                      } */}
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
                        handleScentedChange={this.handleScentedChange}
                        handleDelicatesChange={this.handleDelicatesChange}
                        handleSeparateChange={this.handleSeparateChange}
                        handleTowelsSheetsChange={this.handleTowelsSheetsChange}
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
                      <Review
                        address={this.state.address}
                        addressPreferences={this.state.addressPreferences}
                        scented={this.state.scented}
                        delicates={this.state.delicates}
                        separate={this.state.separate}
                        towelsSheets={this.state.towelsSheets}
                        washerPreferences={this.state.washerPreferences}
                        pickupDate={this.state.date}
                        pickupTime={this.state.formattedTime}
                      />
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
        </main>
      </React.Fragment>
    );
  }
}

NewOrder.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(newOrderStyles)(NewOrder);
