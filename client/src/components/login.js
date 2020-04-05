import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  withStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";
import loginStyles from "../styles/loginStyles";
import axios from "axios";
import baseURL from "../baseURL";

//todo: forgot password functionality
//todo: change button colors to match logo/stuff
//todo: change textbox + moving word to laundr colors, buttons to colors as well (WIP)
//todo: big thing is to verify token on each page and redirect if necessary

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
      password: "",
      invalidLogin: false,
      validLogin: false,
    };
  }

  handleSubmit = (event) => {
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
      this.handleLogin(this.state.email.toLowerCase(), this.state.password);
    }
  };

  handleLogin = async (email, password) => {
    await axios
      .post(baseURL + "/user/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          const token = res.data.token;
          localStorage.setItem("token", token); //use stuff here. check token in constructor.
          //axios.defaults.headers.common["token"] = token;
          //const data = jwtDecode(token);
          this.setState({ validLogin: true });
        } else {
          this.setState({ invalidLogin: true });
        }
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
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
            onChange={(event) => {
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
            helperText="*Please enter a validLogin email."
            onChange={(event) => {
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
            onChange={(event) => {
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
            onChange={(event) => {
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
            onChange={(event) => {
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
            onChange={(event) => {
              this.handlePasswordChange(event.target.value);
            }}
            value={this.state.password}
          />
        </React.Fragment>
      );
    }
  };

  handleInvalidClose = () => {
    this.setState({ invalidLogin: false });
  };

  render() {
    if (this.state.validLogin) {
      return <Redirect push to="/userDashboard" />;
    }

    const classes = this.props.classes;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Container className={classes.center}>
            <img
              style={{
                width: 500,
                height: 200,
              }}
              alt="Company Logo"
              src="https://www.laundr.io/wp-content/uploads/2020/03/user_img.png"
            ></img>
          </Container>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Dialog
            open={this.state.invalidLogin}
            onClose={this.handleInvalidClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Alert</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Email or password is incorrect. Please try again.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleInvalidClose} color="primary">
                Okay
              </Button>
            </DialogActions>
          </Dialog>
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
                  {"Don't have an account? Sign up"}
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
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginStyles)(Login);
