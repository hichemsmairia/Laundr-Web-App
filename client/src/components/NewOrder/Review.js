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
import { Tooltip } from "@material-ui/core";
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
import ScentedSelectedCircle from "../../images/NewOrder/ScentedSelectedCircle.png";
import ScentedUnselectedCircle from "../../images/NewOrder/ScentedUnselectedCircle.png";
import DelicatesSelectedCircle from "../../images/NewOrder/DelicatesSelectedCircle.png";
import DelicatesUnselectedCircle from "../../images/NewOrder/DelicatesUnselectedCircle.png";
import SeparateSelectedCircle from "../../images/NewOrder/SeparateSelectedCircle.png";
import SeparateUnselectedCircle from "../../images/NewOrder/SeparateUnselectedCircle.png";
import TowelsSelectedCircle from "../../images/NewOrder/TowelsSelectedCircle.png";
import TowelsUnselectedCircle from "../../images/NewOrder/TowelsUnselectedCircle.png";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12,
  },
  arrow: {
    color: theme.palette.common.grey,
  },
}))(Tooltip);

class Review extends React.Component {
  constructor(props) {
    super(props);
  }

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
                <CardContent style={{ marginBottom: -20 }}>
                  <Typography className={classes.titleCard} gutterBottom>
                    <HomeIcon style={{ marginBottom: -4 }} /> Address
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    {this.props.address}
                  </Typography>
                  <Typography className={classes.titleCard}>
                    <CreateIcon style={{ marginBottom: -4 }} />
                    <LightTooltip title={this.props.addressPreferences} arrow>
                      <Button style={{ textTransform: "none" }}>
                        <Typography className={classes.titleCard} gutterBottom>
                          See Additional Instructions
                        </Typography>
                      </Button>
                    </LightTooltip>
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
                        <Avatar
                          src={
                            this.props.scented
                              ? ScentedSelectedCircle
                              : ScentedUnselectedCircle
                          }
                          imgProps={{}}
                        />
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
                        <Avatar
                          src={
                            this.props.delicates
                              ? DelicatesSelectedCircle
                              : DelicatesUnselectedCircle
                          }
                        />
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
                        <Avatar
                          src={
                            this.props.separate
                              ? SeparateSelectedCircle
                              : SeparateUnselectedCircle
                          }
                        />
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
                        <Avatar
                          src={
                            this.props.towelsSheets
                              ? TowelsSelectedCircle
                              : TowelsUnselectedCircle
                          }
                        />
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
                  <CreateIcon style={{ marginBottom: -4 }} />
                  <LightTooltip title={this.props.washerPreferences} arrow>
                    <Button style={{ textTransform: "none" }}>
                      <Typography className={classes.titleCard} gutterBottom>
                        See Additional Instructions
                      </Typography>
                    </Button>
                  </LightTooltip>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container alignItems="center" direction="column">
            <Grid item xs={12} sm={6} style={{ marginTop: -6 }}>
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
                    Estimated cost: $Placeholder
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
