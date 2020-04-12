import React, { Component } from "react";
import { Grid, Typography, TextField, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import preferencesStyles from "../../styles/NewOrder/preferencesStyles";
import PreferenceCard from "../NewOrder/components/PreferenceCard";
import ScentedUnselected from "../../images/NewOrder/ScentedUnselected.png";
import ScentedSelected from "../../images/NewOrder/ScentedSelected.png";
import DelicatesUnselected from "../../images/NewOrder/DelicatesUnselected.png";
import DelicatesSelected from "../../images/NewOrder/DelicatesSelected.png";
import SeparateUnselected from "../../images/NewOrder/SeparateUnselected.png";
import SeparateSelected from "../../images/NewOrder/SeparateSelected.png";
import TowelsUnselected from "../../images/NewOrder/TowelsUnselected.png";
import TowelsSelected from "../../images/NewOrder/TowelsSelected.png";

class Preferences extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scented: false,
      delicates: false,
      separate: false,
      towelsSheets: false,
      washerPreferences: "",
    };
  }

  handleScented = (scented) => {
    this.setState({ scented: scented }, () => {
      console.log("scented updated" + this.state.scented);
    });
  };

  handleDelicates = (delicates) => {
    this.setState({ delicates: delicates }, () => {
      console.log("delicates updated" + this.state.delicates);
    });
  };

  handleSeparate = (separate) => {
    this.setState({ separate: separate }, () => {
      console.log("separate updated" + this.state.separate);
    });
  };

  handleTowelsSheets = (towelsSheets) => {
    this.setState({ towelsSheets: towelsSheets }, () => {
      console.log("towelsSheets updated" + this.state.towelsSheets);
    });
  };

  handlePreferencesChange = (preferences) => {
    this.setState({ washerPreferences: preferences });
  };

  render() {
    const classes = this.props.classes;

    return (
      <React.Fragment>
        <Typography component="h1" variant="h6" gutterBottom>
          Would you like any of these options?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <PreferenceCard
              title="Scented"
              info="Unscented detergent is hypoallergenic."
              unselectedImage={ScentedUnselected}
              selectedImage={ScentedSelected}
              updateSelected={this.handleScented}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PreferenceCard
              title="Delicates"
              info="Delicate clothing is washed in a mesh bag and dried on low heat."
              unselectedImage={DelicatesUnselected}
              selectedImage={DelicatesSelected}
              updateSelected={this.handleDelicates}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PreferenceCard
              title="Separate"
              info="Separated clothing is divided into whites and colors."
              unselectedImage={SeparateUnselected}
              selectedImage={SeparateSelected}
              updateSelected={this.handleSeparate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PreferenceCard
              title="Towels and Sheets"
              info="Towels and sheets are washed separately and dried on high heat."
              unselectedImage={TowelsUnselected}
              selectedImage={TowelsSelected}
              updateSelected={this.handleTowelsSheets}
            />
          </Grid>
        </Grid>
        <Typography
          component="h1"
          variant="h6"
          gutterBottom
          className={classes.title}
        >
          Do you have any special instructions for our washers?
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Special Instructions"
              fullWidth
              multiline
              variant="outlined"
              value={this.state.washerPreferences}
              onChange={(event) => {
                this.handlePreferencesChange(event.target.value);
              }}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

Preferences.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(preferencesStyles)(Preferences);
