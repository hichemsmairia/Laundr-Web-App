import { makeStyles } from "@material-ui/core/styles";

const loginStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  }
}));

export default loginStyles;
