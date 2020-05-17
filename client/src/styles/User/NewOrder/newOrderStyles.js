export default (theme) => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
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
  hoverCard: {
    boxShadow: "0 0 2px 1px rgb(0, 153, 255)",
    background:
      "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
  },
});
