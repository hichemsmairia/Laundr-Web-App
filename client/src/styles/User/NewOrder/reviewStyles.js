export default (theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  root: {
    minWidth: 275,
    paddingBottom: "0px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 10,
  },
  listRoot: {
    width: "100%",
    maxWidth: 360,
    marginTop: -10,
  },
  removePadding: {
    padding: 16,
    "&:last-child": {
      paddingBottom: 10,
    },
  },
});
