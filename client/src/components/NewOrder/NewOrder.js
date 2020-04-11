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
} from "@material-ui/core";
import PropTypes from "prop-types";
import Scheduling from "./Scheduling";
import Preferences from "./Preferences";
import Address from "./Address";
import Pricing from "./Pricing";
import Review from "./Review";
import newOrderStyles from "../../styles/NewOrder/newOrderStyles";

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

    this.state = {
      activeStep: 0,
      schedulingStep: true,
      preferencesStep: false,
      addressStep: false,
      pricingStep: false,
      reviewStep: false,
    };
  }

  handleNext = () => {
    switch (this.state.activeStep) {
      case 0:
        this.setState({ schedulingStep: false, preferencesStep: true });
        break;
      case 1:
        this.setState({ preferencesStep: false, addressStep: true });
        break;
      case 2:
        this.setState({ addressStep: false, pricingStep: true });
        break;
      case 3:
        this.setState({ pricingStep: false, reviewStep: true });
        break;
      default:
        break;
    }
    this.setState({ activeStep: this.state.activeStep + 1 });
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
                      <Scheduling />
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
                      <Preferences />
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
                      <Address />
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
