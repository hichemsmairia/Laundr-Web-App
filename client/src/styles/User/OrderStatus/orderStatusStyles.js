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
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
});
