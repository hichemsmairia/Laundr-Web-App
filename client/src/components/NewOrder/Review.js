import React from "react";
import { makeStyles, withStyles, TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import reviewStyles from "../../styles/NewOrder/reviewStyles";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import SettingsIcon from "@material-ui/icons/Settings";
import CloseIcon from "@material-ui/icons/Close";
import NotInterestedIcon from "@material-ui/icons/NotInterested";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";

class Review extends React.Component {
  constructor(props) {
    super(props);
  }

  /*
  <List disablePadding>
          {products.map((product) => (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} secondary={product.desc} />
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" className={classes.total}>
              $34.06
            </Typography>
          </ListItem>
        </List>
   */

  render() {
    const classes = this.props.classes;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Summary (rough markup)
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6} style={{ marginBottom: 5 }}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <Typography className={classes.titleCard} gutterBottom>
                    <HomeIcon style={{ marginBottom: -4 }} /> Address
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {this.props.address}
                  </Typography>
                  <Typography className={classes.titleCard} gutterBottom>
                    <CreateIcon style={{ marginBottom: -4 }} /> Additional
                    Instructions
                  </Typography>
                  <Typography
                    style={{ maxHeight: 150, overflow: "auto" }}
                    color="textSecondary"
                  >
                    {this.props.addressPreferences}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card className={classes.root} variant="outlined">
                <CardContent style={{ marginBottom: -15 }}>
                  <Typography className={classes.titleCard} gutterBottom>
                    <CalendarTodayIcon style={{ marginBottom: -4 }} /> Pickup
                    Date
                  </Typography>
                  <Typography color="textSecondary">
                    {this.props.pickupDate}
                  </Typography>
                  <Typography className={classes.titleCard} gutterBottom>
                    <QueryBuilderIcon style={{ marginBottom: -4 }} /> Pickup
                    Time
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {this.props.pickupTime}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12} sm={6} style={{ marginBottom: 8 }}>
              <Card className={classes.root} variant="outlined">
                <CardContent style={{ marginBottom: -22 }}>
                  <Typography className={classes.titleCard} gutterBottom>
                    <SettingsIcon style={{ marginBottom: -4 }} /> Preferences
                  </Typography>
                  <List dense className={classes.listRoot}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary="Scented" />
                      <ListItemSecondaryAction>
                        {this.props.scented ? (
                          <CheckCircleOutlineIcon
                            style={{ fill: "green" }}
                            edge="end"
                          />
                        ) : (
                          <NotInterestedIcon color="error" edge="end" />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary="Delicates" />
                      <ListItemSecondaryAction>
                        {this.props.delicates ? (
                          <CheckCircleOutlineIcon
                            style={{ fill: "green" }}
                            edge="end"
                          />
                        ) : (
                          <NotInterestedIcon color="error" edge="end" />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary="Separate" />
                      <ListItemSecondaryAction>
                        {this.props.separate ? (
                          <CheckCircleOutlineIcon
                            style={{ fill: "green" }}
                            edge="end"
                          />
                        ) : (
                          <NotInterestedIcon color="error" edge="end" />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar />
                      </ListItemAvatar>
                      <ListItemText primary="Towels and Sheets" />
                      <ListItemSecondaryAction>
                        {this.props.towelsSheets ? (
                          <CheckCircleOutlineIcon
                            style={{ fill: "green" }}
                            edge="end"
                          />
                        ) : (
                          <NotInterestedIcon color="error" edge="end" />
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                  <Typography className={classes.titleCard} gutterBottom>
                    <CreateIcon style={{ marginBottom: -4 }} /> Additional
                    Instructions
                  </Typography>
                  <Typography
                    color="textSecondary"
                    style={{ maxHeight: 150, overflow: "auto" }}
                  >
                    {this.props.washerPreferences}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Grid item xs={12} sm={6} style={{ marginTop: -8 }}>
              <Card className={classes.root} variant="outlined">
                <CardContent style={{ marginBottom: -15 }}>
                  <TextField
                    label="Coupon Code"
                    fullWidth
                    style={{ marginBottom: 5 }}
                    variant="outlined"
                  />
                  <Typography gutterBottom>
                    <AttachMoneyIcon style={{ marginBottom: -4 }} />
                    Estimated cost:{" "}
                    {
                      <Typography
                        color="textSecondary"
                        style={{ display: "inline-block" }}
                      >
                        $4.20
                      </Typography>
                    }
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Review.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(reviewStyles)(Review);
