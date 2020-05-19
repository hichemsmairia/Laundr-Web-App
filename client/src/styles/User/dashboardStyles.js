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
    [theme.breakpoints.down("sm")]: {
      width: 450,
      height: 600,
    },
    [theme.breakpoints.up(800)]: {
      width: 700,
      height: 550,
    },
    [theme.breakpoints.up(1034)]: {
      width: 1000,
      height: 500,
    },
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
  carouselTitle: {
    color: "white",
    textAlign: "center",
    paddingTop: 10,
  },
});
