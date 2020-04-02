import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import loginStyles from "../styles/loginStyles";

//todo: forgot password functionality
//todo: change button colors to match logo/stuff

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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginError: false,
      emailError: false,
      passwordError: false,
      email: "",
      password: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();

    let canLogin = true;

    //console.log("email: " + this.state.email);
    //console.log("password: " + this.state.password);

    if (
      this.state.email === "" ||
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email) ===
        false
    ) {
      this.setState({ emailError: true });
      canLogin = false;
    } else {
      this.setState({ emailError: false });
    }

    if (this.state.password === "") {
      this.setState({ passwordError: true });
      canLogin = false;
    } else {
      this.setState({ passwordError: false });
    }

    if (canLogin) {
      console.log("able to login");
    }
  };

  handleEmailChange = email => {
    this.setState({ email: email });
  };

  handlePasswordChange = password => {
    this.setState({ password: password });
  };

  evaluateEmailError = () => {
    if (this.state.loginError) {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            error
            helperText="*Email or password is incorrect. Please try again."
            onChange={event => {
              this.handleEmailChange(event.target.value);
            }}
            value={this.state.email}
          />
        </React.Fragment>
      );
    } else if (this.state.emailError) {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            error
            helperText="*Please enter a valid email."
            onChange={event => {
              this.handleEmailChange(event.target.value);
            }}
            value={this.state.email}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            autoComplete="email"
            onChange={event => {
              this.handleEmailChange(event.target.value);
            }}
            value={this.state.email}
          />
        </React.Fragment>
      );
    }
  };

  evaluatePasswordError = () => {
    if (this.state.loginError) {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error
            onChange={event => {
              this.handlePasswordChange(event.target.value);
            }}
            value={this.state.password}
          />
        </React.Fragment>
      );
    } else if (this.state.passwordError) {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            error
            helperText="*Please enter a password."
            onChange={event => {
              this.handlePasswordChange(event.target.value);
            }}
            value={this.state.password}
          />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            onChange={event => {
              this.handlePasswordChange(event.target.value);
            }}
            value={this.state.password}
          />
        </React.Fragment>
      );
    }
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
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            {this.evaluateEmailError()}
            {this.evaluatePasswordError()}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(loginStyles)(Login);
