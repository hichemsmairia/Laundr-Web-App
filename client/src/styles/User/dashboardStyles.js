export default (theme) => ({
  welcomeCard: {
    background: "#21d0e5",
  },
  welcomeText: {
    color: "white",
    textAlign: "center",
    padding: 10,
  },
  orderComponentName: {
    color: "white",
    textAlign: "center",
  },
  root: {
    [theme.breakpoints.up(1482)]: {
      width: 1200,
      height: 600,
    },

    //height: "100vh",
    //width: "100vw",
    position: "relative",
  },
  layout: {
    width: "auto",
  },
});
