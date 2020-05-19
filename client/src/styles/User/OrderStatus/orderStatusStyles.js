export default (theme) => ({
  root: {
    width: "100%",
    position: "relative",
  },
  infoCard: {
    width: 300,
    textAlign: "center",
  },
  layout: {
    width: "auto",
    marginLeft: "auto",
    marginRight: "auto",
    [theme.breakpoints.up(635)]: {
      width: 600,
    },
    [theme.breakpoints.down(634)]: {
      width: 460,
    },
  },
  gradient: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(102, 255, 255) 0%, rgb(0, 153, 255) 50%, rgb(0, 51, 204) 100%)",
    color: "white",
  },
});
