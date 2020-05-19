export default (theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(635)]: {
      width: 600,
    },
    [theme.breakpoints.down(634)]: {
      width: 400,
    },
  },
  root: {
    width: "100%",
    position: "relative",
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    backgroundImage:
      "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
    color: "white",
  },
});
