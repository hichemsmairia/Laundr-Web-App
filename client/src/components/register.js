import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import registerStyles from "../styles/registerStyles";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import baseURL from "../baseURL";

//todo: referral code functionality when possible
//todo: get city dropdown to have hover effect rather than native dropdown if possible
//todo: possibly make modal for ToS rather than link
//todo: destructure copyright to another file
//todo: fix positioning of city "we currently..." msg to match
//todo: get loading from resending code to hover rather than appear?
//todo: fix imports to 1st level
//todo: check over views on mobile

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        target="_blank"
        rel="noopener"
        href="https://laundr.io/"
      >
        Laundr LLC
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: "",
      lname: "",
      city: "Gainesville",
      email: "",
      password: "",
      phone: "",
      referral: "",
      tos: false,
      fnameError: false,
      lnameError: false,
      emailError: false,
      passwordError: false,
      phoneError: false,
      tosError: false,
      fnameMsg: "",
      lnameMsg: "",
      emailMsg: "",
      passwordMsg:
        "*Passwords must be at least 6 characters long, contain one capital letter, and contain one special character.",
      phoneMsg: "",
      tosMsg: "",
      verifyCode: "",
      checkCode: "",
      openVerify: false,
      openResent: false,
      showResentLoad: false,
      disableCode: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let canRegister = true;

    console.log("fname: " + this.state.fname);
    console.log("lname: " + this.state.lname);
    console.log("city: " + this.state.city);
    console.log("email: " + this.state.email);
    console.log("password: " + this.state.password);
    console.log("phone: " + this.state.phone);
    console.log("phone length: " + this.state.phone.length);
    console.log("referral: " + this.state.referral);
    console.log("tos: " + this.state.tos);
    console.log("=============");

    if (this.state.fname === "") {
      this.setState({
        fnameError: true,
        fnameMsg: "*Please enter a first name."
      });

      canRegister = false;
    } else {
      this.setState({
        fnameError: false,
        fnameMsg: ""
      });
    }

    if (this.state.lname === "") {
      this.setState({
        lnameError: true,
        lnameMsg: "*Please enter a last name."
      });

      canRegister = false;
    } else {
      this.setState({
        lnameError: false,
        lnameMsg: ""
      });
    }

    if (
      this.state.email === "" ||
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) ===
        false
    ) {
      this.setState({
        emailError: true,
        emailMsg: "*Please enter a valid email."
      });

      canRegister = false;
    } else {
      this.setState({
        emailError: false,
        emailMsg: ""
      });
    }

    let password = this.state.password;
    if (
      password === "" ||
      password.length < 6 ||
      /[A-Z]+/.test(password) === false || //to disable warning from regex:
      /[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(password) === false //eslint-disable-line
    ) {
      this.setState({
        passwordError: true,
        passwordMsg:
          "*Passwords must be at least 6 characters long, contain one capital letter, and contain one special character."
      });

      canRegister = false;
    } else {
      this.setState({
        passwordError: false,
        passwordMsg: ""
      });
    }

    if (this.state.phone === "" || this.state.phone.length < 10) {
      this.setState({
        phoneError: true,
        phoneMsg: "*Please enter a 10-digit phone number."
      });

      canRegister = false;
    } else {
      this.setState({
        phoneError: false,
        phoneMsg: ""
      });
    }

    if (this.state.tos === false) {
      this.setState({
        tosError: true,
        tosMsg: "*Please accept the Terms of Service."
      });

      canRegister = false;
    } else {
      this.setState({
        tosError: false,
        tosMsg: ""
      });
    }

    if (canRegister) {
      //test
      this.handleVerify();
    }
  };

  handleVerify = async () => {
    //watch out: error from asynchronous stuff. before, the code didnt exist if you set state AFTER the axios call w/o await or not inside the axios callback without await
    let to = this.state.phone;
    let code;

    await axios
      .post(baseURL + "verifyPhone", { to })
      .then(res => {
        if (res.data.success) {
          alert("Verification code: " + res.data.message);
          code = res.data.message;
        } else {
          alert("Error code: " + res.data.message);
        }
      })
      .catch(error => {
        alert("Error code: " + error.code);
      });

    this.setState({ verifyCode: code, openVerify: true });
  };

  handleResendVerify = async () => {
    let to = this.state.phone;
    let code;

    await axios
      .post(baseURL + "verifyPhone", { to })
      .then(res => {
        if (res.data.success) {
          alert("Verification code: " + res.data.message);
          code = res.data.message;
        } else {
          alert("Error code: " + res.data.message);
        }
      })
      .catch(error => {
        alert("Error code: " + error.code);
      });

    this.setState(
      { showResentLoad: true, checkCode: "", disableCode: true },
      () => {
        setTimeout(() => {
          this.setState({
            verifyCode: code,
            openResent: true,
            showResentLoad: false,
            disableCode: false
          });
        }, 5000);
      }
    );
  };

  handleFnameChange = fname => {
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;

    if (fname === "" || regex.test(fname)) {
      this.setState({ fname: fname });
    }
  };

  handleLnameChange = lname => {
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;

    if (lname === "" || regex.test(lname)) {
      this.setState({ lname: lname });
    }
  };

  handleCityChange = city => {
    this.setState({ city: city });
  };

  handleEmailChange = email => {
    this.setState({ email: email });
  };

  handlePasswordChange = password => {
    this.setState({ password: password });
  };

  handlePhoneChange = phone => {
    const regex = /^[0-9\b]+$/;

    if (phone === "" || regex.test(phone)) {
      if (phone.length > 10) {
        phone = phone.substr(0, phone.length - 1);
      }
      this.setState({ phone: phone });
    }
  };

  handleReferralChange = referral => {
    this.setState({ referral: referral });
  };

  handleTosChange = () => {
    this.setState({ tos: !this.state.tos });
  };

  handleCodeChange = code => {
    this.setState({ checkCode: code });
  };

  handleVerifyClose = () => {
    this.setState({ openVerify: false, verifyCode: "", checkCode: "" });
  };

  handleVerifySubmit = () => {
    if (this.state.verifyCode == this.state.checkCode) {
      //number vs string, so ==
      alert("you good bro");
    } else {
      alert(
        "WRONG!!!" +
          "verify code: " +
          this.state.verifyCode +
          " " +
          "entered code: " +
          this.state.checkCode
      );
    }
  };

  handleResentClose = () => {
    this.setState({ openResent: false });
  };

  render() {
    const classes = this.props.classes;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Container className={classes.center}>
            <img
              style={{
                width: 500,
                height: 200
              }}
              alt="Company Logo"
              src="https://www.laundr.io/wp-content/uploads/2020/03/user_img.png"
            ></img>
          </Container>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="First Name"
                  autoComplete="fname"
                  error={this.state.fnameError}
                  helperText={this.state.fnameMsg}
                  value={this.state.fname}
                  onChange={event => {
                    this.handleFnameChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Last Name"
                  autoComplete="lname"
                  error={this.state.lnameError}
                  helperText={this.state.lnameMsg}
                  value={this.state.lname}
                  onChange={event => {
                    this.handleLnameChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>City</InputLabel>
                  <Select
                    native
                    label="City"
                    value={this.state.city}
                    onChange={event => {
                      this.handleCityChange(event.target.value);
                    }}
                  >
                    <option>Gainesville</option>
                    <option>Orlando</option>
                  </Select>
                </FormControl>
                <FormHelperText>
                  *We currently only serve Gainesville and Orlando.
                </FormHelperText>
              </Grid>
              <Dialog
                open={this.state.openVerify}
                onClose={this.handleVerifyClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Verification</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To finish registering, please enter the verification code we
                    just sent to you. If you didn't receive a code, make sure
                    your entered phone number is correct and resend the code.
                  </DialogContentText>
                  <Grid item xs={12} align="center">
                    <Grid item xs={12} align="center">
                      {this.state.showResentLoad && <CircularProgress />}
                    </Grid>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Code"
                      disabled={this.state.disableCode}
                      style={{ width: 100 }}
                      value={this.state.checkCode}
                      onChange={event => {
                        this.handleCodeChange(event.target.value);
                      }}
                    />
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Grid item xs={12} align="left">
                    <Button onClick={this.handleVerifyClose} color="primary">
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} align="right">
                    <Button onClick={this.handleResendVerify} color="primary">
                      Resend
                    </Button>
                    <Button onClick={this.handleVerifySubmit} color="primary">
                      Submit
                    </Button>
                  </Grid>
                </DialogActions>
              </Dialog>
              <Dialog
                open={this.state.openResent}
                onClose={this.handleResentClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">Alert</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Verification code successfully resent.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleResentClose} color="primary">
                    Okay
                  </Button>
                </DialogActions>
              </Dialog>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Email Address"
                  autoComplete="email"
                  error={this.state.emailError}
                  helperText={this.state.emailMsg}
                  value={this.state.email}
                  onChange={event => {
                    this.handleEmailChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  error={this.state.passwordError}
                  value={this.state.password}
                  helperText={this.state.passwordMsg}
                  onChange={event => {
                    this.handlePasswordChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Phone Number"
                  error={this.state.phoneError}
                  helperText={this.state.phoneMsg}
                  value={this.state.phone}
                  onChange={event => {
                    this.handlePhoneChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <TextField
                  variant="outlined"
                  label="Referral Code"
                  helperText="*Optional"
                  value={this.state.referral}
                  onChange={event => {
                    this.handleReferralChange(event.target.value);
                  }}
                />
              </Grid>
              <Grid align="center" item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox onChange={this.handleTosChange} color="primary" />
                  }
                  label="I have read and agree to the Terms of Service."
                />
                <Grid align="left" item xs={11}>
                  <div className={classes.error}>{this.state.tosMsg}</div>
                </Grid>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  <Link
                    align="center"
                    color="primary"
                    target="_blank"
                    rel="noopener"
                    href="https://www.laundr.io/termsofservice/"
                  >
                    Terms of Service
                  </Link>
                </Typography>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(registerStyles)(Register);
